import React from "react";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { withRouter } from "react-router-dom";

class SelectMode extends React.Component {
  render() {
    return (
      <div>
        {this.props.location.state === undefined ? (
          <div className="error-box">
            <h2>Wystąpił błąd</h2>
            <p>
              Wróć na <Link to="/">stronę główną</Link> i spróbuj ponownie
            </p>
          </div>
        ) : (
          <div className="select-mode-section">
            <h2 className="secondary-title select-mode-title">Wybierz tryb:</h2>
            <div className="modes-box">
              <Link
                to={{
                  pathname: "/start_learning",
                  search:
                    `?id=` +
                    this.props.location.state.id +
                    "&method=with&public=" +
                    this.props.location.state.public
                }}
                className="writing-mode"
              >
                <img
                  src={require(`../../images/keyboard-01.png`)}
                  className="writing-icon"
                  alt="language"
                />
                <p>Z pisaniem</p>
              </Link>
              <Link
                to={{
                  pathname: "/start_learning",
                  search:
                    `?id=` +
                    this.props.location.state.id +
                    "&method=without&public=" +
                    this.props.location.state.public
                }}
                className="without-mode"
              >
                <img
                  src={require(`../../images/mouse-01.png`)}
                  className="without-icon"
                  alt="language"
                />
                <p>Bez pisania</p>
              </Link>
            </div>
            <button
              className="no-border-btn pure-btn back"
              onClick={this.props.history.goBack}
            >
              <FaRegArrowAltCircleLeft />
              <p>Wróć</p>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SelectMode);
