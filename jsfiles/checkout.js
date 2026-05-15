const cartBtn = document.querySelector(".cart-btn");
const cartOverlay = document.querySelector(".cart-overlay");
const cartWrapper = document.querySelector(".cart-wrapper");

/* TOGGLE CART */
cartBtn.addEventListener("click", (e) => {
  e.preventDefault();

  cartOverlay.classList.toggle("active");
});

/* CLOSE WHEN CLICKING OUTSIDE */
document.addEventListener("click", (e) => {

  const clickedInside = cartWrapper.contains(e.target);

  if (!clickedInside) {
    cartOverlay.classList.remove("active");
  }

});