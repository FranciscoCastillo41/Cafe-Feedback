import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if(data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch(error) {
      console.log(error.message)
    }
  }
  return (
    <div className="mt-5">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table responsive>
            <thead>
              <tr className="nav-font">
                <th style={{ color: "#0072bc" }}>Date updated</th>
                <th style={{ color: "#0072bc" }}>Post image</th>
                <th style={{ color: "#0072bc" }}>Post title</th>
                <th style={{ color: "#0072bc" }}>Category</th>
                <th style={{ color: "#0072bc" }}>Delete</th>
                <th style={{ color: "#0072bc" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post._id} className="nav-font">
                  <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/post/${post.slug}`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-auto"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="text-decoration-none text-secondary"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.category}</td>
                  <td>
                    <span style={{ color: "darkred" }}>Delete</span>
                  </td>
                  <td>
                    <Link
                      className="text-decoration-none"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showMore && <Button style={{background: "#0072bc"}} onClick={handleShowMore}> show more</Button>}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
}
