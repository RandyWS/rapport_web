import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="page">
      <h3>This is the public landing page</h3>
      <Link to="login">Log In?</Link>
    </div>
  );
}
