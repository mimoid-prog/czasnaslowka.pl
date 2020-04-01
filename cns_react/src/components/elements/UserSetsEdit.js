import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import YouHaveNotAnySets from "./YouHaveNotAnySets";

class UserSetsEdit extends React.Component {
  render() {
    const { sets } = this.props;
    return (
      <div className="user-sets-edit">
        <h2 className="secondary-title user-sets-edit-title">Twoje zestawy</h2>
        {!sets ? (
          <YouHaveNotAnySets />
        ) : (
          <ul className="sets-list line-layout">
            {sets.map((item, i) => (
              <li key={i} className="item user-sets-edit-item">
                <img
                  src={require(`../../images/icons/flags/${item.icon}.png`)}
                  alt="flag"
                />
                <p>{item.name}</p>

                <div className="buttons">
                  <button
                    onClick={() => this.props.checkForChanges(item.id, "load")}
                    className="pure-btn blue-btn edit-btn"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() =>
                      this.props.mySetsMessageData(item.id, "remove", item.name)
                    }
                    className="pure-btn pink-btn delete-btn"
                  >
                    Usuń
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

UserSetsEdit.propTypes = {
  mySetsMessageData: PropTypes.func,
  checkForChanges: PropTypes.func
};

function mapStateToProps(state) {
  return {
    sets: state.sets.items
  };
}

export default connect(mapStateToProps)(UserSetsEdit);
