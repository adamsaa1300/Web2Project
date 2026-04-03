import React from "react";
import {
    Navbar as BSNavbar,
    Container,
    Nav,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";

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

    const iconStyle = {
        color: "#5a3e2b",
        fontSize: "28px",
        margin: "0 15px",
        cursor: "pointer"
    };

    const handleClick = (page) => {
        switch (page) {
            case "home":
                window.location.href = "/";
                break;
            case "login":
                window.location.href = "/login";
                break;
            case "messages":
                window.location.href = "/messages";
                break;
            case "addAd":
                window.location.href = "/add-ad";
                break;
            case "admin":
                window.location.href = "/admin";
                break;
            case "profile":
                window.location.href = "/profile";
                break;
            default:
                break;
        }
    };

    const handleSearchClick = () => {
        window.location.href = "/#search";
    };

    const renderTooltip = (props, text) => (
        <Tooltip
            {...props}
            style={{
                backgroundColor: "#e6d3b3",
                color: "#5a3e2b",
                borderRadius: "12px",
                padding: "6px 12px",
                fontSize: "14px",
                ...props.style
            }}
        >
            {text}
        </Tooltip>
    );

    return (
        <BSNavbar
            expand="lg"
            style={{
                backgroundColor: "#f5e7d0",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                padding: "0.5rem 1rem",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1000
            }}
        >
            <Container>

                <BSNavbar.Brand
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            objectFit: "cover"
                        }}
                    />
                    <span
                        style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#5a3e2b"
                        }}
                    >
                        Sawweq
                    </span>
                </BSNavbar.Brand>

                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />

                <BSNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">

                        <OverlayTrigger placement="bottom" overlay={(props) => renderTooltip(props, "Home")}>
                            <AiFillHome style={iconStyle} onClick={() => handleClick("home")} />
                        </OverlayTrigger>

                        <OverlayTrigger placement="bottom" overlay={(props) => renderTooltip(props, "Search")}>
                            <AiOutlineSearch style={iconStyle} onClick={handleSearchClick} />
                        </OverlayTrigger>

                        <OverlayTrigger placement="bottom" overlay={(props) => renderTooltip(props, "Messages")}>
                            <AiOutlineMessage style={iconStyle} onClick={() => handleClick("messages")} />
                        </OverlayTrigger>

                        <OverlayTrigger placement="bottom" overlay={(props) => renderTooltip(props, "Add Ad")}>
                            <AiOutlinePlus style={iconStyle} onClick={() => handleClick("addAd")} />
                        </OverlayTrigger>

                        {userRole === "admin" && (
                            <OverlayTrigger placement="bottom" overlay={(props) => renderTooltip(props, "Admin Dashboard")}>
                                <AiOutlineDashboard style={iconStyle} onClick={() => handleClick("admin")} />
                            </OverlayTrigger>
                        )}

                        <OverlayTrigger placement="bottom" overlay={(props) => renderTooltip(props, "Profile")}>
                            <AiOutlineUser style={iconStyle} onClick={() => handleClick("profile")} />
                        </OverlayTrigger>

                        <OverlayTrigger placement="bottom" overlay={(props) => renderTooltip(props, "Login")}>
                            <AiOutlineLogin style={iconStyle} onClick={() => handleClick("login")} />
                        </OverlayTrigger>

                    </Nav>
                </BSNavbar.Collapse>

            </Container>
        </BSNavbar>
    );
};

export default Navbar;