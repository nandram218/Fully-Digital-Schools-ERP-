import React from "react";

const Card = ({ title, value }) => {
  return (
    <div style={{
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
};

export default Card;