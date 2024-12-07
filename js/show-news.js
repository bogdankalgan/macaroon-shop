function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

async function loadNews() {
  try {
    const response = await fetch("/news");
    const news = await response.json();

    const container = document.getElementById("news-items");
    container.innerHTML = ""; // Очищаем контейнер

    news.forEach((item) => {
      const formattedDate = formatDate(item.date);
      const newsCard = document.createElement("a");
      newsCard.classList.add("news-item");
      newsCard.href = "news.html";

      newsCard.innerHTML = `
        <img src="${item.image_url}" alt="${item.title}" />

            <div class="news-item-text">
              <p class="news-item-date">${formattedDate}</p>

              <p class="descr__18" style="text-align: left">
                ${item.title}
              </p>

              <p class="descr__14">
              ${item.description}
              </p>
            </div>
        `;

      container.appendChild(newsCard);
    });

    initializeNewsSlider();
  } catch (err) {
    console.error("Ошибка загрузки новостей:", err);
  }
}

function initializeNewsSlider() {
  const newsSliderContainer = document.querySelector(".news-items");
  const newsSliderButtons = document.querySelectorAll(".news-slider-item");
  const newsItems = document.querySelectorAll(".news-item");

  if (
    !newsSliderContainer ||
    newsSliderButtons.length === 0 ||
    newsItems.length === 0
  ) {
    console.error("Ошибка: Не удалось инициализировать слайдер.");
    return;
  }

  const itemsPerNewsPage = 3;
  const totalNewsItems = newsItems.length;
  const totalNewsPages = Math.ceil(totalNewsItems / itemsPerNewsPage);
  let currentNewsIndex = 0;

  function scrollToNewsPage(index) {
    if (index < 0 || index >= totalNewsPages) return;

    const scrollLeft =
      index * newsSliderContainer.getBoundingClientRect().width;

    newsSliderContainer.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });

    newsSliderButtons.forEach((button, idx) => {
      button.classList.toggle("news-slider-item__active", idx === index);
    });

    currentNewsIndex = index;
  }

  // Обрабатываем клики по кнопкам
  newsSliderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"), 10);
      if (!isNaN(index)) {
        scrollToNewsPage(index);
      }
    });
  });

  // Инициализируем слайдер на первой странице
  scrollToNewsPage(0);
}

document.addEventListener("DOMContentLoaded", () => {
  loadNews(); // Загружаем новости и инициализируем слайдер
});
