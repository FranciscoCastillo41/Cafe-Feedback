import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields. ");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <Container className="mt-20" style={{minHeight: "80vh"}}>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Your username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              className="mt-2 mb-2"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(259deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
                border: "none",
                width: "100%",
               
              }}
            >
              {
                loading ? (
                  <>
                  <Spinner animation="grow"/>
                  <span>Loading...</span>
                  </>
                  
                ) : "Sign up"
              }
            </Button>
            <OAuth />
            <span className="mt-2 m-2">Have an account?</span>
            <Link to="/signin">Sign in</Link>
            {errorMessage && (
              <Alert variant="danger" className="mt-2">
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
