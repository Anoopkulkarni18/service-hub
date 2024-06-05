import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  const [shouldScroll, setShouldScroll] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const contentHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      setShouldScroll(contentHeight > viewportHeight);
    };

    handleResize(); // Call once on mount to set the initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#6c757d",
        color: "#fff",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: shouldScroll ? "auto" : "unset",
      }}
    >
      <div style={{ flexGrow: 1 }}>
        &copy; All Rights Reserved With Service hub
      </div>
      <div style={{ display: "flex" }}>
        <Link to="/" target="_blank" style={{ color: "#fff", marginRight: "10px" }}>
          <FaFacebook />
        </Link>
        <Link to="/" target="_blank" style={{ color: "#fff", marginRight: "10px" }}>
          <FaYoutube />
        </Link>
        <Link to="/" target="_blank" style={{ color: "#fff", marginRight: "10px" }}>
          <FaLinkedin />
        </Link>
        <Link to="/" target="_blank" style={{ color: "#fff" }}>
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
}