// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get the task text and trim any extra whitespace
        const taskText = taskInput.value.trim();

        // Check if the input is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');
        
        // Create a span for the task text
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        
        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Add click event to remove the task
        removeButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });
        
        // Add elements to the list item
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(removeButton);
        
        // Add the new task to the list
        taskList.appendChild(listItem);
        
        // Clear the input field
        taskInput.value = '';
        
        // Focus the input field for the next task
        taskInput.focus();
    }

    // Add task when the add button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Focus the input field when the page loads
    taskInput.focus();
});
