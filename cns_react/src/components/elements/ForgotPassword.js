import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { resetPasswordRequest } from "../../actions/auth";
import SecondaryPage from "../pages/SecondaryPage";
import { Link } from "react-router-dom";

class ForgotPassword extends React.Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    const { success } = this.state;
    return (
      <SecondaryPage>
        {!success ? (
          <ForgotPasswordForm submit={this.submit} />
        ) : (
          <div className="form-message">
            <h4 className="quaternary-title">Wysłano wiadomość</h4>
            <p>
              Na twoją skrzynkę pocztową został wysłany link umożliwiający
              zmianę hasła
            </p>
            <Link
              to="/"
              class="no-border-btn pure-btn pink-btn ess-btn form-home-btn"
            >
              Strona główna
            </Link>
          </div>
        )}
      </SecondaryPage>
    );
  }
}

ForgotPassword.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPassword);
