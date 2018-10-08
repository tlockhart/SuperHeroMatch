// Step1:  Initialize Firebase
var config = {
	apiKey: "AIzaSyBwSQPKaSMnZcJiHZs-jiyLOheDUheFx4U",
	authDomain: "hero-79706.firebaseapp.com",
	databaseURL: "https://hero-79706.firebaseio.com",
	projectId: "hero-79706",
	storageBucket: "hero-79706.appspot.com",
	messagingSenderId: "153308607337"
};
firebase.initializeApp(config);
	
$(document).ready(function () {
	// SLIDER EVENTS

	// Slider event for intelligence
	$("#intel-input").on("slideStop", function(slideEvt) {
		$("#intel-value").text(slideEvt.value);
	});

	// Slider event for Strength
	$("#stren-input").on("slideStop", function(slideEvt) {
		$("#stren-value").text(slideEvt.value);
	});

	// Slider event for Speed
	$("#speed-input").on("slideStop", function(slideEvt) {
		$("#speed-value").text(slideEvt.value);
	});

	// Slider event for Durability
	$("#durab-input").on("slideStop", function(slideEvt) {
		$("#durab-value").text(slideEvt.value);
	});

	// Slider event for Power
	$("#power-input").on("slideStop", function(slideEvt) {
		$("#power-value").text(slideEvt.value);
	});

	// Slider event for Combat
	$("#combat-input").on("slideStop", function(slideEvt) {
		$("#combat-value").text(slideEvt.value);
	});
});

// ChartJS function
function createChartJS (userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput) {
	var ctx = $("#canvas")[0].getContext('2d');
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
}

// Function to create user Match and append to DOM
function createUserResult(userName, userIntInput, userStrInput, userSpdInput, userDurInput, userPowInput, userCmbInput, heroMatchName, heroMatchPhoto) {
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
};

