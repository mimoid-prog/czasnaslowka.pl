import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { validateToken, resetPassword } from "../../actions/auth";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import Loading from "../utils/Loading";
import SecondaryPage from "../pages/SecondaryPage";

class ResetPassword extends React.Component {
  state = {
    loading: true,
    success: false,
    changed: false
  };

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  submit = data =>
    this.props.resetPassword(data).then(() => this.setState({ changed: true }));

  render() {
    const { loading, success, changed } = this.state;
    const token = this.props.match.params.token;

    return (
      <SecondaryPage>
        {!changed && loading && <Loading />}

        {!changed && !loading && success && (
          <ResetPasswordForm submit={this.submit} token={token} />
        )}

        {!changed && !loading && !success && (
          <div className="form-message">
            <h4 className="quaternary-title">Ups, coś poszło nie tak</h4>
            <p>
              Wystąpił błąd. Sprawdź poprawność linku lub wygeneruj nowy link
              weryfikacyjny.
            </p>
            <Link
              to="/"
              class="no-border-btn pure-btn pink-btn ess-btn form-home-btn"
            >
              Strona główna
            </Link>
          </div>
        )}

        {changed && (
          <div className="form-message">
            <h4 className="quaternary-title">Hasło zostało zmienione</h4>
            <p>
              Możesz już zalogować się na swoje konto używając nowego hasła.
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

ResetPassword.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { validateToken, resetPassword })(ResetPassword);
