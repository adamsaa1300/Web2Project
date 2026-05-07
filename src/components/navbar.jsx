import React from "react";
import {
    Navbar as BSNavbar,
    Container,
    Nav,
    OverlayTrigger,
    Tooltip,
    Dropdown
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.jpg";

import {
    AiFillHome,
    AiOutlineUser,
    AiOutlineLogin,
    AiOutlineMessage,
    AiOutlinePlus,
    AiOutlineSearch,
    AiOutlineDashboard
} from "react-icons/ai";

const Navbar = ({ userRole }) => {
    const navigate = useNavigate();

    const iconStyle = {
        color: "#5a3e2b",
        fontSize: "26px",
        margin: "0 12px",
        cursor: "pointer",
        transition: "0.2s ease",
    };

    const handleClick = (page) => {
        if (page === "home") navigate("/");
        if (page === "login") navigate("/login");
        if (page === "messages") navigate("/messages");
        if (page === "addAd") navigate("/add-ad");
        if (page === "admin") navigate("/admin");
        if (page === "profile") navigate("/profile");
    };

    const handleSearchClick = () => {
        navigate("/search");
    };

    const renderTooltip = (text) => (
        <Tooltip
            style={{
                backgroundColor: "#e6d3b3",
                color: "#5a3e2b",
                borderRadius: "8px",
                padding: "6px 10px",
                fontSize: "12px",
            }}
        >
            {text}
        </Tooltip>
    );

    const Icon = ({ icon, onClick, label }) => (
        <OverlayTrigger placement="bottom" overlay={renderTooltip(label)}>
            <span style={{ display: "inline-flex" }} onClick={onClick}>
                {icon}
            </span>
        </OverlayTrigger>
    );

    return (
        <BSNavbar
            expand="lg"
            style={{
                backgroundColor: "#f5e7d0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                padding: "0.5rem 1rem",
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 1000
            }}
        >
            <Container>
                <BSNavbar.Brand
                    href="/"
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                    />
                    <span style={{ fontSize: "22px", fontWeight: "700", color: "#5a3e2b" }}>
                        Sawweq
                    </span>
                </BSNavbar.Brand>

                <BSNavbar.Toggle />
                <BSNavbar.Collapse>
                    <Nav className="ms-auto d-flex align-items-center">

                        <Icon
                            icon={<AiFillHome style={iconStyle} />}
                            onClick={() => handleClick("home")}
                            label="Home"
                        />

                        <Icon
                            icon={<AiOutlineSearch style={iconStyle} />}
                            onClick={handleSearchClick}
                            label="Search"
                        />

                        <Icon
                            icon={<AiOutlineMessage style={iconStyle} />}
                            onClick={() => handleClick("messages")}
                            label="Messages"
                        />

                        <Icon
                            icon={<AiOutlinePlus style={iconStyle} />}
                            onClick={() => handleClick("addAd")}
                            label="Add Ad"
                        />

                        {userRole === "admin" && (
                            <Icon
                                icon={<AiOutlineDashboard style={iconStyle} />}
                                onClick={() => handleClick("admin")}
                                label="Admin"
                            />
                        )}

                        <Dropdown align="end">
                            <Dropdown.Toggle as="div" style={{ cursor: "pointer" }}>
                                <AiOutlineUser style={iconStyle} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                                style={{
                                    borderRadius: "12px",
                                    padding: "8px",
                                    backgroundColor: "#f5e7d0",
                                    border: "none",
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                                }}
                            >
                                <Dropdown.Item onClick={() => handleClick("profile")}>
                                    My Profile
                                </Dropdown.Item>

                                {userRole === "admin" && (
                                    <Dropdown.Item onClick={() => handleClick("admin")}>
                                        Admin Dashboard
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Icon
                            icon={<AiOutlineLogin style={iconStyle} />}
                            onClick={() => handleClick("login")}
                            label="Login"
                        />

                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
};

export default Navbar;