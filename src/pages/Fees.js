import React, { useState, useEffect } from "react";

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fees")) || [];
    setFees(data);
  }, []);

  const addFee = () => {
    if (!name || !amount) return;

    const newFee = {
      id: Date.now(),
      name,
      amount,
    };

    const updated = [...fees, newFee];
    setFees(updated);
    localStorage.setItem("fees", JSON.stringify(updated));

    setName("");
    setAmount("");
  };

  return (
    <div>
      <h1>Fees</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      <button onClick={addFee}>Add Fee</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.name}</td>
              <td>{f.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}