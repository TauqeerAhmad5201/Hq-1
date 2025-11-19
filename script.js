document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCounter = document.getElementById('task-counter');

    // Load todos from local storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateCounter() {
        const completedCount = todos.filter(todo => todo.completed).length;
        const totalCount = todos.length;
        taskCounter.textContent = `${completedCount} / ${totalCount} tasks completed`;
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            if (todo.completed) {
                li.classList.add('completed');
            }

            const span = document.createElement('span');
            span.textContent = todo.text;
            span.addEventListener('click', () => toggleTodo(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent toggling when deleting
                deleteTodo(index);
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
        updateCounter();
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    addBtn.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Initial render
    renderTodos();
});
