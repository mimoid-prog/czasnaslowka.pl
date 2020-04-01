import React from "react";
import SignupForm from "../forms/SignupForm";
import SecondaryPage from "./SecondaryPage";
import { signup } from "../../actions/users";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class SignupPage extends React.Component {
  state = {
    success: false
  };

  submit = data =>
    this.props.signup(data).then(() => {
      console.log("no siema");
      this.setState({ success: true });
    });

  render() {
    const { success } = this.state;
    return (
      <SecondaryPage>
        {!success ? (
          <SignupForm submit={this.submit} />
        ) : (
          <div className="form-message">
            <h4 className="quaternary-title">Konto zostało utworzone.</h4>
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
      </SecondaryPage>
    );
  }
}

SignupPage.propTypes = { signup: PropTypes.func.isRequired };

export default connect(null, { signup })(SignupPage);
