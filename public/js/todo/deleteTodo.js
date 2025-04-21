import { fetchTodos } from "./fetchTodos.js";

export async function deleteTodo(API_URL_TODO, todos, displayTodos, id) {
  try {
    const response = await fetch(`${API_URL_TODO}${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    const result = await response.json();

    console.log(result);

    fetchTodos(API_URL_TODO, todos, displayTodos)
  } catch (error) {
    console.log("Error deleteting todo:", error);
  }
}
