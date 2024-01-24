import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

import "./Header.css";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ borderBottom: "2.5px solid lightgray" }}>
      <Container>
        <Link to="/" className="navbar-brand text-light">
          Dora's Cafe
        </Link>
        {currentUser ? (
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown"
              className="d-flex align-items-center"
              style={{
                background: "transparent",
                border: "none",
              }}
            >
              <Image
                src={currentUser.profilePicture}
                alt="Profile"
                roundedCircle
                className="mr-2"
                style={{ width: "30px", height: "30px" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="text-muted">
                @{currentUser.username}
              </Dropdown.Item>
              <Dropdown.Item>{currentUser.email}</Dropdown.Item>

              <Dropdown.Item>
                <Link to="/dashboard">Profile</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <Link to="/signup" className="nav-link">
              <Button
                className="nav-signup-btn"
                style={{
                  background: "transparent",
                  borderColor: "#224C98",
                  color: "black",
                  borderWidth: "2px",
                }}
              >
                Sign in
              </Button>
            </Link>
          </>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/signup" className="nav-link">
              Sign up
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
