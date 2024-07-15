import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/NavigationBar.css";
import { AuthContext } from "../context/AuthContext";

const NavigationBar = ({ language, setLanguage }) => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "ES" : "EN");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button onClick={toggleLanguage} className="language-toggle">
          {language === "EN" ? "ES 🇲🇽" : "EN 🇺🇸"}
        </button>
      </div>
      <div className="navbar-center">
        {user && (
          <span>
            {language === "EN"
              ? `Hello, ${user.username} 😊`
              : `Hola, ${user.username} 😊`}
          </span>
        )}
      </div>
      <div className="navbar-right">
        <button className="navbar-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
        {menuOpen && (
          <ul className="navbar-menu">
            <li>
              <Link to="/" onClick={toggleMenu}>
                {language === "EN" ? "Home" : "Inicio"}
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/add-activity" onClick={toggleMenu}>
                    {language === "EN" ? "Add Activity" : "Agregar Actividad"}
                  </Link>
                </li>
                <li>
                  <Link to="/activities" onClick={toggleMenu}>
                    {language === "EN" ? "View Activities" : "Ver Actividades"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                  >
                    {language === "EN" ? "Logout" : "Cerrar Sesión"}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register" onClick={toggleMenu}>
                    {language === "EN" ? "Register" : "Registrarse"}
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={toggleMenu}>
                    {language === "EN" ? "Login" : "Iniciar Sesión"}
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
