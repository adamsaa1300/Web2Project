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
    AiOutlineSearch
} from "react-icons/ai";

const Navbar = () => {

    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");

    console.log(user);

    const iconStyle = {
        color: "#5a3e2b",
        fontSize: "26px",
        margin: "0 12px",
        cursor: "pointer",
        transition: "0.2s ease",
    };

    const checkUnsavedChanges = () => {

        const hasUnsavedChanges = sessionStorage.getItem("unsavedAd") === "true";

        if (hasUnsavedChanges) {

            const confirmLeave = window.confirm(
                "You have unsaved changes. If you leave this page, your uploaded images and entered data will be lost. Do you want to continue?"
            );

            if (!confirmLeave) return false;
        }

        sessionStorage.removeItem("unsavedAd");

        return true;
    };

    const handleClick = (page) => {

        if (!checkUnsavedChanges()) return;

        if (page === "home") navigate("/");
        if (page === "login") navigate("/login");
        if (page === "messages") navigate("/chat");
        if (page === "addAd") navigate("/add-ad");
        if (page === "admin") navigate("/admin");
        if (page === "profile") navigate("/profile");
    };

    const handleSearchClick = () => {

        if (!checkUnsavedChanges()) return;

        navigate("/search");
    };

    const handleLogout = () => {

        if (!checkUnsavedChanges()) return;

        sessionStorage.removeItem("unsavedAd");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("role");

        navigate("/login");
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

                        {token && (
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

                                    {user?.role === "admin" && (
                                        <Dropdown.Item onClick={() => handleClick("admin")}>
                                            Admin Dashboard
                                        </Dropdown.Item>
                                    )}

                                    <Dropdown.Item onClick={handleLogout}>
                                        LogOut
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}

                        {!token && (
                            <Icon
                                icon={<AiOutlineLogin style={iconStyle} />}
                                onClick={() => handleClick("login")}
                                label="Login"
                            />
                        )}
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
};

export default Navbar;