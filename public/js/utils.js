const API_URL_ME = "http://192.168.1.135:3000/api/protected/me";
const API_URL_LOGOUT = "http://192.168.1.135:3000/api/auth/logout";

export async function redirectIfLoggedIn(redirectUrl = "/dashboard.html") {
  try {
    const response = await fetch(API_URL_ME, {
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = redirectUrl;
    } else {
      console.log("response not ok");
    }
  } catch (error) {
    console.log("No authentication, can stay on this page");
  }
}

export async function redirectIfNotLoggedIn(redirectUrl = "/login.html") {
    try {
      const response = await fetch(API_URL_ME, {
        credentials: "include",
      });
  
      if (!response.ok) {
        window.location.href = redirectUrl;
      } else {
        console.log("response ok");
      }
    } catch (error) {
      console.log("No authentication, cannot stay on this page");
    }
  }

export async function logOut() {
  try {
    const response = await fetch(API_URL_LOGOUT, {
      method: "POST",
      credentials: "include",
    });

    const result = await response.json();
    console.log(result);

    window.location.href = "/login.html";
  } catch (error) {
    console.log("No authentication, can stay on this page");
  }
}
