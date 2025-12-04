import React, { useState, useEffect } from "react";

export default function StaffForm({ onSubmit, initialData = null, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(false); // false = normal staff, true = admin

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setRole(initialData.role);
    } else {
        setName("");
        setEmail("");
        setRole(false);
    }
  }, [initialData]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name, email, role });
    if (!initialData) {
      setName("");
      setEmail("");
      setRole(false);
    }
  }

  function handleCancel() {
    setName("");
    setEmail("");
    setRole(false);
    if (onCancel) onCancel();
}

  return (
    <form onSubmit={handleSubmit} className="staff-form">
      <h3>{initialData ? "Edit staff" : "Add new staff"}</h3>
      <input 
        placeholder="Name" 
        value={name} 
        onChange={(event) => setName(event.target.value)} 
        required
      />
      <input 
        placeholder="Email" 
        type="email"
        value={email} 
        onChange={(event) => setEmail(event.target.value)} 
        required
      />
      <select value={role} onChange={(event) => setRole(event.target.value === "true")}>
        <option value={false}>Staff</option>
        <option value={true}>Admin</option>
      </select>
      <button type="submit">{initialData ? "Save" : "Add"}</button>
      {initialData && <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>}
    </form>
  );
}
