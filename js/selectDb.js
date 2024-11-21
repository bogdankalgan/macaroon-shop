async function fetchCities() {
  try {
    const response = await fetch("http://localhost:3001/cities");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const cities = await response.json();

    const select = document.getElementById("headerSelect");
    select.innerHTML = '<option value="">Select a city</option>'; // Очищаем <select> перед заполнением

    cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city.city; // Используем правильное поле объекта
      option.textContent = city.city; // Заполняем текст в теге <option>
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
}

// Загружаем данные при загрузке страницы
document.addEventListener("DOMContentLoaded", fetchCities);
