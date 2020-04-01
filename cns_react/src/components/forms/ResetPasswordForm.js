import React from "react";
import PropTypes from "prop-types";
import BubbleLoading from "../utils/BubbleLoading";

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      passwordConfirmation: ""
    },
    loading: false,
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
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    } else {
      this.setState({ errors, loading: false });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) {
      errors.passOne = true;
      errors.message = "Hasło nie może być puste.";
    } else if (!data.repeatPassword) {
      errors.passTwo = true;
      errors.message = "Hasło nie może być puste.";
    } else if (data.password !== data.repeatPassword) {
      errors.passOne = true;
      errors.passTwo = true;
      errors.message = "Hasła różnią się od siebie.";
    }
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <form className="form secondary-page-form" onSubmit={this.onSubmit}>
        <h3 className="tertiary-title">Podaj nowe hasło</h3>
        <label>Hasło</label>
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

        <label>Powtórz hasło</label>
        <input
          type="password"
          name="repeatPassword"
          value={data.repeatPassword}
          onChange={this.onChange}
          className={`form-input ${
            errors.passOne || errors.global ? "error" : ""
          }`}
        />
        <button
          type="submit"
          className="no-border-btn ess-btn blue-btn form-btn"
        >
          {loading ? <BubbleLoading /> : "ZMIEŃ"}
        </button>
        {errors.email && <p className="form-error-info">{errors.email}</p>}
        {errors.global && <p className="form-error-info">{errors.global}</p>}
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
