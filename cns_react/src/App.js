import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ChooseSetPage from "./components/pages/ChooseSetPage";
import MySetsPage from "./components/pages/MySetsPage";
import Confirmation from "./components/elements/Confirmation";
import ForgotPassword from "./components/elements/ForgotPassword";
import ResetPassword from "./components/elements/ResetPassword";
import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";
import StartLearningPage from "./components/pages/StartLearningPage";
import MyProfilePage from "./components/pages/MyProfilePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import DoingStuff from "./components/pages/DoingStuff";

const App = ({ location }) => (
  <div>
    <GuestRoute location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/choose_set" component={ChooseSetPage} />
    <Route
      location={location}
      path="/start_learning"
      component={StartLearningPage}
    />
    <UserRoute
      location={location}
      path="/my_sets"
      exact
      component={MySetsPage}
    />
    <UserRoute
      location={location}
      path="/my_profile"
      component={MyProfilePage}
    />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={Confirmation}
    />
    <Route
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPassword}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPassword}
    />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <UserRoute
      location={location}
      path="/doing_stuff"
      exact
      component={DoingStuff}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
};

export default App;
