// task todoList

function saveTodo() {
    localStorage.setItem('listOfTodo', JSON.stringify(pageObj.listArrayOfContent));
}

function deleteCurrentTodo() {
    const textContent = this.listItem.querySelector('span.todo__content').textContent.trim();
    const indexOfCurrentContent = pageObj.listArrayOfContent.indexOf(textContent);
    if (indexOfCurrentContent !== -1) {
        pageObj.listArrayOfContent.splice(indexOfCurrentContent, 1);
    }
    this.listItem.remove();
    saveTodo();
}

function setHiddenElement(element, flag=true) {
    if (flag) {
        if (!element.classList.contains('hidden')) {
            element.classList.toggle('hidden');
        }
        return;
    }
    if (element.classList.contains('hidden')) {
        element.classList.toggle('hidden');
    }
}

function editCurrentTodo() {
    const content = this.listItem.querySelector('li > span');
    const textContent = content.textContent.trim();
    const editArea = document.createElement('input');
    const indexOfCurrentContent = pageObj.listArrayOfContent.indexOf(textContent);
    editArea.setAttribute('type', 'text');
    editArea.className = content.className;
    editArea.classList.toggle('borders-extra-param');
    editArea.value = textContent;
    content.remove();
    this.listItem.prepend(editArea);
    editArea.focus();
    setHiddenElement(this.editBtn, true);
    setHiddenElement(this.deleteBtn, true);
    setHiddenElement(this.applyBtn, false);
    this.applyBtn.addEventListener('click', () => {
        content.textContent = editArea.value.trim();
        editArea.remove();
        this.listItem.prepend(content);
        if (indexOfCurrentContent !== -1) {
            pageObj.listArrayOfContent.splice(indexOfCurrentContent, 1, content.textContent);
            saveTodo();
        }
        setHiddenElement(this.editBtn, false);
        setHiddenElement(this.deleteBtn, false);
        setHiddenElement(this.applyBtn, true);
    }, {once: true});
    // cancel changes
    this.listItem.addEventListener('focusout', (event) => {
        const currentTarget = event.currentTarget;
        const relatedTarget = event.relatedTarget;
        if (!currentTarget.contains(relatedTarget)) {
            editArea.remove();
            this.listItem.prepend(content);
            setHiddenElement(this.editBtn, false);
            setHiddenElement(this.deleteBtn, false);
            setHiddenElement(this.applyBtn, true);
        }
    }, {once: true});
}

function createListItemStructure(value) {
    const listItemContentTemplate = `
                <span class="todo__content">
                    ${value}
                </span>
                <div class="todo__content-btnBar">
                    <button class="todo__content-editBtn">✏️</button>
                    <button class="todo__content-applyBtn hidden">✔️</button>
                    <button class="todo__content-deleteBtn">🗑️</button>
                </div>
                `;
    const listItem = document.createElement('li');
    listItem.className = 'todo__item';
    listItem.innerHTML = listItemContentTemplate;
    const editBtn = listItem.querySelector('button.todo__content-editBtn');
    const applyBtn = listItem.querySelector('button.todo__content-applyBtn');
    const deleteBtn = listItem.querySelector('button.todo__content-deleteBtn');
    deleteBtn.addEventListener('click', deleteCurrentTodo.bind({listItem: listItem}));
    editBtn.addEventListener('click', editCurrentTodo.bind(
        {
            listItem: listItem,
            editBtn: editBtn,
            deleteBtn: deleteBtn,
            applyBtn: applyBtn
        }
    ));
    pageObj.todoList.prepend(listItem);
}

function addTodoItem() {
    if (!pageObj.inputField.value) { return }
    const value = pageObj.inputField.value.trim();
    createListItemStructure(value)
    pageObj.listArrayOfContent.push(value);
    pageObj.inputField.value = '';
    saveTodo();
}

function loadTodo() {
    pageObj.listArrayOfContent = JSON.parse(localStorage.getItem('listOfTodo')) || [];
    if (pageObj.listArrayOfContent) {
        pageObj.listArrayOfContent.forEach((value) => {
            createListItemStructure(value);
        });
    }
}

function startApp() {
    pageObj.addTodoBtn.addEventListener('click', addTodoItem);
    loadTodo();
}

const pageObj = {
    inputField: document.getElementById('inputField'),
    addTodoBtn: document.getElementById('addTodo'),
    todoList: document.getElementById('todoList'),
    listArrayOfContent: [],
}

startApp();