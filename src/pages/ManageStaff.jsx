import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getAllStaff, createStaff, updateStaff, deleteStaff } from "../api-logic/staffApi";
import StaffForm from "../components/Staff/StaffForm";
import StaffList from "../components/Staff/StaffList";
import "../CSS/manageStaff.css"

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [searchMember, setSearchMember] = useState("");

  // filter staff based on name or email
  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchMember.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchMember.toLowerCase())
  );

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
      const newStaff = await createStaff(name, email, role);
    // newest staff member to top of list
    setStaffList(prev => [newStaff, ...prev]);
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
  // delete staff member
  async function handleDelete(id) {
    const ok = window.confirm("Are you sure you want to delete this staff member?");
    if (!ok) return;
    
    try {
    await deleteStaff(id);
    setStaffList(prev => prev.filter(staff => staff.id !== id));
  } catch (err) {
    console.error("Failed to delete staff:", err);
  }
}

  return (
    <div>
      <Navbar showLinks={true} />
        <div className="manage-staff-container">
         <h2>Current staff</h2>
          <input
          type="text"
          placeholder="Search by name or email"
          value={searchMember}
          onChange={event => setSearchMember(event.target.value)}
          className="search-bar"
        />
         <div className="staff-management-wrapper">
            <div className="staff-list-container">
                <StaffList
                    staff={filteredStaff}
                    onEditClick={(staff) => setEditingStaff(staff)}
                    onDeleteClick={handleDelete}
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
