function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function renderCheckout() {
  const cart = getCart();
  const container = document.querySelector(".checkout-items");
  const totalEl = document.querySelector(".checkout-total");

  if (!container) return;

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="checkout-item">

        <img src="${item.image}" class="checkout-img">

        <div class="checkout-name">${item.name}</div>

        <div class="checkout-qty">
          <button onclick="changeQty('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty('${item.id}', 1)">+</button>
        </div>

        <div class="checkout-price">
          ${item.price * item.quantity} SEK
        </div>

      </div>
    `;
  });

  if (totalEl) {
    totalEl.textContent = total + " SEK";
  }
}
renderCheckout();

const placeOrderBtn = document.getElementById("placeOrderBtn");
const orderToast = document.getElementById("orderToast");

if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {

    // clear all inputs
    document.querySelectorAll(".form-group input").forEach(input => {
      input.value = "";
    });

    // optional: clear cart
    sessionStorage.removeItem("cart");

    // refresh cart UI
    renderCart();
    renderCheckout();
    updateCartCount();

    // show toast
    orderToast.classList.add("active");

    // hide after 3 sec
    setTimeout(() => {
      orderToast.classList.remove("active");
    }, 3000);

  });
}