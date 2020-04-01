import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import YouHaveNotAnySets from "./YouHaveNotAnySets";

class UserSets extends React.Component {
  render() {
    const { sets } = this.props;

    return (
      <div className="user-sets">
        <h2 className="secondary-title user-sets-title">Twoje zestawy</h2>
        {!sets ? (
          <YouHaveNotAnySets />
        ) : (
          <ul className="sets-list block-layout">
            {sets.map((item, i) => (
              <li key={i} className="item set-field">
                <Link
                  to={{
                    pathname: "choose_set/select_mode",
                    state: {
                      id: item.id,
                      public: "no"
                    }
                  }}
                >
                  <img
                    src={require(`../../images/icons/flags/${item.icon}.png`)}
                    alt="flag"
                  />
                  <p>{item.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sets: state.sets.items
  };
}

export default connect(mapStateToProps)(UserSets);
