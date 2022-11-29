import initialBooks from './books.json' assert {type: 'json'};
const booksListEl = document.getElementById('books-list');
if (localStorage.getItem('books') === null) {
  localStorage.setItem('books', JSON.stringify(initialBooks))
}

let booksArr = JSON.parse(localStorage.getItem('books'));


const remove = (removedBook) => {
  booksArr = booksArr.filter( (book) => book.id != removedBook.id)
  localStorage.setItem('books', JSON.stringify(booksArr))
  booksListEl.removeChild(removedBook);
};

const addBookStorage = (title, author, index) => {
  booksArr.push(
    {
      title: title,
      author: author,
      id: index,
    }
  )
  localStorage.setItem('books', JSON.stringify(booksArr))
}

const addBookToDom = (title, author, index) => {
  const newBookEl = document.createElement('li');
  newBookEl.classList.add('book');
  newBookEl.setAttribute('id', index)
  newBookEl.innerHTML = `
  <h2 class="book-title">${title}</h2>
  <p class="book-author">${author}</p>
  <button class="remove-btn">remove</button>
  `;
  newBookEl.addEventListener('click', () => remove(newBookEl))
  booksListEl.appendChild(newBookEl);  
}

const createList = () => {
  booksArr.forEach((book) => {
    addBookToDom(book.title, book.author, book.id);
  });
}

document.querySelectorAll('remove-btn').forEach(removeBtn => {
  removeBtn.addEventListener('click', remove(removeBtn))
});

document.getElementById('add-book').addEventListener('click', () => {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const id = booksArr.length
  console.log(id)
  addBookToDom(title, author, id)
  addBookStorage(title, author, id)
})

createList();

