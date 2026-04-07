import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Students", path: "/students" },
    { name: "Fees", path: "/fees" },
    { name: "Attendance", path: "/attendance" },
    { name: "Hostel", path: "/hostel" }
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: open ? "220px" : "60px",
        background: "#2c3e50",
        color: "white",
        padding: "20px",
        transition: "0.3s"
      }}>

        <h2 style={{ textAlign: "center" }}>
          {open ? "ERP" : "E"}
        </h2>

        {menu.map((item, index) => (
          <div key={index} style={{ margin: "15px 0" }}>
            <Link
              to={item.path}
              style={{
                textDecoration: "none",
                color: "white",
                display: "block",
                padding: "10px",
                borderRadius: "5px",
                background:
                  location.pathname === item.path
                    ? "#34495e"
                    : "transparent"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#34495e";
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.background = "transparent";
                }
              }}
            >
              {open ? item.name : item.name[0]}
            </Link>
          </div>
        ))}

      </div>

      {/* Main */}
      <div style={{ flex: 1 }}>

        {/* Top Bar */}
        <div style={{
          padding: "10px",
          background: "#ecf0f1"
        }}>
          <button onClick={() => setOpen(!open)}>☰</button>
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;