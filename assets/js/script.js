
  document.getElementById("username").innerText =
    localStorage.getItem("user") || "Guest";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;

const burger = document.getElementById("burger");
const nav = document.querySelector(".navbar nav");
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});
