//Selectors
const taskInput = document.querySelector(".task-input");
const taskButton = document.querySelector(".task-button");
const tasksList = document.querySelector(".tasks-list");
const filter = document.querySelector(".filter-task");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTasks);
taskButton.addEventListener("click", addTask);
tasksList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filterTasks);

//Functions
function addTask(event) {
  event.preventDefault();

  const task = document.createElement("li");
  task.classList.add("task");

  const taskName = document.createElement("div");
  taskName.innerText = taskInput.value;
  taskName.classList.add("task-item");
  task.appendChild(taskName);

  saveLocalTasks(taskInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  task.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  task.appendChild(trashButton);

  tasksList.appendChild(task);

  taskInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  removeLocalTaks(item);
  if (item.classList[0] === "trash-btn") {
    const task = item.parentElement;
    task.classList.add("fall");
    task.addEventListener("transitionend", function () {
      task.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const task = item.parentElement;
    task.classList.toggle("completed");
  }
}

function filterTasks(event) {
  const tasks = tasksList.childNodes;
  tasks.forEach(function (task) {
    switch (event.target.value) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
    }
  });
}

function saveLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (todo) {
    const task = document.createElement("li");
    task.classList.add("task");

    const taskName = document.createElement("div");
    taskName.innerText = todo;
    taskName.classList.add("task-item");
    task.appendChild(taskName);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    task.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    task.appendChild(trashButton);

    tasksList.appendChild(task);
  });
}

function removeLocalTaks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
