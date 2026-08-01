import "./todos.css";
import check from "./assets/icons/check.png";
import uncheck from "./assets/icons/uncheck.png";

export default function createTodo(todo, project) {
  const card = document.createElement("div");
  card.classList.add("todo-card");

  card.innerHTML = `
        <div class="card-section">
            <button class="complete" data-id="${todo.id}" data-project-id="${project.id}"></button>
            <p class="todo-title">
                <button class="todo-btn" data-id="${todo.id}">${todo.title}</button>
            </p>
        </div>
        <div class="card-section">
            <div class="priority-color"></div>
            <div class="priority-letter"></div>
        </div>
        <div class="card-section">
            <p class="todo-date">${todo.formatDate()}<p>
        </div>
        <div class="card-section">
            <button class="delete-todo" data-id="${todo.id}" data-project-id="${project.id}"></button>
        </div>
    `;

  const priority = card.querySelector(".priority-color");
  const letter = card.querySelector(".priority-letter");
  if (todo.priority === "High") {
    letter.textContent = "h";
    priority.style.backgroundColor = "#f56767";
  } else if (todo.priority === "Medium") {
    letter.textContent = "m";
    priority.style.backgroundColor = "#ffde59";
  } else {
    letter.textContent = "l";
    priority.style.backgroundColor = "#bce86f";
  }

  const checkmark = card.querySelector(".complete");
  if (todo.completed) {
    checkmark.style.backgroundImage = `url(${check})`;
  } else {
    checkmark.style.backgroundImage = `url(${uncheck})`;
  }
  return card;
}

export function createTodoExpanded(todo, project) {
  const card = document.createElement("div");
  card.classList.add("todo-expanded-card");

  card.innerHTML = `
        <button class="back-btn">< Back</button>
        <div class="expanded-content">
            <div class="expand-section">
                <div>
                    <p>Title</p>
                    <p>${todo.title}</p>
                </div>
            </div>
            <div class="expand-section">
                <div>
                    <p>Due date</p>
                    <p>${todo.formatDate()}</p>
                </div>
            </div>
            <div class="expand-section">
                <div>
                    <p>Priority</p>
                    <p>${todo.priority}</p>
                </div>
            </div>
            <div class="expand-section">
                <div>
                    <p>Notes</p>
                    <p>${todo.desc}</p>
                </div>
            </div>
            <button class="edit-todo" data-id="${todo.id}" data-project-id="${project.id}">
                Edit todo
                <div class="edit-img"></div>
            </button>
        </div>
    `;
    
  return card;
}
