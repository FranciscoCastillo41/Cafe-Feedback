import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container className="mx-auto mb-5 mt-5">
      <h1
        className="text-center mb-4 mt-4"
        style={{ fontSize: "2rem", fontWeight: "700" }}
      >
        Profile
      </h1>
      <Card className="mx-auto" style={{ maxWidth: "400px", border: "none" }}>
        <Image
          src={currentUser.profilePicture}
          roundedCircle
          className="mx-auto mt-3"
          style={{
            width: "150px",
            height: "150px",
            
            border: "7px solid #224C98",
          }}
        />
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="username"
                placeholder="Username"
                defaultValue={currentUser.username}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button type="submit" style={{ width: "100%" }}>
              Update
            </Button>
          </Form>
          <div
            className="flex justify-between mt-2"
            style={{ color: "darkred" }}
          >
            <span>Delete</span>
            <span>Sign out</span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
