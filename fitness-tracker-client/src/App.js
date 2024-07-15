import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AddActivity from "./components/AddActivity";
import Activities from "./components/Activities";
import NavigationBar from "./components/NavigationBar";
import "./styles/App.css";

const App = ({ language, setLanguage }) => {
  return (
    <div className="App">
      <NavigationBar language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/register" element={<Register language={language} />} />
        <Route path="/login" element={<Login language={language} />} />
        <Route
          path="/add-activity"
          element={<AddActivity language={language} />}
        />
        <Route
          path="/activities"
          element={<Activities language={language} />}
        />
      </Routes>
    </div>
  );
};

export default App;
