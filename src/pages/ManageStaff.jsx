import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getAllStaff, createStaff, updateStaff } from "../api-logic/staffApi";
import StaffForm from "../components/Staff/StaffForm";
import StaffList from "../components/Staff/StaffList";
import "../CSS/manageStaff.css"

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);

  // fetch staff members on component mount
  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    try {
      const data = await getAllStaff();
      setStaffList(data);
    } catch (err) {
      console.error("Failed to fetch staff:", err);
    }
  }
  // Add new staff
  async function handleAdd({ name, email, role }) {
    try {
      await createStaff(name, email, role);
      fetchStaff();
    } catch (err) {
      console.error("Failed to create staff:", err);
    }
  }
   // Update existing staff
  async function handleUpdate({ name, email, role }) {
    try {
      await updateStaff(editingStaff.id, name, email, role);
      setEditingStaff(null);
      fetchStaff();
    } catch (err) {
      console.error("Failed to update staff:", err);
    }
  }

  return (
    <div>
      <Navbar showLinks={true} />
        <div className="manage-staff-container">
         <h2>Current staff</h2>
         <div className="staff-management-wrapper">
            <div className="staff-list-container">
                <StaffList
                    staff={staffList}
                    onEditClick={(staff) => setEditingStaff(staff)}
                />
            </div>
            <div className="staff-form-container">
                <StaffForm
                    onSubmit={editingStaff ? handleUpdate : handleAdd}
                    initialData={editingStaff}
                    onCancel={() => setEditingStaff(null)}
                />
            </div>
        </div>
      </div>
    </div>
  );
}
