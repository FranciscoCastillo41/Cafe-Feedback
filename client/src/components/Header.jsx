import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand text-light">
          Dora's Cafe
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </Nav>
          <Form inline="true">
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
