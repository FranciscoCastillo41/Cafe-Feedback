import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const isMobile = window.innerWidth < 768;

  return (
    <div
      className="min-vh-100 d-flex flex-column flex-md-row"
      style={{ background: "#2c353d" }}
    >
      <Col md={3}>
        <DashSidebar />
      </Col>

      <Col md={9}>{tab === "profile" && <DashProfile />}</Col>
    </div>
  );
}
