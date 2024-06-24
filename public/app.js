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

    }

    function addToDoToList(todo) {

    }

    fetchToDos();
});