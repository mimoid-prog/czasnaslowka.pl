import React from "react";
import UserNavigation from "../navigations/UserNavigation";
import GuestNavigation from "../navigations/GuestNavigation";
import Footer from "../elements/Footer";
import { Switch, Route } from "react-router-dom";
import CollectionOfSets from "../elements/CollectionOfSets";
import ChooseCategory from "../elements/ChooseCategory";
import SelectMode from "../elements/SelectMode";
import { connect } from "react-redux";

class ChooseSetPage extends React.Component {
  state = {
    id: "",
    method: "",
    language: "",
    owner: ""
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="choose-set-page">
        {isAuthenticated ? (
          <UserNavigation history={this.props.history} />
        ) : (
          <GuestNavigation />
        )}
        <div className="choose-set-main">
          <div className="container">
            <Switch>
              <Route
                location={this.props.location}
                path={this.props.match.path}
                exact
                component={CollectionOfSets}
              />
              <Route
                location={this.props.location}
                path={`${this.props.match.url}/choose_category`}
                component={ChooseCategory}
              />
              <Route
                location={this.props.location}
                path={`${this.props.match.url}/select_mode`}
                component={SelectMode}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(ChooseSetPage);
