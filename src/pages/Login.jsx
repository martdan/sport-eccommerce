import React, { useRef, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch {
            setError("Failed to log in");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" ref={emailRef} required placeholder="Email" />
                <input type="password" ref={passwordRef} required placeholder="Password" />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;
