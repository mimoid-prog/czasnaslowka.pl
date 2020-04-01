import React from "react";
import GuestNavigation from "../navigations/GuestNavigation";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-box">
          <GuestNavigation />
          <div className="header-elements header-container">
            <div className="header-img-box">
              <img
                className="header-img"
                src={require("../../images/europeSmall.png")}
                alt="europe map"
              />
            </div>
            <div className="intro container">
              <h1 className="intro-title">
                Wybierz język i zacznij naukę. <span>Po prostu.</span>
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
    );
  }
}

export default Header;
