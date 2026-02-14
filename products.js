let productsData = [];

const container = document.getElementById("products");
const filterBtns = document.querySelectorAll(".filter-btn");
const cartCounter = document.getElementById("cartCount");

/* ================= FETCH PRODUCTS ================= */

async function fetchProducts() {
  try {
    const response = await fetch("products.json");
    const data = await response.json();

    productsData = data.map(item => ({
      id: item.id,
      name: item.title,
      description:
        item.description.length > 60
          ? item.description.substring(0, 60) + "..."
          : item.description,
      price: item.price,
      category: item.category,   // ✅ دي أهم سطر
      image: item.image
    }));

    renderProducts("all");

  } catch (error) {
    console.error("Error fetching products:", error);
    container.innerHTML = "<h2>Failed to load products</h2>";
  }
}

/* ================= RENDER PRODUCTS ================= */

function renderProducts(category) {

  const filtered =
    category === "all"
      ? productsData
      : productsData.filter(product => product.category === category);

  container.innerHTML = filtered.map(product => `
      <div class="card">
        <div class="card-img">
          <img src="${product.image}" alt="${product.name}">
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
  `).join("");
}

/* ================= FILTER BUTTONS ================= */

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const selectedCategory = btn.dataset.filter;
    renderProducts(selectedCategory);
  });
});

/* ================= CART ================= */

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty++;
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

/* ================= INIT ================= */

fetchProducts();
updateCartCount();