async function loadPopularItems() {
  try {
    const response = await fetch("/popular");
    const items = await response.json();

    const container = document.getElementById("popular-items");
    container.innerHTML = ""; // Очищаем контейнер

    items.forEach((item) => {
      const a = document.createElement("a");
      a.classList.add("popular-item");
      a.href = "festivals-nabery.html";
      a.innerHTML = `
          <img src="${item.image_url}" alt="${item.title}" />

          <div class="popular-item-text">
          <h3 class="actions-item-title">${item.title}</h3>
          <p class="descr__14">${item.description}</p>

          <div class="popular-item-bottom">
          <div class="popular-item-price-container"> 
          <p class="popular-item-price">${item.price} руб</p>
          </div>

          <div class="intrash-button-container">
          <button class="intrash-button"><i class="fa-solid fa-cart-shopping"></i> В корзину</button>
          </div>
          </div>
          </div>
        `;
      container.appendChild(a);
    });
  } catch (err) {
    console.error("Ошибка загрузки популярных элементов:", err);
  }
}

// Загружаем элементы при загрузке страницы
loadPopularItems();
