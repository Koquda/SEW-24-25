"use strict"

class Semaforo {
	levels = [0.2, 0.5, 0.8]
	lights = 4
	unload_moment = null
	click_moment = null
	difficulty = null

	constructor() {
		const idx = Math.floor(Math.random() * 3)
		this.difficulty = this.levels[idx]
		this.createStructure()
	}

	createStructure() {
		const main = document.querySelector('main');

		const h2 = document.createElement('h2');
		h2.textContent = 'Semáforo';
		main.appendChild(h2)


		for (let i = 0; i < this.lights; i++) {
			const div = document.createElement('div')
			main.appendChild(div)
		}

		const startBtn = document.createElement('button')
		startBtn.textContent = 'Arrancar'
		startBtn.onclick = this.initSequence.bind(this)
		main.appendChild(startBtn)

		const reactionTimeBtn = document.createElement('button')
		reactionTimeBtn.textContent = 'Reacción'
		reactionTimeBtn.disabled = true
		main.appendChild(reactionTimeBtn)

	}

	initSequence() {
		const main = document.querySelector('main');
		main.classList.add('load')

		const timeoutTime = 2000 + this.difficulty * 100

		setTimeout(() => {

			this.unload_moment = new Date()
			this.endSequence()

		}, timeoutTime)
	}

	endSequence() {
		// Deshabilitamos boton de arranque
		const startBtn = document.querySelectorAll('button')[0]
		startBtn.disabled = true
		// Habilitamos boton de click
		const reactionBtn = document.querySelectorAll('button')[1]
		reactionBtn.disabled = false
		reactionBtn.onclick = this.stopReaction.bind(this)

		// Quitamos animacion semaforo
		const main = document.querySelector('main');
		main.classList.add('unload')
	}

	stopReaction() {
		this.click_moment = new Date()

		const reactionTime = this.click_moment.getTime() - this.unload_moment.getTime()

		const main = document.querySelector('main');

		// Crear el parrafo
		const parrafo = document.createElement('p')
		parrafo.textContent = 'Tiempo de reacción: ' + reactionTime

		main.appendChild(parrafo)
		main.classList.remove('load')
		main.classList.remove('unload')

		const startBtn = document.querySelectorAll('button')[0]
		startBtn.disabled = false
		const reactionBtn = document.querySelectorAll('button')[1]
		reactionBtn.disabled = true

	}

}

document.addEventListener('DOMContentLoaded', () => {
	new Semaforo();
});
