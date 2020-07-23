// global variables
const TASK_ARRAY = [];
const FILTERED_TASKS = [];

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
const createTaskDiv = (text, type) => {
  const taskDiv = document.createElement('div');
  const textDiv = document.createElement('div');
  const taskText = document.createElement('p');
  const taskTopbar = document.createElement('div');
  const typeBadge = document.createElement('div');
  const taskType = document.createElement('p');
  const deleteBtn = document.createElement('button');
  taskText.innerText = text;
  taskType.innerText = type;
  deleteBtn.innerHTML = '<img src="assets/trash_icon.png" height="15px" width="15px"></img>';
  taskDiv.classList.add('task-div');
  textDiv.classList.add('task-text-div');
  typeBadge.classList.add('type-badge-div');
  deleteBtn.classList.add('delete-task-btn');
  taskTopbar.classList.add('task-topbar');
  taskDiv.setAttribute('id', `${generateId()}`)
  typeBadge.appendChild(taskType);
  textDiv.appendChild(taskText);
  taskTopbar.appendChild(typeBadge);
  taskTopbar.appendChild(deleteBtn);
  taskDiv.appendChild(taskTopbar);
  taskDiv.appendChild(textDiv);
  taskList.appendChild(taskDiv);
  deleteBtn.addEventListener('click', deleteTaskDiv);
}
const deleteTaskDiv = (element) => {
  const task = element.target.parentNode.parentNode.parentNode;
  task.remove();
}
const generateId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  const id = [];
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
  let taskText = document.querySelector('#task-text').value;
  const taskType = document.querySelector('input[name="task-type"]:checked').value;
  if(taskText){
    TASK_ARRAY.push({taskText, taskType});
    createTaskDiv(taskText, taskType);
    document.querySelector('#task-text').value = '';
    document.querySelector('input[name="task-type"][value="general"]').checked = true;
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

