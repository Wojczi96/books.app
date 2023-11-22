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
  const images = document.querySelectorAll('.book__image');
  console.log('images:', images);
  for(let image of images){
    image.addEventListener('dblclick', function(event){
      event.preventDefault();
      image.classList.add('favorite');
      console.log('image:', image);
      const imageId = image.getAttribute('data-id');
      favoriteBooks.push(imageId);
    });
  }
}
render();
initActions();
