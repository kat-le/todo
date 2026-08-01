import Project from "./project.js";
import Todo from "./todo.js";

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}

export function saveActiveProject(projectId) {
  localStorage.setItem("activeProject", projectId);
}

export function loadActiveProject() {
  return localStorage.getItem("activeProject");
}

export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
  const data = localStorage.getItem("projects");

  if (!data) return [];

  const parsedProjects = JSON.parse(data);

  return parsedProjects.map((projectData) => {
    const project = new Project(projectData.title, projectData.desc);

    project.id = projectData.id;

    project.todos = projectData.todos.map((todoData) => {
      const todo = new Todo(
        todoData.title,
        todoData.desc,
        todoData.date,
        todoData.priority,
      );
      todo.id = todoData.id;
      todo.completed = todoData.completed;
      return todo;
    });
    return project;
  });
}
