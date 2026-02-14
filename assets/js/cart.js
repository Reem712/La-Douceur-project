const cartContainer = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-left">
          <img src="${item.image}">
          <div>
            <h3>${item.name}</h3>
            <p>Qty: ${item.qty}</p>
            <p>$${item.price}.00</p>
          </div>
        </div>
        <button onclick="removeItem(${item.id})">🗑</button>
      </div>
    `;
  });

  subtotalEl.textContent = `$${subtotal}.00`;
  totalEl.textContent = `$${subtotal}.00`;
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
}

renderCart();