/* eslint-disable max-classes-per-file */
let currentMaxId = 0
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

const initialBooks = [
  new Book(0, 'book1', 'author1'),
  new Book(1, 'book2', 'author2'),
];

var booksArr = JSON.parse(localStorage.getItem('books'));

const booksList = document.getElementById('books-list');

class Methods {
  remove() {
    const bookIndex = Array.from(booksList.children).indexOf(this);
    booksArr = booksArr.filter((book) => book !== booksArr[bookIndex]);
    localStorage.setItem('books', JSON.stringify(booksArr));
    booksList.removeChild(this);
    if (bookIndex !== 0 && bookIndex < booksArr.length) {
      for (let i = bookIndex; i < booksArr.length; i++) {
        if (i % 2 === 0) {
          booksList.children[i].className = 'book pair-bg'
        } else {
          booksList.children[i].className = 'book odd-bg'
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
    removeBtn.addEventListener('click', () => bookMethods.remove.call(newBook));
    newBook.appendChild(removeBtn);
    booksList.appendChild(newBook);
    if (Array.from(booksList.children).indexOf(newBook) % 2 === 0) {
      newBook.classList.add('pair-bg');
    } else {
      newBook.classList.add('odd-bg');
    }
  }
}

const bookMethods = new Methods();

const createList = () => {
  if (booksArr === null || booksArr.length === 0) {
    booksArr = initialBooks;
    localStorage.setItem('books', JSON.stringify(booksArr));
  };
  currentMaxId = booksArr.length - 1;
  booksArr.forEach((book) => {
    bookMethods.addBookToDom.call(book);
  });
};

document.querySelectorAll('remove-btn').forEach((removeBtn) => {
  removeBtn.addEventListener('click', bookMethods.removeBook.call(this.parentNode));
});

document.getElementById('add-book-btn').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = currentMaxId + 1;
  const newBook = new Book(id, title, author);
  bookMethods.addBookToDom.call(newBook);
  bookMethods.addBookStorage.call(newBook);
  currentMaxId++
});

createList();