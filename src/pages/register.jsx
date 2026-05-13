import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        birthDate: "",
        location: "",
        faculty: "",
        university: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {

        const token = sessionStorage.getItem("token");

        if (token) {
            navigate("/home");
        }

    }, []);
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

    const handleSubmit =async (e) => {
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
        if (!form.faculty) {
            newErrors.faculty = "Required";
        }
        if (!form.university) {
            newErrors.university = "Required";
        }

        if (!form.email) {
            newErrors.email = "Username required";
        }
        if (!form.password || form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            try {

                const response = await axios.post(
                    "http://localhost:5000/api/users",
                    {
                        name: form.name,
                        birthDate: form.birthDate,
                        location: form.location,
                        faculty: form.faculty,
                        uni: form.university,
                        email: `${form.email}@sawweq.com`,
                        password: form.password
                    }
                );

                sessionStorage.setItem(
                    "token",
                    response.data.token
                );

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

                navigate("/home");

            } catch (err) {

                console.log(err);

                alert(
                    err.response?.data?.error ||
                    "Something went wrong"
                );

            }

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
                                <Form.Select
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    style={inputStyle(errors.location)}
                                >
                                    <option value="">Select location</option>
                                    <option>Nablus</option>
                                    <option>Ramallah</option>
                                    <option>Hebron</option>
                                    <option>Jerusalem</option>
                                    <option>Jenin</option>
                                    <option>Tulkarm</option>
                                    <option>Qalqilya</option>
                                    <option>Bethlehem</option>
                                    <option>Jericho</option>
                                </Form.Select>
                                {errors.location && <div style={{ color: "#b04a4a" }}>{errors.location}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Faculty</Form.Label>

                        <Form.Select
                            name="faculty"
                            value={form.faculty}
                            onChange={handleChange}
                            style={inputStyle(errors.faculty)}
                        >
                            <option value="">Select faculty</option>

                            <option>Medicine</option>
                            <option>Engineering</option>
                            <option>IT / Technology</option>
                            <option>Law</option>
                            <option>Business</option>
                            <option>Arts</option>
                            <option>Pharmacy</option>

                        </Form.Select>

                        {errors.faculty && (
                            <div style={{ color: "#b04a4a" }}>
                                {errors.faculty}
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>University</Form.Label>
                        <Form.Select
                            name="university"
                            value={form.university}
                            onChange={handleChange}
                            style={inputStyle(errors.university)}
                        >
                            <option value="">Select university</option>
                            <option>Palestine University</option>
                            <option>An-Najah National University</option>
                            <option>Birzeit University</option>
                            <option>Palestine Technical University (Kadoorie)</option>
                        </Form.Select>
                        {errors.university && <div style={{ color: "#b04a4a" }}>{errors.university}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Email</Form.Label>

                        <div style={{ display: "flex" }}>

                            <Form.Control
                                name="email"
                                placeholder="Enter username"
                                value={form.email}
                                onChange={handleChange}
                                style={{
                                    ...inputStyle(errors.email),
                                    borderTopRightRadius: "0",
                                    borderBottomRightRadius: "0"
                                }}
                            />

                            <div
                                style={{
                                    backgroundColor: "#e6d3b3",
                                    padding: "12px",
                                    border: "1px solid #e6d3b3",
                                    borderLeft: "none",
                                    borderTopRightRadius: "12px",
                                    borderBottomRightRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#5a3e2b",
                                    fontWeight: "600"
                                }}
                            >
                                @sawweq.com
                            </div>

                        </div>

                        {errors.email && (
                            <div style={{ color: "#b04a4a" }}>
                                {errors.email}
                            </div>
                        )}

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