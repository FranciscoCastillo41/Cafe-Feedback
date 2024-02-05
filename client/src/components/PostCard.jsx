import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import Card from "react-bootstrap/Card";

export default function PostCard({ post }) {
  return (
    <Card className="mb-4 shadow-md rounded-md" style={{border: "none"}}>
      <Link to={`/post/${post.slug}`}>
        <Card.Img src={post.image} alt="post cover" className="img-fluid" />
      </Link>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text className="italic text-sm text-secondary mb-2">
          {post.category}
        </Card.Text>
        <Link
          to={`/post/${post.slug}`}
          className="btn btn-primary"
          style={{ background: "#0072bc", border: "none" }}
        >
          Read article
        </Link>
      </Card.Body>
    </Card>
  );
}
