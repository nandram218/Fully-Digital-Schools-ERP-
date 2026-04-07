import React, { useState, useEffect } from "react";

function Hostel() {
  const [hostels, setHostels] = useState(() => {
    const saved = localStorage.getItem("hostels");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    localStorage.setItem("hostels", JSON.stringify(hostels));
  }, [hostels]);

  const addHostel = () => {
    if (!name || !room) return;

    setHostels([...hostels, { name, room }]);
    setName("");
    setRoom("");
  };

  const deleteHostel = (index) => {
    const updated = hostels.filter((_, i) => i !== index);
    setHostels(updated);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hostel Page</h1>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Room Number"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <br /><br />

      <button onClick={addHostel}>Assign Room</button>

      <h2 style={{ marginTop: "30px" }}>Hostel List</h2>

      {hostels.map((h, index) => (
        <div key={index}>
          {h.name} - Room {h.room}
          <button onClick={() => deleteHostel(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Hostel;