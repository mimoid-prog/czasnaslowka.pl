import React from "react";
import MainLayout from "../layouts/MainLayout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { resetPasswordRequest } from "../../actions/auth";

class MyProfilePage extends React.Component {
  state = {
    changePasswordLink: false
  };

  changePassword = () => {
    const data = { email: this.props.email };
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ changePasswordLink: true }));
  };

  render() {
    return (
      <MainLayout>
        <div className="my-profile-main">
          <div className="container">
            <div className="my-account-section">
              <h3 className="tertiary-title">Moje konto</h3>
              <div className="my-account-box">
                <FaUser />
                <p>Email: {this.props.email}</p>
                <p>Data założenia: {this.props.creationDate}</p>
              </div>
            </div>
            <div className="settings-section">
              <h3 className="tertiary-title">Ustawienia</h3>
              <div className="settings-box">
                <IoMdSettings />
                <button
                  className="no-border-btn pure-btn"
                  onClick={this.changePassword}
                >
                  Zmień hasło
                </button>
                {this.state.changePasswordLink && (
                  <React.Fragment>
                    <p> - </p>
                    <p>
                      Link ze zmianą hasła został wysłany na twoją skrzynkę
                      pocztową. Wyloguj się, aby móc z niego skorzystać.
                    </p>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

MyProfilePage.propTypes = {
  email: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
    creationDate: state.user.creationDate
  };
}

export default connect(mapStateToProps, { resetPasswordRequest })(
  MyProfilePage
);
