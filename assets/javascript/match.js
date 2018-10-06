$(document).ready(function () {

    // This is our API key. Add your own API key between the ""
    var accessToken = "2622992407714821";
    var heroSearchId = "0";
    var cors = "https://cors-anywhere.herokuapp.com/";
    var userName, userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput;
    var userGender = 'male';
    var userAge = 17;
    var heroScores = [];

    var heroMatchName, heroMatchPhoto, heroMatchInt, heroMatchStr, heroMatchSpd, heroMatchDur, heroMatchPow, heroMatchCmb;


    //widen score range if no hero found
    /*************************************/
    var scoreRange = 5;
    var testResponseLength = 10; //test data, change in prod
    /*************************************/

    /********************************************************/
    //if no herMatchId is found it will return the first one in the list
    /********************************************************/
    var heroMatchId = 0;
    /********************************************************/
    //database reference

    //Step2: Create a variable to reference the database
    var database = firebase.database();

    //enable submit-survey button
    $('#submit-survey').prop('disabled', false);

    $('#submit-survey').on('click', function (event) {
        // Don't refresh the page!
        event.preventDefault();

        // Create CODE HERE to Log the slider values
        userName = $('#name-input').val();
        console.log("Value 0 = " + userName);

        $('#int-value').html($('#int-input').val());
        userIntInput = parseInt($('#int-input').val());
        console.log("Value 1 = " + userIntInput);

        $('#str-value').html($('#str-input').val());
        userStrInput = parseInt($('#str-input').val());
        console.log("Value 2 = " + userStrInput);

        $('#spd-value').html($('#spd-input').val());
        userSpdInput = parseInt($('#spd-input').val());
        console.log("Value 3 = " + userSpdInput);

        $('#dur-value').html($('#dur-input').val());
        userDurInput = parseInt($('#dur-input').val());
        console.log("Value 4 = " + userDurInput);

        $('#pow-value').html($('#pow-input').val());
        userPowInput = parseInt($('#pow-input').val());
        console.log("Value 5 = " + userPowInput);

        $('#cmb-value').html($('#cmb-input').val());
        userCmbInput = parseInt($('#cmb-input').val());
        console.log("Value 6 = " + userCmbInput);

        //disable button
        $('#submit-survey').prop('disabled', true);

        //load Hero data and find matching hero id:
        loadHeroData();

        //update display:
        //updateDisplay()

    });//submit button

    // We then created an AJAX call
    /*******************************************************/
    function loadHeroData(callback) {
        $.ajax({
            type: 'GET',
            url: 'assets/data/heros.json', // js is lowercase!
            dataType: 'json'
            /*success: function(data) {
              console.log('success',data);*/
        }).then(function (response) {
            console.log(response);
            /*var id = response[0].id;
            console.log("ID = "+id);
            id = response[102].id;
            console.log("ID = "+id);
            var heroGender = response[0].appearance.gender.toLowerCase();
            var heroID = reponse[].id;*/

            //loop through hero data

            for (var i = 0; i < /*response.length*/testResponseLength; i++) {
                var heroGender = response[i].appearance.gender.toLowerCase();
                console.log("Hero gender = " + heroGender);

                var heroId = response[i].id;
                console.log("Hero ID = " + heroId);

                var heroGender = response[i].appearance.gender.toLowerCase();
                var heroInt = response[i].powerstats.intelligence;
                console.log("Hero Intelligence = " + heroInt);
                var heroStr = response[i].powerstats.strength;
                console.log("Hero Strength = " + heroStr);
                var heroSpd = response[i].powerstats.speed;
                console.log("Hero Speed = " + heroSpd);
                var heroDur = response[i].powerstats.durability;
                console.log("Hero Durability = " + heroDur);
                var heroPow = response[i].powerstats.power;
                console.log("Hero Power = " + heroPow);
                var heroCmb = response[i].powerstats.combat;
                console.log("Hero Combat = " + heroCmb);

                console.log("Hero Gender = " + heroGender);
                if (userGender === heroGender) {
                    //calculate hero match score
                    var heroScore = calculateHeroScore(parseInt(heroInt), parseInt(heroStr), parseInt(heroSpd), parseInt(heroDur), parseInt(heroPow), parseInt(heroCmb));

                    //Step2: store hero score and ID in an Array
                    heroScores.push(heroScore);


                    // var userMatch = returnHeroMatchID();
                }//if
            }//for
            //for(var i = 0; i < heroScores.length; i++)
            //{
            console.log('Hero Scores ' + i + ' = ' + heroScores);
            /*************************************************************
             *Step3:traverse hero array and find index with highest score
            **************************************************************/
            var maxScore = Math.max.apply(null, heroScores);
            var maxScoreIndex = heroScores.indexOf(maxScore);
            /********************************************************
             * STEP4: INCREMENT INDEX VALUE TO GET HERO ID
             ********************************************************/
            heroMatchId = maxScoreIndex + 1;
            console.log("Hero Match ID = " + heroMatchId);
            heroSearchId = heroMatchId;
            /********************************************************
             * Step5: pull Hero data
             *********************************************************/
            pullHeroData();

            //Step6: Store in firebase db occurs in pullHeroData
            //Step7: After hero Data is pulled update display:
            //To be handled in Results
            /*updateDisplay();*/

        });
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
        //console.log('Hero Score = '+heroTotalScore);
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
    function pullHeroData() {
        // Here we are building the URL we need to query the database
        var queryById = cors + "http://superheroapi.com/api/" + accessToken + "/" + heroSearchId;
        $.ajax({
            url: queryById,
            //url: query,
            method: "GET"
        }).then(function (response) {

            //console.log("The queryURL = "+queryURL);
            // Create CODE HERE to log the resulting object
            console.log(response);
            heroMatchName = response.name;
            console.log("Matching Hero Name = " + heroMatchName);
            heroMatchPhoto = response.image.url;
            heroMatchInt = response.powerstats.intelligence;
            heroMatchStr = response.powerstats.strength;
            heroMatchSpd = response.powerstats.speed;
            heroMatchDur = response.powerstats.durability;
            heroMatchPow = response.powerstats.power;
            heroMatchCmb = response.powerstats.combat;

            //Step6: Store in firebase db
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


        /***************************************************
        *START Update TImer
        ****************************************************/
        //Timer variables
        var updateTimerId;
        var updateTimerRunning = false;

        //Step4: Set Global Calculated Variables
        //var arrival = 0; 
        //var minutesAway = 0; 
        //var invalidTimeMsg = "Please enter a valid value."
        // var $displayfirstTimeError = $("#first-time-input").attr('is-error');
        //console.log("**firstTimeError = "+$displayfirstTimeError);

        /*var displayUpdateTimer = {
          timeLimit :60,//60s equal 1 min
          stop: function(){
              // DONE: Use clearInterval to stop the count here and set the clock to not be running.
                  clearInterval(updateTimerId);
                  updateTimerRunning = false;
          },
          start: function(){
              if (!updateTimerRunning) {
                  updateTimerId = setInterval(updateDisplay,  1000 * displayUpdateTimer.timeLimit);
                  updateTimerRunning = true;
              }//if
          }
        }*/

        //Start timer for DB updates
        //displayUpdateTimer.start();
        /**********************************************************/

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
        console.log("Completed StoreMatchData");
    }//StoreMatchData
    //call this once
    function updateDisplay() {
        //Step: Empty out all the Table elements before appending new data
        //$('#results-display').empty();
        /*appendTRElement(
            record.userNameDb, 
            record.userAgeDb, 
            record.userGenderDb, 
            record.heroMatchNameDb, 
            record.heroMatchPhotoDb
          ); */
        console.log("UpdateDisplay: User Name = " + userName + " Age = " + userAge + " Gender = " + userGender + " HeroName = " + heroMatchName + " Photo " + heroMatchPhoto);
    }//updateDisplay
});