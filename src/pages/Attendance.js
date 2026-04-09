import React, { useState } from "react";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !status) {
      setError("Student name and status required!");
      return;
    }

    setError("");

    if (editId) {
      const updated = attendance.map((a) =>
        a.id === editId ? { ...a, name, status } : a
      );
      setAttendance(updated);
      setEditId(null);
    } else {
      const newAttendance = {
        id: Date.now(),
        name,
        status
      };
      setAttendance([...attendance, newAttendance]);
    }

    setName("");
    setStatus("");
  };

  const deleteAttendance = (id) => {
    setAttendance(attendance.filter((a) => a.id !== id));
  };

  const editAttendance = (a) => {
    setName(a.name);
    setStatus(a.status);
    setEditId(a.id);
  };

  return (
    <div>
      <h1>Attendance</h1>

      {/* FORM */}
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: "block", marginTop: "10px" }}
      />

      {/* TABLE */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead style={{ background: "#007bff", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {attendance
            .filter((a) =>
              a.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.status}</td>
                <td>
                  <button onClick={() => editAttendance(a)}>Edit</button>
                  <button onClick={() => deleteAttendance(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;