import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!email || !email.includes("@")) {
            newErrors.email = "Invalid email";
        }

        if (!password || password.length < 4) {
            newErrors.password = "Wrong password";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert("Login successful");
        }
    };

    const inputStyle = (hasError) => ({
        borderRadius: "12px",
        padding: "14px",
        fontSize: "16px",
        border: hasError ? "2px solid #b04a4a" : "1px solid #e6d3b3",
    });

    const buttonStyle = {
        width: "100%",
        borderRadius: "12px",
        fontWeight: "600",
        fontSize: "16px",
        backgroundColor: "#d2b48c",
        border: "2px solid #5a3e2b",
        color: "#5a3e2b",
        padding: "12px",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
    };

    const buttonHover = (e) => {
        e.currentTarget.style.backgroundColor = "#e6d3b3";
    };

    const buttonLeave = (e) => {
        e.currentTarget.style.backgroundColor = "#d2b48c";
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fdf5ec",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <Card
                style={{
                    width: "480px",
                    padding: "35px",
                    borderRadius: "20px",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                    backgroundColor: "#f5e7d0",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        color: "#5a3e2b",
                        marginBottom: "30px",
                        fontWeight: "700",
                        fontSize: "28px",
                    }}
                >
                    Login
                </h2>

                <Form onSubmit={handleLogin} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: "#5a3e2b", fontWeight: "600" }}>
                            Email address
                        </Form.Label>

                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            style={inputStyle(errors.email)}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((prev) => ({ ...prev, email: "" }));
                            }}
                        />

                        {errors.email && (
                            <div style={{ color: "#b04a4a", fontSize: "14px", marginTop: "5px" }}>
                                {errors.email}
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: "#5a3e2b", fontWeight: "600" }}>
                            Password
                        </Form.Label>

                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            style={inputStyle(errors.password)}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, password: "" }));
                            }}
                        />

                        {errors.password && (
                            <div style={{ color: "#b04a4a", fontSize: "14px", marginTop: "5px" }}>
                                {errors.password}
                            </div>
                        )}
                    </Form.Group>

                    <Button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={buttonHover}
                        onMouseOut={buttonLeave}
                    >
                        Login
                    </Button>
                </Form>

                <Button
                    onClick={() => navigate("/register")}
                    style={buttonStyle}
                    onMouseOver={buttonHover}
                    onMouseOut={buttonLeave}
                >
                    Register
                </Button>

                <div
                    style={{
                        textAlign: "center",
                        margin: "15px 0",
                        color: "#5a3e2b",
                    }}
                >
                    or continue with
                </div>

                <Button
                    style={buttonStyle}
                    onMouseOver={buttonHover}
                    onMouseOut={buttonLeave}
                    onClick={() => alert("Login with Google")}
                >
                    <FcGoogle size={24} /> Continue with Google
                </Button>

                <Button
                    style={buttonStyle}
                    onMouseOver={buttonHover}
                    onMouseOut={buttonLeave}
                    onClick={() => alert("Login with Apple")}
                >
                    <FaApple size={22} /> Continue with Apple
                </Button>
            </Card>
        </div>
    );
};

export default Login;