import { deleteTodo } from "./deleteTodo.js";
import { toggleTodoCompletion } from "./toggleTodoCompletion.js";

export function openMoreVert(event, API_URL_TODO, todos, displayTodos) {
  const clickedElement = event.target.parentElement;
  const rect = clickedElement.getBoundingClientRect();

  const menu = document.createElement("div");
  menu.classList = "moreVert-menu";
  if (rect.bottom > window.innerHeight - 150) {
    menu.style.top = `${rect.bottom - 180}px`;
  } else {
    menu.style.top = `${rect.bottom}px`;
  }

  const menuItems = [
    { text: "Edit", icon: "edit", action: "edit" },
    { text: "Delete", icon: "delete", action: "delete" },
    { text: "Mark as completed", icon: "check_circle", action: "complete" },
  ];

  menuItems.forEach((item) => {
    const menuItem = document.createElement("div");
    const menuItemIcon = document.createElement("div");
    const menuItemText = document.createElement("span");

    menuItem.classList = "moreVert-menu-item";
    menuItemIcon.classList = "moreVert-menu-item-icon material-icons";
    menuItemText.classList = "moreVert-menu-item-text";

    menuItemIcon.textContent = item.icon;
    menuItemText.textContent = item.text;

    menuItem.appendChild(menuItemIcon);
    menuItem.appendChild(menuItemText);

    menuItem.addEventListener("click", () => {
      handleMenuAction(
        item.action,
        clickedElement,
        API_URL_TODO,
        todos,
        displayTodos
      );
      closeAllMenus();
    });

    menu.appendChild(menuItem);
  });

  const inboxElement = document.querySelector(".inbox");

  // Store the current scroll position
  inboxElement._scrollTop = inboxElement.scrollTop;

  // Make the content unscrollable but keep the scrollbar visible
  inboxElement.style.pointerEvents = "none";

  // Add a wheel event listener to prevent scrolling
  document.addEventListener("wheel", preventScroll, { passive: false });

  document.addEventListener("click", closeMenuOnOutsideClick);

  document.body.appendChild(menu);
}

// Function to prevent scrolling
function preventScroll(e) {
  e.preventDefault();
}

function closeAllMenus() {
  const menus = document.querySelectorAll(".moreVert-menu");
  menus.forEach((menu) => {
    document.removeEventListener("click", closeMenuOnOutsideClick);
    menu.remove();
  });

  // Re-enable scrolling on the inbox element
  const inboxElement = document.querySelector(".inbox");
  inboxElement.style.pointerEvents = "";

  // Remove the wheel event listener
  document.removeEventListener("wheel", preventScroll);
}

function closeMenuOnOutsideClick(event) {
  const menus = document.querySelectorAll(".moreVert-menu");
  if (menus.length > 0) {
    let clickedInsideMenu = false;
    menus.forEach((menu) => {
      if (menu.contains(event.target)) {
        clickedInsideMenu = true;
      }
    });
    if (
      !clickedInsideMenu &&
      !event.target.classList.contains(".inbox-todo-moreVert")
    ) {
      closeAllMenus();
    }
  }
}

function handleMenuAction(
  action,
  todoElement,
  API_URL_TODO,
  todos,
  displayTodos
) {
  if (!todoElement) return;

  const todoId = todoElement.dataset.id;

  switch (action) {
    case "edit":
      const modal = document.querySelector('[data-id="editModal"]');
      modal.style.display = "flex";
      modal.dataset.todoId = todoId
      document.querySelector('[data-id="editModalTitle"]').value = todoElement.querySelector(".inbox-todo-content > div").textContent;
      document.querySelector('[data-id="editModalDescription"]').value = todoElement.querySelector(".inbox-todo-content > p").textContent;
      document.querySelector('[data-id="editModalDueDate"]').value = todoElement.querySelector(".inbox-todo-content > small").dataset.duedate;
      modal.showModal();
      break;
    case "delete":
      deleteTodo(API_URL_TODO, todos, displayTodos, todoId);
      break;
    case "complete":
      const isComplete = !todoElement.querySelector('input').checked
      toggleTodoCompletion(API_URL_TODO, todos, displayTodos, todoId, isComplete)
      break;
  }
}
