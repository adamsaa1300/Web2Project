import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Search = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {//redirect to log in if not logged

        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }

    }, []);
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
        <div style={{ backgroundColor: "#f6f1eb", minHeight: "100vh", padding: "20px" }}>

            <Container
                className="shadow p-4"
                style={{
                    background: "white",
                    marginTop: "20px",
                    borderRadius: "15px",
                    paddingBottom: "40px"
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

            <Container className="mt-4">

                {loading && (
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Spinner />
                    </div>
                )}

                {!loading && hasSearched && results.length === 0 && (
                    <div style={{ textAlign: "center", color: "#8b6b4f", marginTop: "40px" }}>
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

        </div>
    );
};

export default Search;