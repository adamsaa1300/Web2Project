import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

const Search = () => {
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const fakeData = [
            { id: 1, title: "Laptop Dell", price: 500 },
            { id: 2, title: "Medical Lab Coat", price: 30 },
            { id: 3, title: "Engineering Calculator", price: 20 },
        ];

        setResults(fakeData);
    };

    return (
        <div style={{ backgroundColor: "#f6f1eb", minHeight: "100vh", padding: "20px" }}>

            <Container
                className="shadow p-4"
                style={{
                    background: "white",
                    marginTop: "20px",
                    borderRadius: "15px",
                    position: "relative",
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
                <h5 style={{ fontWeight: "bold", color: "#5a3e2b" }}>
                    Items Found: {results.length}
                </h5>

                <Row className="mt-3 g-3">
                    {results.map((item) => (
                        <Col md={4} key={item.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>${item.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    );
};

export default Search;