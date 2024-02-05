import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import Form from "react-bootstrap/Form";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="d-flex flex-column p-4 border-bottom">
      <div className="d-flex align-items-center">
        <Image
          className="w-10 h-10 rounded-circle mr-2"
          src={user.profilePicture}
          alt={user.username}
        />
        <div className="flex-grow-1">
          <span className="font-weight-bold text-truncate mb-1">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-secondary text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-2">
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="d-flex">
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              className="mr-2"
              style={{ background: "#0072bc", border: "none" }}
            >
              Save
            </Button>
            <Button type="button" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <p>{comment.content}</p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div>
              <Button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`btn btn-outline-secondary btn-sm ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "btn-primary"
                }`}
              >
                <FaThumbsUp
                  className={`mr-1 ${
                    currentUser &&
                    comment.likes.includes(currentUser._id) &&
                    "text-white"
                  }`}
                />
              </Button>
              <span className="text-muted text-sm ml-1">
                {comment.numberOfLikes > 0 &&
                  `${comment.numberOfLikes} ${
                    comment.numberOfLikes === 1 ? "like" : "likes"
                  }`}
              </span>
            </div>
            {currentUser &&
              (currentUser._id === comment.userId || currentUser.isAdmin) && (
                <div className="d-flex">
                  <Button
                    onClick={handleEdit}
                    size="sm"
                    className="mr-2"
                    style={{ background: "#0072bc", border: "none" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(comment._id)}
                    style={{ background: "#0072bc", border: "none" }}
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
