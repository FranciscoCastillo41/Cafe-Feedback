import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";
import { CDBModalFooter, CDBBtn, CDBIcon } from 'cdbreact';


export default function ComponentFooter() {
  return (

    <>
    
    
    <footer
      
      style={{ borderTopWidth: "4px", borderColor: "#224C98", width: "100%" }}
    >
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={4} className="mb-4">
            <Link
              to="/"
              className="navbar-brand text-light"
              style={{ fontSize: "2rem" }}
            >
              Dora's Cafe
            </Link>
          </Col>
          <Col xs={6} md={4} className="mb-4">
            <div className="text-left">
              <h5 className="text-muted">About</h5>
              <ul className="list-unstyled">
                <li>
                  <Link className="text-muted">Texas Wesleyan University</Link>
                </li>
                <li>
                  <Link className="text-muted">Dora's Cafe website</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={6} md={4} className="mb-4">
            <div className="text-left">
              <h5 className="text-muted">Follow Us</h5>
              <ul className="list-unstyled">
                <li>
                  <Link className="text-muted">Github</Link>
                </li>
                <li>
                  <Link className="text-muted">Facebook</Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="text-center mb-5">
        <hr style={{ borderTop: "2px solid #ccc", width: "80%" }} />
        <p className="text-muted">Website created by Francisco Castillo</p>
        <div className="d-flex justify-content-center">
          <BsFacebook size={30} className="mx-2" />
          <BsInstagram size={30} className="mx-2" />
          <BsTwitterX size={30} className="mx-2" />
        </div>
      </Container>
    </footer>
    
    </>
  );
}
