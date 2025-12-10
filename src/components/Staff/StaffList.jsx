import React from "react";

export default function StaffList({ staff, onEditClick, onDeleteClick }) {
  return (
    <ul className="staff-list">
      {staff.map((staff) => (
        <li key={staff.id} style={{ marginBottom: "1rem" }}>

          <span>{staff.name} - ({staff.email}) - {staff.role ? "Admin" : "Staff"}</span>
          <div className="button-group">
            <button onClick={() => onEditClick(staff)}> Edit </button>
            <button onClick={() => onDeleteClick(staff.id)} > × </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
