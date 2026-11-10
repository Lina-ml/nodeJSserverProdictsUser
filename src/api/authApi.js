const API_URL = "http://localhost:5000/api"; // поменяй под свой порт

export const authApi = {
  async register(data) {
    const res = await fetch(`${API_URL}/user/registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const text = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(
        typeof text === "string" ? text : text?.message || "Ошибка регистрации"
      );
    }
    return text;
  },

  async login(data) {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const text = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(
        typeof text === "string" ? text : text?.message || "Ошибка входа"
      );
    }
    return text;
  },
};