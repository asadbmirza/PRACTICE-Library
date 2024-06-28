class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    getInfo() {
        return this.name + " written by " + this.author + ". It is " + this.pages + " long and has it be read? " + read;
    }
}

class Library {
    #table;
    #body;
    #content;
    #books;
    #newBooks

    constructor() {
        this.#books = [];
        this.#newBooks = 0;
        this.#body = document.querySelector("tbody");
        this.#table = document.querySelector("table");
        this.#content = document.querySelector("body");
    }

    get newBooks() {
        return this.#newBooks;
    }

    addBookToLibrary(book) {
        this.#books.push(book);
        this.#newBooks++;
    }

    displayBooks() {
        for (let i = this.#books.length - this.#newBooks; i < this.#books.length; i++) {
            this.#table.classList.remove("transparent");
            const newRow = document.createElement("tr");
            const name = document.createElement("td");
            const author = document.createElement("td");
            const pages = document.createElement("td");
    
            const read = document.createElement("button");
    
            const rem = document.createElement("td");
            const remBtn = document.createElement("button");
    
            name.textContent = this.#books[i].name;
            author.textContent = this.#books[i].author;
            pages.textContent = this.#books[i].pages;
            remBtn.textContent = "Remove";
    
            if (this.#books[i].read) {
                read.textContent = "Finished";
            }
            else {
                read.textContent = "Unfinished";
            }
    
            newRow.appendChild(name);
            newRow.appendChild(author);
            newRow.appendChild(pages);
            newRow.appendChild(read);
            newRow.appendChild(rem);
            rem.appendChild(remBtn);
            this.#body.appendChild(newRow);
    
            read.addEventListener('click', (event) => {
                if (read.textContent == "Unfinished") {
                    read.textContent = "Finished";
                }
                else {
                    read.textContent = "Unfinished";
                }
            });
    
            remBtn.addEventListener('click', () => {
                this.#body.removeChild(newRow);
            });
        }
        this.#newBooks = 0; 
    }
}

class domHandling {
    static #addBook = document.querySelector("button.addBook");
    static #dialog = document.querySelector("dialog");
    static #closeDialog = document.querySelector("dialog > div > button");
    static #submit = document.querySelector("button#submit");
    static #inputName = document.querySelector("input#name");
    static #inputAuthor = document.querySelector("input#author");
    static #inputPages = document.querySelector("input#pages");
    static #inputRead = document.querySelector("input#read");
    static #lib = new Library();

    static setUpDialog() {
        this.#submit.addEventListener("click", (event) => {
            if (this.#inputName != '' && this.#inputAuthor != '' && this.#inputPages.value != '') {
                this.#lib.addBookToLibrary(new Book(this.#inputName.value, this.#inputAuthor.value, this.#inputPages.value, this.#inputRead.checked));
                this.#inputName.value = '';
                this.#inputAuthor.value = '';
                this.#inputPages.value = '';
                this.#inputRead.checked = false;
                this.#lib.displayBooks();

                this.#dialog.close();
                event.preventDefault();
            }
        });



        this.#addBook.addEventListener('click', () => {
            this.#dialog.showModal();
        });
        this.#closeDialog.addEventListener('click', () => {
            this.#dialog.close();
        });
    }
    
}

domHandling.setUpDialog();