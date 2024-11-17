"use strict"

class Agenda {

	constructor() {
		this.url = "https://api.jolpi.ca/ergast/f1/current/races/"
	}

	getRaces() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				const races = datos.MRData.RaceTable.Races
				const section = document.createElement('section')

				races.forEach(race => {
					const raceName = race.raceName
					const circuit = race.Circuit.circuitName
					const coords = `${race.Circuit.Location.lat}, ${race.Circuit.Location.long}`
					const dateTime = `${race.date} ${race.time}`

					const article = document.createElement('article')

					const nameElement = document.createElement('h3')
					nameElement.textContent = raceName
					article.appendChild(nameElement)

					const circuitElement = document.createElement('p')
					circuitElement.textContent = `Circuito: ${circuit}`
					article.appendChild(circuitElement)

					const coordsElement = document.createElement('p')
					coordsElement.textContent = `Coordenadas: ${coords}`
					article.appendChild(coordsElement)

					const dateTimeElement = document.createElement('p')
					dateTimeElement.textContent = `Fecha y hora: ${dateTime}`
					article.appendChild(dateTimeElement)

					section.appendChild(article)
				})

				$('body').append(section)
			},
		})
	}
}

let agenda = new Agenda()
