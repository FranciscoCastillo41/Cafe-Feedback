import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mt-5">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table responsive>
            <thead>
              <tr className="nav-font">
                <th style={{ color: "#0072bc" }}>Date created</th>
                <th style={{ color: "#0072bc" }}>Comment content</th>
                <th style={{ color: "#0072bc" }}>Number of likes</th>
                <th style={{ color: "#0072bc" }}>PostId</th>
                <th style={{ color: "#0072bc" }}>UserId</th>
                <th style={{ color: "#0072bc" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr className="nav-font" key={comment._id}>
                  <td>{new Date(comment.updatedAt).toLocaleDateString()}</td>
                  <td>{comment.content}</td>
                  <td>{comment.numberOfLikes}</td>
                  <td>{comment.postId}</td>
                  <td>{comment.userId}</td>

                  <td>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      style={{ color: "darkred", cursor: "pointer" }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showMore && (
            <Button style={{ background: "#0072bc" }} onClick={handleShowMore}>
              {" "}
              show more
            </Button>
          )}
        </>
      ) : (
        <p>You have no comments yet</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle
              className="text-secondary mx-auto"
              style={{ fontSize: "4rem" }}
            />
          </div>
          <h3 className="mb-5 text-center mt-3">
            Are you sure you want to delete your account?
          </h3>
          <div className="d-flex justify-center gap-4">
            <Button variant="danger" onClick={handleDeleteComment}>
              Yes I'm sure
            </Button>
            <Button onClick={() => setShowModal(false)}>No, cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
