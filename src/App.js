import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ सही
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";
import Hostel from "./pages/Hostel";

function App() {
  const students = [
    { totalFees: 50000, paidFees: 20000 },
    { totalFees: 40000, paidFees: 10000 },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard students={students} />} />
          <Route path="students" element={<Students />} />
          <Route path="fees" element={<Fees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="hostel" element={<Hostel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;