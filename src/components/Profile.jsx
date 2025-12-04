import React, { useState, useEffect, useRef } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { getMyProfile, changePassword } from "../api-logic/staffApi";
import "../CSS/Profile.css"

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
     // to determine if user is currently changing their password
    const [changing, setChanging] = useState(false); 

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    // to track the dropdown container for outside clicks
    const dropdownRef = useRef();
    // fetch user's profile 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        (async () => {
            try {
                const data = await getMyProfile();
                setProfile(data);
            } catch {
                console.error("Failed to fetch profile");
            }
        })();
    }, []);

    // closde dropdown when clicked outside
    useEffect(() => {
        function clickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
                setChanging(false);  // cancel password change
                resetInputs();  // clear input fields and messages
            }
        }
        document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, []);
    // helper-function to reset input fields and messages
    function resetInputs() {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess("");
    }
    // password change
    async function handleChangePassword(event) {
        event.preventDefault();
        setError("");
        setSuccess("");
        // check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        // call API
        try {
            await changePassword(oldPassword, newPassword);
             // Clear token and user from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setSuccess("Password changed successfully");
            resetInputs();
            setChanging(false);
            window.location.href = "/";
        } catch (err) {
            setError("Incorrect password");
        }
    }

    return (
        <div className="profile-container" ref={dropdownRef}>
            {/* Button that toggles dropdown */}
            <button className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <BiSolidUserCircle style={{ fontSize:"2rem", color:"white" }}/>
            </button>
            {/* dropdown content */}
            {dropdownOpen && (
                <div className="profile-dropdown">
                    <p><strong>{profile.name}</strong></p>
                    <p>{profile.email}</p>

                    {!changing && (
                        <button onClick={() => setChanging(true)}>Change password</button>
                    )}
                    {/* form for password change */}
                    {changing && (
                        <form onSubmit={handleChangePassword}>
                            <input
                                type="password"
                                placeholder="Current password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">{success}</p>}

                            <button type="submit">Save</button>
                            <button type="button" onClick={() => { setChanging(false); resetInputs(); }}>
                                Cancel
                            </button>
                        </form>
                    )}
                    {/* logout link */}
                    <NavLink to="/logout" className="logout-btn">Logout</NavLink>
                </div>
            )}
        </div>
    );
}
