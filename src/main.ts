// Uppgift 0 – Skapa en typ för en task
type Task = {
  id: number;
  name: string;
  priority: string;
  completed: boolean;
};

// Här sparar vi namnet på nyckeln i Local Storage
const STORAGE_KEY = "tasks";

// Här hämtar vi element från HTML
const taskForm = document.querySelector("#task-form") as HTMLFormElement;
const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
const taskList = document.querySelector("#task-list") as HTMLUListElement;

// Uppgift 4 – Ladda tasks när appen startar
let tasks: Task[] = loadTasks();


// Uppgift 1 – Skapa saveTasks()
// Den här funktionen sparar arrayen i Local Storage
function saveTasks(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}


// Uppgift 3 – Skapa loadTasks()
// Den här funktionen hämtar tasks från Local Storage
function loadTasks(): Task[] {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  // getItem kan returnera null
  if (savedTasks === null) {
    return [];
  }

  return JSON.parse(savedTasks) as Task[];
}


// Funktion för att visa alla tasks på sidan
function renderTasks(): void {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = `${task.name} - ${task.priority}`;

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Ta bort";

    // Uppgift 2 – Spara automatiskt när task ändras till Completed/Pending
    checkbox.addEventListener("change", () => {
      toggleCompleted(task.id);
    });

    // Uppgift 2 – Spara automatiskt när en task tas bort
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}


// Funktion för att lägga till en ny task
function addTask(name: string, priority: string): void {
  const newTask: Task = {
    id: Date.now(),
    name: name,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);

  // Uppgift 2 – Spara automatiskt när en task skapas
  saveTasks();

  renderTasks();
}


// Funktion för att markera Completed eller Pending
function toggleCompleted(id: number): void {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;
  });

  // Uppgift 2 – Spara automatiskt när status ändras
  saveTasks();

  renderTasks();
}


// Funktion för att ta bort en task
function deleteTask(id: number): void {
  tasks = tasks.filter((task) => task.id !== id);

  // Uppgift 2 – Spara automatiskt när en task tas bort
  saveTasks();

  renderTasks();
}


// Uppgift 2 – Spara automatiskt när formuläret skapar en ny task
taskForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const taskName = taskInput.value.trim();
  const taskPriority = priorityInput.value;

  if (taskName === "") {
    return;
  }

  addTask(taskName, taskPriority);

  taskInput.value = "";
  priorityInput.value = "medium";
});


// Uppgift 4 – Rendera sidan när appen startar
renderTasks();


// Uppgift 6 – Titta i DevTools
// Application → Local Storage
// Där ser du att datan sparas som text.
// Vi använder JSON.stringify() för att göra arrayen till text.
// Vi använder JSON.parse() för att göra texten till array igen.