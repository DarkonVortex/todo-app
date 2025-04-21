export async function fetchTodos(API_URL_TODO, todos, displayTodos) {
try {
    let response = await fetch(API_URL_TODO, {
        method: 'GET',
        credentials: 'include'
    })

    const result = await response.json();
    todos.length = 0
    todos.push(...result)
    console.log(todos)
    displayTodos(API_URL_TODO, todos, displayTodos)

} catch (error) {
    console.log("Error fetching todos:", error)
}
}