import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";
import Hostel from "./pages/Hostel";

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Dashboard students={students} />}
          />
          <Route
            path="students"
            element={
              <Students
                students={students}
                setStudents={setStudents}
              />
            }
          />
          <Route path="fees" element={<Fees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="hostel" element={<Hostel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;