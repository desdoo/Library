let storedLibrary = JSON.parse(window.localStorage.getItem('Library'));

if (storedLibrary == null) {
   myLibrary = []
}

else {
   myLibrary = storedLibrary
   showBooksFromLibrary()
}



function Book (author, title, pages, read,id) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read  = read
    this.id = id
}

function addBookToLibrary () {

const form = document.forms[0];

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const { author, title, page, read } = this.elements;
  id = myLibrary.length
  let newbook = new Book(author.value, title.value, pages.value, read.checked, id);
  myLibrary.push(newbook)
  showBooksFromLibrary()

});

}

function showBooksFromLibrary() {

    let readbook = document.getElementById('read-book-content-wrapper')
    let unreadbook = document.getElementById('unread-book-content-wrapper')
    readbook.innerHTML =''
    unreadbook.innerHTML =''

    myLibrary.forEach( (e) => {
        let book = document.createElement('book')
        book.setAttribute("id",e.id)
        let author = document.createElement('author')
        let title = document.createElement('booktitle')
        let pages = document.createElement('pages')
        let checkbox = document.createElement('checkbox')
        let remove = document.createElement("BUTTON")

        let toggle = document.createElement("INPUT")
        
        toggle.setAttribute("type", "checkbox");
        toggle.setAttribute("name", "isRead");

        
        let toggleLabel = document.createElement("label")
        toggleLabel.setAttribute("for","isRead")
        toggleLabel.innerHTML="Read"

        book.classList.add('book')
        author.classList.add('author')
        title.classList.add('booktitle')
        pages.classList.add('pages')
        checkbox.classList.add('checkbox')
        toggle.classList.add('toggle')
        remove.classList.add('remove')

        
         
        if (e.read) {
            readbook.appendChild(book)
            toggle.setAttribute("checked", true);
        }   
        else {
             unreadbook.appendChild(book)
        }
        
        book.appendChild(remove)
        book.appendChild(author)
        book.appendChild(title)
        book.appendChild(pages)
        book.appendChild(checkbox)
        checkbox.appendChild(toggle)
        checkbox.appendChild(toggleLabel)
        
        author.innerHTML= e.author
        title.innerHTML= e.title
        pages.innerHTML= e.pages
        read.innerHTML= e.read
        remove.innerHTML= "X"
    
      toggle.addEventListener('change', function() {
            if (this.checked) {
              let id = this.parentNode.parentNode.id
              let index = myLibrary.findIndex(x => x.id == id)
              myLibrary[index].read = true
              showBooksFromLibrary()
            } else {
              let id = this.parentNode.parentNode.id
              let index = myLibrary.findIndex(x => x.id == id)
              myLibrary[index].read = false
              showBooksFromLibrary()

            }
          });
        
          remove.addEventListener("click", function(event) {
            let id = this.parentNode.id
            let index = myLibrary.findIndex(x => x.id == id)
            removed = myLibrary.splice(index,1)
            showBooksFromLibrary()
            
          });


    })
    
    window.localStorage.setItem('Library',JSON.stringify(myLibrary))
}

addBookToLibrary()