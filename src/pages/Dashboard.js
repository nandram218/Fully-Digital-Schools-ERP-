import React from "react";

const Dashboard = ({ students }) => {
  const totalStudents = students.length;

  const class10 = students.filter((s) => s.class === "10th").length;
  const class11 = students.filter((s) => s.class === "11th").length;
  const class12 = students.filter((s) => s.class === "12th").length;

  const cardStyle = {
    padding: "20px",
    borderRadius: "10px",
    minWidth: "150px",
    textAlign: "center",
    color: "#fff"
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        
        <div style={{ ...cardStyle, background: "#4CAF50" }}>
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div style={{ ...cardStyle, background: "#2196F3" }}>
          <h3>Class 10th</h3>
          <p>{class10}</p>
        </div>

        <div style={{ ...cardStyle, background: "#FF9800" }}>
          <h3>Class 11th</h3>
          <p>{class11}</p>
        </div>

        <div style={{ ...cardStyle, background: "#E91E63" }}>
          <h3>Class 12th</h3>
          <p>{class12}</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;