import React, { useState } from "react";

function Fees() {
  const [fees, setFees] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addFee = () => {
    if (name === "" || amount === "") return;

    const newFee = { name, amount };
    setFees([...fees, newFee]);

    setName("");
    setAmount("");
  };

  const deleteFee = (index) => {
    const updated = fees.filter((f, i) => i !== index);
    setFees(updated);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Fees Page</h1>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br /><br />

      <button onClick={addFee}>Add Fee</button>

      <h2 style={{ marginTop: "30px" }}>Fees List</h2>

      {fees.length === 0 ? (
        <p>No fees added</p>
      ) : (
        fees.map((f, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {f.name} - ₹{f.amount}

            <button
              onClick={() => deleteFee(index)}
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

export default Fees;