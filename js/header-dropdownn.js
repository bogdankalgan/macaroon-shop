const buttons = document.querySelectorAll(".header-top-list-item-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const cont = button.closest(".header-top-list-item");

    const dropdown = cont.querySelector(".header-top-list-item-links");

    if (dropdown) {
      dropdown.classList.toggle("header-top-list-item-links__active");
    }
  });
});
