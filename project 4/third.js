document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var taskName = document.getElementById('task-name').value;
    var dueDate = getCurrentDate(); // Получаем текущую дату
    var task = {
        name: taskName,
        dueDate: dueDate,
        completed: false
    };
    
    addTaskToList(task);
    clearForm();
});

function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2); // Добавляем ведущий ноль, если месяц состоит из одной цифры
    var day = ('0' + now.getDate()).slice(-2); // Добавляем ведущий ноль, если день состоит из одной цифры
    
    return year + '-' + month + '-' + day;
}

function addTaskToList(task) {
    var taskList = document.getElementById('task-list');
    
    var taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    
    var taskInfo = `
        <h3>${task.name}</h3>
        <p>Due Date: ${task.dueDate}</p>
        <button class="complete" onclick="markAsCompleted(this)">Mark as Completed</button>
        <button class="delete" onclick="deleteTask(this)">Delete</button>
    `;
    
    taskItem.innerHTML = taskInfo;
    taskList.appendChild(taskItem);
}
const pr=document.getElementById("complete")

function markAsCompleted(button) {
    button.parentElement.classList.toggle('completed');
    button.classList.toggle('pressed')
}



function deleteTask(button) {
    var taskItem = button.parentElement;
    taskItem.classList.add('delete-animation');
    setTimeout(function() {
        taskItem.remove();
    }, 500); // время в миллисекундах, соответствующее длительности анимации
}


function clearForm() {
    document.getElementById('task-name').value = '';
}
