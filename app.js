const TASK_ARRAY = [];

const startAddTask = document.querySelector('#add-task');
const acceptAddTask = document.querySelector('#accept');
const declineAddTask = document.querySelector('#decline');
const backdrop = document.querySelector('#backdrop');
const taskList = document.querySelector('.task-list');

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
  const id = Math.round((Math.random() * 999) + 1);
  taskDiv.setAttribute('id', `${id}`)
  typeBadge.appendChild(taskType);
  textDiv.appendChild(taskText);
  taskTopbar.appendChild(typeBadge);
  taskTopbar.appendChild(deleteBtn);
  taskDiv.appendChild(taskTopbar);
  taskDiv.appendChild(textDiv);
  taskList.appendChild(taskDiv);
}
const deleteTaskDiv = () => {
  const id = document.parentNode.parentNode.id;
  console.log(id);
}
startAddTask.addEventListener('click', () => {
  backdrop.classList = "";
  backdrop.classList.toggle('modal-backdrop-on');
})

declineAddTask.addEventListener('click', () => {
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
