import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

function CheckoutForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
            alert("Payment successful!");
        } else {
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6} className="offset-md-3">
                    <h2 className="text-center">Checkout</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </Form.Group>
                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                required
                                placeholder="Enter your card number"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="expirationDate">
                                    <Form.Label>Expiration Date (MM/YY)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="expirationDate"
                                        value={formData.expirationDate}
                                        onChange={handleChange}
                                        required
                                        placeholder="MM/YY"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="cvv">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        required
                                        placeholder="CVV"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" block>
                            Pay Now
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CheckoutForm;
