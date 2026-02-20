document.addEventListener("DOMContentLoaded", function(){

  const loginItem = document.getElementById("loginItem");
  const registerItem = document.getElementById("registerItem");
  const logoutItem = document.getElementById("logoutItem");


  if(localStorage.getItem("isLoggedIn") === "true"){
    if(loginItem) loginItem.style.display = "none";
    if(registerItem) registerItem.style.display = "none";
    if(logoutItem) logoutItem.style.display = "block";
  }else{
    if(loginItem) loginItem.style.display = "block";
    if(registerItem) registerItem.style.display = "block";
    if(logoutItem) logoutItem.style.display = "none";
  }

});


function logout(){
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
