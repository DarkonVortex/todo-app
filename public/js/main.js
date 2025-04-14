import { logOut } from './utils.js'

const logOutButton = document.getElementById('logOutButton')

if (logOutButton) {
  logOutButton.addEventListener('click', logOut)
}