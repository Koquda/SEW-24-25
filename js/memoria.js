"use strict"

class Memoria {
	// El objeto elements es un objecto JSON
	elements = {
		tarjetas: [
			{
				element: "RedBull",
				source: "../multimedia/imagenes/Red_Bull_Racing_logo.svg",
			},
			{
				element: "RedBull",
				source: "../multimedia/imagenes/Red_Bull_Racing_logo.svg",
			},
			{
				element: "McLaren",
				source: "../multimedia/imagenes/McLaren_Racing_logo.svg",
			},
			{
				element: "McLaren",
				source: "../multimedia/imagenes/McLaren_Racing_logo.svg",
			},
			{
				element: "Alpine",
				source: "../multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg",
			},
			{
				element: "Alpine",
				source: "../multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg",
			},
			{
				element: "AstonMartin",
				source: "../multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg",
			},
			{
				element: "AstonMartin",
				source: "../multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg",
			},
			{
				element: "Ferrari",
				source: "../multimedia/imagenes/Scuderia_Ferrari_Logo.svg",
			},
			{
				element: "Ferrari",
				source: "../multimedia/imagenes/Scuderia_Ferrari_Logo.svg",
			},
			{
				element: "Mercedes",
				source: "../multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg",
			},
			{
				element: "Mercedes",
				source: "../multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg",
			}
		]
	}

	constructor() {
		this.hasFlippedCard = false
		this.lockboard = false
		this.firstCard = null
		this.secondCard = null
	}

}
