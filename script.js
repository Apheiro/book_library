const root = document.querySelector(':root'),
    library = document.querySelector('#library'),
    addBookBtn = document.createElement('button'),
    formBackground = document.querySelector('#formBackground'),
    form = document.querySelector('#form'),
    colorInput = document.querySelector('#colorInput'),
    addBtnSubmit = document.querySelector('#addBtnSubmit'),
    buttonNavBar = document.querySelector('#buttonNavBar');

addBookBtn.classList.add('addButtonMenu');
addBookBtn.innerText = '+ Add Book';
library.appendChild(addBookBtn);
class bookConstructor{
    constructor(title, author, pages, read, color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = color;
    }
}

function addBook(){
    formBackground.classList.add('showFormBackground');
    setTimeout(() => {form.classList.add('showForm');}, 250);
}

function lostFocus(e) {
    if (e.target.id === 'formBackground') {
        formBackground.style = 'animation: fadeOut 0.5s ease-in-out; pointer-events: none;';
        form.style = 'animation: fadeOut 0.5s ease-in-out; pointer-events: none;';
        setTimeout(() => {
        formBackground.style = 'animation: ; pointer-events: ;';
        form.style = 'animation: pointer-events: ;';
        formBackground.classList.remove('showFormBackground');
        form.classList.remove('showForm');
        }, 480);
    }
}

function changeColor(){
    const colorPicked = colorInput.value;
    root.style = `--color: ${colorPicked}`;
}

function postBook() { 
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        pages = document.querySelector('#pages').value,
        read = document.querySelector('#read').checked,
        colorPicked = colorInput.value,
        book = new bookConstructor(title, author, pages, read, colorPicked),
        bookJSON = JSON.stringify(book);
    
    localStorage.setItem(title, bookJSON);
    lostFocus();
}

addBookBtn.addEventListener('click', addBook);
formBackground.addEventListener('click', lostFocus);
colorInput.addEventListener('input', changeColor);
addBtnSubmit.addEventListener('click', postBook);