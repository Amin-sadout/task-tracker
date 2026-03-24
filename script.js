const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const message = document.querySelector('#message');
const totalTasksText = document.querySelector('#totalTasks');
const completedTasksText = document.querySelector('#completedTasks');
const remainingTasksText = document.querySelector('#remainingTasks');
const taskList = document.querySelector('#taskList');

let tasks = [];
let nextId = 1;

addBtn.addEventListener('click', function () {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    message.innerText = 'Please enter a task.';
    return;
  }

  const newTask = {
    id: nextId,
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  nextId = nextId + 1;

  taskInput.value = '';
  message.innerText = 'Task added, you got another one?';
  render();
});

function render() {
  taskList.innerHTML = '';

  totalTasksText.innerText = tasks.length;

  let completedCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      completedCount = completedCount + 1;
    }
  }

  completedTasksText.innerText = completedCount;
  remainingTasksText.innerText = tasks.length - completedCount;

  if (tasks.length === 0) {
    message.innerText = 'No tasks yet.';
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    const completeBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    taskText.innerText = tasks[i].text;
    completeBtn.innerText = 'Complete';
    deleteBtn.innerText = 'Delete';

    if (tasks[i].completed === true) {
      taskText.innerText = tasks[i].text + ' ✅';
    }

    completeBtn.addEventListener('click', function () {
      tasks[i].completed = !tasks[i].completed;
      render();
    });

    deleteBtn.addEventListener('click', function () {
      tasks.splice(i, 1);
      render();
    });

    li.appendChild(taskText);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}

render();