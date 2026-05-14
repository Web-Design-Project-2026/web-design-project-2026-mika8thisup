function startup() {
  slider(".slider");
}

document.addEventListener("DOMContentLoaded", startup);

let currentIndex = 0;

function slider(selector) {
  const parent = document.querySelector(selector);
  if (!parent) return;

  const slides = parent.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-button");
  const prevBtn = document.querySelector(".prev-button");

  function updateSlides() {
    slides.forEach((s) => {
      s.classList.remove("active-slide", "prev-slide", "next-slide");
    });

    slides[currentIndex].classList.add("active-slide");

    if (slides[currentIndex - 1]) {
      slides[currentIndex - 1].classList.add("prev-slide");
    }

    if (slides[currentIndex + 1]) {
      slides[currentIndex + 1].classList.add("next-slide");
    }
  }

  function next_slide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlides();
    }
  }

  function prev_slide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlides();
    }
  }

  // INIT
  updateSlides();

  // BUTTONS
  nextBtn?.addEventListener("click", next_slide);
  prevBtn?.addEventListener("click", prev_slide);

  // KEYBOARD
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") prev_slide();
    if (event.key === "ArrowRight") next_slide();
  });

  // OPTIONAL: swipe (simplified version of yours)
  let startX = null;

  parent.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  parent.addEventListener("touchend", (e) => {
    if (startX === null) return;

    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) next_slide();
      else prev_slide();
    }

    startX = null;
  });
}
