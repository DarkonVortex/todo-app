const API_URL_ME = "http://192.168.1.135:3000/api/protected/me";
const API_URL_LOGOUT = "http://192.168.1.135:3000/api/auth/logout";

export async function redirectIfLoggedIn(redirectUrl = "/dashboard.html") {
  try {
    const response = await fetch(API_URL_ME, {
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = redirectUrl;
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

export function createTodoInputValidation(modalElement) {

  let isCompleteFormValid = true;

  let title
  let description
  let dueDate

  console.log(modalElement.parentElement.parentElement.dataset.id)
  if (modalElement.parentElement.parentElement.dataset.id == "createModal") {
    title = modalElement.querySelector('[data-id="createModalTitle"]').value;
    description = modalElement.querySelector('[data-id="createModalDescription"]').value;
    dueDate = modalElement.querySelector('[data-id="createModalDueDate"]').value;
  } else  if (modalElement.parentElement.parentElement.dataset.id == "editModal") {
    title = modalElement.querySelector('[data-id="editModalTitle"]').value;
    description = modalElement.querySelector('[data-id="editModalDescription"]').value;
    dueDate = modalElement.querySelector('[data-id="editModalDueDate"]').value;
  }

  console.log(title, description, dueDate)

  const isTitleValid = titleValidation(title);
  const isDescriptionValid = descriptionValidation(description);
  const isDueDateValid = dueDateValidation(dueDate);

  let allErrors = []

  if (
    isTitleValid.isValid == false ||
    isDescriptionValid.isValid == false ||
    isDueDateValid.isValid == false
  ) {
    isCompleteFormValid = false;
    allErrors = [
      isTitleValid.message, isDescriptionValid.message, isDueDateValid.message
    ]
    allErrors = allErrors.filter(str => str.trim() !== "");
  }

  return {
    isValid: isCompleteFormValid,
    fields: {
      title: {
        isValid: isTitleValid.isValid,
        message: isTitleValid.message,
      },
      description: {
        isValid: isDescriptionValid.isValid,
        message: isDescriptionValid.message,
      },
      dueDate: {
        isValid: isDueDateValid.isValid,
        message: isDueDateValid.message,
      },
    },
    errors: allErrors,
  };
}

function titleValidation(titleInput) {
  const title = titleInput.trim();
  if (title == "") return { isValid: false, message: "A title is required." };
  if (title.split("").length < 3 || title.split("").length > 100)
    return {
      isValid: false,
      message: "The title's length should be between 3 and 100 characters.",
    };
  return { isValid: true, message: "" };
}

function descriptionValidation(descriptionInput) {
  const description = descriptionInput.trim();
  if (description.split("").length > 500)
    return {
      isValid: false,
      message: "The description's length shouldn't exceed 500 characters.",
    };
  return { isValid: true, message: "" };
}

function dueDateValidation(dueDateInput) {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  const date = new Date(dueDateInput)
  const now = new Date()
  if (dueDateInput == "") return { isValid: false, message: "A due date is required." };
  if (!regex.test(dueDateInput)) return { isValid: false, message: "Incorrect format for due time" }
  if (isNaN(date.getDate())) return { isValid: false, message: "Due time must be a valid time" }
  if (date <= now) return { isValid: false, message: "Due time must be in the future." };
  return { isValid: true, message: "" };
}