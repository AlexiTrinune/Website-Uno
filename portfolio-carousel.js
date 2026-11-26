const slides = Array.from(document.querySelectorAll(".project-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const previousButton = document.querySelector("#previousProject");
const nextButton = document.querySelector("#nextProject");
let currentSlide = 0;
let transitionId = 0;

function showSlide(index) {
    const nextSlide = (index + slides.length) % slides.length;
    if (nextSlide === currentSlide) {
        return;
    }

    const outgoingSlide = slides[currentSlide];
    const incomingSlide = slides[nextSlide];
    const direction = nextSlide > currentSlide || (currentSlide === slides.length - 1 && nextSlide === 0) ? 1 : -1;
    const thisTransition = ++transitionId;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    outgoingSlide.classList.remove("active");
    incomingSlide.hidden = false;
    incomingSlide.classList.add("active");
    currentSlide = nextSlide;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentSlide;
        if (slide !== incomingSlide) {
            slide.hidden = !isActive;
            slide.classList.toggle("active", isActive);
        }
    });

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentSlide);
    });

    if (reducedMotion || typeof incomingSlide.animate !== "function") {
        outgoingSlide.hidden = true;
        outgoingSlide.classList.remove("active");
        incomingSlide.hidden = false;
        return;
    }

    const duration = 240;
    outgoingSlide.animate(
        [
            { opacity: 1, transform: "translateX(0)" },
            { opacity: 0, transform: `translateX(${-24 * direction}px)` }
        ],
        { duration, easing: "ease-in", fill: "forwards" }
    );

    incomingSlide.animate(
        [
            { opacity: 0, transform: `translateX(${24 * direction}px)` },
            { opacity: 1, transform: "translateX(0)" }
        ],
        { duration, easing: "ease-out", fill: "forwards" }
    ).finished.then(() => {
        if (thisTransition !== transitionId) {
            return;
        }

        outgoingSlide.hidden = true;
        outgoingSlide.classList.remove("active");
    }).catch(() => {});
}

previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

dots.forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide)));
});
