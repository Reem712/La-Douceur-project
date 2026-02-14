let productsData = [];

const container = document.getElementById("products");
const filterBtns = document.querySelectorAll(".filter-btn");
const cartCounter = document.getElementById("cart-count");



async function fetchProducts() {
  try {
    const response = await fetch("assets/json/asproducts.json");
    const data = await response.json();

    productsData = data.map(item => ({
      id: item.id,
      name: item.title,
      description: item.description.substring(0, 60) + "...",
      price: item.price,
      category: "cakes", 
      image: item.image
    }));

    renderProducts("all");

  } catch (error) {
    console.error("Error fetching products:", error);
  }
}



function renderProducts(category) {
  container.innerHTML = "";

  const filtered =
    category === "all"
      ? productsData
      : productsData.filter(p => p.category === category);

  filtered.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <div class="card-img">
          <img src="${product.image}">
          <span class="badge">${product.category}</span>
        </div>
        <div class="card-content">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price-cart">
            <span class="price">$${product.price}</span>
            <button class="add-btn" onclick="addToCart(${product.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}


function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCounter.textContent = totalQty;
}


filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});



fetchProducts();
updateCartCount();