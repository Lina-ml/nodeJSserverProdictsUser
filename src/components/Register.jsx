import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Пароли не совпадают");
    }
    if (form.password.length < 6) {
      return setError("Пароль должен быть минимум 6 символов");
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      await register(payload);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Имя" value={form.name}
          onChange={handleChange} required />
        <input name="lastName" placeholder="Фамилия" value={form.lastName}
          onChange={handleChange} required />
        <input name="phoneNumber" placeholder="Телефон" value={form.phoneNumber}
          onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email}
          onChange={handleChange} required />
        <input name="password" type="password" placeholder="Пароль"
          value={form.password} onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Повторите пароль"
          value={form.confirmPassword} onChange={handleChange} required />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
}