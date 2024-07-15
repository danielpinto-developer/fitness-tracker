import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ language }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      login(response.data.user);
      alert(
        language === "EN" ? "Login successful" : "Inicio de sesión exitoso"
      );
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(
        language === "EN" ? "Invalid credentials" : "Credenciales inválidas"
      );
    }
  };

  return (
    <div className="login-container">
      <h2>{language === "EN" ? "Login" : "Iniciar Sesión"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={language === "EN" ? "Email" : "Correo electrónico"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={language === "EN" ? "Password" : "Contraseña"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {language === "EN" ? "Login" : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
