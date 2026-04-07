import React, { useState } from "react";

function Attendance() {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");

  const markAttendance = (status) => {
    if (name === "") return;

    const newRecord = {
      name,
      status,
      date: new Date().toLocaleDateString()
    };

    setRecords([...records, newRecord]);
    setName("");
  };

  const deleteRecord = (index) => {
    const updated = records.filter((r, i) => i !== index);
    setRecords(updated);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Attendance Page</h1>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={() => markAttendance("Present")}>
        Present
      </button>

      <button
        onClick={() => markAttendance("Absent")}
        style={{ marginLeft: "10px" }}
      >
        Absent
      </button>

      <h2 style={{ marginTop: "30px" }}>Attendance List</h2>

      {records.length === 0 ? (
        <p>No attendance yet</p>
      ) : (
        records.map((r, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {r.name} - {r.status} ({r.date})

            <button
              onClick={() => deleteRecord(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Attendance;