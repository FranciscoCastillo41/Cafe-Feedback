import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div style={{ background: "#2c353d" }}>
    <Container data-bs-theme="dark"
        bg="dark" style={{ minHeight: "80vh" }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4} className="mb-4 mt-20">
          <Link
            to="/"
            className="navbar-brand text-light mb-4"
            style={{
              color: "white",
              background:
                "linear-gradient(0deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
              padding: "0.6rem",
              borderRadius: "1rem",
              fontSize: "3rem",
            }}
          >
            Dora's Cafe
          </Link>
          <p className="mt-5 text-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
            turpis vel libero imperdiet.
          </p>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-20 mt-20">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-light" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 text-light" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="**********"
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
              {loading ? (
                <>
                  <Spinner animation="grow" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <OAuth />
            <span className="mt-2 m-2 text-light">Don't have an account?</span>
            <Link to="/signup" className="text-light">Sign up</Link>
            {errorMessage && (
              <Alert variant="danger" className="mt-2">
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
