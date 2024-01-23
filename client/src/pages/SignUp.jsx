import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

export default function SignUp() {
  return (
    <Container className="mt-20">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Link
            to="/"
            className="navbar-brand text-light mb-4"
            style={{ fontSize: "3rem" }}
          >
            Dora's Cafe
          </Link>
          <p className="mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
            turpis vel libero imperdiet.
          </p>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Your username</Form.Label>
              <Form.Control type="email" placeholder="Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              type="submit"
              className="mt-2 mb-2"
              style={{
                background:
                  "linear-gradient(259deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
                border: "none",
                width: "100%",
              }}
            >
              Signup
            </Button>
            <span className="mt-2 m-2">Have an account?</span>
            <Link to="/signin">Sign in</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
