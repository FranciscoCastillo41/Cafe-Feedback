import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 bg-light text-dark">
        <Form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <Form.Group className="mb-3">
              <Form.Label>Search Term:</Form.Label>
              <Form.Control
                type="text"
                id="searchTerm"
                value={sidebarData.searchTerm}
                onChange={handleChange}
                placeholder="Search..."
              />
            </Form.Group>
          </div>
          <div className="flex items-center gap-2">
            <Form.Group className="mb-3">
              <Form.Label>Sort:</Form.Label>
              <Form.Select id="sort" onChange={handleChange} value={sidebarData.sort}>
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="flex items-center gap-2">
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select onChange={handleChange} id="category" value={sidebarData.category}>
                <option value="uncategorized">Uncategorized</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </Form.Select>
            </Form.Group>
          </div>
          <Button
            type="submit"
            style={{ background: "#0072bc", border: "none" }}
          >
            Apply Filter
          </Button>
        </Form>
      </div>
      <div className="w-full mt-5">
        <h1 className="text-center font-semibold">Post Results</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && <p>No posts found.</p>}
          {loading && <p>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && <Button onClick={handleShowMore}>Show More</Button>}
        </div>
      </div>
    </div>
  );
}
