import React, { useRef, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch {
            setError("Failed to create an account");
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" ref={emailRef} required placeholder="Email" />
                <input type="password" ref={passwordRef} required placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
