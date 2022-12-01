/* eslint-disable max-classes-per-file, class-methods-use-this */
let currentMaxId = 0;
let booksArr = JSON.parse(localStorage.getItem('books'));
const booksList = document.getElementById('books-list');

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  remove(thisBook) {
    const bookIndex = Array.from(booksList.children).indexOf(thisBook);
    booksArr = booksArr.filter((book) => book !== booksArr[bookIndex]);
    localStorage.setItem('books', JSON.stringify(booksArr));
    booksList.removeChild(thisBook);
    if (bookIndex !== 0 && bookIndex < booksArr.length) {
      for (let i = bookIndex; i < booksArr.length; i += 1) {
        if (i % 2 === 0) {
          booksList.children[i].className = 'book pair-bg';
        } else {
          booksList.children[i].className = 'book odd-bg';
        }
      }
    }
  }

  addBookStorage() {
    booksArr.push({
      id: this.id,
      title: this.title,
      author: this.author,
    });
    localStorage.setItem('books', JSON.stringify(booksArr));
  }

  addBookToDom() {
    const newBook = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerText = 'remove';
    newBook.classList.add('book');
    newBook.setAttribute('id', this.id);
    newBook.innerHTML = `
    <p class="book-author">"${this.title}" by ${this.author}</p>
    `;
    removeBtn.addEventListener('click', () => this.remove(newBook));
    newBook.appendChild(removeBtn);
    booksList.appendChild(newBook);
    if (Array.from(booksList.children).indexOf(newBook) % 2 === 0) {
      newBook.classList.add('pair-bg');
    } else {
      newBook.classList.add('odd-bg');
    }
  }
}

const initialBooks = [
  new Book(0, 'book1', 'author1'),
  new Book(1, 'book2', 'author2'),
];

const createList = () => {
  if (booksArr === null || booksArr.length === 0) {
    booksArr = initialBooks;
    localStorage.setItem('books', JSON.stringify(booksArr));
  }
  currentMaxId = booksArr.length - 1;
  booksArr.forEach((book) => {
    book = new Book(book.id, book.title, book.author);
    book.addBookToDom();
  });
};

document.getElementById('add-book-btn').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = currentMaxId + 1;
  const newBook = new Book(id, title, author);
  newBook.addBookToDom();
  newBook.addBookStorage();
  currentMaxId += 1;
});

document.querySelectorAll('.nav-link').forEach((navLink) => {
  navLink.addEventListener('click', () => {
    if (!navLink.classList.contains('active')) {
      document.querySelectorAll('.active').forEach((element) => {
        element.classList.remove('active');
      });
      const elementId = navLink.innerHTML.toLowerCase();
      const element = document.getElementById(elementId);
      element.classList.add('active');
      navLink.classList.add('active');
    }
  });
});

createList();