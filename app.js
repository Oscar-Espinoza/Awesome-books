const initialBooks = [
  {
    id: 0,
    title: 'book1',
    author: 'author1',
  },
  {
    id: 1,
    title: 'book2',
    author: 'author2',
  },
];

const booksListEl = document.getElementById('books-list');
if (localStorage.getItem('books') === null) {
  localStorage.setItem('books', JSON.stringify(initialBooks));
}

let booksArr = JSON.parse(localStorage.getItem('books'));

const remove = (removedBook) => {
  booksArr = booksArr.filter((book) => book.id !== removedBook.id);
  localStorage.setItem('books', JSON.stringify(booksArr));
  booksListEl.removeChild(removedBook);
};

const addBookStorage = (title, author, id) => {
  booksArr.push({title, author, id,});
  localStorage.setItem('books', JSON.stringify(booksArr));
};

const addBookToDom = (title, author, index) => {
  const newBookEl = document.createElement('li');
  newBookEl.classList.add('book');
  newBookEl.setAttribute('id', index);
  newBookEl.innerHTML = `
  <h2 class="book-title">${title}</h2>
  <p class="book-author">${author}</p>
  <button class="remove-btn">remove</button>
  `;
  newBookEl.addEventListener('click', () => remove(newBookEl));
  booksListEl.appendChild(newBookEl);
};

const createList = () => {
  booksArr.forEach((book) => {
    addBookToDom(book.title, book.author, book.id);
  });
};

document.querySelectorAll('remove-btn').forEach((removeBtn) => {
  removeBtn.addEventListener('click', remove(removeBtn));
});

document.getElementById('add-book').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = booksArr.length;
  addBookToDom(title, author, id);
  addBookStorage(title, author, id);
});

createList();