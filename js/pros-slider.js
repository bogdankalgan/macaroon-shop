/* document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".pros-item");
  const buttonLeft = document.getElementById("buttonLeft");
  const buttonRight = document.getElementById("buttonRight");
  let currentIndex = 0;

  // Изначально показываем только первый элемент
  function showItem(index) {
    items.forEach((item, i) => {
      if (i === index) {
        item.style.display = "flex";
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      } else {
        item.style.display = "none";
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";
      }
    });
  }

  // Обработчик для кнопки "влево"
  buttonLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  });

  // Обработчик для кнопки "вправо"
  buttonRight.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  });

  // Инициализация слайдера
  showItem(currentIndex);
});
 */

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".pros-item");
  const buttonLeft = document.getElementById("buttonLeft");
  const buttonRight = document.getElementById("buttonRight");
  let currentIndex = 0;
  let autoSlideInterval;
  let direction = "left"; // Направление по умолчанию

  // Показать текущий элемент и плавно скрыть предыдущий с учетом направления
  function showItem(newIndex) {
    const currentItem = items[currentIndex];
    const nextItem = items[newIndex];
    const translateValue = direction === "left" ? "-50px" : "50px";

    // Настройки для текущего элемента (исчезновение)
    currentItem.style.transition = "opacity 1s ease, transform 1s ease";
    currentItem.style.opacity = "0";
    currentItem.style.transform = `translateX(${translateValue})`;

    // Показ нового элемента с небольшой задержкой для синхронизации
    setTimeout(() => {
      currentItem.style.display = "none"; // Скрываем текущий элемент после завершения анимации

      nextItem.style.display = "flex"; // Отображаем новый элемент
      nextItem.style.opacity = "0";
      nextItem.style.transform = `translateX(${-translateValue})`;

      setTimeout(() => {
        nextItem.style.transition = "opacity 1s ease, transform 1s ease";
        nextItem.style.opacity = "1";
        nextItem.style.transform = "translateX(0)";
      }, 50); // Задержка для плавного появления
    }, 1000); // Время, соответствующее длительности анимации исчезновения

    currentIndex = newIndex; // Обновляем текущий индекс
  }

  // Функция для автопереключения слайдов
  function startAutoSlide() {
    stopAutoSlide(); // Остановить предыдущий интервал, если он существует
    autoSlideInterval = setInterval(() => {
      direction = "left"; // Автопрокрутка всегда влево
      const newIndex = (currentIndex + 1) % items.length;
      showItem(newIndex);
    }, 3000); // Интервал автопрокрутки (3 секунды)
  }

  // Остановить автопрокрутку
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Обработчик для кнопки "влево"
  buttonLeft.addEventListener("click", () => {
    stopAutoSlide(); // Остановить автопрокрутку при ручном переключении
    direction = "left"; // Установить направление влево
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(newIndex);
    startAutoSlide(); // Перезапустить автопрокрутку
  });

  // Обработчик для кнопки "вправо"
  buttonRight.addEventListener("click", () => {
    stopAutoSlide(); // Остановить автопрокрутку при ручном переключении
    direction = "right"; // Установить направление вправо
    const newIndex = (currentIndex + 1) % items.length;
    showItem(newIndex);
    startAutoSlide(); // Перезапустить автопрокрутку
  });

  // Инициализация: показываем первый элемент
  items.forEach((item, index) => {
    if (index !== currentIndex) {
      item.style.display = "none";
      item.style.opacity = "0";
      item.style.transform = "translateX(50px)";
    } else {
      item.style.display = "flex";
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }
  });

  // Запуск автопрокрутки
  startAutoSlide();
});
