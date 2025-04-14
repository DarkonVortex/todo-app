const API_URL = 'http://192.168.1.135:3000/api/protected/me'
const getMe = document.getElementById('getMe')

getMe.addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
        let response = await fetch(API_URL, {
            method: 'GET',
            credentials: 'include'
        })
    
        const result = await response.json();
    
        console.log(result)
    } catch (error) {
        console.error('Error logging in:', error)
    }
})