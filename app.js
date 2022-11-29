class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

const initialBooks = [
  new Book (0, 'book1', 'author1'),
  new Book (1, 'book2', 'author2'),
];

let booksArr = JSON.parse(localStorage.getItem('books'))

const booksList = document.getElementById('books-list');

class Methods {
  constructor() {}

  remove() {
    booksArr = booksArr.filter((book) => book !== this);
    localStorage.setItem('books', JSON.stringify(booksArr));
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
    newBook.classList.add('book');
    if (this.id%2 === 0) {
      newBook.classList.add('odd-bg')
    } else {
      newBook.classList.add('pair-bg')
    }
    newBook.setAttribute('id', this.id);
    newBook.innerHTML = `
    <p class="book-author">"${this.title}" by ${this.author}</p>
    <button class="remove-btn">remove</button>
    `;
    newBook.addEventListener('click', () => removeBook(newBook));
    booksList.appendChild(newBook);
  };
}

const bookMethods = new Methods()

if (booksArr === null || booksArr.length === 0) {
  booksArr = initialBooks
  localStorage.setItem('books', JSON.stringify(booksArr));
}

const createList = () => {
  booksArr.forEach((book) => {
    bookMethods.addBookToDom.call(book);
  });
};

const removeBook = (book) => {
  const bookIndex = Array.from(booksList.children).indexOf(book);
  bookMethods.remove.call(booksArr[bookIndex]);
  booksList.removeChild(book);
}

document.querySelectorAll('remove-btn').forEach((removeBtn) => {
  removeBtn.addEventListener('click', removeBook(this.parentNode));
});

document.getElementById('add-book-btn').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = booksArr.length;
  const newBook = new Book(id, title, author)
  bookMethods.addBookToDom.call(newBook);
  bookMethods.addBookStorage.call(newBook);
});

createList();