const ulList = document.getElementById('ulList')
const API_URL_TODO = 'http://192.168.1.135:3000/api/todo/'
import { fetchTodos } from './todo/fetchTodos.js'
import { redirectIfNotLoggedIn, logOut } from './utils.js'

redirectIfNotLoggedIn()

const logOutButton = document.getElementById('logOutButton')

if (logOutButton) {
  logOutButton.addEventListener('click', logOut)
}

fetchTodos(API_URL_TODO)
