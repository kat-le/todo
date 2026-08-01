import { format } from "date-fns";
import createTodo from "./domTodo";
import { createTodoExpanded } from "./domTodo";
import check from "./assets/icons/check.png";
import uncheck from "./assets/icons/uncheck.png";

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
    const header = document.createElement("div")
    header.className = "todos-header"
    const p1 = document.createElement("p")
    p1.textContent = "Todos"
    const p2 = document.createElement("p")
    p2.textContent = "Priority"
    const p3 = document.createElement("p")
    p3.textContent = "Due date"
    header.appendChild(p1)
    header.appendChild(p2) 
    header.appendChild(p3)
    todoContainer.appendChild(header)
     
    project.todos.forEach(todo => {
      const card = createTodo(todo, project)
      todoContainer.appendChild(card)
      const priority = card.querySelector(".priority-color")
      const letter = card.querySelector(".priority-letter")
      if (todo.priority === "High") {
          letter.textContent = "h"
          priority.style.backgroundColor = "#f56767";
      } else if (todo.priority === "Medium") {
          letter.textContent = "m"
          priority.style.backgroundColor = "#ffde59";
      } else {
          letter.textContent = "l"
          priority.style.backgroundColor = "#bce86f";
      }
    
      const checkmark = card.querySelector(".complete")
      if (todo.completed) {
         checkmark.style.backgroundImage = `url(${check})`;
      } else {
        checkmark.style.backgroundImage = `url(${uncheck})`;
      }
    })
  }

  function renderExpandedTodo(todo, project) {
      const todosContainer = document.querySelector(".todos-container")
      clear(todosContainer)
      todosContainer.appendChild(createTodoExpanded(todo, project))
  }

 function renderAddProjectForm() {
    const dialog = document.querySelector("#add-project-dialog");

     dialog.innerHTML = `
      <form id="project-form">
        <input name="title" placeholder="Project name" required>
        <input name="desc" placeholder="Project Description">
        <div class="form-btns">
          <button type="button" id="cancel-btn">Cancel</button>
          <button type="submit">Add Project</button>
        </div>
      </form>`
    ;
    document.body.classList.add("dialog-open");
    dialog.showModal();

    dialog.querySelector("#cancel-btn").addEventListener("click", () => {
    dialog.close();
    document.body.classList.remove("dialog-open");

  });
}

function renderTodoForm(projectId) {

  const dialog = document.querySelector("#add-todo-dialog");

  dialog.innerHTML = `
    <form id="todo-form" data-project-id="${projectId}">
      <input name="title" placeholder="Title" required>

      <textarea name="desc" placeholder="Notes"></textarea>

      <input name="date" type="date" required>

      <select name="priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div class="form-btns">
        <button type="button" id="cancel-btn">Cancel</button>
        <button type="submit">Add Todo</button>
      </div>
    </form>
  `;
  document.body.classList.add("dialog-open");
  dialog.showModal();

  dialog.querySelector("#cancel-btn").addEventListener("click", () => {
    dialog.close();
    document.body.classList.remove("dialog-open");
  });
}

function renderEditTodoForm(project, todo) {
  const dialog = document.querySelector("#edit-todo-dialog");

  dialog.innerHTML = `
    <form id="edit-form" data-project-id="${project.id}" data-todo-id="${todo.id}">
      <label for="title">Title</label>
      <input name="title" value="${todo.title}">
      <label for="date">Due date</label>
      <input name="date" type="date" value="${format(todo.date, "yyyy-MM-dd")}">
      <label for="priority">Priority</label>
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
      <label for="desc">Notes</label>
      <textarea name="desc"></textarea>
      <div class="form-btns">
        <button type="button" id="cancel-btn">Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  `; 
    dialog.querySelector("textarea").value = todo.desc;
    document.body.classList.add("dialog-open");
    dialog.showModal();

    dialog.querySelector("#cancel-btn").addEventListener("click", () => {
      document.body.classList.remove("dialog-open");
      dialog.close();
  });
}

function toggleProjectNames(projects, activeProject) {
    const projectListContainer = document.querySelector(".project-list-container");
    projectListContainer.innerHTML = "";
    projectListContainer.classList.toggle("hidden");
    const showBtn = document.querySelector(".show-projects")
    showBtn.classList.toggle("open")

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

function resetProjectButton() {
    const showBtn = document.querySelector(".show-projects");
    showBtn.classList.remove("open");
}

function renderEditProjectForm(project) {
  const dialog = document.querySelector("#edit-project-dialog");

  dialog.innerHTML = `
    <form id="edit-project-form" data-id="${project.id}"">
      <input name="title" value="${project.title}">
      <textarea
        name="desc"></textarea>
      <div class="form-btns">
        <button type="button" id="cancel-btn">Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  `;
  dialog.querySelector("textarea").value = project.desc;
  document.body.classList.add("dialog-open");
  dialog.showModal();

  dialog.querySelector("#cancel-btn").addEventListener("click", () => {
    document.body.classList.remove("dialog-open");
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
    renderPercentCompleted,
    resetProjectButton,
    renderExpandedTodo
  };

})();

export default domController;