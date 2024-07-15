import React, { useState, useContext } from "react";
import api from "../api";
import "../styles/AddActivity.css";
import { AuthContext } from "../context/AuthContext";

const AddActivity = ({ language }) => {
  const { user } = useContext(AuthContext);
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/add-activity", {
        user_id: user.id,
        type,
        weight,
        sets,
        reps,
        date,
      });
      setMessage(
        language === "EN"
          ? "Activity added successfully!"
          : "¡Actividad agregada con éxito!"
      );
      setType("");
      setWeight("");
      setSets("");
      setReps("");
      setDate("");
    } catch (error) {
      console.error("Error adding activity:", error);
      setMessage(
        language === "EN"
          ? "Failed to add activity"
          : "Error al agregar actividad"
      );
    }
  };

  return (
    <div className="add-activity-container">
      <h2>{language === "EN" ? "Add Activity" : "Agregar Actividad"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={
            language === "EN" ? "Exercise Name" : "Nombre del Ejercicio"
          }
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder={language === "EN" ? "Weight (lb)" : "Peso (kg)"}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder={language === "EN" ? "Sets" : "Series"}
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder={language === "EN" ? "Reps" : "Repeticiones"}
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">
          {language === "EN" ? "Add Activity" : "Agregar Actividad"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddActivity;
