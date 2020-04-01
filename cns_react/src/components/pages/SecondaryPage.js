import React from "react";
import { Link } from "react-router-dom";

const SecondaryPage = props => (
  <div className="secondary-page">
    <Link to="/" className="back-to-home-btn">
      <img
        className="mobile"
        src={require("../../images/logo-white.png")}
        alt="logo"
      />
      <img
        className="desktop"
        src={require("../../images/WhiteWithFlags.png")}
        alt="logo"
      />
    </Link>
    <div className="secondary-content">{props.children}</div>
  </div>
);

export default SecondaryPage;
