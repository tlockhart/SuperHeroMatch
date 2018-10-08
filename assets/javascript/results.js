$(document).ready(function(){

    var database = firebase.database();

    database.ref().on("child_added", function (snapshot) {
        record = snapshot.val();//one record
        console.log("The record = ", record);
      
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

    // Function to create user Match and append to DOM
    function createUserResult(dbRecord) {
        console.log('userMatch', dbRecord);
        
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

        li1.text('Intelligence: ' + heroMatchInt);
        li2.text('Strength: ' + heroMatchStr);
        li3.text('Speed: ' + heroMatchSpd);
        li4.text('Durability: ' + heroMatchDur);
        li5.text('Power: ' + heroMatchPow);
        li6.text('Combat: ' + heroMatchCmb);

        // Append card to DOM
        $('#matched-hero').append(resultsBody);
        resultsBody.append(heroesPicsDiv, matchedStatsDiv);
        matchedStatsDiv.append(ol);
        ol.append(li1, li2, li3, li4, li5, li6);
    }

    // Function to create card and append to DOM
    function createFriendCard(dbRecord) {
        console.log('createCards', dbRecord);
        
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
        $('#friend-results').append(friendsCard);
        friendsCard.append(heroTopImageDiv, cardBody, cardFooter);
        cardBody.append(cardTitle, cardText, ol);
        ol.append(li1, li2, li3, li4, li5, li6);
        cardFooter.append(dateFooter);
    };

    
//var testDate = 'Sep 26 18';
//var relativeDate = moment(testDate).diff(momentcalendar();
//console.log(relativeDate);


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

*/






