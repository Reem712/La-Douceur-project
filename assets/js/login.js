function login() {
  const username = document.getElementById("username").value;
  localStorage.setItem("user", username);
  window.location.href = "home.html";
}
