import React from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";
import { CDBModalFooter, CDBBtn, CDBIcon } from "cdbreact";
import ListGroup from "react-bootstrap/ListGroup";

export default function ComponentFooter() {
  return (
    <footer
      className="bg-dark text-light py-4"
      style={{ padding: "0.8rem", borderTop: "0.2rem solid #224C98" }}
    >
      <Container>
        <Row>
          <Col md={4}>
            <Link
              to="/"
              className="navbar-brand text-light"
              style={{
                fontSize: "2rem",
                color: "white",
                background:
                  "linear-gradient(0deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
                padding: "0.6rem",
                borderRadius: "1rem",
              }}
            >
              Dora's Cafe
            </Link>
            <p className="pt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum eget sapien libero, at faucibus justo
            </p>
            <p className="pt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </Col>
          <Col md={4}>
            <Card
              className="bg-dark text-light"
              style={{ border: "none", boxShadow: "none" }}
            >
              <Card.Title style={{ boxShadow: "none" }}>About</Card.Title>
              <ListGroup className="list-group-flush bg-dark text-light">
                <ListGroup.Item className="bg-dark text-light">
                  Cras justo odio
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark text-light">
                  Dapibus ac facilisis in
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark text-light">
                  Vestibulum at eros
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-dark text-light" style={{ border: "none" }}>
              <Card.Title style={{ boxShadow: "none" }}>Follow Us</Card.Title>
              <ListGroup className="list-group-flush bg-dark text-light">
                <ListGroup.Item className="bg-dark text-light">
                  Cras justo odio
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark text-light">
                  Dapibus ac facilisis in
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark text-light">
                  Vestibulum at eros
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <p className="text-center pt-5">
            Website created by Francisco Castillo
          </p>
          <div className="d-flex justify-content-center pt-2">
            <BsFacebook size={30} className="mx-2" />
            <BsInstagram size={30} className="mx-2" />
            <BsTwitterX size={30} className="mx-2" />
          </div>
        </Row>
      </Container>
    </footer>
  );
}
