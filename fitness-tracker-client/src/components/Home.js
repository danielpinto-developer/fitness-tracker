import React from "react";
import "../styles/Home.css";

const Home = ({ language }) => {
  useEffect(() => {
    document.title = "Fitness Tracker";
  }, []);
  return (
    <div className="home-container">
      <h1>
        {language === "EN"
          ? "Welcome to the fitness tracker app!"
          : "¡Bienvenido a la app de seguimiento de fitness!"}
      </h1>
      <h2>
        {language === "EN"
          ? "The start of your fitness journey"
          : "El comienzo de tu camino hacia el fitness"}
      </h2>
      <img src="/image.png" alt="Fitness Tracker" id="home-image" />
    </div>
  );
};

export default Home;
