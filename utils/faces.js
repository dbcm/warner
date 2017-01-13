// http://weknowmemes.com/2014/04/108-awesome-ascii-emoticons/
(function(root) {
	"use strict";

	var face = {
		'meh': '¯\_(ツ)_/¯',
		'angry': '(⋟﹏⋞)',
		'happy': '⎦˚◡˚⎣'
	};

	var FACES = function(options) {
		this.init(options);
	};

	FACES.prototype.init = function(options) {
		this._VERSION = 0.1;

		options = options || {};

		this.debug = options.debug;
	};


	FACES.prototype.get = function(mood) {
		var self = this;

		return face[mood];
	};

	root.FACES = FACES;
})(this);
