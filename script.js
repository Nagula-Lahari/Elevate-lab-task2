// Get references to the DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

/**
 * Function to add a new task to the list.
 * It creates a new list item with the task text, a complete button, and a remove button.
 */
function addTask() {
    const taskText = taskInput.value.trim(); // Get task text and remove leading/trailing whitespace

    // Only add the task if the input is not empty
    if (taskText === '') {
        // Instead of alert(), we can visually indicate an empty input
        taskInput.placeholder = "Task cannot be empty!";
        taskInput.classList.add('border-red-500', 'focus:ring-red-500'); // Highlight red border
        setTimeout(() => {
            taskInput.placeholder = "Add a new task...";
            taskInput.classList.remove('border-red-500', 'focus:ring-red-500'); // Remove red border
        }, 1500); // Revert after 1.5 seconds
        return;
    }

    // Create the main list item element
    const listItem = document.createElement('li');
    // Apply Tailwind classes for styling the list item
    listItem.classList.add(
        'flex', 'items-center', 'justify-between', 'bg-gray-50', 'p-4', 'rounded-md',
        'shadow-sm', 'border', 'border-gray-200', 'transition', 'duration-200', 'ease-in-out'
    );

    // Create a span element for the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    // Apply Tailwind classes for task text styling
    taskSpan.classList.add('flex-grow', 'text-gray-800', 'text-lg', 'break-words');

    // Create a container for the action buttons (Complete and Remove)
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'space-x-2', 'ml-4'); // Add margin-left for spacing

    // Create the "Complete" button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    // Apply Tailwind classes for the complete button
    completeBtn.classList.add(
        'bg-green-500', 'hover:bg-green-600', 'text-white', 'text-sm', 'font-medium',
        'py-2', 'px-4', 'rounded-md', 'shadow-sm', 'transition', 'duration-300',
        'ease-in-out', 'transform', 'hover:scale-105', 'focus:outline-none',
        'focus:ring-2', 'focus:ring-green-500', 'focus:ring-opacity-75'
    );
    // Add event listener to toggle the 'completed' class on the listItem
    completeBtn.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        // Optionally change button text/style based on completion status
        if (listItem.classList.contains('completed')) {
            completeBtn.textContent = 'Undo';
            completeBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            completeBtn.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
        } else {
            completeBtn.textContent = 'Complete';
            completeBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
            completeBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        }
    });

    // Create the "Remove" button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    // Apply Tailwind classes for the remove button
    removeBtn.classList.add(
        'bg-red-500', 'hover:bg-red-600', 'text-white', 'text-sm', 'font-medium',
        'py-2', 'px-4', 'rounded-md', 'shadow-sm', 'transition', 'duration-300',
        'ease-in-out', 'transform', 'hover:scale-105', 'focus:outline-none',
        'focus:ring-2', 'focus:ring-red-500', 'focus:ring-opacity-75'
    );
    // Add event listener to remove the listItem from the DOM
    removeBtn.addEventListener('click', () => {
        listItem.remove(); // Removes the list item from its parent (taskList)
    });

    // Append the task span and buttons to the button container
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(removeBtn);

    // Append the task span and button container to the list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonContainer);

    // Append the new list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field after adding the task
    taskInput.value = '';
    // Reset placeholder if it was changed due to empty input
    taskInput.placeholder = "Add a new task...";
    taskInput.classList.remove('border-red-500', 'focus:ring-red-500');
}

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Allow adding tasks by pressing Enter in the input field
taskInput.addEventListener('keypress', (event) => {
    // Check if the pressed key is 'Enter' (key code 13)
    if (event.key === 'Enter') {
        addTask();
    }
});