import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  const [shouldScroll, setShouldScroll] = React.useState(false); // State for scroll behavior

  React.useEffect(() => {
    const handleResize = () => {
      // Recalculate scroll behavior on window resize
      const contentHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      setShouldScroll(contentHeight > viewportHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array to run only on mount

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
        marginTop: "25px", // Conditional height
      }}
    >
      <div style={{ flexGrow: 1 }}>
        &copy; All Rights Reserved With Service hub
      </div>
      <div style={{ display: "flex" }}>
        <Link
          to={"/"}
          target="_blank"
          style={{ color: "#fff", marginRight: "10px" }}
        >
          <FaFacebook />
        </Link>
        <Link
          to={"/"}
          target="_blank"
          style={{ color: "#fff", marginRight: "10px" }}
        >
          <FaYoutube />
        </Link>
        <Link
          to={"/"}
          target="_blank"
          style={{ color: "#fff", marginRight: "10px" }}
        >
          <FaLinkedin />
        </Link>
        <Link to={"/"} target="_blank" style={{ color: "#fff" }}>
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
}
