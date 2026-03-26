import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Logged in with ${email}`);
    };
    const handleRegister = () => alert("Redirect to Register page");
    const handleGoogle = () => alert("Login with Google");
    const handleApple = () => alert("Login with Apple");


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
        transition: "background-color 0.2s",
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
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
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

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label
                            style={{
                                color: "#5a3e2b",
                                fontWeight: "600",
                                fontSize: "16px",
                            }}
                        >
                            Email address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                borderRadius: "12px",
                                border: "1px solid #e6d3b3",
                                padding: "14px",
                                fontSize: "16px",
                                fontWeight: "500",
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label
                            style={{
                                color: "#5a3e2b",
                                fontWeight: "600",
                                fontSize: "16px",
                            }}
                        >
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                borderRadius: "12px",
                                border: "1px solid #e6d3b3",
                                padding: "14px",
                                fontSize: "16px",
                                fontWeight: "500",
                            }}
                        />
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
                    onClick={handleRegister}
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
                        fontWeight: "500",
                    }}
                >
                    or continue with
                </div>

                <Button
                    onClick={handleGoogle}
                    style={buttonStyle}
                    onMouseOver={buttonHover}
                    onMouseOut={buttonLeave}
                >
                    <FcGoogle size={24} /> Continue with Google
                </Button>

                <Button
                    onClick={handleApple}
                    style={buttonStyle}
                    onMouseOver={buttonHover}
                    onMouseOut={buttonLeave}
                >
                    <FaApple size={22} /> Continue with Apple
                </Button>
            </Card>
        </div>
    );
};

export default Login;