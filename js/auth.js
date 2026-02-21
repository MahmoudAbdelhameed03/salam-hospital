document.addEventListener("DOMContentLoaded", function () {
  const loginItem = document.getElementById("loginItem");
  const registerItem = document.getElementById("registerItem");
  const logoutItem = document.getElementById("logoutItem");
  const appointmentsItem = document.getElementById("appointmentsItem");
  const recordsItem = document.getElementById("recordsItem");
  const bookingItem = document.getElementById("bookingItem");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    loginItem && (loginItem.style.display = "none");
    registerItem && (registerItem.style.display = "none");
    logoutItem && (logoutItem.style.display = "block");

    appointmentsItem && (appointmentsItem.style.display = "block");
    recordsItem && (recordsItem.style.display = "block");
    bookingItem && (bookingItem.style.display = "block");
  } else {
    loginItem && (loginItem.style.display = "block");
    registerItem && (registerItem.style.display = "block");
    logoutItem && (logoutItem.style.display = "none");

    appointmentsItem && (appointmentsItem.style.display = "none");
    recordsItem && (recordsItem.style.display = "none");
    bookingItem && (bookingItem.style.display = "none");
  }
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}