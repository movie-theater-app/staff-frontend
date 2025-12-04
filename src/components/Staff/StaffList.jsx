import React from "react";

export default function StaffList({ staff, onEditClick }) {
  return (
    <ul className="staff-list">
      {staff.map((staff) => (
        <li key={staff.id} style={{ marginBottom: "1rem" }}>
          <span>{staff.name} - ({staff.email}) - {staff.role ? "Admin" : "Staff"}</span>
          <button onClick={() => onEditClick(staff)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}
