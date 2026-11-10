import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="auth-card">
      <h2>Профиль</h2>
      <p><strong>Имя:</strong> {user.name} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Телефон:</strong> {user.phoneNumber}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}