import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import "../styles/Activities.css";
import { AuthContext } from "../context/AuthContext";

const Activities = ({ language }) => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("User:", user);
    const fetchActivities = async () => {
      try {
        if (!user || !user.id) {
          setError("User ID not found.");
          return;
        }
        const response = await api.get("/activities", {
          params: { user_id: user.id },
        });
        console.log("Fetched activities:", response.data.activities);
        setActivities(response.data.activities || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError("Error fetching activities.");
      }
    };

    if (user) {
      fetchActivities();
    }
  }, [user]);

  return (
    <div className="activities-container">
      <h2>{language === "EN" ? "My Activities" : "Mis Actividades"}</h2>
      {error && <p>{error}</p>}
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <p>
              {language === "EN" ? "Date:" : "Fecha:"}{" "}
              {new Date(activity.date).toLocaleDateString(
                language === "EN" ? "en-US" : "es-MX"
              )}
            </p>
            <p>
              {language === "EN" ? "Exercise:" : "Ejercicio:"} {activity.type}
            </p>
            <p>
              {language === "EN" ? "Sets:" : "Series:"} {activity.sets}
            </p>
            <p>
              {language === "EN" ? "Reps:" : "Repeticiones:"} {activity.reps}
            </p>
            <p>
              {language === "EN" ? "Weight:" : "Peso:"} {activity.weight}{" "}
              {language === "EN" ? "lb" : "kg"}
            </p>
          </div>
        ))
      ) : (
        <p>
          {language === "EN"
            ? "No activities found."
            : "No se encontraron actividades."}
        </p>
      )}
    </div>
  );
};

export default Activities;
