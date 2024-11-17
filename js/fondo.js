"use strict"

class Fondo {

	constructor(countryName, capitalName, circuitName) {
		this.countryName = countryName
		this.capitalName = capitalName
		this.circuitName = circuitName
	}

	getCircuitPhoto() {
		var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		$.getJSON(flickrAPI,
			{
				tags: this.circuitName,
				tagmode: "any",
				format: "json"
			})
			.done(function(data) {
				console.log(data.items)
				$('body').css('background-image', 'url(' + data.items[0].media.m + ')');
			})
	}

}

document.addEventListener('DOMContentLoaded', () => {
	let fondo = new Fondo("Austria", "Viena", "Red Bull Ring");
	fondo.getCircuitPhoto()
});
