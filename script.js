const root = document.querySelector(':root');
const library = document.querySelector('#library');
const formBackground = document.querySelector('#formBackground');
const form = document.querySelector('#form');
const editForm = document.querySelector('#editForm');
const colorInput = document.querySelector('#color');
const addBtnSubmit = document.querySelector('#addBtnSubmit');
const colorInputEdit = document.querySelector('#colorEdit');
const addBtnSubmitEdit = document.querySelector('#addBtnSubmitEdit');
const buttonNavBar = document.querySelector('#buttonNavBar');
const pagesInput = document.querySelector('#pages');
const addBookBtn = document.createElement('button');


let indexOfBook = '';
addBookBtn.innerText = '+ Add Book';

let bookCollection = [];

class bookConstructor{
    constructor(title, author, pages, read, color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = color;
    }
}

function changeColor(e) {root.style = `--color: ${e.target.value}`;}

function matchingIndex() {
    const nodeList = library.childNodes;
    nodeList.forEach(node => {node.setAttribute('data-index', nodeIndexItem(library, node));});
}

function deleteBook() {
    const book = this.parentNode.parentNode;
    const bookIndex = book.getAttribute('data-index');
    console.log(bookIndex);
    bookCollection.splice(bookIndex, 1);
    book.remove();
    matchingIndex();
    if (!library.contains(book)) {
        insertBookBtnLibrary();
    }
}

function insertBookBtnLibrary() {
    if (!library.contains(addBookBtn) && !library.contains(document.querySelector('.book'))) { 
        library.appendChild(addBookBtn);
        addBookBtn.classList.add('addButtonMenu');
        addBookBtn.classList.remove('addButtonMenuNav');
        library.classList.remove('libraryBooks');   
    }
}
insertBookBtnLibrary();

function insertBookBtnNavbar() {
    if (library.contains(addBookBtn)) {
        library.removeChild(addBookBtn);
        addBookBtn.classList.add('addButtonMenuNav');
        buttonNavBar.appendChild(addBookBtn);
        library.classList.add('libraryBooks');
     }
    
}

function openForm(e) {
    if (this === addBookBtn) { 
        formBackground.classList.add('showFormBackground');
        root.style = `--color: ${colorInput.value}`;
        setTimeout(() => {form.classList.add('showForm');}, 250);
    }
    if (e.target.classList.contains('editButton')) {
        formBackground.classList.add('showFormBackground');
        fillEditForm(this);
        indexOfBook = nodeIndexItem(library, this.parentNode.parentNode);
        root.style = `--color: ${bookCollection[indexOfBook].color}`;
        setTimeout(() => {editForm.classList.add('showForm');}, 250);
    }
}

function fillEditForm(node) {
    const data = bookCollection[nodeIndexItem(library, node.parentNode.parentNode)];
    const { titleEdit, authorEdit, pagesEdit, readEdit, colorEdit } = editForm.elements;
    titleEdit.value = data.title;
    authorEdit.value = data.author;
    pagesEdit.value = data.pages;
    readEdit.checked = data.read;
    colorEdit.value = data.color;
}

function nodeIndexItem(parent, child) {
    const index = Array.prototype.indexOf.call(parent.children, child);
    return index;
}

function lostFocus(e) {
    formBackground.style = 'animation: fadeOut 0.5s ease-in-out; pointer-events: none;';
    form.style = 'animation: fadeOut 0.5s ease-in-out; pointer-events: none;';
    editForm.style = 'animation: fadeOut 0.5s ease-in-out; pointer-events: none;';
    setTimeout(() => {
        formBackground.style = 'animation: ; pointer-events: ;';
        form.style = 'animation: pointer-events: ;';
        editForm.style = 'animation: ; pointer-events: ;';
        formBackground.classList.remove('showFormBackground');
        form.classList.remove('showForm');
        editForm.classList.remove('showForm');
    }, 480);
    
}

function postBook() { 
    if (form.checkValidity()) { 
        const {title, author, pages, read, color} = form.elements;
        const bookContentData = new bookConstructor(title.value, author.value, pages.value, read.checked, color.value);
        bookCollection.push(bookContentData);
        insertBooksData()
        lostFocus()
        insertBookBtnNavbar()
    };
}

function editBook() { 
    if (editForm.checkValidity()) { 
        const {titleEdit, authorEdit, pagesEdit, readEdit, colorEdit} = editForm.elements;
        bookCollection[indexOfBook].title = titleEdit.value;
        bookCollection[indexOfBook].author = authorEdit.value;
        bookCollection[indexOfBook].pages = pagesEdit.value;
        bookCollection[indexOfBook].read = readEdit.checked;
        bookCollection[indexOfBook].color = colorEdit.value;
        console.log(bookCollection);
        insertEditBookData()
        lostFocus()
        insertBookBtnNavbar()
    };
    
}

function stopSubmitEvent(e) {
    e.preventDefault();
    form.reset();
}

function insertBooksData() {
    lastBook = bookCollection[bookCollection.length - 1];
    createBookCard(lastBook.title, lastBook.author, lastBook.pages, lastBook.read);
}

function insertEditBookData() {
    book = library.childNodes[indexOfBook]
    console.log(book);
    book.querySelector('.title').innerText = bookCollection[indexOfBook].title;
    book.querySelector('.author').innerText = bookCollection[indexOfBook].author;
    book.querySelector('.pages').innerText = bookCollection[indexOfBook].pages;
    book.querySelector('.read').checked = bookCollection[indexOfBook].read;
    book.querySelector('.checkboxStyle').style = `background-color: ${bookCollection[indexOfBook].color}`;
    const buttons = book.querySelectorAll('.bookButtons');
    buttons.forEach(button => {button.style = `background-color: ${bookCollection[indexOfBook].color}`;});
    book.querySelector('.colorLine').style = `background-color: ${bookCollection[indexOfBook].color}`;
}

function createBookCard(title, author, pages, read) {
    const book = document.createElement('div');
    const bookContent = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('label');
    const bookReadP = document.createElement('p');
    const bookReadCheckbox = document.createElement('input');
    const bookReadCheckboxStyle = document.createElement('span');
    const bookButtonsContainer = document.createElement('div');
    const bookEdit = document.createElement('button');
    const bookDelete = document.createElement('button');
    const colorLine = document.createElement('div');
    bookReadCheckbox.type = 'checkbox';

    bookTitle.classList.add('title');
    bookAuthor.classList.add('author');
    bookPages.classList.add('pages');
    bookReadCheckbox.classList.add('read');
    book.classList.add('book');
    bookContent.classList.add('bookContent');
    bookRead.classList.add('clickInputs');
    bookReadCheckbox.classList.add('checkbox');
    bookButtonsContainer.classList.add('bookButtonsContainer');
    bookReadCheckboxStyle.classList.add('checkboxStyle');
    bookEdit.classList.add('bookButtons');
    bookEdit.classList.add('editButton');
    bookDelete.classList.add('bookButtons');
    colorLine.classList.add('colorLine');
    bookReadCheckboxStyle.style = `background: ${colorInput.value};`;
    bookEdit.style = `background-color: ${colorInput.value};`;
    bookDelete.style = `background-color: ${colorInput.value};`;
    colorLine.style = `background-color: ${colorInput.value};`;

    bookTitle.innerText = title;
    bookAuthor.innerText = author;
    bookPages.innerText = `${pages} pages`;
    bookReadCheckbox.checked = read;
    bookReadP.innerText = 'Read';
    bookEdit.innerHTML = '<svg class = "editButton" width = "20" height = "19" viewBox = "0 0 20 19" fill = "none" xmlns = "http://www.w3.org/2000/svg" > <path class = "editButton" d="M18.4796 1.03368C18.0499 0.604186 17.4673 0.362907 16.8598 0.362907C16.2523 0.362907 15.6697 0.604186 15.2401 1.03368L6.55029 9.72346V12.9629H9.78977L18.4796 4.27316C18.9091 3.84354 19.1503 3.26092 19.1503 2.65342C19.1503 2.04593 18.9091 1.46331 18.4796 1.03368Z" fill="#303030" /> <path class = "editButton" fill-rule="evenodd" clip-rule="evenodd" d="M0.822754 4.94443C0.822754 4.33682 1.06413 3.75409 1.49377 3.32445C1.92342 2.8948 2.50615 2.65343 3.11376 2.65343H7.69577C7.99958 2.65343 8.29094 2.77411 8.50576 2.98894C8.72059 3.20376 8.84127 3.49512 8.84127 3.79893C8.84127 4.10274 8.72059 4.3941 8.50576 4.60892C8.29094 4.82375 7.99958 4.94443 7.69577 4.94443H3.11376V16.3995H14.5688V11.8174C14.5688 11.5136 14.6895 11.2223 14.9043 11.0075C15.1191 10.7926 15.4105 10.6719 15.7143 10.6719C16.0181 10.6719 16.3095 10.7926 16.5243 11.0075C16.7391 11.2223 16.8598 11.5136 16.8598 11.8174V16.3995C16.8598 17.0071 16.6184 17.5898 16.1888 18.0194C15.7591 18.4491 15.1764 18.6905 14.5688 18.6905H3.11376C2.50615 18.6905 1.92342 18.4491 1.49377 18.0194C1.06413 17.5898 0.822754 17.0071 0.822754 16.3995V4.94443Z" fill="#303030" /></svg >';
    bookDelete.innerHTML = '<svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.2431 1.52644H2.49707" stroke="#303030" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>';
    
    bookRead.appendChild(bookReadP);
    bookRead.appendChild(bookReadCheckbox);
    bookRead.appendChild(bookReadCheckboxStyle);
    bookContent.appendChild(bookTitle);
    bookContent.appendChild(bookAuthor);
    bookContent.appendChild(bookPages);
    bookContent.appendChild(bookRead);
    bookButtonsContainer.appendChild(bookEdit);
    bookButtonsContainer.appendChild(bookDelete);
    book.appendChild(bookContent);
    book.appendChild(bookButtonsContainer);
    book.appendChild(colorLine);
    book.setAttribute('data-index', bookCollection.length - 1);
    library.appendChild(book);
    bookDelete.addEventListener('click', deleteBook);
    bookEdit.addEventListener('click', openForm);
    
}

function filter(e) {
    const charCode = e.charCode;
    if ( charCode > 57 || charCode < 48) {e.preventDefault();}
}

pagesInput.addEventListener('keypress', filter)
form.addEventListener('submit', stopSubmitEvent);
editForm.addEventListener('submit', stopSubmitEvent);
addBookBtn.addEventListener('click', openForm);
formBackground.addEventListener('click', lostFocus);
colorInput.addEventListener('input', changeColor);
colorInputEdit.addEventListener('input', changeColor);
addBtnSubmit.addEventListener('click', postBook);
addBtnSubmitEdit.addEventListener('click', editBook);