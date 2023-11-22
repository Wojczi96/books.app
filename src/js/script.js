const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const bookListBox = document.querySelector('.books-list');
  function render(){
    for(let book in dataSource.books){
        let generateHTML = template(dataSource.books[book]);
        let generateDOM = utils.createDOMFromHTML(generateHTML);
        bookListBox.appendChild(generateDOM);
    }
  }
  render();
