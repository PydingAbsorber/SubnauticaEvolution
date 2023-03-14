const sliderImages = document.querySelector(".slider-images");
const images = document.querySelectorAll(".slider-images img");
const imageWidth = images[0].clientWidth;

let counter = 1;

sliderImages.style.transform = `translateX(${-imageWidth * counter}px)`;

setInterval(() => {
    if (counter >= images.length - 1) return;
    counter++;
    sliderImages.style.transition = "transform 0.4s ease-in-out";
    sliderImages.style.transform = `translateX(${-imageWidth * counter}px)`;
}, 3000);

sliderImages.addEventListener("transitionend", () => {
    if (images[counter].id === "last-clone") {
        sliderImages.style.transition = "none";
        counter = images.length - 2;
        sliderImages.style.transform = `translateX(${-imageWidth * counter}px)`;
    }
    if (images[counter].id === "first-clone") {
        sliderImages.style.transition = "none";
        counter = images.length - counter;
        sliderImages.style.transform = `translateX(${-imageWidth * counter}px)`;
    }
});