   import "./todos.css"
   
export default function createTodo(todo, project) {
    const card = document.createElement("div")
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
    return card
}

export function createTodoExpanded(todo, project) {
    const card = document.createElement("div")
    card.classList.add("todo-expanded-card")

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
    return card
}
   
   