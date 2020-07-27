// global variables
const TASK_ARRAY = {};
const TRASHED_TASKS = [];
const DONE_TASKS = {};

// DESKTOP SCRIPTS

//queries
const startAddTask = document.querySelector("#add-task");
const acceptAddTask = document.querySelector("#accept");
const declineAddTask = document.querySelector("#decline");
const backdrop = document.querySelector("#backdrop");
const taskList = document.querySelector(".task-list");
const undeleteBtn = document.querySelector(".undelete-btn-invisible");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

// functions
const createTaskDiv = (id, type, text) => {
  const taskDiv = document.createElement("div");
  const textDiv = document.createElement("div");
  const taskText = document.createElement("p");
  const typeBadge = document.createElement("div");
  const taskType = document.createElement("p");
  const btnBox = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  taskText.innerText = text;
  taskType.innerText = type;
  taskDiv.classList.add("task-div");
  textDiv.classList.add("task-text-div");
  typeBadge.classList.add("type-badge-div");
  btnBox.classList.add("task-button-box");
  deleteBtn.classList.add("task-btn", "delete-task-btn");
  doneBtn.classList.add("task-btn", "done-task-btn");
  taskDiv.setAttribute("id", `${id}`);
  typeBadge.appendChild(taskType);
  textDiv.appendChild(taskText);
  taskDiv.appendChild(typeBadge);
  taskDiv.appendChild(textDiv);
  btnBox.appendChild(doneBtn);
  btnBox.appendChild(deleteBtn);
  taskDiv.appendChild(btnBox);
  taskList.appendChild(taskDiv);
  doneBtn.addEventListener("click", (e) => {
    checkTaskDiv(e);
  });
  deleteBtn.addEventListener("click", (e) => {
    const task = e.target.closest(".task-div");
    task.classList.toggle("task-div-deleted");
    e.target.disabled = true;
    setTimeout(() => {
      deleteTaskDiv(e);
    }, 500);
  });
};
const deleteTaskDiv = (element) => {
  const task = element.target.closest(".task-div");
  const taskId = task.id;
  const taskType = task.children[0].innerText;
  const taskText = task.children[1].innerText;
  TRASHED_TASKS.unshift({ taskId, taskType, taskText });
  sendHttpRequest(
    "DELETE",
    `https://my-json-server.typicode.com/Adrian2422/to_do/tasks/${taskId}`
  );
  task.remove();
  if (TRASHED_TASKS.length) {
    undeleteBtn.classList.add("undelete-btn-visible");
  }
};
const checkTaskDiv = (element) => {
  const task = element.target.closest(".task-div");
  task.classList.toggle("task-div-checked");
  const taskId = task.id;
  const taskType = task.children[0].innerText;
  const taskText = task.children[1].innerText;
  DONE_TASKS[`${taskId}`] = { taskType, taskText };
};
const undeleteTaskDiv = () => {
  const { taskId, taskType, taskText } = TRASHED_TASKS[0];
  createTaskDiv(taskId, taskType, taskText);
  postTask(taskId, taskType, taskText)
  TRASHED_TASKS.shift();
  if (!TRASHED_TASKS.length) {
    undeleteBtn.classList.remove("undelete-btn-visible");
  }
};
const generateId = (type) => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
  const id = [];
  switch (type) {
    case "task-div":
      id.push("task-div_");
      break;
  }
  for (let i = 0; i < 8; i++) {
    id.push(chars[Math.floor(Math.random() * 35 + 0)]);
  }
  return id.join("");
};
const searchHandler = () => {
  /* TASK_ARRAY.forEach(item => {
    console.log(item.taskText);
    console.log(item.taskType);
  }) */
};
// listeners
startAddTask.addEventListener("click", () => {
  backdrop.classList = "";
  backdrop.classList.toggle("modal-backdrop-on");
});
declineAddTask.addEventListener("click", () => {
  document.querySelector("#task-text").value = "";
  document.querySelector(
    'input[name="task-type"][value="General"]'
  ).checked = true;
  backdrop.classList = "";
  backdrop.classList.toggle("modal-backdrop-off");
});
acceptAddTask.addEventListener("click", () => {
  const taskId = generateId("task-div");
  const taskText = document.querySelector("#task-text").value;
  const taskType = document.querySelector('input[name="task-type"]:checked')
    .value;
  if (taskText) {
    createTaskDiv(taskId, taskType, taskText);
    postTask(taskId, taskType, taskText);
    TASK_ARRAY[`${taskId}`] = { taskType, taskText };
    document.querySelector("#task-text").value = "";
    document.querySelector(
      'input[name="task-type"][value="General"]'
    ).checked = true;
    backdrop.classList = "";
    backdrop.classList.toggle("modal-backdrop-off");
  }
});
searchBtn.addEventListener("click", searchHandler);
undeleteBtn.addEventListener("click", undeleteTaskDiv);

// XML Requests

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = "json";

    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.send(JSON.stringify(data));
  });
  return promise;
};
async function fetchTasks() {
  const responseData = await sendHttpRequest(
    "GET",
    "https://my-json-server.typicode.com/Adrian2422/to_do/tasks"
  );
  const listOfTasks = responseData;
  listOfTasks.forEach((item) => {
    const { id, task_type, task_text } = item;
    createTaskDiv(id, task_type, task_text);
  });
}
async function postTask(taskId, taskType, taskText) {
  const task = {
    id: taskId,
    taskType,
    taskText,
  };
  sendHttpRequest(
    "POST",
    "https://my-json-server.typicode.com/Adrian2422/to_do/tasks",
    task
  );
}
fetchTasks();
// MOBILE SCRIPTS

//queries
const filter = document.querySelector(".filter");
const mobileSearchBtn = document.querySelector(".filter-search-btn");
// functions

// listeners
filter.addEventListener("click", () => {
  const filterList = document.querySelector(".filter-list-off");
  if (filterList.classList.contains("filter-list-off")) {
    filterList.classList.toggle("filter-list-on");
  } else if (filterList.classList.contains("filter-list-on")) {
    filterList.classList.toggle("filter-list-on");
  }
  if (filterList.classList.contains("filter-list-on")) {
    filter.innerHTML = "<span>↑Filter↑</span>";
  } else {
    filter.innerHTML = "<span>↓Filter↓</span>";
  }
});
mobileSearchBtn.addEventListener("click", searchHandler);
