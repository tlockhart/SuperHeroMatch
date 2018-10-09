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