import React from "react";
import { connect } from "react-redux";
import UserNavigation from "../navigations/UserNavigation";
import GuestNavigation from "../navigations/GuestNavigation";
import Footer from "../elements/Footer";

const MainLayout = props => {
  return (
    <div className="main-layout">
      {props.isAuthenticated ? (
        <UserNavigation history={props.history} />
      ) : (
        <GuestNavigation />
      )}
      <div className="main-layout-content">{props.children}</div>
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(MainLayout);
