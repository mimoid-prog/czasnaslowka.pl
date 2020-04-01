import React from "react";
import { Link } from "react-router-dom";

class GuestNavigation extends React.Component {
  state = {
    showMenu: false
  };

  showMenu = () => this.setState({ showMenu: true });
  hideMenu = () => this.setState({ showMenu: false });

  render() {
    const { showMenu } = this.state;

    return (
      <div className="navbar">
        <div className="container">
          <div>
            <Link to="/" className="logo" />
            <Link to="/" className="mobile-logo" />
          </div>
          <div className={`navbar-menu-box ${showMenu ? "active" : ""}`}>
            <button
              onClick={this.showMenu}
              className="no-border-btn pure-btn hamburger"
            >
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </button>
            <div className="navbar-menu">
              <div className="close-hamburger-box">
                <button
                  className="no-border-btn pure-btn close-hamburger"
                  onClick={this.hideMenu}
                >
                  <div className="bar" />
                  <div className="bar" />
                </button>
              </div>
              <div className="navbar-list-box">
                <ul className="navbar-list">
                  <li>
                    <Link to="/login" className="pure-btn login-btn">
                      Zaloguj
                    </Link>
                  </li>

                  <li>
                    <Link to="/signup" className="pure-btn signup-btn">
                      Zarejestruj
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuestNavigation;
