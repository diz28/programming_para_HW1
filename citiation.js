class Publication {
	title;
	author;
	year = new Date().getYear();

	constructor(title, author, year) {
		if (!title || !author || !year) {
			throw new Error(
				"I need an author, title and year  to create a publication"
			);
		}
		this.title = title;
		this.author = author;
		this.year = year !== undefined ? year : this.year;
	}

	isPublication() {
		return (
			this.title !== undefined &&
			this.author !== undefined &&
			this.getYear !== undefined
		);
	}
}

class Book extends Publication {
	publisher;

	constructor(title, author, year, publisher) {
		if (!publisher) {
			throw new Error("I need a publisher to create a book");
		}

		super(title, author, year);

		this.publisher = publisher;
	}

	isBook() {
		return this.isPublication() && this.publisher !== undefined;
	}

	citeAPA() {
		return `${this.author} (${this.year}). ${this.title}. ${this.publisher}`;
	}

	citeMLA() {
		return `${this.author}. ${this.title}. ${this.year}`;
	}
}

class Paper extends Publication {
	journal;
	volume;

	constructor(title, author, year, journal, volume) {
		if (!journal || !volume) {
			throw new Error("I need an journal and volumen to create a paper.");
		}

		super(title, author, year);
		this.journal = journal;
		this.volume = volume;
	}

	isPaper() {
		if (
			this.isPublication() &&
			this.journal !== undefined &&
			this.volume !== undefined
		) {
			return true;
		} else {
			return false;
		}
	}

	citeAPA() {
		return `${this.author} (${this.year}). ${this.title}. ${this.journal} : ${this.volume}`;
	}

	citeMLA() {
		return `${this.author}. ${this.title}. ${this.year}`;
	}
}

class Web extends Publication {
	url;
	date;

	constructor(title, author, year, url, date) {
		if (!url || !date) {
			throw new Error("I need an url and date to create a paper.");
		}

		super(title, author, year);
		this.url = url;
		this.date = date;
	}

	isPaper() {
		if (
			this.isPublication() &&
			this.url !== undefined &&
			this.date !== undefined
		) {
			return true;
		} else {
			return false;
		}
	}

	citeAPA() {
		return `${this.title}. Retrieved ${this.date}, from ${this.url}`;
	}

	citeMLA() {
		return `"${this.title}." Web. ${this.date} <${this.url}>.`;
	}
}

class Movie extends Publication {
	company;

	constructor(title, author, year, company) {
		if (!company) {
			throw new Error("I need an url and date to create a paper.");
		}

		super(title, author, year);
		this.company = company;
	}

	isMovie() {
		if (this.isPublication() && this.company !== undefined) {
			return true;
		} else {
			return false;
		}
	}

	citeAPA() {
		return `${this.author}. (Director). (${this.year}). ${this.title}[Film]. ${this.company}.`;
	}

	citeMLA() {
		return `${this.title}. Directed by ${this.author}, ${this.company}, ${this.year}.`;
	}
}

class PublicationManager {
	publications = [];

	addPaper(title, author, year, journal, volume) {
		this.publications.push(new Paper(title, author, year, journal, volume));
	}

	addBook(title, author, year, publisher) {
		this.publications.push(new Book(title, author, year, publisher));
	}

	addWeb(title, author, year, url, date) {
		this.publications.push(new Web(title, author, year, url, date));
	}

	addMovie(title, author, year, company) {
		this.publications.push(new Movie(title, author, year, company));
	}

	printCitations(type) {
		for (let pub of this.publications) {
			if (type === "APA") {
				console.log(pub.citeAPA());
			} else {
				console.log(pub.citeMLA());
			}
		}
	}

	removePub(title) {
		const values = this.publications
			.map((object) => object.title)
			.indexOf(title);
		this.publications.splice(values, 1);
	}
}

const pubManager = new PublicationManager();

pubManager.addPaper("JMsolutions", "Keihls", 2022, "People", 21);
pubManager.addPaper("Wrtier's Tears", "La Prairie", 2019, "Vogea", 45);

pubManager.addBook("Sun is still rising", "WenJiang", 2005, "BigFour");
pubManager.addBook("Martin Magelia", "Martin Margiel", 2011, "Fashion");

pubManager.addWeb("github", "Di", 2020, "github.com", 2022.2);
pubManager.addWeb("Weibo", "Bella", 2021, "weibo.com", 2001.3);

pubManager.addMovie("Mimosa", "Belle", 2022, "Santa Claus House");
pubManager.addMovie("La Mer", "Allan deSouza", 2019, "S.Hernshiem Bros");

pubManager.printCitations("APA");

console.log("------------------------------------------");

const pubTitle = "Weibo";
//enter the title of the citation, user wants to delete.
pubManager.removePub(pubTitle);
console.log("after " + pubTitle + " been removed.");

pubManager.printCitations("APA");
