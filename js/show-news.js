async function loadNews() {
  try {
    const response = await fetch("/news");
    const news = await response.json();

    const container = document.getElementById("news-items");
    container.innerHTML = ""; // Очищаем контейнер

    news.forEach((item) => {
      const newsCard = document.createElement("a");
      newsCard.classList.add("news-item");
      newsCard.href = "news.html";

      newsCard.innerHTML = `
        <img src="${item.image_url}" alt="${item.title}" />

            <div class="news-item-text">
              <p class="news-item-date">${new Date(
                item.date
              ).toLocaleDateString()}</p>

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
  } catch (err) {
    console.error("Ошибка загрузки новостей:", err);
  }
}

// Загружаем новости при загрузке страницы
loadNews();
