"use strict"

class Noticias {

	constructor() {
		// TODO: ver que hacer con esto, como mostrar si hay un error y como dejarlo
		window.File && window.FileReader && window.FileList && window.Blob ?
			document.write("<p>Este navegador soporta el API File </p>")
			: document.write("<p> Este navegador NO soporta el API File y este programa puede no funcionar correctamente</p>")
	}

	/**
	 * Creates an article element with the given content.
	 * @param {string} title - The title of the article.
	 * @param {string} entrance - The main content of the article.
	 * @param {string} author - The author of the article.
	 * @returns {HTMLElement} - The created article element.
	 */
	createArticle(title, entrance, author) {
		const article = document.createElement('article');
		const h3 = document.createElement('h3');
		h3.textContent = title;
		const p1 = document.createElement('p');
		p1.textContent = entrance;
		const p2 = document.createElement('p');
		p2.textContent = author;

		article.appendChild(h3);
		article.appendChild(p1);
		article.appendChild(p2);
		return article;
	}

	readInputFile(files) {
		const file = files[0];
		const lector = new FileReader();
		lector.onload = () => {
			lector.result.split('\n').forEach(line => {
				const splitLine = line.split('_');
				const article = this.createArticle(splitLine[0], splitLine[1], splitLine[2]);
				$('body').append(article);
			});
		}
		lector.readAsText(file);
	}

	addNoticia(event) {
		event.preventDefault();

		const title = $('input[name="title"]').val();
		const entrance = $('input[name="entrance"]').val();
		const author = $('input[name="author"]').val();

		const article = this.createArticle(title, entrance, author);
		$('body').append(article);
	}

}

let noticias = new Noticias();
