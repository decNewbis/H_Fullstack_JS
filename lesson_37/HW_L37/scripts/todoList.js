// task todoList

function saveTodo() {
    localStorage.setItem('listOfTodo', JSON.stringify(pageObj.listArray));
}

function addTodoItem() {
    if (!pageObj.inputField.value) { return }
    const value = pageObj.inputField.value;
    const listItemContentTemplate = `
    <span class="todo__content">
        ${value}
    </span>
    <div class="todo__content-btnBar">
        <button class="todo__content-editBtn">✏️</button>
        <button class="todo__content-applyBtn">✔️</button>
        <button class="todo__content-deleteBtn">🗑️</button>
    </div>
    `;
    const listItem = document.createElement('li');
    listItem.className = 'todo__item';
    listItem.innerHTML = listItemContentTemplate;
    pageObj.todoList.prepend(listItem);
    pageObj.listArray.push(value);
    pageObj.inputField.value = '';
    saveTodo();
}

function loadTodo() {
    pageObj.listArray = JSON.parse(localStorage.getItem('listOfTodo')) || [];
    if (pageObj.listArray) {
        pageObj.listArray.forEach((element) => {
            const listItemContentTemplate = `
                <span class="todo__content">
                    ${element}
                </span>
                <div class="todo__content-btnBar">
                    <button class="todo__content-editBtn">✏️</button>
                    <button class="todo__content-applyBtn">✔️</button>
                    <button class="todo__content-deleteBtn">🗑️</button>
                </div>
                `;
            const listItem = document.createElement('li');
            listItem.className = 'todo__item';
            listItem.innerHTML = listItemContentTemplate;
            pageObj.todoList.prepend(listItem);
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
    listArray: [],
}

startApp();