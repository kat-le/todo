   import "./todos.css"
   
   export default function createTodo(todo, project) {
    const card = document.createElement("div")
    card.classList.add("todo-card");

    card.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.desc}</p>
        <p>${todo.formatDate()}<p>
        <p>${todo.priority}</p>
        <button class="complete" data-id="${todo.id}" data-project-id="${project.id}">
            ${todo.completed ? "Mark Undone" : "Mark Done"}
        </button>
            <button class="edit-todo" data-id="${todo.id}" data-project-id="${project.id}">
            Edit
        </button>
        <button class="delete-todo" data-id="${todo.id}" data-project-id="${project.id}">
            Delete
        </button>
    `;
    return card
}
   
   