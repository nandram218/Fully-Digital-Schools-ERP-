import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Students from "./pages/Students";
import Dashboard from "./pages/Dashboard";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";
import Hostel from "./pages/Hostel";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/hostel" element={<Hostel />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;