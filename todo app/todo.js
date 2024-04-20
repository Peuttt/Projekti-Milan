

submitBtn.addEventListener('click', () => {
    const inputField = document.getElementById('inputField');
    const todoText = inputField.value; 
    const todosContainer = document.getElementById('todosContainer');
    if (todoText !== '') { 
        const todo = document.createElement('div');
        todo.textContent = todoText;
        todo.classList.add('todo'); 

        const buttonsDiv = document.createElement('div');

        const doneBtn = document.createElement('button');
        doneBtn.textContent = '✓';
        doneBtn.classList.add('done-btn');
        doneBtn.addEventListener('click', () => {
            todo.classList.toggle('done'); 
        });
        inputField.value = ''; 

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            todo.remove(); 
        });

        buttonsDiv.appendChild(doneBtn);
        buttonsDiv.appendChild(deleteBtn);
        todo.appendChild(buttonsDiv);
        todosContainer.appendChild(todo);
    }
});
