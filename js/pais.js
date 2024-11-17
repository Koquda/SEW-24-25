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

class Meteo {

	constructor() {
		this.apikey = "<apiKey>";
		this.latitud = "14.764861"
		this.longitud = "47.219963"
		this.tipo = "&mode=xml";
		this.unidades = "&units=metric";
		this.url = "https://api.openweathermap.org/data/2.5/forecast?lon=" + this.longitud + "&lat=" + this.latitud + this.tipo + this.unidades + "&APPID=" + this.apikey
		this.correcto = "¡Todo correcto! XML recibido de <a href='http://openweathermap.org/'>OpenWeatherMap</a>"
	}

	getMeteo() {
		$.ajax({
			dataType: "xml",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				// Select the forecast root element
				var forecast = $('forecast', datos);
				var forecastList = []

				// Iterate over each time element within forecast
				forecast.find('time').each(function() {
					// Get the attributes of each time element
					var day = $(this).attr('from').split('T')[0];
					var maxTemp = $(this).find('temperature').attr('max');
					var minTemp = $(this).find('temperature').attr('min');
					var humidity = $(this).find('humidity').attr('value');
					var icon = "https://openweathermap.org/img/wn/" + $(this).find('symbol').attr('var') + "@2x.png"

					// Check if there's already an element with the same day in the list
					var existingForecast = forecastList.find(function(forecast) {
						return forecast.day === day;
					});

					// If no existing forecast for this day, add it to the list
					if (!existingForecast && forecastList.length < 5) {
						let weather = new Forecast(day, maxTemp, minTemp, humidity, icon)
						forecastList.push(weather);

						const article = document.createElement('article')

						const dayHeader = document.createElement('h3')
						dayHeader.textContent = weather.day

						const img = document.createElement('img')
						img.src = weather.icon
						img.alt = "Icono del tiempo"

						const maxTempText = document.createElement('p')
						maxTempText.textContent = "Temperatura máxima:" + weather.maxTemp
						const minTempText = document.createElement('p')
						minTempText.textContent = "Temperatura mínima:" + weather.minTemp
						const humidityText = document.createElement('p')
						humidityText.textContent = "Porcentaje de humedad:" + weather.humidity

						article.append(dayHeader)
						article.append(img)
						article.append(maxTempText)
						article.append(minTempText)
						article.append(humidityText)
						$('main').append(article)
					}
				})
			},
			error: function() {
				console.log(this.url)
			}
		})
	}
}

class Forecast {
	constructor(day, maxTemp, minTemp, humidity, icon) {
		this.day = day
		this.maxTemp = maxTemp
		this.minTemp = minTemp
		this.humidity = humidity
		this.icon = icon
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
		// porque no deberia hacer fata el timeout
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

	new Meteo().getMeteo()

});

