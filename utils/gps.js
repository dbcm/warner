(function(root) {
	"use strict";

	var GPS = function(options) {
		this.init(options);
	};

	GPS.prototype.init = function(options) {
		this._VERSION = 0.1;

		options = options || {};

		this.timeout = options.timeout || '500';
		this.debug = options.debug;

		this.data = {};
	};


	GPS.prototype.start = function() {
		var self = this;

		var success = function(location) {
			self.data = location;

			self.data.metric = {};
			[self.data.metric.longitude, self.data.metric.latitude] = proj4('EPSG:4326', 'EPSG:3857', [location.coords.longitude, location.coords.latitude]);


			if (self.debug)
				console.log('GPS DATA ' + location);
		};

		var error = function(err) {
			if (self.debug)
				console.log('GPS ERROR(' + err.code + '): ' + err.message);
		};

		self._id = navigator.geolocation.watchPosition(success, error, {
			maximumAge: 0,
			timeout: self.timeout,
			enableHighAccuracy: true
		});
		if (self.debug)
			console.log("Starting GPS with ID:" + self._id);
	};

	root.GPS = GPS;
})(this);
