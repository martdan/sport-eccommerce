import React from "react";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch {
            console.error("Failed to log out");
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <p>Email: {currentUser && currentUser.email}</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default Profile;
