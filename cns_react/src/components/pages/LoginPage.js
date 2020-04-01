import React from "react";
import LoginForm from "../forms/LoginForm";
import SecondaryPage from "./SecondaryPage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../../actions/auth";

class LoginPage extends React.Component {
  submit = data => this.props.login(data);

  render() {
    return (
      <SecondaryPage>
        <LoginForm submit={this.submit} />
      </SecondaryPage>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(withRouter(LoginPage));
