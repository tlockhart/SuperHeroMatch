$(document).ready(function(){

    // This is our API key. Add your own API key between the ""
    var accessToken = "2622992407714821";
    var cors = "https://cors-anywhere.herokuapp.com/";
    var userName, userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput;
    var userGender;
    var userAge;
    var heroScores = [];
    var defaultMaleHeroId = '72';
    var defaultFemaleHeroId = '97';

    var heroMatchName, heroMatchPhoto, heroMatchInt, heroMatchStr, heroMatchSpd, heroMatchDur, heroMatchPow, heroMatchCmb;

    /*************************************
     *widen score range if no hero found
     *************************************/
    var scoreRange = 5;
    var testResponseLength = 470; //test data, change in prod
    

    /******************************************************************
    **if no herMatchId is found it will return the first one in the list
    *********************************************************************/
    var heroMatchId = 0;
    /********************************************************/

    //Step2: Create a variable to reference the database
    var database = firebase.database();

    $('#submit-btn').on('click', function (event) {
        //disable submit-btn button
    //$('#submit-btn').prop('disabled', true);
        // Don't refresh the page!
        event.preventDefault();

        //clear error handling:
        $('#form-msg').text('').css({'color': ''});
        $('#name-input').css({'border':''});
        $('.intel-input').css({'color':''});
        $('.stren-input').css({'color':''});
        $('.speed-input').css({'color':''});
        $('.durab-input').css({'color':''});
        $('.power-input').css({'color':''});
        $('.combat-input').css({'color':''});

        /***********************************************************************
         * Gender and Age can not be click until the submit button is clicked
         ***********************************************************************/
        //userGender = faceGender;
        userGender = $('#face').attr('gender');
        //console.log ("FaceGender = "+userGender);
        userAge = $('#face').attr('age');
        //console.log("Face Age = "+userAge);
        /* **********************************************************************/
        

        // Create CODE HERE to Log the slider values
        userName = $('#name-input').val();
        //console.log("Value 0 = " + userName);
        if (!userName){
            $('#form-msg').text('Please complete all fields').css({'color': 'red'});
            $('#name-input').css({'border':'solid 1px red'});
         }
         
        

        //$('#intel-value').html($('#int-input').val());
        userIntInput = parseInt($('#intel-value').text());
        //console.log("Value 1 = " + userIntInput);
        if (!$('#intel-value').text()){
            $('.intel-input').css({'color':'red'});
        }

        //$('#stren-value').html($('#str-input').val());
        userStrInput = parseInt($('#stren-value').text());
        //console.log("Value 2 = " + userStrInput);
        if (!$('#stren-value').text()){
            $('.stren-input').css({'color':'red'});
        }

        //$('#spd-value').html($('#spd-input').val());
        userSpdInput = parseInt($('#speed-value').text());
        //console.log("Value 3 = " + userSpdInput);
        if (!$('#speed-value').text()){
            $('.speed-input').css({'color':'red'});
        }

        //$('#dur-value').html($('#dur-input').val());
        userDurInput = parseInt($('#durab-value').text());
        //console.log("Value 4 = " + userDurInput);
        if (!$('#durab-value').text()){
            $('.durab-input').css({'color':'red'});
        }

        //$('#pow-value').html($('#pow-input').val());
        userPowInput = parseInt($('#power-value').text());
        //console.log("Value 5 = " + userPowInput);
        if (!$('#power-value').text()){
            $('.power-input').css({'color':'red'});
        }

        //$('#cmb-value').html($('#cmb-input').val());
        userCmbInput = parseInt($('#combat-value').text());
        //console.log("Value 6 = " + userCmbInput);
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
                $('#form-msg').text('Please complete all fields').css({'color': 'red'});  
                return; 
             }
        //disable button
        $('#submit-survey').prop('disabled', true);

        //load Hero data and find matching hero id:
        loadHeroData();

        //clear input values:
        clearInput();

        //update display:
        //updateDisplay()

        
    });//submit button

    function clearInput(){
        $('#name-input').val('');
        $('#intel-value').text('');
        $('#stren-value').text('');
        $('#speed-value').text('');
        $('#durab-value').text('');
        $('#power-value').text('');
        $('#combat-value').text('');
       // $('#image-id').src('');
       $('#li-id').remove();
       $('#face').remove();
       $('#select-btn').show();
       $('#submit-btn').prop('disabled', true);
    }
    // We then created an AJAX call
    /*******************************************************/
    //function loadHeroData(callback) {
        function loadHeroData(callback) {
            //loop through hero data
            for (var i = 0; i < testResponseLength; i++) {
                var heroGender = data[i].appearance.gender.toLowerCase();
                //console.log("Hero gender = " + heroGender);

                var heroId = data[i].id;
                //console.log("Hero ID = " + heroId);

                var heroGender = data[i].appearance.gender.toLowerCase();
                //console.log("Hero Gender = "+heroGender);
                var heroInt = data[i].powerstats.intelligence;
                //console.log("Hero Intelligence = " + heroInt);
                var heroStr = data[i].powerstats.strength;
                //console.log("Hero Strength = " + heroStr);
                var heroSpd = data[i].powerstats.speed;
                //console.log("Hero Speed = " + heroSpd);
                var heroDur = data[i].powerstats.durability;
                //console.log("Hero Durability = " + heroDur);
                var heroPow = data[i].powerstats.power;
                //console.log("Hero Power = " + heroPow);
                var heroCmb = data[i].powerstats.combat;
                //console.log("Hero Combat = " + heroCmb);

                //console.log("Hero Gender = " + heroGender);
                if (userGender === heroGender) {
                    //calculate hero match score
                    var heroScore = calculateHeroScore(parseInt(heroInt), parseInt(heroStr), parseInt(heroSpd), parseInt(heroDur), parseInt(heroPow), parseInt(heroCmb));

                    //Step2: store hero score and ID in an Array
                    heroScores.push(heroScore);
                }//if
            }//for
            for(var j = 0; j < heroScores.length; j++)
            {
                //console.log("HEROSCORESARRAY = "+j+" "+heroScores[j]);
            }
            //console.log('Hero Scores ' + i + ' = ' + heroScores);
            /*************************************************************
             *Step3:traverse hero array and find index with highest score
            **************************************************************/
            var maxScore = Math.max.apply(null, heroScores);
            //console.log("MAX SCORE = "+maxScore);
            var maxScoreIndex = heroScores.indexOf(maxScore);
            /********************************************************
             * STEP4: INCREMENT INDEX VALUE TO GET HERO ID
             ********************************************************/
            //console.log("MAXSCOREINDEX = "+maxScoreIndex);//return -1 not found
            heroMatchId = maxScoreIndex + 1;
            //console.log("Hero Match ID = " + heroMatchId);
            var heroSearchId = heroMatchId;

            /*********************************************
             * Handle error if no match is found:
             **********************************************/
            if (heroSearchId == 0 && userGender === 'male')
            {
                heroSearchId = defaultMaleHeroId; //BattleStar
            }
            else if (heroSearchId == 0 && userGender == 'female')
            {
                heroSearchId = defaultFemaleHeroId;//Black Canary
            }
            /********************************************************
             * Step5: pull Hero data from Super SuperHeroAPI
             *********************************************************/
            //10/07/2018
            /*****************************************/
             pullHeroData(heroSearchId);
            /* ***************************************/
            //console.log("Super Hero Search ID"+heroSearchId);

            //Step6: Store in firebase db occurs in pullHeroData
    }
    /*******************************************************/
    function calculateHeroScore(heroIntRef, heroStrRef, heroSpdRef, heroDurRef, heroPowRef, heroCmbRef) {
        //init scores
        var heroIntScore = 0;
        var heroStrScore = 0;
        var heroSpdScore = 0;
        var heroDurScore = 0;
        var heroPowScore = 0;
        var heroCmbScore = 0;

        //get difference in scors
        var intDif = userIntInput - heroIntRef;

        //get value with scoreRange
        var intDifAbs = Math.abs(intDif);
        if (intDifAbs >= 0 && intDifAbs <= scoreRange) {
            heroIntScore = returnScore(intDif);
        }

        var strDif = userStrInput - heroStrRef;
        var strDifAbs = Math.abs(strDif);
        if (strDifAbs >= 0 && strDifAbs <= scoreRange) {
            heroStrScore = returnScore(strDif);
        }

        var spdDif = userSpdInput - heroSpdRef;
        var spdDifAbs = Math.abs(spdDif);
        if (spdDifAbs >= 0 && spdDifAbs <= scoreRange) {
            heroSpdScore = returnScore(spdDif);
        }

        var durDif = userDurInput - heroDurRef;
        var durDifAbs = Math.abs(durDif);
        if (durDifAbs >= 0 && durDifAbs <= scoreRange) {
            heroDurScore = returnScore(durDif);
        }

        var powDif = userPowInput - heroPowRef;
        var powDifAbs = Math.abs(powDif);
        if (powDifAbs >= 0 && powDifAbs <= scoreRange) {
            heroPowScore = returnScore(powDif);
        }

        var cmbDif = userCmbInput - heroCmbRef;
        var cmbDifAbs = Math.abs(cmbDif);
        if (cmbDifAbs >= 0 && cmbDifAbs <= scoreRange) {
            heroCmbScore = returnScore(cmbDif);
        }

        //calculate total
        var heroTotalScore = heroStrScore + heroSpdScore + heroDurScore + heroPowScore + heroCmbScore;
        return heroTotalScore;

    }

    //return pts if value in range
    function returnScore(dif) {
        var lowRange = false;//user value less than hero value
        var lowRangePts = 2;
        var highRange = false;//user value greater than hero value
        var highRangePts = 1;
        var bullsEye = false;//user value equal hero value
        var bullsEyePts = 3;

        var returnScore = 0;//value to return

        if (dif < 0) lowRange = true;
        else if (dif > 0) highRange = true;
        else if (dif === 0) bullsEye = true;

        if (bullsEye) returnScore = bullsEyePts;
        else if (lowRange) returnScore = lowRangePts;
        else if (highRange) returnScore = highRangePts;

        return returnScore;
    }
    /*******************************************************/
    //Only necessary to fullfill requirements:
    function pullHeroData(heroSearchId) {
        //console.log("Hero Search ID =" +heroSearchId);
        // Here we are building the URL we need to query the database
        var queryById = cors + "http://superheroapi.com/api/" + accessToken + "/" + heroSearchId;
        $.ajax({
            url: queryById,
            //url: query,
            method: "GET"
        }).then(function (response) {

            // Create CODE HERE to log the resulting object
            
            //console.log(response);
            heroMatchName = response.name;
            //console.log("Matching Hero Name = " + heroMatchName);
            heroMatchPhoto = response.image.url;
            heroMatchInt = response.powerstats.intelligence;
            heroMatchStr = response.powerstats.strength;
            heroMatchSpd = response.powerstats.speed;
            heroMatchDur = response.powerstats.durability;
            heroMatchPow = response.powerstats.power;
            heroMatchCmb = response.powerstats.combat;

            //Step6: Store in firebase db
            //10/08/2018
            /******************************************************/
            storeMatchData()
            /******************************************************/

            // Create CODE HERE to transfer content to HTML            
            /*$(".city").html("<h1>"+response.name+ "Weather Details</h1>");
            $(".wind").text("Wind Speed: " +response.wind.speed);
            $(".humidity").text("Humidity: " +response.main.humidity);
            $(".temp").text("Temperature (F): " +response.main.temp); */

        });//ajax then
    }//pullHeroData

    //Store to Firebase:
    function storeMatchData() {
        database.ref().push({
            userNameDb: userName,
            userAgeDb: userAge,
            userGenderDb: userGender,
            heroMatchNameDb: heroMatchName,
            heroMatchPhotoDb: heroMatchPhoto,
            heroMatchIntDb: heroMatchInt,
            heroMatchStrDb: heroMatchStr,
            heroMatchSpdDb: heroMatchSpd,
            heroMatchDurDb: heroMatchDur,
            heroMatchPowDb: heroMatchPow,
            heroMatchCmbDb: heroMatchCmb
        });//database Push
        //console.log("Completed StoreMatchData");
    }//StoreMatchData
});