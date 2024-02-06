import React from "react";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Food1 from "../../src/assets/images/food1.jpg";
import Food2 from "../../src/assets/images/food2.jpg";
import Food3 from "../../src/assets/images/food3.jpg";
import Food4 from "../../src/assets/images/food4.jpg";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsEnvelopeFill,
  BsPhoneFill,
} from "react-icons/bs";

export default function ComponentFooter() {
  return (
    <footer className="footer-32892 pb-0 bg-dark text-light ">
      <div className="site-section">
        <Container className="p-5">
          <Row>
            <Col md className="pr-md-5 mb-4 mb-md-0">
              <h1
                className="mb-3 nav-font"
                style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
              >
                About Us
              </h1>
              <p className="mb-4 text-secondary">
                Welcome to the Dora's Cafe Feedback App – your platform for
                sharing thoughts and experiences about our dining haven at Texas
                Wesleyan University. Created for both students and Dora's Cafe
                team members, this app provides a seamless space for you to
                express your opinions, suggestions, and feedback. Your input is
                invaluable in helping us enhance the dining experience for
                everyone. Join us in shaping the future of Dora's Cafe by
                sharing your thoughts today!
              </p>
              <ul className="list-unstyled quick-info mb-4">
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center text-decoration-none"
                    style={{ color: "#5c8ab9" }}
                  >
                    <BsPhoneFill className="mr-3 text-secondary" /> +1 (817) 531-4444
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center text-decoration-none"
                    style={{ color: "#5c8ab9" }}
                  >
                    <BsEnvelopeFill className="mr-3 text-secondary" />{" "}
                    admissions@txwes.edu
                  </a>
                </li>
              </ul>
            </Col>
            <Col md className="mb-4 mb-md-0">
              <h1
                className="mb-3 nav-font"
                style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
              >
                Social Media
              </h1>
              <ul className="list-unstyled tweets text-secondary">
                <li className="d-flex">
                  <div className="mr-4">
                    <BsInstagram />
                  </div>
                  <div>
                    Follow us on Instagram for a visual feast of campus life at
                    Texas Wesleyan and delightful snapshots from Dora's Cafe.
                    Stay connected and discover the vibrant community that makes
                    our university and cafe special.
                  </div>
                </li>
                <li className="d-flex">
                  <div className="mr-4">
                    <BsFacebook />
                  </div>
                  <div>
                    Join our Facebook community to stay updated on the latest
                    news, events, and engaging content from Texas Wesleyan and
                    Dora's Cafe. Connect with fellow students and cafe
                    enthusiasts for a virtual social experience.
                  </div>
                </li>
                <li className="d-flex">
                  <div className="mr-4">
                    <BsTwitterX />
                  </div>
                  <div>
                    Follow us on Twitter for quick updates, announcements, and
                    insights into the dynamic happenings at Texas Wesleyan and
                    the latest offerings at Dora's Cafe. Engage in real-time
                    conversations and be part of the buzz.
                  </div>
                </li>

                {/* Add more tweets as needed */}
              </ul>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h1
                className="mb-3 nav-font"
                style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
              >
                University Location
              </h1>
                <p className="text-gray-500">1201 Wesleyan St, Fort Worth, TX 76105</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="py-5 footer-menu-wrap d-md-flex align-items-center">
                <ul className="list-unstyled footer-menu d-flex flex-wrap mr-auto">
                  <li className="mr-3">
                    <Link to="/" className="text-decoration-none text-light">
                      Home
                    </Link>
                  </li>
                  <li className="mr-3 ">
                    <Link
                      to="/about"
                      className="text-decoration-none text-light"
                    >
                      About
                    </Link>
                  </li>
                  <li className="mr-3">
                    <Link
                      to="/university"
                      className="text-decoration-none text-light"
                    >
                      University
                    </Link>
                  </li>
                </ul>
                <div className="site-logo-wrap ml-auto">
                  <h1
                    className="display-3 nav-font"
                    style={{
                      color: "#5c8ab9",
                      fontWeight: "bolder",
                      textTransform: "uppercase",
                    }}
                  >
                    Dora's Cafe
                  </h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
