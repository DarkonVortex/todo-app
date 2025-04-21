import { fetchTodos } from "./fetchTodos.js";

export async function updateTodo(API_URL_TODO, todos, displayTodos, id) {
    try {
      const titleInput = document.querySelector('[data-id="editModalTitle"]');
      const descriptionInput = document.querySelector('[data-id="editModalDescription"]');
      const dueDateInput = document.querySelector('[data-id="editModalDueDate"]');

      const updatedData = { 
        title: titleInput.value, 
        description: descriptionInput.value, 
        dueDate: new Date(dueDateInput.value).toISOString() 
      };

      const response = await fetch(`${API_URL_TODO}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }
      
      const result = await response.json();
      console.log("Todo edited:", result);
      
      document.querySelectorAll('[data-id="createModalForm"]').forEach(form => form.reset());
      document.querySelector('[data-id="editModal"]').close();
      document.querySelector('[data-id="editModal"]').style.display = "";
      
      fetchTodos(API_URL_TODO, todos, displayTodos);
    } catch (error) {
      console.error("Error editing todo:", error);
      alert("Failed to edit task. Please try again.");
    }
  }