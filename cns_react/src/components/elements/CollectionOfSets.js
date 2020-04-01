import React from "react";
import PropTypes from "prop-types";
import UserSets from "./UserSets";
import GuestSets from "./GuestSets";
import { connect } from "react-redux";
import { fetchSets } from "../../actions/sets";
import { fetchLanguages } from "../../actions/languages";
import Loading from "../utils/Loading";

class CollectionOfSets extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { setsFetched, languagesFetched } = this.props;

    if (this.props.isAuthenticated) {
      if (setsFetched === false && languagesFetched === false) {
        const fetchSets = this.props.fetchSets;
        const fetchLanguages = this.props.fetchLanguages;
        Promise.all([fetchSets(), fetchLanguages()]).then(() =>
          this.setState({ loading: false })
        );
      } else if (setsFetched === false) {
        this.props.fetchSets().then(() => this.setState({ loading: false }));
      } else if (languagesFetched === false) {
        this.props
          .fetchLanguages()
          .then(() => this.setState({ loading: false }));
      } else {
        this.setState({ loading: false });
      }
    } else {
      if (languagesFetched === false) {
        this.props
          .fetchLanguages()
          .then(() => this.setState({ loading: false }));
      } else {
        this.setState({ loading: false });
      }
    }
  }
  render() {
    const { loading } = this.state;
    const { match, isAuthenticated } = this.props;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {isAuthenticated && (
              <div className="user-sets-section">
                <UserSets parent="chooseSet" layout="block" match={match} />
              </div>
            )}

            <div className="guest-sets-section">
              <GuestSets match={match} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

CollectionOfSets.propTypes = {
  fetchSets: PropTypes.func.isRequired,
  fetchLanguages: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    setsFetched: !!state.sets.fetched,
    languagesFetched: !!state.languages.fetched,
    isAuthenticated: !!state.user.token
  };
}

export default connect(
  mapStateToProps,
  { fetchSets, fetchLanguages }
)(CollectionOfSets);
