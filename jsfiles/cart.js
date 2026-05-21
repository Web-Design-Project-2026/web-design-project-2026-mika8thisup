function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

const cartBtn = document.querySelector(".cart-btn");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCountEl = document.querySelector(".cart-count");
const cartCloseBtn = document.querySelector(".cart-close");

function openCart() {
  if (!cartOverlay) return;
  cartOverlay.classList.add("active");
}

function closeCart() {
  if (!cartOverlay) return;
  cartOverlay.classList.remove("active");
}

if (cartBtn) {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  });
}

if (cartCloseBtn) {
  cartCloseBtn.addEventListener("click", closeCart);
}

document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      image: btn.dataset.image,
      size: document.querySelector("#size")?.value || "",
      quantity: 1,
    };

    let cart = getCart();

    const existing = cart.find((p) => p.id === item.id && p.size === item.size);
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

function changeQty(id, amount) {
  let cart = getCart();

  const item = cart.find((p) => p.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((p) => p.id !== id);
  }

  saveCart(cart);

  renderCart();
  updateCartCount();
  renderCheckout();
}

function removeItem(id) {
  let cart = getCart();

  cart = cart.filter((item) => item.id !== id);

  saveCart(cart);

  renderCart();
  updateCartCount();
  renderCheckout();
}

function renderCart() {
  if (!cartItemsContainer) return;

  const cart = getCart();

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">

        <img src="${item.image}" class="cart-item-img">

        <div class="cart-item-name">
          ${item.name}
           ${item.size ? `<div>Size: ${item.size}</div>` : ""}
        </div>

        <div class="cart-item-qty">

          <button class="qty-btn"
            onclick="changeQty('${item.id}', -1)">
            -
          </button>

          <span>${item.quantity}</span>

          <button class="qty-btn"
            onclick="changeQty('${item.id}', 1)">
            +
          </button>

        </div>

        <div class="cart-item-price">
          ${item.price * item.quantity} SEK
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

function updateCartCount() {
  if (!cartCountEl) return;

  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountEl.textContent = count;
}

window.changeQty = changeQty;
window.removeItem = removeItem;
renderCart();
updateCartCount();
