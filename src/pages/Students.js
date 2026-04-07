import { useState, useEffect } from "react";

function Students() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add OR Update
  const addStudent = (e) => {
    e.preventDefault();

    if (!name || !email) return;

    if (editIndex !== null) {
      // Update
      const updated = [...students];
      updated[editIndex] = { name, email };
      setStudents(updated);
      setEditIndex(null);
    } else {
      // Add
      setStudents((prev) => [...prev, { name, email }]);
    }

    setName("");
    setEmail("");
  };

  const deleteStudent = (index) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setName(students[index].name);
    setEmail(students[index].email);
    setEditIndex(index);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Students</h2>

      <form onSubmit={addStudent} style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          {editIndex !== null ? "Update Student" : "Add Student"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "15px" }}
      />

      <h3>Student List</h3>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((s, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>

                <button
                  onClick={() => deleteStudent(index)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;