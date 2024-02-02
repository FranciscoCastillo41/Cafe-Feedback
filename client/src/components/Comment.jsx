import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import moment from "moment";

export default function Comment({ comment }) {
  const [user, setUser] = useState({});
  console.log(user);
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
      <p className="pb-2 mb-0">{comment.content}</p>
    </div>
  );
}
