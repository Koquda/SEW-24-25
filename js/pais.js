"use strict"

class Country {

	constructor(countryName, capitalName, population) {
		this.countryName = countryName
		this.capitalName = capitalName
		this.population = population
	}

	populateData(circuitName, governmentForm, latitude, longitude, altitude, religion) {
		this.circuitName = circuitName
		this.governmentForm = governmentForm
		this.finishLineCoords = {
			latitude: latitude,
			longitude: longitude,
			altitude: altitude
		}
		this.religion = religion
	}

	getPais() {
		return this.countryName
	}

	getCapital() {
		return this.capitalName
	}

	secondaryData() {
		return `
		<ul>
			<li>Nombre del circuito: ${this.circuitName}</li>
			<li>Población: ${this.population}</li>
			<li>Forma de gobierno: ${this.governmentForm}</li>
			<li>Religión mayoritaria: ${this.religion}</li>
		</ul>`
	}

	writeCoordinates() {
		document.write(`
			<h3>Coordenadas de la línea de meta:</h3>
			<ul>
				<li>Latitud: ${this.finishLineCoords.latitude}</li>
				<li>Longitud: ${this.finishLineCoords.longitude}</li>
				<li>Altitud: ${this.finishLineCoords.altitude} metros</li>
			</ul>
		`);
	}
}

var country = new Country("Austria", "Viena", "9,132 millones")
country.populateData("Red Bull Ring", "Republica", "14.764861", "47.219963", "677", "Cristianismo")


document.addEventListener('DOMContentLoaded', function() {

	var h2Element = document.querySelector('h2');

	if (h2Element) {
		// Create a section to hold all country information
		var countryInfoSection = document.createElement('section');
		countryInfoSection.innerHTML = `
		<h3>Información del País</h3>
		<ul>
			<li>País: ${country.getPais()}</li>
			<li>Capital: ${country.getCapital()}</li>
			<li>Población: ${country.population}</li>
			<li>Nombre del circuito: ${country.circuitName}</li>
			<li>Forma de gobierno: ${country.governmentForm}</li>
			<li>Religión mayoritaria: ${country.religion}</li>
		</ul>`;

		// Insert the country information section after the h2 element
		h2Element.insertAdjacentElement('afterend', countryInfoSection);

		// TODO: revisar esta parte, no tengo claro que me guste
		// Create a placeholder for coordinates
		var coordinatesPlaceholder = document.createElement('section');
		countryInfoSection.appendChild(coordinatesPlaceholder);

		// Use a timeout to ensure the DOM is updated before using document.write
		setTimeout(function() {
			// Temporarily replace document.write
			var oldWrite = document.write;
			document.write = function(content) {
				coordinatesPlaceholder.innerHTML = content;
			};

			// Call writeCoordinates
			country.writeCoordinates();

			// Restore original document.write
			document.write = oldWrite;
		}, 0);
	}
});

