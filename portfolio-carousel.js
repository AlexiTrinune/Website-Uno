const slides = Array.from(document.querySelectorAll(".project-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const previousButton = document.querySelector("#previousProject");
const nextButton = document.querySelector("#nextProject");
let currentSlide = 0;

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentSlide;
        slide.hidden = !isActive;
        slide.classList.toggle("active", isActive);
    });

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentSlide);
    });
}

previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

dots.forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide)));
});
