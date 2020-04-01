import React from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import api from "../../api";
import { Link } from "react-router-dom";
import Loading from "../utils/Loading";
import { withRouter } from "react-router-dom";

class ChooseCategory extends React.Component {
  state = {
    sets: [],
    loading: true,
    noData: false
  };

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      api.sets
        .fetchGuestSets(this.props.location.state.language)
        .then(data => this.setState({ sets: data, loading: false }));
    } else {
      this.setState({ noData: true });
    }
  }

  render() {
    const { loading, sets } = this.state;
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
          <div>
            {loading ? (
              <Loading />
            ) : (
              <div className="choose-category-section">
                <h2 className="secondary-title">Wybierz kategorię:</h2>
                {sets ? (
                  <ul className="languages-list">
                    {sets.map((item, i) => (
                      <li className="item set-field" key={i}>
                        <Link
                          to={{
                            pathname: "/choose_set/select_mode",
                            state: {
                              id: item.id,
                              public: "yes"
                            }
                          }}
                        >
                          <img
                            src={require(`../../images/icons/categories/${item.icon}.png`)}
                            alt={item.name}
                            className="icon"
                          />
                          <div>
                            <p className="set-name">{item.name}</p>
                            <p className="quantity-of-words">
                              ilość słów: {item.quantityOfWords}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="no-languages-text">
                    <p>Ten język nie ma żadnych zestawów.</p>
                    <p>Wciśnij "wróć", aby wybrać inny język.</p>
                  </div>
                )}

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
        )}
      </div>
    );
  }
}

export default withRouter(ChooseCategory);
