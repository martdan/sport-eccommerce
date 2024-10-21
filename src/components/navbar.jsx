import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from "phosphor-react";
import { useAuth } from "../components/AuthProvider"; // Import useAuth to access authentication state
import "./navbar.css";

export const Navbar = () => {
    const { currentUser, logout } = useAuth(); // Access current user and logout function

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out");
        }
    };

    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Shop</Link>
                <Link to="/sell">Sell</Link>
                <Link to="/cart">
                    <ShoppingCart size={32} />
                </Link>

                {/* Show login and signup links if no user is logged in */}
                {!currentUser ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        {/* Show profile and logout links if user is logged in */}
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                )}
            </div>
        </div>
    );
};
