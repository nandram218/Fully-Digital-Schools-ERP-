import React from "react";

const Dashboard = ({ students }) => {
  // safety fix
  const safeStudents = students || [];

  const totalStudents = safeStudents.length;

  const totalFees = safeStudents.reduce(
    (sum, s) => sum + (s.totalFees || 0),
    0
  );

  const totalPaid = safeStudents.reduce(
    (sum, s) => sum + (s.paidFees || 0),
    0
  );

  const totalPending = totalFees - totalPaid;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        <div style={cardStyle}>
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Fees</h3>
          <p>₹ {totalFees}</p>
        </div>

        <div style={cardStyle}>
          <h3>Paid Fees</h3>
          <p>₹ {totalPaid}</p>
        </div>

        <div style={cardStyle}>
          <h3>Pending Fees</h3>
          <p>₹ {totalPending}</p>
        </div>

      </div>
    </div>
  );
};

const cardStyle = {
  flex: 1,
  minWidth: "200px",
  padding: "20px",
  background: "#1976d2",
  color: "white",
  borderRadius: "10px",
  textAlign: "center",
};

export default Dashboard;