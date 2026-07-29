import "./styles.css"
import Project from "./project.js"
import Todo from "./todo.js"
import ProjectManager from "./projectManager.js";
import domController from "./domController.js";
import { saveActiveProject, loadActiveProject, loadProjects, saveProjects } from "./storage.js";

const manager = new ProjectManager();

const savedProjects = loadProjects();

if (savedProjects.length === 0) {
    createSeedData();
} else {
    manager.projects = savedProjects;

    const activeId = loadActiveProject();

    if (activeId) {
        manager.setActiveProject(activeId);
    } else {
        manager.activeProject = manager.projects[0];
    }
    refresh();
}

domController.renderActiveProject(manager.activeProject);

function createSeedData() {
    const seedProject = new Project("Untitled");
    manager.addProject(seedProject);
    saveProjects(manager.projects)
    refresh()
}

domController.renderProjectForm();

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
        manager.setActiveProject(project.id);
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

    if (event.target.classList.contains("show-projects")) {
        domController.toggleProjectNames(manager.projects, manager.activeProject);
    }

    if (event.target.classList.contains("project-list-btn")) {
        const projectId = event.target.dataset.id
        manager.setActiveProject(projectId)
        saveActiveProject(projectId)
        domController.closeProjectList();
        refresh()
    }
});


function refresh() {
    domController.renderProjects(manager.projects);
    domController.renderActiveProject(manager.activeProject);
}






