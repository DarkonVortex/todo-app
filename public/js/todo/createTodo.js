import { fetchTodos } from "./fetchTodos.js";

export async function createTodo(API_URL_TODO, todos, displayTodos) {
  try {
    const titleInput = document.querySelector('[data-id="createModalTitle"]');
    const descriptionInput = document.querySelector('[data-id="createModalDescription"]');
    const dueDateInput = document.querySelector('[data-id="createModalDueDate"]');
    
    const todoBody = { 
      title: titleInput.value, 
      description: descriptionInput.value, 
      dueDate: new Date(dueDateInput.value).toISOString() 
    };

    const response = await fetch(API_URL_TODO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(todoBody),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    
    const result = await response.json();
    console.log("Todo created:", result);
    
    document.querySelectorAll('[data-id="createModalForm"]').forEach((form) => form.reset())
    document.querySelector('[data-id="createModal"]').close();
    document.querySelector(".create-modal").style.display = "";
    
    fetchTodos(API_URL_TODO, todos, displayTodos);
  } catch (error) {
    console.error("Error creating todo:", error);
    alert("Failed to create task. Please try again.");
  }
}