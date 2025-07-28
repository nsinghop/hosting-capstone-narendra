import React from "react";
import Link from "next/link";
import "./NotFoundPage.css";

export default function Page() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-desc">Sorry, the page you are looking for does not exist.</p>
      <Link className="notfound-link" href="/">Go to Home</Link>
    </div>
  );
}
