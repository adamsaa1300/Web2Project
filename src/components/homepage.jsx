import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import homebg from "../assets/homebg.jpg";
import { FiSearch } from "react-icons/fi";
const Home = () => {
    return (
        <div style={{ backgroundColor: "#f6f1eb", minHeight: "100vh" }}>
            <div
                style={{
                    position: "relative",
                    height: "60vh",
                    backgroundImage: `url(${homebg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                ></div>

                <div style={{ position: "relative", textAlign: "center", color: "white" }}>
                    <h1 style={{ fontWeight: "bold" }}>Welcome to Sawweq</h1>
                    <p>Your smart marketplace to buy and sell anything easily</p>
                </div>
            </div>

            <Container
                className="shadow p-4"
                style={{
                    background: "white",
                    marginTop: "-50px",
                    borderRadius: "15px",
                    position: "relative",
                }}
            >
                <Row className="g-2">


                    <Col md={3}>
                        <Form.Select>
                            <option>All Categories</option>
                            <option>Books</option>
                            <option>Slides</option>

                        </Form.Select>
                    </Col>


                    <Col md={3}>
                        <Form.Select>
                            <option>Any Location</option>
                            <option>Nablus</option>
                            <option>Ramallah</option>
                            <option>Hebron</option>
                            <option>Jerusalem</option>
                        </Form.Select>
                    </Col>


                    <Col md={3}>
                        <Form.Select>
                            <option>No Price Range</option>
                            <option>0 - 50</option>
                            <option>50 - 200</option>
                            <option>200 - 1000</option>
                            <option>1000+</option>
                        </Form.Select>
                    </Col>


                    <Col md={3}>
                        <Button
                            style={{
                                width: "100%",
                                backgroundColor: "#8b6b4f",
                                border: "none",
                            }}
                        >
                            Search
                        </Button>
                    </Col>

                </Row>
            </Container>


            <Container className="mt-5">

                <h2 style="font-weight:bold;" className="mb-4" style={{ color: "#5a3e2b" }}>
                  Featured for you
                </h2>

            </Container>

            <div style={{ height: "50px" }}></div>
        </div>
    );
};

export default Home;