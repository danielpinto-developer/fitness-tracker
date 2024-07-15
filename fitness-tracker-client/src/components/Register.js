import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = ({ language }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { username, email, password });
      alert(
        language === "EN"
          ? "User registered successfully"
          : "Usuario registrado con éxito"
      );
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert(
        language === "EN"
          ? "Failed to register user"
          : "Error al registrar usuario"
      );
    }
  };

  return (
    <div className="register-container">
      <h2>{language === "EN" ? "Register" : "Registrarse"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={language === "EN" ? "Username" : "Nombre de usuario"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          {language === "EN" ? "Register" : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default Register;
