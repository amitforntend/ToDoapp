const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    addTask(taskText);
    saveTask(taskText);

    taskInput.value = "";
});

// Add task to UI
function addTask(taskText, completed = false) {
    const li = document.createElement("li");
    li.textContent = taskText;

    if (completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent li click
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save a new task in localStorage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update localStorage when tasks change
function updateLocalStorage() {
    const allTasks = [];

    document.querySelectorAll("li").forEach(li => {
        allTasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// Load tasks from storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        addTask(task.text, task.completed);
    });
}
