import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Nav className="flex-column w-full md:w-56 bg-dark text-light">
      <Link
        to="/dashboard?tab=profile"
        className="nav-link d-flex align-items-center text-light"
      >
        <AiOutlineUser />
        <Nav.Item className="ml-2">Profile</Nav.Item>
      </Link>

      <Nav.Item className="nav-link cursor-pointer d-flex align-items-center text-light">
        <IoIosArrowForward />
        <span className="ml-2">Sign Out</span>
      </Nav.Item>
      
      
    </Nav>
  );
}
