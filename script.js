// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            // Get the task text (excluding the remove button text)
            const taskText = taskItem.childNodes[0].textContent;
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If taskText is not provided, get it from the input field
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
            
            // Check if the input is not empty
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
        }

        // Create a new list item and set its text content
        const listItem = document.createElement('li');
        const taskTextNode = document.createTextNode(taskText);
        listItem.appendChild(taskTextNode);
        
        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Add click event to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            saveTasks(); // Update Local Storage after removal
        };
        
        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        
        // Add the new task to the list
        taskList.appendChild(listItem);
        
        // Clear the input field and save to Local Storage if needed
        if (save) {
            taskInput.value = '';
            saveTasks();
        }
    }

    // Add task when the add button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Load tasks when the page loads
    loadTasks();
});
