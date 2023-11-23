const filters = [];

class BooksList{
  constructor(){
    const thisBooksList = this;
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }

  render(){
    const thisBooksList = this;
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    for (let book in dataSource.books){
      let ratingBgc = thisBooksList.determineRatingBgc(dataSource.books[book].rating);
      let ratingWidth = dataSource.books[book].rating *10;
      const allData = dataSource.books[book];
      allData.ratingBgc = ratingBgc;
      allData.ratingWidth = ratingWidth;
      let generatedHTML = template(allData);
      let bookElement = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.list.appendChild(bookElement);
    }

  }

  getElements(){
    const thisBooksList = this;
    thisBooksList.list = document.querySelector('.books-list');
    thisBooksList.form = document.querySelector('.filters');
  }


  initActions(){
    const thisBooksList = this;
    const favoriteBooks = [];
    thisBooksList.list.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedBook = event.target.offsetParent;
      if(clickedBook.classList.contains('book__image')){
        const bookId = clickedBook.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          clickedBook.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          clickedBook.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookId),1);
        }
      }
    });

    thisBooksList.form.addEventListener('click', function(event){
      if(event.target.tagName=='INPUT'&& event.target.type=='checkbox'&& event.target.name=='filter'){
        if(event.target.checked){
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value),1);
        }
      }
      thisBooksList.filterBooks();
    });

  }

  filterBooks(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(let filter of filters){
        if(! book.details[filter]){
          shouldBeHidden = true;
        }
      }
      const bookElement = document.querySelector('.book__image[data-id="' + book.id +'"]');
      if(shouldBeHidden){
        bookElement.classList.add('hidden');
      } else {
        bookElement.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating){
    let background = '';

    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }

    return background;
  }
}

const app = new BooksList();
console.log('app', app);



