'use strict';

var radars = new RADARS({
	defaultLang: null,
	debug: false
});
radars.loadPack();
var places = radars.places();

var gps = new GPS({
	timeout: 1000,
	debug: false
});
gps.start();

var geo = new GEO();

var face = new FACES();


var loop = function(lat, lon) {
	var nearDist = 65535;
	var nearPlace = undefined;

	for (var p = 0; p < places.length; p++) {
		var place = places[p];

		var dist = geo.get(place.latitude, place.longitude, lat, lon);

		if (dist < nearDist) {
			nearDist = Math.round(dist * 100) / 100;
			nearPlace = place;
		};
	}

	return {
		dist: nearDist,
		place: nearPlace
	};

};



var res;
var intervalID = setInterval(function()   {
	res = loop(gps.data.coords.latitude, gps.data.coords.longitude);

	var mood;
	if (res.dist > 1) {
		document.getElementById('mood').innerHTML = face.get('happy');
	} else {
		document.getElementById('mood').innerHTML = face.get('angry');
	}

	document.getElementById('msg').innerHTML = "at " + res.dist + "km";

	document.getElementById('object').innerHTML = "Speed Camera";

	document.getElementById('DEBUG').innerHTML = "YOUR HEADING: " + (Math.round(gps.data.coords.heading * 1000) / 1000) + " <br/>PLACE HEADING: " + (Math.round(res.place.heading * 1000) / 1000) +
		"<br/><hr/>YOUR POS: " + gps.data.metric.longitude + " : " + gps.data.metric.latitude + "<br/>PLACE POS: " + res.place.metric.longitude + " : " + res.place.metric.latitude;

	draw();

}, 1000);


init();
