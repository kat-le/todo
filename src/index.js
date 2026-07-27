import "./styles.css"
import Project from "./project.js"
import Todo from "./todo.js"
import ProjectManager from "./projectManager.js";
import domController from "./domController.js";
import { loadProjects, saveProjects, storageAvailable } from "./storage.js";

const manager = new ProjectManager();
manager.projects = loadProjects();

refresh();

function createSeedData() {
    const seedProject = new Project(
    "Odin Project",
    "Build the Todo List app"
    );

    const seedTodo = new Todo(
        "Create project cards",
        "Render projects and todos on the page",
        "2026-08-01",
        "High"
    );
    seedProject.addTodo(seedTodo);
    manager.addProject(seedProject);
    saveProjects(manager.projects)
    refresh()
}

domController.renderProjectForm();
//createSeedData()

//handle submits 
document.addEventListener("submit", (event) => {
    event.preventDefault();

  if (event.target.id === "project-form") {
        const formData = new FormData(event.target);

        const project = new Project(
        formData.get("title"),
        formData.get("desc")
        );

        manager.addProject(project);
        saveProjects(manager.projects)
        refresh()
    }

  if (event.target.id === "todo-form") {
        const formData = new FormData(event.target);

        const todo = new Todo(
            formData.get("title"),
            formData.get("desc"),
            formData.get("date"),
            formData.get("priority")
        );

        const projectId = event.target.dataset.projectId;
        const project = manager.findProject(projectId);

        project.addTodo(todo);
        saveProjects(manager.projects)
        refresh()
        document.querySelector("#todo-dialog").close();
    }

    if (event.target.id === "edit-form") {
        const formData = new FormData(event.target);
        const project = manager.findProject(event.target.dataset.projectId);
        const todo = project.findTodo(event.target.dataset.todoId)

        todo.edit({
            title: formData.get("title"),
            desc: formData.get("desc"),
            date: formData.get("date"),
            priority: formData.get("priority")
        });
        saveProjects(manager.projects)

        refresh()
        document.querySelector("#edit-dialog").close();
       
    }
});

//handle clicks
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-todo")) {
       const projectId = event.target.dataset.projectId
       domController.renderTodoForm(projectId);
    }

    if (event.target.classList.contains("edit-todo")) {
       const id = event.target.dataset.id
       const projectId = event.target.dataset.projectId
       const project = manager.findProject(projectId);
       const todo = project.findTodo(id)
       domController.renderEditTodoForm(project, todo);
    }

    if (event.target.classList.contains("complete")) {
        const id = event.target.dataset.id
        const projectId = event.target.dataset.projectId
        const project = manager.findProject(projectId);
        const todo = project.findTodo(id)
        todo.toggleCompleted();
        saveProjects(manager.projects)
        refresh()
    }

    if (event.target.classList.contains("delete-todo")) {
        const id = event.target.dataset.id
        const projectId = event.target.dataset.projectId
        const project = manager.findProject(projectId);
        project.removeTodo(id);
        saveProjects(manager.projects)
        refresh()
    }

    if (event.target.classList.contains("delete-proj")) {
        const projectId = event.target.dataset.id
        manager.removeProject(projectId)
        saveProjects(manager.projects)
        refresh()
    }
});


function refresh() {
    domController.renderProjects(manager.projects);
}






