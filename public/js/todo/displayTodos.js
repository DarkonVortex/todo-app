const ulList = document.querySelector(".ulList");
import { toggleTodoCompletion } from "./toggleTodoCompletion.js";

export async function displayTodos(API_URL_TODO, todos, displayTodos) {
  ulList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const date = document.createElement("small");
    const task = document.createElement("div");
    const description = document.createElement("p");
    const checkbox = document.createElement("input");
    const customCheckbox = document.createElement("label");
    const checkmark = document.createElement("span");
    const todoDiv = document.createElement("div");
    const moreVert = document.createElement("div");
    const hr = document.createElement("hr");

    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodoCompletion(API_URL_TODO, todos, displayTodos, todo._id, !todo.completed));
    customCheckbox.className = "custom-checkbox";
    checkmark.className = "checkmark";
    customCheckbox.appendChild(checkbox);
    customCheckbox.appendChild(checkmark);
    task.textContent = todo.title;
    description.innerHTML = formatDescription(todo.description);
    date.textContent = formatDueDate(todo.dueDate);
    date.dataset.duedate = todo.dueDate.slice(0, 16);
    moreVert.textContent = "more_vert";
    moreVert.className = "inbox-todo-moreVert material-icons";
    todoDiv.className = "inbox-todo-content";
    li.dataset.id = todo._id;
    todoDiv.addEventListener("click", () => {
      const modal = document.querySelector('[data-id="editModal"]');
      modal.style.display = "flex";
      modal.dataset.todoId = todo._id
      document.querySelector('[data-id="editModalTitle"]').value = li.querySelector(".inbox-todo-content > div").textContent;
      document.querySelector('[data-id="editModalDescription"]').value = li.querySelector(".inbox-todo-content > p").textContent;
      document.querySelector('[data-id="editModalDueDate"]').value = li.querySelector(".inbox-todo-content > small").dataset.duedate;
      modal.showModal();
    });

    todoDiv.appendChild(task);
    todoDiv.appendChild(description);
    todoDiv.appendChild(date);
    li.appendChild(customCheckbox);
    li.appendChild(todoDiv);
    li.appendChild(moreVert);
    ulList.appendChild(li);
    ulList.appendChild(hr);
  });
  const addNewTask = document.createElement("div");
  addNewTask.innerHTML = `
  <li data-id="addNewTaskButton" class="create-task-button" style="cursor:pointer;font-style: italic;align-items: center;">
     <label class="create-task-button custom-checkbox">
          <div style="width: 100%;height: 100%;" class="create-task-button add-new-task-icon material-icons">add_circle</div>
      </label>
      <div class="create-task-button inbox-todo-content">
          <div class="create-task-button">Add new task</div>
      </div>
  </li>
  <hr>
  `;

  ulList.appendChild(addNewTask);
}

function formatDueDate(todoDate) {
  const date = new Date(todoDate);
  let mins
  if (date.getMinutes().toString().split("").length == 2) { mins = date.getMinutes() }
  else if (date.getMinutes().toString().split("").length == 1) { mins = "0" + date.getMinutes() }
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} at ${date.getHours()}:${mins}`;
}

function formatDescription(todoDescription) {
  const rawHTML = todoDescription.replace(/\n/g, "<br>");
  return DOMPurify.sanitize(rawHTML, {
    ALLOWED_TAGS: ['br'], // solo permitimos <br>
    ALLOWED_ATTR: []      // ningún atributo permitido (así bloqueamos onerror, src, etc.)
  });
}
