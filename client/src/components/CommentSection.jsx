import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/esm/Image";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  console.log(comments);

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
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
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
            <Alert variant="danger" className="mt-3">
              {commentError}
            </Alert>
          )}
        </Form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments: </p>
            <div>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit}/>
          ))}
        </>
      )}
    </div>
  );
}
