const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateElement = document.getElementById("date");
const clockElement = document.getElementById("clock");

// Function to add a task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// Function to save data to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show tasks from localStorage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();

// Function to update the clock and date
function updateClockAndDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    dateElement.textContent = formattedDate;
    clockElement.textContent = formattedTime;
}

// Update clock and date every second
setInterval(updateClockAndDate, 1000);
