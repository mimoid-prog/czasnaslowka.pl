import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class GuestSets extends React.Component {
  render() {
    return (
      <div className="guest-sets">
        <h2 className="secondary-title guest-sets-title">Gotowe zestawy</h2>
        <ul className="sets-list block-layout">
          {this.props.languages.map((item, i) => (
            <li className="item set-field" key={i}>
              <Link
                to={{
                  pathname: "choose_set/choose_category",
                  state: {
                    language: item.language
                  }
                }}
              >
                <img
                  src={require(`../../images/icons/flags/${item.image}.png`)}
                  alt="language"
                />
                <p>{item.languageName}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    languages: state.languages.items
  };
}

export default connect(mapStateToProps)(GuestSets);
