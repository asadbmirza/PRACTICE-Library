function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.getInfo = function() {
        return this.name + " written by " + this.author + ". It is " + this.pages + " long and has it be read? " + read;
    }
}

const myLibrary = {
    books: [],
    newBooks: 0
};
const table = document.querySelector("table");
const body = document.querySelector("tbody");
const content = document.querySelector("body");

function addBookToLibrary(book) {
    myLibrary.books.push(book);
    myLibrary.newBooks += 1;
}


function displayBooks() {
    for (let i = myLibrary.books.length - myLibrary.newBooks; i < myLibrary.books.length; i++) {
        table.classList.remove("transparent");
        const newRow = document.createElement("tr");
        const name = document.createElement("td");
        const author = document.createElement("td");
        const pages = document.createElement("td");

        const read = document.createElement("button");

        const rem = document.createElement("td");
        const remBtn = document.createElement("button");

        name.textContent = myLibrary.books[i].name;
        author.textContent = myLibrary.books[i].author;
        pages.textContent = myLibrary.books[i].pages;
        remBtn.textContent = "Remove";

        if (myLibrary.books[i].read) {
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
        body.appendChild(newRow);

        read.addEventListener('click', (event) => {
            if (read.textContent == "Unfinished") {
                read.textContent = "Finished";
            }
            else {
                read.textContent = "Unfinished";
            }
        });

        remBtn.addEventListener('click', () => {
            body.removeChild(newRow);
        });
    }

    myLibrary.newBooks = 0;
}

const addBook = document.querySelector("button.addBook");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector("dialog > div > button");
const submit = document.querySelector("button#submit");

const inputName = document.querySelector("input#name");
const inputAuthor = document.querySelector("input#author");
const inputPages = document.querySelector("input#pages");
const inputRead = document.querySelector("input#read");

submit.addEventListener("click", (event) => {
    if (inputName != '' && inputAuthor != '' && inputPages.value != '') {
        addBookToLibrary(new Book(inputName.value, inputAuthor.value, inputPages.value, inputRead.checked));
        inputName.value = '';
        inputAuthor.value = '';
        inputPages.value = '';
        inputRead.checked = false;
        displayBooks();

        dialog.close();
        event.preventDefault();
    }
});



addBook.addEventListener('click', function () {
    dialog.showModal();
});
closeDialog.addEventListener('click', () => {
    dialog.close();
});
