let listElement = document.querySelector('#list'); //all list will show it.

//add list
let addBtn = document.querySelector('#add');
let titleText = document.querySelector('#title');
let detailText = document.querySelector('#detail');

//edit list
let editModal = document.querySelector('#edit');
let titleModal = document.querySelector('#titleModal');
let detailModal = document.querySelector('#detailModal');
let submitModal = document.querySelector('#submitModal');
let cancelModal = document.querySelector('#cancelModal');

//search
let search = document.querySelector('#search');
let searchResult = document.querySelector('#searchResult');
let allResult = document.querySelector('#allResult');

//download json file
let download = document.querySelector('#download');

let currentId = 0;

//localStorage.removeItem('allList'); //uncomment for remove data

//if have not data will create json data in localStorage
if (!localStorage.getItem('allList')) {
    localStorage.setItem('allList', JSON.stringify([]));
}

showToDoList();

addBtn.addEventListener('click', addToDoList);
submitModal.addEventListener('click', editToDoList);
cancelModal.addEventListener('click', () => {
    edit.classList.add('hidden');
});
search.addEventListener('change', showToDoList);
download.addEventListener('click', downloadJSON);
