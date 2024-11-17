"use strict"

class Memoria {
	// El objeto elements es un objecto JSON
	elements = {
		tarjetas: [
			{
				element: "RedBull",
				source: "./multimedia/imagenes/Red_Bull_Racing_logo.svg",
			},
			{
				element: "RedBull",
				source: "./multimedia/imagenes/Red_Bull_Racing_logo.svg",
			},
			{
				element: "McLaren",
				source: "./multimedia/imagenes/McLaren_Racing_logo.svg",
			},
			{
				element: "McLaren",
				source: "./multimedia/imagenes/McLaren_Racing_logo.svg",
			},
			{
				element: "Alpine",
				source: "./multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg",
			},
			{
				element: "Alpine",
				source: "./multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg",
			},
			{
				element: "AstonMartin",
				source: "./multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg",
			},
			{
				element: "AstonMartin",
				source: "./multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg",
			},
			{
				element: "Ferrari",
				source: "./multimedia/imagenes/Scuderia_Ferrari_Logo.svg",
			},
			{
				element: "Ferrari",
				source: "./multimedia/imagenes/Scuderia_Ferrari_Logo.svg",
			},
			{
				element: "Mercedes",
				source: "./multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg",
			},
			{
				element: "Mercedes",
				source: "./multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg",
			}
		]
	}

	constructor() {
		this.hasFlippedCard = false
		this.lockboard = false
		this.firstCard = null
		this.secondCard = null
		this.shuffleElements()
		this.createElements();
		this.addEventListeners()
	}

	shuffleElements() {
		const tarjetas = this.elements.tarjetas;
		for (let i = tarjetas.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[tarjetas[i], tarjetas[j]] = [tarjetas[j], tarjetas[i]];
		}
	}
	unflipCards(card1, card2) {
		this.lockboard = true

		card1.removeAttribute('data-state')
		card2.removeAttribute('data-state')

		setTimeout(this.resetBoard.bind(this), 100)
	}

	resetBoard() {
		this.firstCard = null
		this.secondCard = null
		this.hasFlippedCard = false
		this.lockboard = false
	}

	checkForMatch(card1, card2) {
		const card1Name = card1.getAttribute('data-element')
		const card2Name = card2.getAttribute('data-element')

		card1Name === card2Name ? this.disableCards(card1, card2) : this.unflipCards(card1, card2)
	}

	disableCards(card1, card2) {
		card1.setAttribute('data-state', 'revealed');
		card2.setAttribute('data-state', 'revealed');
		this.resetBoard()
	}

	createElements() {
		const section = document.querySelector('section');

		this.elements.tarjetas.forEach(tarjeta => {
			const article = document.createElement('article');
			article.setAttribute('data-element', tarjeta.element);

			const h3 = document.createElement('h3');
			h3.textContent = 'Tarjeta de memoria';

			const img = document.createElement('img');
			img.src = tarjeta.source;
			img.alt = tarjeta.element;

			article.appendChild(h3);
			article.appendChild(img);

			section.appendChild(article);
		});
	}

	addEventListeners() {
		const articles = document.querySelectorAll('article')

		articles.forEach(article => {
			article.onclick = this.flipCard.bind(article, this)
		})
	}

	flipCard(game) {
		console.log(this.getAttribute('data-element'))
		// Comprobación 1: Si la tarjeta ya está revelada, no hacer nada
		if (this.getAttribute('data-state') === 'revealed') {
			return;
		}

		// Comprobación 2: Si el tablero está bloqueado, no hacer nada
		if (game.lockboard) {
			return;
		}

		// Comprobación 3: Si esta tarjeta es la misma que la primera carta volteada, no hacer nada
		if (this === game.firstCard) {
			return;
		}

		// Voltear la tarjeta
		this.setAttribute('data-state', 'flip');

		if (!game.hasFlippedCard) {
			// Primera tarjeta volteada
			game.hasFlippedCard = true;
			game.firstCard = this;
		} else {
			// Segunda tarjeta volteada
			game.secondCard = this;
			setTimeout(() => {
				game.checkForMatch(game.firstCard, game.secondCard);
			}, 1000)
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new Memoria();
});
