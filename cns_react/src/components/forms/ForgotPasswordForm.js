import React from "react";
import Validator from "validator";
import PropTypes from "prop-types";
import BubbleLoading from "../utils/BubbleLoading";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: ""
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
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Niepoprawny email.";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <form className="form secondary-page-form" onSubmit={this.onSubmit}>
        <h3 className="quaternary-title">
          Podaj adres email przypisany do konta, aby je odzyskać
        </h3>
        <label>Email</label>
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
        <button
          type="submit"
          className="no-border-btn ess-btn blue-btn form-btn"
        >
          {loading ? <BubbleLoading /> : "WYŚLIJ"}
        </button>
        {errors.email && <p className="form-error-info">{errors.email}</p>}
        {errors.global && <p className="form-error-info">{errors.global}</p>}
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
