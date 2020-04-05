import React from "react";
import GuestNavigation from "../navigations/GuestNavigation";
import { Link } from "react-router-dom";
import { ReactComponent as Planet } from "../../images/planet.svg";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-box">
          <GuestNavigation />
          <div className="container">
            <div className="header-content">
              <div className="header-img-box">
                <Planet className="planet-img" />
              </div>
              <div className="intro">
                <h1 className="intro-title">
                  Wybierz język i<br />
                  zacznij naukę.
                  <br />
                  Po prostu.
                </h1>
                <Link
                  to="/choose_set"
                  className="no-border-btn blue-btn get-started-btn"
                >
                  Rozpocznij
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
