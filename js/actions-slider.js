const sliderContainer = document.querySelector(".actions-items");
const sliderButtons = document.querySelectorAll(".actions-slider-item");

const itemsPerPage = 4;
const totalItems = document.querySelectorAll(".actions-item").length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
let currentIndex = 0;

function scrollToPage(index) {
  if (index < 0 || index >= totalPages) return;

  const scrollLeft = index * sliderContainer.clientWidth;
  sliderContainer.scrollTo({
    left: scrollLeft,
    behavior: "smooth",
  });

  sliderButtons.forEach((button, idx) => {
    if (idx === index) {
      button.classList.add("actions-slider-item__active");
    } else {
      button.classList.remove("actions-slider-item__active");
    }
  });

  currentIndex = index;
}

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = parseInt(button.getAttribute("data-index"), 10);
    scrollToPage(index);
  });
});

scrollToPage(0);
