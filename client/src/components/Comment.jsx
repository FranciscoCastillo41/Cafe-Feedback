import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

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
  return (
    <div className="d-flex p-4 align-items-center border-bottom">
      <Image
        className="w-10 h-10 rounded-circle mr-2"
        src={user.profilePicture}
        alt={user.username}
      />
      <div className="d-flex flex-column flex-grow-1">
        <span className="font-weight-bold text-truncate mb-1">
          {user ? `@${user.username}` : "anonymous user"}
        </span>
        <span className="text-secondary text-xs">
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>
      <p className="pb-2 mb-0 flex-grow-1">{comment.content}</p>
      <div className="ml-auto">
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
        <p className="text-muted text-sm">
          {comment.numberOfLikes > 0 &&
            comment.numberOfLikes +
              " " +
              (comment.numberOfLikes === 1 ? "like" : "likes")}
        </p>
      </div>
    </div>
  );
}
