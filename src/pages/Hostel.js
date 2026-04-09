import React, { useState, useEffect } from "react";

const Hostel = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  // ✅ Load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hostel"));
    if (saved) setStudents(saved);
  }, []);

  // ✅ Save
  useEffect(() => {
    localStorage.setItem("hostel", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    if (!name) return;

    const newStudent = {
      id: Date.now(),
      name,
      room: Math.floor(Math.random() * 100),
    };

    setStudents([...students, newStudent]);
    setName("");
  };

  return (
    <div>
      <h2>Hostel</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
      />

      <button onClick={addStudent}>Add to Hostel</button>

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - Room {s.room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hostel;