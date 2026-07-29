import "./styles.css"
import Project from "./project.js"
import Todo from "./todo.js"
import ProjectManager from "./projectManager.js";
import domController from "./domController.js";
import calendarController from "./calendarController.js";
import clockController from "./clockController.js";
import { saveActiveProject, loadActiveProject, loadProjects, saveProjects } from "./storage.js";

const manager = new ProjectManager();
const savedProjects = loadProjects();
// localStorage.clear()

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
    saveActiveProject(manager.activeProject.id)
    refresh();
}

console.log(manager.activeProject)
clockController.renderClock();

function createSeedData() {
    const seedProject = new Project("Untitled", "Project description");

    manager.addProject(seedProject);
    manager.activeProject = seedProject;

    saveProjects(manager.projects)
    saveActiveProject(seedProject.id)
    refresh()
}

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
        saveActiveProject(project.id)
        refresh()
        document.querySelector("#add-project-dialog").close();
    }

  if (event.target.id === "todo-form") {
        const formData = new FormData(event.target);

        const todo = new Todo(
            formData.get("title"),
            formData.get("desc"),
            formData.get("date"),
            formData.get("priority")
        );

        const project = manager.activeProject;

        project.addTodo(todo);
        saveProjects(manager.projects)
        refresh()
        document.querySelector("#add-todo-dialog").close();
    }

    if (event.target.id === "edit-form") {
        const formData = new FormData(event.target);
        const project = manager.activeProject;
        const todo = project.findTodo(event.target.dataset.todoId)

        todo.edit({
            title: formData.get("title"),
            desc: formData.get("desc"),
            date: formData.get("date"),
            priority: formData.get("priority")
        });
        saveProjects(manager.projects)

        refresh()
        document.querySelector("#edit-todo-dialog").close();
       
    }
    if (event.target.id === "edit-project-form") {
        const formData = new FormData(event.target);
        const project = manager.activeProject;

        project.edit({
            title: formData.get("title"),
            desc: formData.get("desc"),
        });
        saveProjects(manager.projects)
        refresh()
        document.querySelector("#edit-project-dialog").close();
    }
});

//handle clicks
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-todo-btn")) {
        const projectId = manager.activeProject.id
        domController.renderTodoForm(projectId);
    }

    if (event.target.classList.contains("edit-todo")) {
       const id = event.target.dataset.id
       const project = manager.activeProject;
       const todo = project.findTodo(id)
       domController.renderEditTodoForm(project, todo);
    }

    if (event.target.classList.contains("complete")) {
        const id = event.target.dataset.id
        const project = manager.activeProject;
        const todo = project.findTodo(id)
        todo.toggleCompleted();
        saveProjects(manager.projects)
        refresh()
    }

    if (event.target.classList.contains("delete-todo")) {
        const id = event.target.dataset.id
        const project = manager.activeProject;
        project.removeTodo(id);
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
    if (event.target.classList.contains("add-project-btn")) {
        domController.renderAddProjectForm()
    }

    if (event.target.classList.contains("edit-project-btn")) {
        domController.renderEditProjectForm(manager.activeProject)
    }

    if (event.target.classList.contains("delete-project-btn")) {
        const projectId = manager.activeProject.id
        manager.removeProject(projectId)
        saveProjects(manager.projects)

        if (manager.projects.length === 0) {
            createSeedData();
        } else {
            manager.setActiveProject(manager.projects[0].id);
            saveActiveProject(manager.activeProject.id)
            refresh()
        }
    }
});

function refresh() {
    domController.renderActiveProject(manager.activeProject);
    domController.renderProjectTodos(manager.activeProject)
    domController.renderPercentCompleted(manager.activeProject)
    calendarController.renderCalendar();
}






