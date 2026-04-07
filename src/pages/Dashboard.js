import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    setCount(data.length);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "30px"
      }}>

        {/* Students Card */}
        <div style={{
          padding: "20px",
          background: "#ffffff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          width: "200px",
          textAlign: "center"
        }}>
          <h3>Students</h3>
          <h2>{count}</h2>
          <button onClick={() => navigate("/students")}>
            Open
          </button>
        </div>

        {/* Fees Card */}
        <div style={{
          padding: "20px",
          background: "#ffffff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          width: "200px",
          textAlign: "center"
        }}>
          <h3>Fees</h3>
          <button onClick={() => navigate("/fees")}>
            Open
          </button>
        </div>

        {/* Attendance Card */}
        <div style={{
          padding: "20px",
          background: "#ffffff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          width: "200px",
          textAlign: "center"
        }}>
          <h3>Attendance</h3>
          <button onClick={() => navigate("/attendance")}>
            Open
          </button>
        </div>

        {/* Hostel Card */}
        <div style={{
          padding: "20px",
          background: "#ffffff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          width: "200px",
          textAlign: "center"
        }}>
          <h3>Hostel</h3>
          <button onClick={() => navigate("/hostel")}>
            Open
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;