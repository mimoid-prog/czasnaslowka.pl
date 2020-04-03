import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

class UserNavigation extends React.Component {
  state = {
    showMenu: false,
    logout: false
  };

  showMenu = () => this.setState({ showMenu: true });
  hideMenu = () => this.setState({ showMenu: false });

  logout = () => {
    this.setState({ logout: true });
  };

  render() {
    const { showMenu, logout } = this.state;

    if (logout === true) {
      this.props.logout();
      return <Redirect to="/my_profile" />;
    }

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
                  onClick={this.hideMenu}
                  className="no-border-btn pure-btn close-hamburger"
                >
                  <div className="bar" />
                  <div className="bar" />
                </button>
              </div>
              <div className="navbar-list-box">
                <ul className="navbar-list">
                  <li>
                    <NavLink activeClassName="active" to="/choose_set">
                      Wybierz zestaw
                    </NavLink>
                  </li>

                  <li>
                    <NavLink activeClassName="active" to="/my_sets">
                      Moje zestawy
                    </NavLink>
                  </li>

                  <li>
                    <NavLink activeClassName="active" to="/my_profile">
                      Mój profil
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={this.logout}
                      className="no-border-btn pure-btn"
                    >
                      Wyloguj
                    </button>
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

UserNavigation.propTypes = {
  logout: PropTypes.func
};

export default connect(null, { logout })(UserNavigation);
