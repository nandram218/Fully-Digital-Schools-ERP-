import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ background: "#2c3e50", color: "#fff", padding: "20px", height: "100vh" }}>
      <h2>ERP</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/" style={{ color: "#fff" }}>Dashboard</Link></li>
        <li><Link to="/students" style={{ color: "#fff" }}>Students</Link></li>
        <li><Link to="/fees" style={{ color: "#fff" }}>Fees</Link></li>
        <li><Link to="/attendance" style={{ color: "#fff" }}>Attendance</Link></li>
        <li><Link to="/hostel" style={{ color: "#fff" }}>Hostel</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;