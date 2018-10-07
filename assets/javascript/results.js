// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwSQPKaSMnZcJiHZs-jiyLOheDUheFx4U",
    authDomain: "hero-79706.firebaseapp.com",
    databaseURL: "https://hero-79706.firebaseio.com",
    projectId: "hero-79706",
    storageBucket: "hero-79706.appspot.com",
    messagingSenderId: "153308607337"
  };
  firebase.initializeApp(config);

$(document).ready(function(){

    var database = firebase.database();

    // This will happen once when the page first loads
    // this is where we will call "createCards(records)"
    database.ref().once("value", function(snapshot){
        var records = snapshot.val();
        console.log('All Records ', records);
        // createCards(records);
        createFriendResults(records);
    });

    database.ref().on("child_added", function (snapshot) {
        record = snapshot.val();//one record
        console.log("The record = ", record);
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
        heroMatchCmb = record.heroMatchCmbDb;*/
        createCard(record);
    });

    // Take individual data record and turn it into a card
    // This way we can append it to the DOM
    function createCard (dbRecord) {
        console.log('createCard', dbRecord);
    }

    // Take multiple records from the database and render them as cards
    // this function should call createCard forEach dbRecord
    // rename to createCards
    function createFriendResults(dbRecords) {
        console.log('createCards', dbRecords);
        // Variables from FireBase
        var playerName = 'Mary';
        var friendHero1 = 'One';
        var friendHero2 = 'Two';
        var friendHero3 = 'Three';
        var friendHero4 = 'Four';
        var friendHero5 = 'Five';
        var dateStamp = moment().format("MMM Do YY"); 
        var heroTopImage = 'assets/images/id1_sample.jpg'

        // From Moment.js
        var date = 'Matched on 10/5/18';

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
        var cardFooter = $('<div>', {class:'card-footer'});
        var dateFooter = $('<small>', {id:'date', class:'text-muted'});

        // Adding data and attributes to card
        cardTitle.attr('friend-name', playerName);
        cardTitle.text(playerName);

        heroTopImageDiv.attr('src', heroTopImage)

        cardText.text('Top Matched Heroes: ');

        li1.text(friendHero1);
        li2.text(friendHero2);
        li3.text(friendHero3);
        li4.text(friendHero4);
        li5.text(friendHero5);

        dateFooter.text(date);

        // Append card to DOM
        $('#friend-results').append(friendsCard);
        friendsCard.append(heroTopImageDiv, cardBody, cardFooter);
        cardBody.append(cardTitle, cardText, ol);
        ol.append(li1, li2, li3, li4, li5);
        cardFooter.append(dateFooter);
    };

createFriendResults ();
createFriendResults ();
createFriendResults ();
createFriendResults ();
createFriendResults ();

//var testDate = 'Sep 26 18';
//var relativeDate = moment(testDate).diff(momentcalendar();
//console.log(relativeDate);

});







