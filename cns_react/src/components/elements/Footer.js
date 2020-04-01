import React from "react";
import logo from "../../images/logo-white.png";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-box">
          <ul>
            <li>kontakt@czasnaslowka.pl</li>
            <li>Regulamin</li>
            <li>
              <img src={logo} className="footer-logo" alt="footer logo" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
