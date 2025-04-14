const API_URL = "http://192.168.1.135:3000/api/auth/login";
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
import { redirectIfLoggedIn } from "./utils.js";

// Redirect user to dashboard if logged in
redirectIfLoggedIn();

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    let response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const result = await response.json();
    console.log(result);
    redirectIfLoggedIn();
  } catch (error) {
    console.error("Error logging in:", error);
  }
});
