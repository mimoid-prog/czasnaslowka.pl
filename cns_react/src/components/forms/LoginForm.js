import React from "react";
import Validator from "validator";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import BubbleLoading from "../utils/BubbleLoading";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    loginEnded: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {}, loading: true });
    const errors = this.validate(this.state.data);
    if (Object.keys(errors).length === 0) {
      this.props
        .submit(this.state.data)
        .then(answer =>
          answer.user
            ? this.props.history.push("/choose_set")
            : this.setState({ loginEnded: true })
        )
        .catch(err =>
          this.setState({
            errors: err.response.data.errors,
            loading: false
          })
        );
    } else {
      this.setState({ errors, loading: false });
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = true;
      errors.message = "Niepoprawny email.";
    } else if (!data.password) {
      errors.password = true;
      errors.message = "Hasło nie może być puste.";
    }
    return errors;
  };

  render() {
    const { data, errors, loading, loginEnded } = this.state;

    return (
      <div>
        {!loginEnded ? (
          <form className="form" onSubmit={this.onSubmit}>
            <h2 className="form-title secondary-title">Logowanie</h2>
            <label className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              spellCheck="false"
              value={data.email}
              onChange={this.onChange}
              className={`form-input ${
                errors.email || errors.global ? "error" : ""
              }`}
            />
            <label className="form-label">Hasło</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={this.onChange}
              className={`form-input ${(errors.password || errors.global) &&
                "error"}`}
            />
            <Link to="/forgot_password" className="forgot-password-btn">
              Zapomiałeś/aś hasła?
            </Link>
            <button
              type="submit"
              className="no-border-btn ess-btn blue-btn form-btn"
            >
              {loading ? <BubbleLoading /> : "ZALOGUJ"}
            </button>
            {errors.message && (
              <p className="form-error-info">{errors.message}</p>
            )}
            {errors.global && (
              <p className="form-error-info">{errors.global}</p>
            )}

            <div className="change-form">
              Nie masz konta?
              <br />
              <Link to="/signup" className="change-form-btn">
                Zarejestruj się
              </Link>
            </div>
          </form>
        ) : (
          <div className="form-message">
            <h4 className="quaternary-title">Konto nieaktywowane.</h4>
            <p>
              Wejdź na swoją skrzynkę pocztową i wciśnij link weryfikacyjny, aby
              konto zostało aktywowane.
            </p>
            <Link
              to="/"
              class="no-border-btn pure-btn pink-btn ess-btn form-home-btn"
            >
              Strona główna
            </Link>
          </div>
        )}
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default withRouter(LoginForm);
