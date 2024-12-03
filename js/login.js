document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Неверный логин или пароль");
    }

    // Перенаправляем в админ-панель
    window.location.href = "/admin";
  } catch (err) {
    alert(err.message);
  }
});
