import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sections = ["A", "B", "C", "D"];

const Students = () => {
  const navigate = useNavigate();

  // 🔹 STUDENTS DATA
  const [students, setStudents] = useState([]);

  // 🔹 FILTER STATE
  const [filters, setFilters] = useState({
    search: "",
    class: "",
    section: "",
    stream: "",
    category: "",
    gender: "",
    route: "",
    hostel: "",
    rte: "",
  });

  // 🔹 LOAD DATA
  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  // 🔹 FILTER CHANGE
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  // 🔹 FILTER LOGIC
  const filteredStudents = students.filter((stu) => {
    return (
      `${stu.name} ${stu.fatherName || ""}`
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      (filters.class === "" || stu.class === filters.class) &&
      (filters.section === "" || stu.section === filters.section) &&
      (filters.stream === "" || stu.stream === filters.stream) &&
      (filters.category === "" || stu.category === filters.category) &&
      (filters.gender === "" || stu.gender === filters.gender) &&
      (filters.route === "" || stu.route === filters.route) &&
      (filters.hostel === "" || stu.hostel === filters.hostel) &&
      (filters.rte === "" || stu.rte === filters.rte)
    );
  });

  // 🔹 SUMMARY
  const totalStudents = students.length;
  const absentStudents = students.filter(
    (stu) => stu.status === "Absent"
  ).length;
  const transportUsers = students.filter(
    (stu) => stu.route && stu.route !== "-"
  ).length;
  const hostelUsers = students.filter(
    (stu) => stu.hostel === "Yes"
  ).length;

  // 🔹 PRINT
  const handlePrint = () => {
    window.print();
  };

  // 🔹 STREAM CONDITION
  const showStream =
    filters.class === "11th" || filters.class === "12th";

  // 🔹 EDIT
  const handleEdit = (stu) => {
    navigate(`/admission/${stu.id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔥 TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <h2>Student Dashboard</h2>

        {/* CARDS */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <div
            style={{
              background: "#4CAF50",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "8px",
            }}
          >
            Total: {totalStudents}
          </div>

          <div
            style={{
              background: "#f44336",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "8px",
            }}
          >
            Absent: {absentStudents}
          </div>

          <div
            style={{
              background: "#2196F3",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "8px",
            }}
          >
            Transport: {transportUsers}
          </div>

          <div
            style={{
              background: "#9C27B0",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "8px",
            }}
          >
            Hostel: {hostelUsers}
          </div>
        </div>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "8px 15px",
              background: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
            }}
          >
            ⬅ Back
          </button>

          <button
            onClick={() => navigate("/admission")}
            style={{
              padding: "8px 15px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
            }}
          >
            + Add New Student
          </button>
        </div>
      </div>

      {/* 🔹 FILTER BAR */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          background: "#eef2f7",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Search Name / Father"
          value={filters.search}
          onChange={(e) =>
            handleFilterChange("search", e.target.value)
          }
        />

        <select
          onChange={(e) =>
            handleFilterChange("class", e.target.value)
          }
        >
          <option value="">All Classes</option>
          <option>Nursery</option>
          <option>LKG</option>
          <option>UKG</option>
          <option>1st</option>
          <option>2nd</option>
          <option>3rd</option>
          <option>4th</option>
          <option>5th</option>
          <option>6th</option>
          <option>7th</option>
          <option>8th</option>
          <option>9th</option>
          <option>10th</option>
          <option>11th</option>
          <option>12th</option>
        </select>

        <select
          style={{ width: "90px" }}
          onChange={(e) =>
            handleFilterChange("section", e.target.value)
          }
        >
          <option value="">Sec</option>
          {sections.map((sec) => (
            <option key={sec}>{sec}</option>
          ))}
        </select>

        {showStream && (
          <select
            onChange={(e) =>
              handleFilterChange("stream", e.target.value)
            }
          >
            <option value="">All Streams</option>
            <option>Science</option>
            <option>Commerce</option>
            <option>Arts</option>
            <option>Agriculture</option>
          </select>
        )}

        <select
          onChange={(e) =>
            handleFilterChange("category", e.target.value)
          }
        >
          <option value="">All Category</option>
          <option>GEN</option>
          <option>OBC</option>
          <option>SC</option>
          <option>ST</option>
          <option>EWS</option>
          <option>Divyang</option>
        </select>

        <select
          onChange={(e) =>
            handleFilterChange("gender", e.target.value)
          }
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          onChange={(e) =>
            handleFilterChange("route", e.target.value)
          }
        >
          <option value="">Transport Route</option>
          <option>Route 1</option>
          <option>Route 2</option>
          <option>Route 3</option>
        </select>

        <select
          onChange={(e) =>
            handleFilterChange("hostel", e.target.value)
          }
        >
          <option value="">Hostel</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select
          onChange={(e) =>
            handleFilterChange("rte", e.target.value)
          }
        >
          <option value="">RTE</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <button onClick={handlePrint}>
          🖨 Print / Save PDF
        </button>
      </div>

      {/* COUNT */}
      <div style={{ marginBottom: "10px" }}>
        Total Students: <b>{filteredStudents.length}</b>
      </div>

      {/* TABLE */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Father Name</th>
            <th>Class</th>
            <th style={{ width: "60px" }}>Sec</th>
            <th>Transport Route</th>
            <th>Hostel</th>
            <th>WhatsApp</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.name}</td>
              <td>{stu.fatherName || "-"}</td>
              <td>{stu.class}</td>
              <td style={{ textAlign: "center" }}>
                {stu.section || "-"}
              </td>
              <td>{stu.route || "-"}</td>
              <td>{stu.hostel || "-"}</td>
              <td>
                {stu.whatsapp ? (
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${stu.whatsapp}`,
                        "_blank"
                      )
                    }
                  >
                    WhatsApp
                  </button>
                ) : (
                  "-"
                )}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(stu)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {filteredStudents.length === 0 && (
            <tr>
              <td colSpan="8">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Students;