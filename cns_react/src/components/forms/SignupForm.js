import React from "react";
import Validator from "validator";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BubbleLoading from "../utils/BubbleLoading";
import ReCAPTCHA from "react-google-recaptcha";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
        repeatPassword: "",
        creationDate: "",
        captcha: ""
      },
      loading: false,
      errors: {}
    };

    this.recaptchaRef = React.createRef();
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  captchaChange = () =>
    this.setState({
      data: {
        ...this.state.data,
        captcha: this.recaptchaRef.current.getValue()
      }
    });

  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {}, loading: true });
    const errors = this.validate(this.state.data);
    if (Object.keys(errors).length === 0) {
      const today = new Date();
      const creationDate =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

      this.props
        .submit({
          email: this.state.data.email,
          password: this.state.data.password,
          creationDate: creationDate,
          captcha: this.state.data.captcha
        })
        .catch(err => {
          this.recaptchaRef.current.reset();
          this.setState({ errors: err.response.data.errors, loading: false });
        });
    } else {
      this.setState({ errors, loading: false });
    }
  };

  validate = data => {
    console.log();
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = true;
      errors.message = "Niepoprawny email.";
    } else if (!data.password) {
      errors.passOne = true;
      errors.message = "Hasło nie może być puste.";
    } else if (!data.repeatPassword) {
      errors.passTwo = true;
      errors.message = "Hasło nie może być puste.";
    } else if (data.password !== data.repeatPassword) {
      errors.passOne = true;
      errors.passTwo = true;
      errors.message = "Hasła różnią się od siebie.";
    } else if (!data.captcha) {
      errors.captcha = true;
      errors.message = "Potwierdź, że nie jesteś robotem";
    }
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <h2 className="form-title secondary-title">Rejestracja</h2>
          <label className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
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
            className={`form-input ${
              errors.passOne || errors.global ? "error" : ""
            }`}
          />

          <label className="form-label">Powtórz hasło</label>
          <input
            type="password"
            name="repeatPassword"
            value={data.repeatPassword}
            onChange={this.onChange}
            className={`form-input ${
              errors.passTwo || errors.global ? "error" : ""
            }`}
          />

          <ReCAPTCHA
            id="captcha"
            style={{ display: "inline-block", textAlign: "center" }}
            ref={this.recaptchaRef}
            sitekey="6Lc8P8QUAAAAAD_gO4OGrTyQBiQm41sOvENujU_v"
            onChange={this.captchaChange}
          />

          <button
            type="submit"
            className="no-border-btn ess-btn blue-btn form-btn"
          >
            {loading ? <BubbleLoading /> : "ZAREJESTRUJ"}
          </button>
          {errors.message && (
            <p className="form-error-info">{errors.message}</p>
          )}
          {errors.global && <p className="form-error-info">{errors.global}</p>}

          <div className="change-form">
            Masz już konto?
            <br />
            <Link to="/login" className="change-form-btn">
              Zaloguj się
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
