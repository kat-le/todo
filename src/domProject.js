import "./projects.css"

export default function createProjects(project) {
    const projectCard = document.createElement("div")
    projectCard.classList.add("project");

    const left = document.createElement("div")
    left.className = "left-side"

    const right = document.createElement("div")
    right.className = "right-side"

    const button = document.createElement("button");
    button.textContent = project.title;
    button.dataset.id = project.id;

    const projectDesc = document.createElement("p")
    projectDesc.textContent = project.desc

    const deleteBtn = document.createElement("button");
    deleteBtn.dataset.id = project.id
    deleteBtn.classList = "delete-proj"
    deleteBtn.textContent = "Delete Project"

    const addTodoBtn = document.createElement("button")
    addTodoBtn.dataset.projectId = project.id;
    addTodoBtn.textContent = "Add Todo"
    addTodoBtn.classList.add("add-todo");

    const todos = document.createElement("div")
    todos.classList.add("todos");

    return {
        projectCard,
        left,
        right,
        button,
        projectDesc,
        deleteBtn,
        addTodoBtn,
        todos
    }
}