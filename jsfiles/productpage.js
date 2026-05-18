const productImage = document.querySelector(".product-image");
const imageWrapper = document.querySelector(".product-image-wrapper");

if (productImage && imageWrapper) {

  imageWrapper.addEventListener("mousemove", (e) => {

    const rect = imageWrapper.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    productImage.style.transformOrigin = `${x}% ${y}%`;
    productImage.style.transform = "scale(2)";
  });

  imageWrapper.addEventListener("mouseleave", () => {
    productImage.style.transform = "scale(1)";
    productImage.style.transformOrigin = "center center";
  });

}