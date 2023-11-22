const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const bookListBox = document.querySelector('.books-list');
const filtr = document.querySelector('.filters');
function render(){
  for(let book in dataSource.books){
    let generateHTML = template(dataSource.books[book]);
    let generateDOM = utils.createDOMFromHTML(generateHTML);
    bookListBox.appendChild(generateDOM);
  }
}

const filters = [];
const favoriteBooks = [];

function filterBooks(){
  for(let filtrBook of dataSource.books){
    const bookToHide = document.querySelector('.book__image[data-id="' + filtrBook.id + '"');
    let booksHidden = false;
    for(let filtr of filters){
      if(!filtrBook.details[filtr]){
        booksHidden = true;
      }
    }
    if(booksHidden){
      bookToHide.classList.add('hidden');
    } else {
      bookToHide.classList.remove('hidden');
    }
  }
}



function initActions(){
    bookListBox.addEventListener('dblclick', function(event){
      event.preventDefault();
      const elementClicked = event.target.offsetParent;

      if(elementClicked.classList.contains('book__image')){
        const imageId = elementClicked.getAttribute('data-id');
        if(!elementClicked.classList.contains('favorite')){
          elementClicked.classList.add('favorite');
          favoriteBooks.push(imageId);
        } else {
          elementClicked.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(imageId), 1);
        }
      }
  });
  filtr.addEventListener('click', function(event){
    const filtrClicked = event.target;
    if(filtrClicked.tagName === 'INPUT' && filtrClicked.type === 'checkbox' && filtrClicked.name === 'filter'){
      if(filtrClicked.checked){
        filters.push(filtrClicked.value);
        filterBooks();
      } else {
        filters.splice(filters.indexOf(filtrClicked.value), 1);
        filterBooks();
      }
    }
  })
}
render();
initActions();



