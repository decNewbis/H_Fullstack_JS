// task todoList

function saveTodo() {
    localStorage.setItem(pageObj.todoListKey, JSON.stringify(pageObj.listArrayOfContent));
}

function deleteCurrentTodo(listItem) {
    return function() {
        const textContent = listItem.querySelector('span.todo__content').textContent.trim();
        pageObj.listArrayOfContent = pageObj.listArrayOfContent.filter((element) => element !== textContent);
        listItem.remove();
        saveTodo();
    }
}

function setHiddenElement(element, flag=true) {
    element.classList.toggle('hidden', flag);
}

function editCurrentTodo({listItem, editBtn, deleteBtn, applyBtn}) {
    return function() {
        const content = listItem.querySelector('li > span.todo__content');
        const textContent = content.textContent.trim();
        const editArea = document.createElement('input');
        const indexOfCurrentContent = pageObj.listArrayOfContent.indexOf(textContent);
        editArea.setAttribute('type', 'text');
        editArea.className = content.className;
        editArea.classList.toggle('borders-extra-param');
        editArea.value = textContent;
        content.remove();
        listItem.prepend(editArea);
        editArea.focus();
        setHiddenElement(editBtn, true);
        setHiddenElement(deleteBtn, true);
        setHiddenElement(applyBtn, false);
        applyBtn.addEventListener('click', () => {
            content.textContent = editArea.value.trim();
            editArea.remove();
            listItem.prepend(content);
            if (indexOfCurrentContent !== -1) {
                pageObj.listArrayOfContent.splice(indexOfCurrentContent, 1, content.textContent);
                saveTodo();
            }
            setHiddenElement(editBtn, false);
            setHiddenElement(deleteBtn, false);
            setHiddenElement(applyBtn, true);
        }, {once: true});
        // cancel changes
        listItem.addEventListener('focusout', (event) => {
            const currentTarget = event.currentTarget;
            const relatedTarget = event.relatedTarget;
            if (!currentTarget.contains(relatedTarget)) {
                editArea.remove();
                listItem.prepend(content);
                setHiddenElement(editBtn, false);
                setHiddenElement(deleteBtn, false);
                setHiddenElement(applyBtn, true);
            }
        }, {once: true});
    }
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
    deleteBtn.addEventListener('click', deleteCurrentTodo(listItem));
    editBtn.addEventListener('click', editCurrentTodo(
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
    pageObj.listArrayOfContent = JSON.parse(localStorage.getItem(pageObj.todoListKey)) || [];
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
    todoListKey: 'listOfTodo',
    listArrayOfContent: [],
}

startApp();