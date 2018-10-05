


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