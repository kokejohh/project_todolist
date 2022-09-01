function newElement(element) {
    return document.createElement(element);
}


function showToDoList() {
    let lists = localStorage.getItem('allList'); //get data
    let obj = JSON.parse(lists); //converte to json object
    let count = 0;
    
    listElement.innerHTML = ""; //clear innerHTML
    //loop obj reverse for last index to first index
    obj.slice().reverse().forEach(list => {
        if (list.status == search.value || search.value == 0) {
            count++; // count list
            let todo = newElement('div');
            todo.classList.add('p-6', 'rounded-xl', 'hover:shadow-lg');
            todo.setAttribute('id', list.id); //set id of list
            todo.addEventListener('click', toggleStatus); //change status of list
            
            let head = newElement('div');
            head.classList.add('flex', 'justify-between');
            
            let title = document.createElement('div');
            title.classList.add('p-4', 'text-4xl', 'text-bold', 'text-slate-700', 'break-all', 'cursor-pointer', 'hover:text-red-500');
            title.innerHTML = list.title;
            title.addEventListener('click', showEdit); //click title for edit list
            head.appendChild(title);
            
            let divtmp = newElement('div'); //divtmp for fix bug when title is long name if click delete 
            let delBtn = newElement('div');
            delBtn.innerHTML = 'X';
            delBtn.classList.add('cursor-pointer');
            delBtn.addEventListener('click', delToDoList); //delete list
            divtmp.appendChild(delBtn);
            head.appendChild(divtmp);
        
            let detail = document.createElement('div');
            detail.classList.add('text-2xl', 'text-slate-700', 'break-all', 'cursor-default');
            detail.innerHTML = list.detail;
            
            //change backgronud color following status
            if (list.status == 1) {
                todo.classList.add('bg-yellow-200');
            } else {
                todo.classList.add('bg-slate-200');
                title.classList.add('line-through');
                detail.classList.add('line-through');
            }
            todo.appendChild(head);
            todo.appendChild(detail);
            listElement.appendChild(todo);
        }
    });
    searchResult.innerHTML = count; // number of list will show
    allResult.innerHTML = obj.length; // all list
}

function addToDoList() {
    let titleValue = titleText.value.trim();
    let detailValue = detailText.value;

    if (titleValue) {
        let lists = localStorage.getItem('allList');
        let obj = JSON.parse(lists);

        let todo = {
            id: obj.length > 0 ? obj[obj.length - 1].id + 1 : 1, //id following id of last obj
            title: titleValue,
            detail: detailValue,
            status: 1
        };

        obj.push(todo);
        localStorage.setItem('allList', JSON.stringify(obj));
        window.location = 'index.html';
    }
}

function delToDoList() {
    let lists = localStorage.getItem('allList');
    let obj = JSON.parse(lists);
    let id = this.parentNode.parentNode.parentNode.id;

    let remainObj = obj.filter(list => list.id != id);
    localStorage.setItem('allList', JSON.stringify(remainObj));
    showToDoList();
}

function toggleStatus(e) {
    let lists = localStorage.getItem('allList');
    let obj = JSON.parse(lists);
    let titleTodo = this.childNodes[0].childNodes[0]; //title

    if (e.target != titleTodo) {
    let result = obj.map(list => {
        if (list.id == this.id) {
            list.status *= -1;
            this.classList.toggle('bg-yellow-200');
            this.classList.toggle('bg-slate-200');
            titleTodo.classList.toggle('line-through');
            this.childNodes[1].classList.toggle('line-through');
        }
        return list;
    });
    localStorage.setItem('allList', JSON.stringify(result));
    }
}

function showEdit() {
    let lists = localStorage.getItem('allList');
    let obj = JSON.parse(lists);
    let id = this.parentNode.parentNode.id;

    obj.find(list => {
        if (list.id == id) {
            titleModal.value = list.title;
            detailModal.value = list.detail;
            currentId = id;

            if (list.status == 1) {
                editModal.childNodes[1].classList.remove('bg-slate-100');
                editModal.childNodes[1].classList.add('bg-yellow-100');
            } else {
                editModal.childNodes[1].classList.remove('bg-yellow-100');
                editModal.childNodes[1].classList.add('bg-slate-100');
            }
        }
    });
    editModal.classList.remove('hidden');
}

function editToDoList() {
    let titleValue = titleModal.value.trim();
    let detailValue = detailModal.value;

    if (titleValue) {
        let lists = localStorage.getItem('allList');
        let obj = JSON.parse(lists);

        let result = obj.map(list => {
            if (list.id == currentId) {
                list.title = titleValue;
                list.detail = detailValue;
            }
            return list;
        });
        localStorage.setItem('allList', JSON.stringify(result));
        edit.classList.add('hidden');
        showToDoList();
    }
}

function downloadJSON() {
    let lists = localStorage.getItem('allList');
    let obj = JSON.parse(lists);

    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], {
        type: "application/json"
    }));
    a.setAttribute("download", "data.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}