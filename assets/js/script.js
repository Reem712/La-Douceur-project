
  document.getElementById("username").innerText =
    localStorage.getItem("user") || "Guest";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;
