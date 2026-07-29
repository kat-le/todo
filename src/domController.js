import { format} from "date-fns";
import createProjects from "./domProject";
import createTodo from "./domTodo";

const domController = (() => {

  function clear(element) {
    element.innerHTML = "";
  }

  function renderProjects(projects) {
    const container = document.querySelector(".container");
    clear(container);

    projects.forEach(project => {
       const { 
        projectCard,
        left,
        right,
        button,
        projectDesc,
        deleteBtn,
        addTodoBtn,
        todos } = createProjects(project);
        
        project.todos.forEach(todo => {
          const card = createTodo(todo, project)
          todos.appendChild(card)
        })

        left.appendChild(button);
        left.appendChild(projectDesc)
        left.appendChild(deleteBtn)
        right.appendChild(addTodoBtn)
        right.appendChild(todos)

        projectCard.appendChild(left)
        projectCard.appendChild(right)
        container.appendChild(projectCard)
    });
  }

  function renderProjectForm() {
    const container = document.querySelector("#form-container");

    container.innerHTML = `
        <form id="project-form">
        <input name="title" placeholder="Project name" required>
        <input name="desc" placeholder="Project Description">

        <button type="submit">Add Project</button>
        </form>`

    ;
}

function renderTodoForm(projectId) {
  const dialog = document.querySelector("#todo-dialog");

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
  const dialog = document.querySelector("#edit-dialog");

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

function renderActiveProject(project) {
    const title = document.querySelector(".active-project-title");
    title.textContent = project.title;
}


  return {
    renderProjects,
    renderProjectForm,
    renderTodoForm,
    renderEditTodoForm,
    toggleProjectNames,
    renderActiveProject,
    closeProjectList
  };

})();

export default domController;