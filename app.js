// global variables
const TASK_ARRAY = {};
const TRASHED_TASKS = {};
const DONE_TASKS = {};

// DESKTOP SCRIPTS

//queries
const startAddTask = document.querySelector('#add-task');
const acceptAddTask = document.querySelector('#accept');
const declineAddTask = document.querySelector('#decline');
const backdrop = document.querySelector('#backdrop');
const taskList = document.querySelector('.task-list');
const search = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');

// functions
const createTaskDiv = (id, text, type) => {
  const taskDiv = document.createElement('div');
  const textDiv = document.createElement('div');
  const taskText = document.createElement('p');
  const typeBadge = document.createElement('div');
  const taskType = document.createElement('p');
  const btnBox = document.createElement('div');
  const deleteBtn = document.createElement('button');
  const doneBtn = document.createElement('button');
  taskText.innerText = text;
  taskType.innerText = type;
  taskDiv.classList.add('task-div');
  textDiv.classList.add('task-text-div');
  typeBadge.classList.add('type-badge-div');
  btnBox.classList.add('task-button-box');
  deleteBtn.classList.add('task-btn', 'delete-task-btn');
  doneBtn.classList.add('task-btn', 'done-task-btn');
  taskDiv.setAttribute('id', `${id}`)
  typeBadge.appendChild(taskType);
  textDiv.appendChild(taskText);
  taskDiv.appendChild(typeBadge);
  taskDiv.appendChild(textDiv);
  btnBox.appendChild(doneBtn);
  btnBox.appendChild(deleteBtn);
  taskDiv.appendChild(btnBox);
  taskList.appendChild(taskDiv);
  doneBtn.addEventListener('click', (e) => {
    doneTaskDiv(e);
  })
  deleteBtn.addEventListener('click', (e) => {
    const task = e.target.closest('.task-div');
    task.classList.toggle('task-div-deleted');
    e.target.disabled = true;
    setTimeout(() => {
      deleteTaskDiv(e);
    }, 500);
  });
}
const deleteTaskDiv = (element) => {
  const task = element.target.closest('.task-div');
  const taskId = task.id;
  const taskType = task.children[0].innerText;
  const taskText = task.children[1].innerText;
  TRASHED_TASKS[`${taskId}`] = {taskType, taskText};
  task.remove();
}
const doneTaskDiv = (element) => {
  const task = element.target.closest('.task-div');
  task.classList.toggle('task-div-checked');
  const taskId = task.id;
  const taskType = task.children[0].innerText;
  const taskText = task.children[1].innerText;
  DONE_TASKS[`${taskId}`] = {taskType, taskText};
}
//const doneTaskDiv = () => {}
const generateId = (type) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  const id = [];
  switch(type){
    case 'task-div':
      id.push('task-div_');
      break;
  }
  for (let i = 0; i < 8; i++) {
    id.push(chars[Math.floor((Math.random() * 35) + 0)]);
  }
  return id.join('');
}
const searchHandler = () => {
  TASK_ARRAY.forEach(item => {
    console.log(item.taskText);
    console.log(item.taskType);
  })
}
// listeners
startAddTask.addEventListener('click', () => {
  backdrop.classList = "";
  backdrop.classList.toggle('modal-backdrop-on');
})
declineAddTask.addEventListener('click', () => {
  document.querySelector('#task-text').value = '';
  document.querySelector('input[name="task-type"][value="general"]').checked = true;
  backdrop.classList = "";
  backdrop.classList.toggle('modal-backdrop-off');
})
acceptAddTask.addEventListener('click', () => {
  const taskId = generateId('task-div');
  const taskText = document.querySelector('#task-text').value;
  const taskType = document.querySelector('input[name="task-type"]:checked').value;
  if(taskText){
    createTaskDiv(taskId, taskText, taskType);
    TASK_ARRAY[`${taskId}`] = {taskType, taskText};
    document.querySelector('#task-text').value = '';
    document.querySelector('input[name="task-type"][value="General"]').checked = true;
    backdrop.classList = "";
    backdrop.classList.toggle('modal-backdrop-off');
  }
})
searchBtn.addEventListener('click', searchHandler);

// MOBILE SCRIPTS

//queries
const filter = document.querySelector('.filter');
const mobileSearchBtn = document.querySelector('.filter-search-btn');
// functions


// listeners
filter.addEventListener('click', () => {
  const filterList = document.querySelector('.filter-list-off');
  if(filterList.classList.contains('filter-list-off')){
    filterList.classList.toggle('filter-list-on');
  } else if(filterList.classList.contains('filter-list-on')){
    filterList.classList.toggle('filter-list-on');
  }
  if(filterList.classList.contains('filter-list-on')){
    filter.innerHTML = '<span>↑Filter↑</span>';
  } else {
    filter.innerHTML = '<span>↓Filter↓</span>';
  }
})
mobileSearchBtn.addEventListener('click', searchHandler);

