import { fetchTodos } from "./fetchTodos.js";

export async function toggleTodoCompletion(
  API_URL_TODO,
  todos,
  displayTodos,
  id,
  isComplete
) {
  try {
    // Find the checkbox element for this specific todo
    const todoElement = document.querySelector(`li[data-id="${id}"]`);
    const checkbox = todoElement.querySelector('input[type="checkbox"]');
    
    // Update the checkbox state
    checkbox.checked = isComplete;

    const response = await fetch(`${API_URL_TODO}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ completed: isComplete }),
    });

    if (!response.ok) {
      throw new Error("Failed to toggle todo completion");
    }

    const result = await response.json();
    console.log("Todo toggled:", result);

    // Only refresh todos after a short delay to allow the animation to complete
    setTimeout(() => {
        fetchTodos(API_URL_TODO, todos, displayTodos);
      }, 300); // Delay should be slightly longer than the animation duration
  } catch (error) {
    console.error("Error toggling todo:", error);
    alert("Failed to toggle task completion. Please try again.");

    // In case of error, revert the local state
    const todoIndex = todos.findIndex(todo => todo._id === id);
    if (todoIndex !== -1) {
      todos[todoIndex].completed = !isComplete;
      displayTodos(API_URL_TODO, todos, displayTodos);
    }
  }
}
