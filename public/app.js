document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const todoTitle = document.getElementById('todo-title');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = todoTitle.value;

        try {
            const response = await fetch('/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });
            const todo = await response.json();
            addToDoToList(todo);
            todoTitle.value = '';
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function fetchToDos() {
        try {
            const response = await fetch('/todos');
            const todos = await response.json();
            todos.forEach(todo => addToDoToList(todo));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function addToDoToList(todo) {
        const li = document.createElement('li');
        li.textContent = todo.title;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            try {
                await fetch(`/todos/${todo._id}`, { method: 'DELETE' });
                li.remove();
            } catch (error) {
                console.error('Error:', error);
            }
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    fetchToDos();
});
