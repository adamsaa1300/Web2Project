import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        birthDate: "",
        location: "",
        university: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!form.name || form.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!form.birthDate) {
            newErrors.birthDate = "Required";
        }

        if (!form.location) {
            newErrors.location = "Required";
        }

        if (!form.university) {
            newErrors.university = "Required";
        }

        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email";
        }

        if (!form.password || form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(form);
            alert("Register successful");
        }
    };

    const inputStyle = (hasError) => ({
        borderRadius: "12px",
        padding: "12px",
        fontSize: "15px",
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
        marginTop: "10px",
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fdf5ec" }}>
            <Card style={{ width: "520px", padding: "35px", borderRadius: "20px", boxShadow: "0 12px 30px rgba(0,0,0,0.35)", backgroundColor: "#f5e7d0" }}>
                <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
                    Register
                </h2>

                <Form onSubmit={handleSubmit} noValidate>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={form.name} onChange={handleChange} style={inputStyle(errors.name)} />
                        {errors.name && <div style={{ color: "#b04a4a" }}>{errors.name}</div>}
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control type="date" name="birthDate" value={form.birthDate} onChange={handleChange} style={inputStyle(errors.birthDate)} />
                                {errors.birthDate && <div style={{ color: "#b04a4a" }}>{errors.birthDate}</div>}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control name="location" value={form.location} onChange={handleChange} style={inputStyle(errors.location)} />
                                {errors.location && <div style={{ color: "#b04a4a" }}>{errors.location}</div>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>University</Form.Label>
                        <Form.Control name="university" value={form.university} onChange={handleChange} style={inputStyle(errors.university)} />
                        {errors.university && <div style={{ color: "#b04a4a" }}>{errors.university}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={form.email} onChange={handleChange} style={inputStyle(errors.email)} />
                        {errors.email && <div style={{ color: "#b04a4a" }}>{errors.email}</div>}
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <div style={{ position: "relative" }}>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        style={inputStyle(errors.password)}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                            color: "#5a3e2b"
                                        }}
                                    >
                                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                    </span>
                                </div>
                                {errors.password && <div style={{ color: "#b04a4a" }}>{errors.password}</div>}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <div style={{ position: "relative" }}>
                                    <Form.Control
                                        type={showConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        style={inputStyle(errors.confirmPassword)}
                                    />
                                    <span
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                            color: "#5a3e2b"
                                        }}
                                    >
                                        {showConfirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                    </span>
                                </div>
                                {errors.confirmPassword && <div style={{ color: "#b04a4a" }}>{errors.confirmPassword}</div>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button type="submit" style={buttonStyle}>
                        Submit
                    </Button>

                </Form>
            </Card>
        </div>
    );
};

export default Register;