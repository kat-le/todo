import { format } from "date-fns";
import createTodo from "./domTodo";

const domController = (() => {

  function clear(element) {
    element.innerHTML = "";
  }

  function renderActiveProject(project) {
      const title = document.querySelector(".active-project-title");
      if (!project) return;
      title.textContent = project.title;
      const desc = document.querySelector(".active-description")
      desc.textContent = project.desc
  }

  function renderProjectTodos(project) {
    const todoContainer = document.querySelector(".todos-container")
    clear(todoContainer)
     
    project.todos.forEach(todo => {
      const card = createTodo(todo, project)
      todoContainer.appendChild(card)
    })
  }

 function renderAddProjectForm() {
    const dialog = document.querySelector("#add-project-dialog");

     dialog.innerHTML = `
      <form id="project-form">
        <input name="title" placeholder="Project name" required>
        <input name="desc" placeholder="Project Description">
        <button type="submit">Add Project</button>
        <button type="button" id="cancel-btn">Cancel</button>
      </form>`
    ;

    dialog.showModal();

    dialog.querySelector("#cancel-btn").addEventListener("click", () => {
    dialog.close();
  });
}

function renderTodoForm(projectId) {
  const dialog = document.querySelector("#add-todo-dialog");

  dialog.innerHTML = `
    <form id="todo-form" data-project-id="${projectId}">
      <input name="title" placeholder="Title" required>

      <textarea
        name="desc"
        placeholder="Description">
      </textarea>

      <input name="date" type="date">

      <select name="priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Add Todo</button>
      <button type="button" id="cancel-btn">Cancel</button>
    </form>
  `;

  dialog.showModal();

  dialog.querySelector("#cancel-btn").addEventListener("click", () => {
    dialog.close();
  });
}

function renderEditTodoForm(project, todo) {
  const dialog = document.querySelector("#edit-todo-dialog");

 dialog.innerHTML = `
    <form id="edit-form" data-project-id="${project.id}" data-todo-id="${todo.id}">
      <input name="title" value="${todo.title}">

      <textarea
        name="desc">
        ${todo.desc} 
      </textarea>

      <input name="date" type="date" value="${format(todo.date, "yyyy-MM-dd")}">

      <select name="priority">
         <option value="Low" ${todo.priority === "Low" ? "selected" : ""}>
        Low
        </option>
        <option value="Medium" ${todo.priority === "Medium" ? "selected" : ""}>
            Medium
        </option>
        <option value="High" ${todo.priority === "High" ? "selected" : ""}>
            High
        </option>
      </select>


      <button type="submit">Save</button>
      <button type="button" id="cancel-btn">Cancel</button>
    </form>
  `; 

  dialog.showModal();

  dialog.querySelector("#cancel-btn").addEventListener("click", () => {
    dialog.close();
  });
}

function toggleProjectNames(projects, activeProject) {
    const projectListContainer = document.querySelector(".project-list-container");
    projectListContainer.innerHTML = "";
    projectListContainer.classList.toggle("hidden");

    const projectList = document.createElement("div")
    projectList.className = "project-list"

    projects.forEach((project) => {
      if (activeProject != null && activeProject.id != project.id) {
        const div = document.createElement("div")
        div.className = "project-list-item"
        const projectBtn = document.createElement("button")
        projectBtn.textContent = project.title
        projectBtn.className = "project-list-btn"
        projectBtn.dataset.id = project.id
        div.appendChild(projectBtn)
        projectList.appendChild(div)
      }
    })
    projectListContainer.appendChild(projectList)
}

function closeProjectList() {
    const container = document.querySelector(".project-list-container");
    container.classList.add("hidden");
}

function renderEditProjectForm(project) {
  const dialog = document.querySelector("#edit-project-dialog");

  dialog.innerHTML = `
    <form id="edit-project-form" data-id="${project.id}"">
      <input name="title" value="${project.title}">

      <textarea
        name="desc">
        ${project.desc} 
      </textarea>
      <button type="submit">Save</button>
      <button type="button" id="cancel-btn">Cancel</button>
    </form>
  `;

  dialog.showModal();

  dialog.querySelector("#cancel-btn").addEventListener("click", () => {
    dialog.close();
  });
}

function renderPercentCompleted(project) {
    const percentage = document.querySelector(".percent")
    clear(percentage)
    const percent = project.getCompletionPercentage()
    percentage.textContent = `${percent}% completed`

    const fill = document.querySelector(".bar-fill");
    fill.style.width = `${percent}%`;
}


  return {
    renderTodoForm,
    renderEditTodoForm,
    toggleProjectNames,
    renderActiveProject,
    closeProjectList,
    renderEditProjectForm,
    renderAddProjectForm,
    renderProjectTodos,
    renderPercentCompleted
  };

})();

export default domController;