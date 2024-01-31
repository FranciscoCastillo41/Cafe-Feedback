import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message)
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-muted text-sm align-items-center">
          <p>Signed in as:</p>
          <div className="flex items-center">
            <Image
              src={currentUser.profilePicture}
              className="h-5 w-5 object-cover"
              roundedCircle
            />
            <Link to={"/dashboard?tab=profile"} className="text-xs">
              @{currentUser.username}
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-sm my-5 flex gap-1">
          You must be signed in to comment.
          <Link to={"/signin"}>Sign in</Link>
        </div>
      )}
      {currentUser && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Control
              placeholder="Add a comment..."
              maxLength="200"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              as="textarea"
              rows={3}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-muted text-xs">
                {200 - comment.length} Charachters remaining
              </p>
              <Button type="submit">Submit</Button>
            </div>
          </Form.Group>
          {commentError && (
            <Alert variant="danger" className="mt-3">{commentError}</Alert>
          )}
          
        </Form>
        
      )}
    </div>
  );
}
