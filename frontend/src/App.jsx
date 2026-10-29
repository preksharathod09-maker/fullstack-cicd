import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backend, setBackend] = useState("Checking backend...");
  const [database, setDatabase] = useState("Checking database...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => setBackend(data.message))
      .catch(() => setBackend("Backend connection failed"));

    fetch("http://localhost:5000/api/db-health")
      .then((res) => res.json())
      .then((data) => setDatabase(data.message))
      .catch(() => setDatabase("Database connection failed"));
  }, []);

  return (
    <div className="app">
      <h1>Full Stack CI/CD Project</h1>
      <p>React + Node.js + MongoDB + Docker</p>

      <div className="status">
        <h2>Backend Status</h2>
        <p>{backend}</p>
      </div>

      <div className="status">
        <h2>MongoDB Status</h2>
        <p>{database}</p>
      </div>
    </div>
  );
}

export default App;