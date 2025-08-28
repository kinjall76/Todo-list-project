const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("You must write something");
        return;
    }

    // create new list item
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = `
      <label>
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${task}</span>
      </label>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // add to container
    listContainer.appendChild(li);

    // clear input
    inputBox.value = "";

    // update counters
    updateCounters();
}

function updateCounters() {
    const checkboxes = listContainer.querySelectorAll(".task-checkbox");
    let completed = 0;
    let uncompleted = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) {
            completed++;
        } else {
            uncompleted++;
        }
    });

    completedCounter.textContent = completed;
    uncompletedCounter.textContent = uncompleted;
}

// Handle edit & delete
listContainer.addEventListener("click", e => {
    const target = e.target;
    const li = target.closest("li");
    if (!li) return;

    if (target.classList.contains("delete-btn")) {
        li.remove();
        updateCounters();
    }

    if (target.classList.contains("edit-btn")) {
        const span = li.querySelector(".task-text");
        const newTask = prompt("Edit your task:", span.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            span.textContent = newTask.trim();
        }
    }
});

// Update counters on checkbox change
listContainer.addEventListener("change", e => {
    if (e.target.classList.contains("task-checkbox")) {
        updateCounters();
    }
});
