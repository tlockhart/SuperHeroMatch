$(document).ready(function(){

    //decalre local variables
    var userAge, userGender, heroMatchName, 
    heroMatchPhoto, heroMatchInt, heroMatchStr, 
    heroMatchSpd, heroMatchDur, heroMatchPow, heroMatchCmb;

    var database = firebase.database();
    var dbRecord;

    var userName = $('#name-input').val();
    var userIntInput = parseInt($('#intel-value').text());
    var userStrInput = parseInt($('#stren-value').text());
    var userSpdInput = parseInt($('#speed-value').text());
    var userDurInput = parseInt($('#durab-value').text());
    var userPowInput = parseInt($('#power-value').text());
    var userCmbInput = parseInt($('#combat-value').text());

    var timerId;
    var createUserResult;

    $('#lock-btn').on('click', function (event) {
        //$('#lock-btn').prop('disabled', false);
        event.preventDefault();

        // Log input values
        userName = $('#name-input').val();
        userIntInput = parseInt($('#intel-value').text());
        userStrInput = parseInt($('#stren-value').text());
        userSpdInput = parseInt($('#speed-value').text());
        userDurInput = parseInt($('#durab-value').text());
        userPowInput = parseInt($('#power-value').text());
        userCmbInput = parseInt($('#combat-value').text());


        console.log("User Name = " + userName);
        console.log("Int = " + userIntInput);
        console.log("Str = " + userStrInput);
        console.log("Spd = " + userSpdInput);
        console.log("Dur = " + userDurInput);
        console.log("Pow 5 = " + userPowInput);
        console.log("Com 6 = " + userCmbInput);

        //$('#lock-btn').prop('disabled', true);
    });

    database.ref().on("child_added", function (snapshot) {
        record = snapshot.val();//one record
        //console.log("The record = ", record);
      
        // Pulling data from Db 
        userName = record.userNameDb;
        userAge = record.userAgeDb;
        userGender =  record.userGenderDb;
        heroMatchName = record.heroMatchNameDb;
        heroMatchPhoto = record.heroMatchPhotoDb;
        heroMatchInt = record.heroMatchIntDb;
        heroMatchStr = record.heroMatchStrDb;
        heroMatchSpd = record.heroMatchSpdDb;
        heroMatchDur = record.heroMatchDurDb;
        heroMatchPow = record.heroMatchPowDb;
        heroMatchCmb = record.heroMatchCmbDb;
        
        // Take Db data and turning into card
        dbRecord = userName, userAge, userGender, heroMatchName, heroMatchPhoto, heroMatchInt, heroMatchStr, heroMatchSpd, heroMatchDur, heroMatchPow, heroMatchCmb;

        //createUserResult(dbRecord);
        createFriendCard(dbRecord);
    });

    // Render results on Submit
    $('#submit-btn').on('click', function (event) {
        event.preventDefault();
        // Create User Result Card
        //createUserResult(userName, userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput, heroMatchName, heroMatchPhoto);
        timerId = setTimeout(createUserResult, 5000);

        // Create Chart.js Results
        createChartJS(userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput);
    });

    // ChartJS function
    function createChartJS (userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Intelligence", "Strength", "Speed", "Durability", "Power", "Combat"],
            datasets: [{
                label: 'Category Scores',
                data: [userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth: 4,
                pointStyle: 'circle',
                pointBackgroundColor: 'rgba(255, 0, 0, 1)',
                pointBorderColor: 'rgba(255, 0, 0, 1)',
                pointBorderWidth: 1,
                pointRadius: 1,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    };

    // Function to create user Match and append to DOM
    //function createUserResult(userName, userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput, heroMatchName, heroMatchPhoto) {
       creatUserResult = function(userName, userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput, heroMatchName, heroMatchPhoto){
         console.log('userMatch', dbRecord);
        /**********************************************
         * PULL HERO RESULTS FROM lock-btn
         **********************************************/
        var $heroName = $('#lock-btn').attr('hero-name-data');
        console.log("Hero Name = "+$heroName);
        var $heroPhoto = $('#lock-btn').attr('hero-photo-data');
        console.log("Hero PHOTO = "+$heroPhoto);
        var $heroIntValue = $('#lock-btn').attr('hero-int-data');
        console.log("Hero INT = "+$heroIntValue);
        var $heroStrValue = $('#lock-btn').attr('hero-str-data');
        console.log("Hero STR = "+$heroStrValue);
        var $heroSpdValue = $('#lock-btn').attr('hero-spd-data');
        console.log("Hero SPD = "+$heroSpdValue);
        var $heroDurValue = $('#lock-btn').attr('hero-dur-data');
        console.log("Hero DUR = "+$heroDurValue);
        var $heroPowValue = $('#lock-btn').attr('hero-pow-data');
        console.log("Hero POW = "+$heroPowValue);
        var $heroCmbValue = $('#lock-btn').attr('hero-cmb-data');
        console.log("Hero CMB = "+$heroCmbValue);
        /*********************************************/
        // Creating Card Elements
        var resultsBody = $('<div>', {id:'results-body', class:'card-body row'});
        var heroesPicsDiv = $('<img>', {id:'heroes-pics-div', class:'text-center'});
        var matchedStatsDiv = $('<div>', {id:'matched-stats-div'});
        var ol = $('<ol>', {class:'list'});
        var li1 = $('<li>', {id:'li-1', class:'card-text'});
        var li2 = $('<li>', {id:'li-2', class:'card-text'});
        var li3 = $('<li>', {id:'li-3', class:'card-text'});
        var li4 = $('<li>', {id:'li-4', class:'card-text'});
        var li5 = $('<li>', {id:'li-5', class:'card-text'});
        var li6 = $('<li>', {id:'li-6', class:'card-text'});

        // Adding data and attributes to card
        $('#results-title').attr('friend-name', userName);
        $('#results-title').text('Your Matched Hero: ' + heroMatchName);
        heroesPicsDiv.attr('src', heroMatchPhoto);

        li1.text('Intelligence: ' + userIntInput);
        li2.text('Strength: ' + userStrInput);
        li3.text('Speed: ' + userSpdInput);
        li4.text('Durability: ' + userDurInput);
        li5.text('Power: ' + userPowInput);
        li6.text('Combat: ' + userCmbInput);

        // Append card to DOM
        $('#matched-hero').append(resultsBody);
        resultsBody.append(heroesPicsDiv, matchedStatsDiv);
        matchedStatsDiv.append(ol);
        ol.append(li1, li2, li3, li4, li5, li6);

        //clear timer
        clearInterval(timerId);
    }
    

    // Function to create friend cards and append to DOM
    function createFriendCard(dbRecord) {
        //console.log('createCards', dbRecord);
        $('.card-deck').show();
        // Creating Card Elements
        var friendsCard = $('<div>', {id:'friends-card', class:'card'});
        var heroTopImageDiv = $('<img>', {id:'hero-top-image', class:'card-img-top'});
        var cardBody = $('<div>', {class:'card-body'});
        var cardTitle = $('<h5>', {class:'card-title'});
        var cardText = $('<h6>', {class:'card-text'});
        var ol = $('<ol>', {class:'list'});
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

        dateFooter.text('date');

        // Append card to DOM
        $('#friend-results').prepend(friendsCard);
        friendsCard.append(heroTopImageDiv, cardBody, cardFooter);
        cardBody.append(cardTitle, cardText, ol);
        ol.append(li1, li2, li3, li4, li5, li6);
        cardFooter.append(dateFooter);
    };
});

/* Graveyard

Keith's psudocode:
// This will happen once when the page first loads
    // this is where we will call "createCards(records)"
    /*database.ref().once("value", function(snapshot){
        var records = snapshot.val();
        console.log('All Records ', records);
        // createCards(records);
        createFriendResults(records);
    }); */

//create reference to the db record's key
        //var key = snapshot.ref.key
        //Step: Pull data directly from DB, not the reinitialized Global Variables, to populate the table
        /*userName = record.userNameDb;
        userAge = record.userAgeDb;
        userGender =  record.userGenderDb;
        heroMatchName = record.heroMatchNameDb;
        heroMatchPhoto = record.heroMatchPhotoDb;
        heroMatchInt = record.heroMatchIntDb;
        heroMatchStr = record.heroMatchStrDb;
        heroMatchSpd = record.heroMatchSpdDb;
        heroMatchDur = record.heroMatchDurDb;
        heroMatchPow = record.heroMatchPowDb;
        heroMatchCmb = record.heroMatchCmbDb;

// Take individual data record and turn it into a card
    // This way we can append it to the DOM
    function createCard (dbRecord) {
        console.log('createCard', dbRecord);
    }

// Take multiple records from the database and render them as cards
    // this function should call createCard forEach dbRecord

Mary's code:
// Storing Db recory into variable
        var combat = snapshot.val().heroMatchCmbDb;
        var durability = snapshot.val().heroMatchDurDb;
        var intelligence = snapshot.val().heroMatchIntDb;
        var matchName = snapshot.val().heroMatchNameDb;
        var matchPhoto = snapshot.val().heroMatchPhotoDb;
        var power = snapshot.val().heroMatchPowDb;
        var speed = snapshot.val().heroMatchSpdDb;
        var strength = snapshot.val().heroMatchStrDb;
        var friendAge = snapshot.val().userAgeDb;
        var friendGender = snapshot.val().userGenderDb;
        var friendName = snapshot.val().userNameDb; 

var testDate = 'Sep 26 18';
var relativeDate = moment(testDate).diff(momentcalendar();
console.log(relativeDate);

*/