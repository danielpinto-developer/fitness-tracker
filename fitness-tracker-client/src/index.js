import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const Index = () => {
  const [language, setLanguage] = useState("EN");

  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <App language={language} setLanguage={setLanguage} />
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
