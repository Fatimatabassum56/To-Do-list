document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTask = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;

            taskList.appendChild(taskItem);

            // Checkbox event listener
            const checkbox = taskItem.querySelector(".checkbox");
            checkbox.addEventListener("change", function () {
                tasks[index].completed = !tasks[index].completed;
                saveTasksToLocalStorage();
                updateTaskCount();
            });

            // Edit button event listener
            const editButton = taskItem.querySelector(".edit");
            editButton.addEventListener("click", function () {
                const newText = prompt("Edit the task:", task.text);
                if (newText !== null) {
                    tasks[index].text = newText;
                    saveTasksToLocalStorage();
                    renderTasks();
                }
            });

            // Delete button event listener
            const deleteButton = taskItem.querySelector(".delete");
            deleteButton.addEventListener("click", function () {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
                renderTasks();
            });
        });

        updateTaskCount();
    }

    addTask.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            return;
        }

        tasks.push({ text: taskText, completed: false });
        saveTasksToLocalStorage();
        renderTasks();

        taskInput.value = "";
    });

    // Initial rendering of tasks from local storage
    renderTasks();

    function updateTaskCount() {
        const total = tasks.length;
        const completed = tasks.filter((task) => task.completed).length;
        totalTasks.textContent = total;
        completedTasks.textContent = completed;
    }
});
