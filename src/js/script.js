const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const bookListBox = document.querySelector('.books-list');
function render(){
  for(let book in dataSource.books){
    let generateHTML = template(dataSource.books[book]);
    let generateDOM = utils.createDOMFromHTML(generateHTML);
    bookListBox.appendChild(generateDOM);
  }
}

const favoriteBooks = [];
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
}
render();
initActions();
