$(document).ready(function(){
    $('.results-page').hide();
    $('.card-deck').hide();
    $('#lock-btn').prop('disabled', false);//enable

    //decalre local variables
    var userAge, userGender, heroMatchName, 
    heroMatchPhoto, heroMatchInt, heroMatchStr, 
    heroMatchSpd, heroMatchDur, heroMatchPow, heroMatchCmb, timeStamp;

    //var database = firebase.database();
    var dbRecord;

    var userName = $('#name-input').val();
    var userIntInput = parseInt($('#intel-value').text());
    var userStrInput = parseInt($('#stren-value').text());
    var userSpdInput = parseInt($('#speed-value').text());
    var userDurInput = parseInt($('#durab-value').text());
    var userPowInput = parseInt($('#power-value').text());
    var userCmbInput = parseInt($('#combat-value').text());

    var $heroName, $heroPhoto, $heroIntValue, $heroStrValue, $heroSpdValue, $heroDurValue, $heroPowValue, $heroCmbValue;


    var timerId;
    var chartTimerId;
    //var createUserResult;
    var createChartJS;
    var $lockBtn = $('#lock-btn');
    
    function loadData(){
        /****************************************************
             * Load Test Data
             ***************************************************/
            /*$('#name-input').val('Todd');
            $('#intel-value').text('45');
            $('#stren-value').text('78');
            $('#speed-value').text('23');
            $('#durab-value').text('45');
            $('#power-value').text('12');
            $('#combat-value').text('90');*/
            /****************************************************/
    }
    /******************************************************
     * ERROR HANDLING
     * ****************************************************/
    // Lock button Click
    $lockBtn.on('click', function (event) {
        /********************************
         * Clear Old Results
        *******************************/
        clearOldResults();
        /*******************************/

        var userName = $('#name-input').val();
        event.preventDefault();

        //clear error handling:
        //$('.lock-text').text("Don't zoom past this...click the button below to lock in your selection!").css({'color': ''});
        $('#name-input').css({'border':''});
        $('.intel-input').css({'color':''});
        $('.stren-input').css({'color':''});
        $('.speed-input').css({'color':''});
        $('.durab-input').css({'color':''});
        $('.power-input').css({'color':''});
        $('.combat-input').css({'color':''});

        if (!userName){
            /*$('.modal-1').modal();*/
            $('#name-input').css({'border':'solid 1px red'});
            loadData();
         }
        if (!$('#intel-value').text()){
            $('.intel-input').css({'color':'red'});
        }
        if (!$('#stren-value').text()){
            $('.stren-input').css({'color':'red'});
        }
        if (!$('#speed-value').text()){
            $('.speed-input').css({'color':'red'});
        }
        if (!$('#durab-value').text()){
            $('.durab-input').css({'color':'red'});
        }
        if (!$('#power-value').text()){
            $('.power-input').css({'color':'red'});
        }
        if (!$('#combat-value').text()){
            $('.combat-input').css({'color':'red'});
        }       
        if (!userName || 
            !$('#intel-value').text() || 
            !$('#stren-value').text() || 
            !$('#speed-value').text() || 
            !$('#durab-value').text() ||
            !$('#power-value').text() ||
            !$('#combat-value').text())
            {
                //console.log("In results.js check");
                $('.lock-text').text('Please complete all selections, then Lock them in.').css({'color': 'red'});
                return; 
                $lockBtn.prop('disabled', false); //enable
             }
             /****************************************************/
        else{
            // Log input values
            userName = $('#name-input').val();
            userIntInput = parseInt($('#intel-value').text());
            userStrInput = parseInt($('#stren-value').text());
            userSpdInput = parseInt($('#speed-value').text());
            userDurInput = parseInt($('#durab-value').text());
            userPowInput = parseInt($('#power-value').text());
            userCmbInput = parseInt($('#combat-value').text());

            $('.lock-text').text('Your selections are locked in.').css({'color': ''});                  
            /*console.log("User Name = " + userName);
            console.log("Int = " + userIntInput);
            console.log("Str = " + userStrInput);
            console.log("Spd = " + userSpdInput);
            console.log("Dur = " + userDurInput);
            console.log("Pow 5 = " + userPowInput);
            console.log("Com 6 = " + userCmbInput);*/
            $lockBtn.prop('disabled', true);//disable
        }
        //$('#friend-results').empty();
         
    });

    /*************************************************
     * remove all previous bodies
     * ***********************************************/
    function clearOldResults(){
        /***************************************
         * Remove old heroes card
         ***************************************/
        var $oldResultBody = $('#results-body');
        var $oldList = $('.list');
        if ($oldResultBody.length){
            $('#results-body').remove();
        }
        if ($oldList.length){
            $oldList.remove();
        }

        /**************************************
         *Remove old charts
         **************************************/
        var $canvas = $('#myChart');
        if ($canvas.length){
            var item = document.getElementById("myChart");
            var context = item.getContext('2d');
            context.clearRect(0, 0, item.width, item.height);
            context.beginPath();
            //console.log("Clearing canvas");
        }

        /***************************************/
        /******************************************************
         * Remove old friendship cards if they exist:
         * ****************************************************/
        var $oldFriendResults = $('#friend-results');
        //var $oldFriendsList = $('.friends-list');
        if ($oldFriendResults.length){
            $oldFriendResults.empty();
        }
       /* if ($oldFriendsList.length){
            $oldFriendsList.remove();
        }*/
        /*****************************************************/

    }
    
    /******************************************************/
    // Submit button Click

    // Render results on Submit
    $('#submit-btn').on('click', function (event) {
        event.preventDefault();

        $('.results-page').show();
	    $('.card-deck').show();

        //Pull user data if results are locked in
        var $steps = $('.lock-text').text();
        if ($steps != 'Your selections are locked in.') {  
                return;
        }
        else if ($steps === 'Your selections are locked in.'){
            timerId = setTimeout(createUserResult.bind(userName, 
                $heroIntValue, 
                $heroStrValue, 
                $heroSpdValue, 
                $heroDurValue, 
                $heroPowValue, 
                $heroCmbValue, 
                $heroName, 
                $heroPhoto), 10000);
        }
        
        //******************************************************/
      
        // Create Chart.js Results
        //chartTimerId = setTimeout(createChartJS, 6000);
    });//submit button
        

    /**********************************************/
    // Function to create hero card and append to DOM (results-body)
    function createUserResult(userName, $heroIntValue, $heroStrValue, $heroSpdValue, $heroDurValue, $heroPowValue, $heroCmbValue, $heroName, $heroPhoto){
        
        // PULL HERO RESULTS FROM lock-btn
        $heroName = $lockBtn.attr('hero-name-data');
        //console.log("Hero Name = "+ $heroName);
        $heroPhoto = $lockBtn.attr('hero-photo-data');
        //console.log("Hero PHOTO = "+ $heroPhoto);
        $heroIntValue = $lockBtn.attr('hero-int-data');
        //console.log("Hero INT = "+ $heroIntValue);
        $heroStrValue = $lockBtn.attr('hero-str-data');
        //console.log("Hero STR = "+ $heroStrValue);
        $heroSpdValue = $lockBtn.attr('hero-spd-data');
        //console.log("Hero SPD = "+ $heroSpdValue);
        $heroDurValue = $lockBtn.attr('hero-dur-data');
        //console.log("Hero DUR = "+ $heroDurValue);
        $heroPowValue = $lockBtn.attr('hero-pow-data');
        //console.log("Hero POW = "+ $heroPowValue);
        $heroCmbValue = $lockBtn.attr('hero-cmb-data');
        //console.log("Hero CMB = "+ $heroCmbValue);
        
        /***************************************
         * clear old heroes card
         ***************************************/
        /*var $oldResultBody = $('#results-body');
        var $oldList = $('.list');
        if ($oldResultBody.length){
            $('#results-body').remove();
        }
        if ($oldList.length){
            $oldList.remove();
        }*/
        /***************************************/

        // Creating Hero Card Elements
        var resultsBody = $('<div>', {id:'results-body', class:'card-body'});
        var heroesPicsDiv = $('<img>', {id:'heroes-pics-div', class:'text-center img-fluid'});
        var heroStatsDiv = $('<div>', {id:'matched-stats-div'});
        var ol = $('<ol>', {class:'list'});
        var li1 = $('<li>', {id:'li-1', class:'card-text'});
        var li2 = $('<li>', {id:'li-2', class:'card-text'});
        var li3 = $('<li>', {id:'li-3', class:'card-text'});
        var li4 = $('<li>', {id:'li-4', class:'card-text'});
        var li5 = $('<li>', {id:'li-5', class:'card-text'});
        var li6 = $('<li>', {id:'li-6', class:'card-text'});

        // Adding data and attributes to card
        $('#results-title').attr('friend-name', userName);
        $('#results-title').text('Your Matched Hero: ' + $heroName);
        heroesPicsDiv.attr('src', $heroPhoto);

        li1.text('Intelligence: ' + $heroIntValue);
        li2.text('Strength: ' + $heroStrValue);
        li3.text('Speed: ' + $heroSpdValue);
        li4.text('Durability: ' + $heroDurValue);
        li5.text('Power: ' + $heroPowValue);
        li6.text('Combat: ' + $heroCmbValue);

        // Append Hero card to DOM
        /**************************** */
        $('#matched-hero').append(resultsBody);
        resultsBody.append(heroesPicsDiv, heroStatsDiv);
        heroStatsDiv.append(ol);
        ol.append(li1, li2, li3, li4, li5, li6);

        /**************************************************
         **Adding Chart.js to render user and hero results
         ***************************************************/
        var ctx = document.getElementById("myChart").getContext('2d');
        var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Intelligence", "Strength", "Speed", "Durability", "Power", "Combat"],
            datasets: [
                {
                    label: 'You',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 4,
                    data: [userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput],
                    pointRadius: 6,
                    pointBackgroundColor: 'rgba(255, 0, 0, 1)'           
                }, {
                    label: 'Your Hero',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 4,
                    data: [$heroIntValue, $heroStrValue, $heroSpdValue, $heroDurValue, $heroPowValue, $heroCmbValue],
                    pointRadius: 6, 
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)'
                }]
            },
        });

        // Database Listener and creating Friend Cards:
        /*******************************************************
         * Friendship card is dependent on data be loading to the
         * database, so it can not return, before the record has 
         * been inserted, which means, it must wait 10 seconds.
         * ******************************************************/

        var database = firebase.database();
        database.ref().on("child_added", function (snapshot) {
            //Pulls One Record: database.ref().on("child_added", function (snapshot) {

            var record = snapshot.val();

            // Pulling data from Db 
            userName = record.userNameDb;
            userAge = record.userAgeDb;
            userGender = record.userGenderDb;
            heroMatchName = record.heroMatchNameDb;
            heroMatchPhoto = record.heroMatchPhotoDb;
            heroMatchInt = record.heroMatchIntDb;
            heroMatchStr = record.heroMatchStrDb;
            heroMatchSpd = record.heroMatchSpdDb;
            heroMatchDur = record.heroMatchDurDb;
            heroMatchPow = record.heroMatchPowDb;
            heroMatchCmb = record.heroMatchCmbDb;
            timeStamp = record.userTimeStampDb;

            // Take Db data and turning into card
            //dbRecord = userName, userAge, userGender, heroMatchName, heroMatchPhoto, heroMatchInt, heroMatchStr, heroMatchSpd, heroMatchDur, heroMatchPow, heroMatchCmb, timeStamp;

            // Create friend card
            //createFriendCard(dbRecord);
            createFriendCard(
                userName,
                userAge,
                userGender,
                heroMatchName,
                heroMatchPhoto,
                heroMatchInt,
                heroMatchStr,
                heroMatchSpd,
                heroMatchDur,
                heroMatchPow,
                heroMatchCmb,
                timeStamp);
            //console.log(timeStamp);
        });//database listener
        //clear timer
        clearInterval(timerId);
    }
    
    /******************************************************/
    // Function to create friend cards and append to DOM
    function createFriendCard(
        userName, 
        userAge, 
        userGender, 
        heroMatchName, 
        heroMatchPhoto, 
        heroMatchInt, 
        heroMatchStr, 
        heroMatchSpd, 
        heroMatchDur, 
        heroMatchPow, 
        heroMatchCmb, 
        timeStamp) {
        
        /******************************************************
         * Remove old friendship cards if they exist:
         * ****************************************************/
        /*var $oldFriendResults = $('#friend-results');
        var $oldFriendsList = $('.friends-list');
        if ($oldFriendResults.length){
            $oldFriendResults.remove();
        }
        if ($oldFriendsList.length){
            $oldFriendsList.remove();
        }*/
        /*****************************************************/
        
        //console.log('createCards', dbRecord);
        $('.card-deck').show();
        // Creating Friend Card Elements
        /*********************************************/
        var friendsCard = $('<div>', {id:'friends-card', class:'card'});
        var heroTopImageDiv = $('<img>', {id:'hero-top-image', class:'card-img-top'});
        var cardBody = $('<div>', {class:'card-body'});
        var cardTitle = $('<h5>', {class:'card-title'});
        var cardText = $('<h6>', {class:'card-text'});
        var ol = $('<ol>', {class:'friends-list'});
        var li1 = $('<li>', {id:'li-1', class:'card-text'});
        var li2 = $('<li>', {id:'li-2', class:'card-text'});
        var li3 = $('<li>', {id:'li-3', class:'card-text'});
        var li4 = $('<li>', {id:'li-4', class:'card-text'});
        var li5 = $('<li>', {id:'li-5', class:'card-text'});
        var li6 = $('<li>', {id:'li-6', class:'card-text'});
        var cardFooter = $('<div>', {class:'card-footer'});
        var dateFooter = $('<small>', {id:'date', class:'text-muted'});

        // Adding data and attributes to card
        cardTitle.attr('friend-name', userName);
        cardTitle.text(userName);

        heroTopImageDiv.attr('src', heroMatchPhoto)

        cardText.text(userName + ' (' + userGender + ', ' + userAge + '), matched with: ' + heroMatchName);

        li1.text('Intelligence: ' + heroMatchInt);
        li2.text('Strength: ' + heroMatchStr);
        li3.text('Speed: ' + heroMatchSpd);
        li4.text('Durability: ' + heroMatchDur);
        li5.text('Power: ' + heroMatchPow);
        li6.text('Combat: ' + heroMatchCmb);

        dateFooter.text('Date added: ' + timeStamp);

        // Append card to DOM
        $('#friend-results').prepend(friendsCard);
        friendsCard.append(heroTopImageDiv, cardBody, cardFooter);
        cardBody.append(cardTitle, cardText, ol);
        ol.append(li1, li2, li3, li4, li5, li6);
        cardFooter.append(dateFooter);
    }
});