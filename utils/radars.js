(function(root) {
	"use strict";

	var RADARS = function(options) {
		this.init(options);
	};

	RADARS.prototype.init = function(options) {
		this.defaultLang = undefined;

		this._VERSION = 0.1;

		options = options || {};

		this.defaultLang = options.defaultLang || 'en';
		this.debug = options.debug;
	};

	RADARS.prototype.loadPack = function(options) {
		var self = this;

		self._places = [];

		var client = new XMLHttpRequest();
		client.open('GET', 'assets/kml/radars.kml', false);
		client.onreadystatechange = function() {
			if (client.readyState === 4 && (client.status >= 200 && client.status < 300) || client.status === 0) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(client.responseText, "text/xml");
				self._kml = xmlDoc;

				var places = xmlDoc.getElementsByTagName("Placemark");

				for (var p = 0; p < places.length; p++) {
					var place = places[p];
					var arr = {};
					arr.name = place.getElementsByTagName('name')[0].innerHTML;
					var itemPlace = place.childNodes;
					for (var y = 0; y < itemPlace.length; y++) {
						var itemNode = itemPlace[y];
						try {
							arr.longitude = itemNode.getElementsByTagName('longitude')[0].innerHTML;
							arr.latitude = itemNode.getElementsByTagName('latitude')[0].innerHTML;
							arr.heading = itemNode.getElementsByTagName('heading')[0].innerHTML;
							arr.metric = {};
							[arr.metric.longitude, arr.metric.latitude] = proj4('EPSG:4326', 'EPSG:3857', [arr.longitude, arr.latitude]);
						} catch (err) {
							continue
						};
						self._places.push(arr);
					}
				}
				if (self.debug)
					console.log(self._places);
			}
		}
		client.send(null);
	};

	RADARS.prototype.places = function(lat, lon) {
		var self = this;

		return self._places;
	}

	root.RADARS = RADARS;
})(this);
