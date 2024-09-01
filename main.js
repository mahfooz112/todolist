// Select the task list element
const taskList = document.getElementById('task-list');

// Select the add task form element
const addTaskForm = document.getElementById('add-task-form');

// Select the task input element
const taskInput = document.getElementById('task-input');

// Initialize an empty array to store tasks
let tasks = [];

// Function to add a new task
function addTask(task) {
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Function to render the task list
function renderTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task;
    taskElement.addEventListener('click', () => {
      editTask(index);
    });
    taskList.appendChild(taskElement);
  });
}

// Function to edit a task
function editTask(index) {
  const task = tasks[index];
  taskInput.value = task;
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    tasks[index] = taskInput.value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
  });
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Add event listener to add task form
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value;
  addTask(task);
  taskInput.value = '';
});

// Initialize tasks from local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTaskList();
}