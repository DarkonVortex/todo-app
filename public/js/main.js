const API_URL_TODO = "http://192.168.1.135:3000/api/todo/";
import { fetchTodos } from "./todo/fetchTodos.js";
import { createTodo } from "./todo/createTodo.js";
import { displayTodos } from "./todo/displayTodos.js";
import { openMoreVert } from "./todo/openMoreVert.js";
import { closeSidebarMenu, openSidebar } from "./todo/sidebarFunctions.js";
import { redirectIfNotLoggedIn, logOut, createTodoInputValidation } from "./utils.js";
import { updateTodo } from "./todo/updateTodo.js";

const logOutButton = document.getElementById("logOutButton");
const closeSidebarButton = document.getElementById("closeSidebarButton");
const createTodoModal = document.querySelector('[data-id="createModal"]');
const editTodoModal = document.querySelector('[data-id="editModal"]');
const createTodoForm = document.querySelectorAll('[data-id="createModalForm"]');
const closeCreateModalBtn = document.querySelectorAll(
  '[data-id="createModalClose"]'
);
const cancelCreateTodoBtn = document.querySelectorAll(
  ".create-modal-form-cancel-button"
);
let todos = [];

redirectIfNotLoggedIn();

document.addEventListener("click", (event) => {
  // Open Modal: Create todo
  if (event.target && event.target.classList.contains("create-task-button")) {
    // Set default due time to tomorrow
    const createModalDueDate = document.querySelector('[data-id="createModalDueDate"]');
    let tomorrow = new Date();
    createModalDueDate.value = `${tomorrow.getFullYear()}-0${tomorrow.getMonth() + 1}-${tomorrow.getDate() + 1}T${tomorrow.getHours() + 1}:00`;
    createModalDueDate.setAttribute('min', `${tomorrow.getFullYear()}-0${tomorrow.getMonth() + 1}-${tomorrow.getDate()}T${tomorrow.getHours()}:${tomorrow.getMinutes()}`);
    document.querySelector(".create-modal").style.display = "flex";
    createTodoModal.showModal();
  }

  // Open Sidebar
  if (event.target.id == "openSidebarButton") {
    openSidebar();
  }

  // Open the 'more vert' element
  if (event.target && event.target.classList.contains("inbox-todo-moreVert")) {
    openMoreVert(event, API_URL_TODO, todos, displayTodos);
  }
});

// Close sidebar
closeSidebarButton.addEventListener("click", closeSidebarMenu);

// Close/Cancel modal buttons
cancelCreateTodoBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll('.form-inputs-errors').forEach((element) => element.style.display = "none")
    document.querySelectorAll('[data-id="createFormErrors"]').forEach((element) => element.innerHTML = "")
    createTodoModal.close();
    editTodoModal.close();
    document.querySelectorAll(".create-modal").forEach((modal) => modal.style.display = "")
  });
})
closeCreateModalBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll('.form-inputs-errors').forEach((element) => element.style.display = "none")
    document.querySelectorAll('[data-id="createFormErrors"]').forEach((element) => element.innerHTML = "")
    createTodoModal.close();
    editTodoModal.close();
    document.querySelectorAll(".create-modal").forEach((modal) => modal.style.display = "")
  });
})

// Form submission
createTodoForm.forEach((form) => {
  form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (createTodoInputValidation(form).isValid) {

      document.querySelectorAll('.form-inputs-errors').forEach((element) => element.style.display = "none")
      document.querySelectorAll('[data-id="createFormErrors"]').forEach((element) => element.innerHTML = "")

      if (form.parentElement.parentElement.dataset.id == "createModal") {

        createTodo(API_URL_TODO, todos, displayTodos);

      } else if (form.parentElement.parentElement.dataset.id == "editModal") {

        const todoId = form.parentElement.parentElement.dataset.todoId
        updateTodo(API_URL_TODO, todos, displayTodos, todoId);

      }
    } else {

      document.querySelectorAll('.form-inputs-errors').forEach(element => element.style.display = "block");
      const createFormErrorsElement = document.querySelectorAll('[data-id="createFormErrors"]')

      createTodoInputValidation(form).errors.map((err) => {
        createFormErrorsElement.forEach(element => {
          const errElement = document.createElement('li'); // Create a new <li> for each parent
          errElement.textContent = err;
          console.log(element);
          element.appendChild(errElement);
        });
      });
    }
  });
})

// Log out button
if (logOutButton) {
  logOutButton.addEventListener("click", logOut);
}

// Fetch todos
fetchTodos(API_URL_TODO, todos, displayTodos);
