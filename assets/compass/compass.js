// https: //github.com/rheh/HTML5-canvas-projects


// Global variable
var img = null,
	needleGreen = null,
	needleRed = null,
	ctx = null,
	degrees = 0;

function clearCanvas() {
	// clear canvas
	ctx.clearRect(0, 0, 400, 400);
}

function draw() {

	clearCanvas();

	// Draw the compass onto the canvas
	ctx.drawImage(img, 0, 0);

	// Save the current drawing state
	ctx.save();

	// Now move across and down half the 
	ctx.translate(200, 200);

	// Rotate around this point
	ctx.rotate(gps.data.coords.heading * (Math.PI / 180));

	// Draw the image back and up
	ctx.drawImage(needleGreen, -200, -200);

	// Rotate around this point
	ctx.rotate(-gps.data.coords.heading * (Math.PI / 180));
	ctx.rotate(res.place.heading * (Math.PI / 180));

	// Draw the image back and up
	ctx.drawImage(needleRed, -200, -200);

	// Restore the previous drawing state
	ctx.restore();

	// Increment the angle of the needle by 5 degrees
	degrees += 5;

	//document.getElementById('DEBUG').innerHTML = "GPS HEADING: " + Math.round(gps.data.coords.heading * 1000) / 1000 + " HEADING: " + Math.round(res.place.heading * 1000 ) / 1000;
}

function imgLoaded() {
	// Image loaded event complete.  Start the timer
	//setInterval(draw, 100);
}

function init() {
	// Grab the compass element
	var canvas = document.getElementById('compass');

	// Canvas supported?
	if (canvas.getContext('2d')) {
		ctx = canvas.getContext('2d');

		// Load the needle image
		needleGreen = new Image();
		needleGreen.src = 'assets/compass/needleGreen.png';
		needleRed = new Image();
		needleRed.src = 'assets/compass/needleRed.png';

		// Load the compass image
		img = new Image();
		img.src = 'assets/compass/compass.png';
		img.onload = imgLoaded;
	} else {
		alert("Canvas not supported!");
	}
}
