console.log("carousel JS is running");

document.addEventListener("DOMContentLoaded", startup);

function startup() {
  slider(".slider");
}

function slider(selector) {
  const parent = document.querySelector(selector);
  const slides = parent.querySelectorAll(".slide");

  let currentIndex = 0;
  let autoplay;

  // product page links//
  const links = ["SpecialBundle.html", "Carousel1.html", "Carousel2.html"];

  function update() {
    slides.forEach((s) => {
      s.classList.remove("active-slide", "prev-slide", "next-slide");
    });

    const prev = (currentIndex - 1 + slides.length) % slides.length;
    const next = (currentIndex + 1) % slides.length;

    slides[currentIndex].classList.add("active-slide");
    slides[prev].classList.add("prev-slide");
    slides[next].classList.add("next-slide");
  }

  function next_slide() {
    currentIndex = (currentIndex + 1) % slides.length;
    update();
  }

  function prev_slide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    update();
  }
  update();
  document.querySelector(".next-button")?.addEventListener("click", next_slide);
  document.querySelector(".prev-button")?.addEventListener("click", prev_slide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next_slide();

    if (e.key === "ArrowLeft") prev_slide();
  });

  autoplay = setInterval(next_slide, 5000);

  parent.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
  });

  parent.addEventListener("mouseleave", () => {
    autoplay = setInterval(next_slide, 5000);
  });

  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      if (index === currentIndex) {
        window.location.href = links[index];
      } else {
        currentIndex = index;
        update();
      }
    });
  });
}

const cartBtn = document.querySelector(".cart-btn");
const cartOverlay = document.querySelector(".cart-overlay");
const cartWrapper = document.querySelector(".cart-wrapper");

cartBtn.addEventListener("click", (e) => {
  e.preventDefault();

  cartOverlay.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  const clickedInside = cartWrapper.contains(e.target);

  if (!clickedInside) {
    cartOverlay.classList.remove("active");
  }
});

const toggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

toggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

const newsletterForm = document.querySelector(".newsletter-form");
const orderToast = document.getElementById("orderToast");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector(".newsletter-input");

    if (!emailInput.value.trim()) return;

    emailInput.value = "";

    orderToast.classList.add("active");

    setTimeout(() => {
      orderToast.classList.remove("active");
    }, 3000);
  });
}
