import { format} from "date-fns";

const domController = (() => {

  function renderProjects(projects) {
    const container = document.querySelector(".container");

    clear(container);

    projects.forEach(project => {
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
        
        project.todos.forEach(todo => {
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


  function clear(element) {
    element.innerHTML = "";
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

  return {
    renderProjects,
    renderProjectForm,
    renderTodoForm,
    renderEditTodoForm
  };

})();

export default domController;