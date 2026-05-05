import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card, Spinner } from "react-bootstrap";
import homebg from "../assets/homebg.jpg";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setHasSearched(true);

        try {
            const res = await fetch("http://localhost:5000/api/products");
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

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
                <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" }} />

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
                    paddingBottom: "40px",
                    position: "relative",
                    zIndex: 10
                }}
            >
                <Row className="g-2">

                    <Col md={2}>
                        <Form.Select>
                            <option>All Categories</option>
                            <option>Slides</option>
                            <option>Books</option>
                            <option>Calculators</option>
                            <option>Laptops</option>
                            <option>Lab Coats</option>
                            <option>Colors</option>
                            <option>Bags</option>
                        </Form.Select>
                    </Col>

                    <Col md={2}>
                        <Form.Select>
                            <option>Any Location</option>
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
                    </Col>

                    <Col md={2}>
                        <Form.Select>
                            <option>Price Range</option>
                            <option>0 - 50</option>
                            <option>50 - 200</option>
                            <option>200 - 1000</option>
                            <option>1000+</option>
                        </Form.Select>
                    </Col>

                    <Col md={2}>
                        <Form.Select>
                            <option>All Faculties</option>
                            <option>Medicine</option>
                            <option>Engineering</option>
                            <option>IT / Technology</option>
                            <option>Law</option>
                            <option>Business</option>
                            <option>Arts</option>
                            <option>Pharmacy</option>
                        </Form.Select>
                    </Col>

                    <Col md={3}>
                        <Form.Select>
                            <option>All Universities</option>
                            <option>Palestine University</option>
                            <option>An-Najah National University</option>
                            <option>Birzeit University</option>
                            <option>Palestine Technical University (Kadoorie)</option>
                        </Form.Select>
                    </Col>

                    <Col md={1}>
                        <Button
                            onClick={handleSearch}
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

            {hasSearched && (
                <Container className="mt-5">
                    <h2 style={{ fontWeight: "bold", color: "#5a3e2b" }}>
                        Search Results
                    </h2>

                    {loading && (
                        <div style={{ textAlign: "center" }}>
                            <Spinner />
                        </div>
                    )}

                    {!loading && results.length === 0 && (
                        <div style={{ textAlign: "center", color: "#8b6b4f" }}>
                            No items found
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <Row className="g-4 mt-2">
                            {results.map((item) => (
                                <Col md={4} key={item._id}>
                                    <Card style={{ borderRadius: "15px", overflow: "hidden" }}>
                                        <img
                                            src={item.image}
                                            alt=""
                                            style={{ height: "200px", width: "100%", objectFit: "cover" }}
                                        />

                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>

                                            <Card.Text style={{ color: "#777", fontSize: "14px" }}>
                                                {item.description}
                                            </Card.Text>

                                            <h5 style={{ color: "#5a3e2b", fontWeight: "bold" }}>
                                                ${item.price}
                                            </h5>

                                            <div style={{ fontSize: "13px", color: "#999" }}>
                                                {item.user?.name} • {item.location}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            )}

            <Container className="mt-5">
                <h2 style={{ fontWeight: "bold", color: "#5a3e2b" }}>
                    Featured for you
                </h2>

                <Row className="g-4 mt-2">
                    {products.map((item) => (
                        <Col md={4} key={item._id}>
                            <Card style={{ borderRadius: "15px", overflow: "hidden" }}>
                                <img
                                    src={item.image}
                                    alt=""
                                    style={{ height: "200px", width: "100%", objectFit: "cover" }}
                                />

                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>

                                    <Card.Text style={{ color: "#777", fontSize: "14px" }}>
                                        {item.description}
                                    </Card.Text>

                                    <h5 style={{ color: "#5a3e2b", fontWeight: "bold" }}>
                                        ${item.price}
                                    </h5>

                                    <div style={{ fontSize: "13px", color: "#999" }}>
                                        {item.user?.name} • {item.location}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <div style={{ height: "50px" }} />
        </div>
    );
};

export default Home;