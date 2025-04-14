const API_URL = 'http://192.168.1.135:3000/api/auth/register'
const loginForm = document.getElementById('registerForm')
const name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
import { redirectIfLoggedIn } from '../utils.js'

// Redirect user to dashboard if logged in
redirectIfLoggedIn()

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
        let response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ username: name.value, email: email.value, password: password.value })
        })
    
        const result = await response.json();
    
        console.log(result)
    } catch (error) {
        console.error('Error logging in:', error)
    }
})                                                                                                                                                              
