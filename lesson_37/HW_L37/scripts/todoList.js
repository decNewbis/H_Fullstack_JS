// task todoList

function addTodoItem() {
    if (!pageObj.inputField.value) { return };
    const listItemContentTemplate = `
    <span class="todo__content">
        ${pageObj.inputField.value}
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
    pageObj.inputField.value = '';
}

function startApp() {
    pageObj.addTodoBtn.addEventListener('click', addTodoItem);
}

const pageObj = {
    inputField: document.getElementById('inputField'),
    addTodoBtn: document.getElementById('addTodo'),
    todoList: document.getElementById('todoList'),
}

startApp();