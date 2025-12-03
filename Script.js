
const slides = document.querySelectorAll('.carousel-slide');
let current = 0;

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

setInterval(nextSlide, 7000); // switch every 7 seconds


(function() {
  const track = document.getElementById("showcaseTrack");
  const prevBtn = document.getElementById("showcasePrev");
  const nextBtn = document.getElementById("showcaseNext");
  const autoToggle = document.getElementById("showcaseAutoPlay");

  let index = 0;
  const visibleSlides = 3;
  const items = Array.from(track.children);
  const totalSlides = items.length;

  function updateShowcase() {
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    const slideWidth = items[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    index = (index + 1) % (totalSlides - (visibleSlides - 1));
    updateShowcase();
  }

  function prevSlide() {
    index = (index - 1 + (totalSlides - (visibleSlides - 1))) % (totalSlides - (visibleSlides - 1));
    updateShowcase();
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoShowcase();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoShowcase();
  });

  // Autoplay
  let showcaseTimer = null;

  function startAutoShowcase() {
    stopAutoShowcase();
    showcaseTimer = setInterval(nextSlide, 4000);
  }

  function stopAutoShowcase() {
    if (showcaseTimer) clearInterval(showcaseTimer);
  }

  function resetAutoShowcase() {
    if (autoToggle.checked) startAutoShowcase();
  }

  autoToggle.addEventListener("change", () => {
    if (autoToggle.checked) startAutoShowcase();
    else stopAutoShowcase();
  });

  window.addEventListener("load", () => {
    updateShowcase();
    if (autoToggle.checked) startAutoShowcase();
    window.addEventListener("resize", updateShowcase);
  });
})();


document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".testimonials-track");
  let autoScroll;

  function startAutoScroll() {
    autoScroll = setInterval(() => {
      track.scrollBy({
        left: 330,    // slide distance
        behavior: "smooth"
      });

      // If we've reached the end, jump back to start
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
        setTimeout(() => track.scrollTo({ left: 0, behavior: "smooth" }), 600);
      }
    }, 3000);         // slide every 3 seconds
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  track.addEventListener("mouseenter", stopAutoScroll);
  track.addEventListener("mouseleave", startAutoScroll);

  startAutoScroll();
});




