const toggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (toggle && navbar) {
  toggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}
