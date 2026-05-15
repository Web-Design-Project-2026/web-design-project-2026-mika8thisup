/* =========================
   CART STORAGE
========================= */

function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}


/* =========================
   ELEMENTS
========================= */

const cartBtn = document.querySelector(".cart-btn");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCountEl = document.querySelector(".cart-count");
const cartCloseBtn = document.querySelector(".cart-close");


/* =========================
   OPEN / CLOSE CART (ONLY X CLOSES)
========================= */

function openCart() {
  if (!cartOverlay) return;
  cartOverlay.classList.add("active");
}

function closeCart() {
  if (!cartOverlay) return;
  cartOverlay.classList.remove("active");
}


/* OPEN CART */
if (cartBtn) {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  });
}


/* CLOSE ONLY VIA X BUTTON */
if (cartCloseBtn) {
  cartCloseBtn.addEventListener("click", closeCart);
}


/* =========================
   ADD TO CART
========================= */

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {

    const item = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      image: btn.dataset.image,
      quantity: 1
    };

    let cart = getCart();

    const existing = cart.find(p => p.id === item.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(item);
    }

    saveCart(cart);

    renderCart();
    updateCartCount();
  });
});


/* =========================
   CHANGE QUANTITY
========================= */

function changeQty(id, amount) {
  let cart = getCart();

  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart(cart);

  renderCart();
  updateCartCount();
}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(id) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== id);

  saveCart(cart);

  renderCart();
  updateCartCount();
}


/* =========================
   RENDER CART
========================= */

function renderCart() {
  if (!cartItemsContainer) return;

  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="50">

        <div class="cart-info">
          <p>${item.name}</p>
          <p>${item.price} SEK</p>

          <div class="qty-controls">
            <button onclick="changeQty('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty('${item.id}', 1)">+</button>
          </div>

          <button onclick="removeItem('${item.id}')">
            Remove
          </button>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML += `
    <div class="cart-total">
      <strong>Total: ${total} SEK</strong>
    </div>
  `;
}


/* =========================
   CART COUNTER
========================= */

function updateCartCount() {
  if (!cartCountEl) return;

  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountEl.textContent = count;
}


/* =========================
   INIT
========================= */

renderCart();
updateCartCount();