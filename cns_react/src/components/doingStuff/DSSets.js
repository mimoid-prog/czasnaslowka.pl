import React, { Component } from "react";
import api from "../../api";
import DSSetEdition from "../doingStuff/DSSetEdition";

class DSSets extends Component {
  state = {
    sets: [],
    removeSet: {
      removeSetConfirmation: false,
      setToRemove: ""
    },
    setMessage: "",
    setToFetch: ""
  };

  updateSetsList = () => {
    api.doingStuff
      .fetchSets(this.props.setsToFetch)
      .then(sets => this.setState({ sets }));
  };

  removeSet = () =>
    api.doingStuff
      .removeSet(this.state.removeSet.setToRemove, this.props.setsToFetch)
      .then(sets => {
        this.setState({
          sets,
          setMessage: "Usunięto",
          removeSet: {
            removeSetConfirmation: false,
            setToRemove: ""
          }
        });
      })
      .catch(() => this.setState({ langMessage: "Coś poszło nie tak" }));

  componentDidUpdate(prevProps) {
    if (this.props.setsToFetch !== prevProps.setsToFetch) {
      api.doingStuff
        .fetchSets(this.props.setsToFetch)
        .then(sets => this.setState({ sets }));
    }
  }

  componentDidMount() {
    api.doingStuff
      .fetchSets(this.props.setsToFetch)
      .then(sets => this.setState({ sets }));
  }

  render() {
    const { sets, removeSet, setToFetch } = this.state;
    console.log(sets);
    return (
      <div className="ds-sets-box">
        {sets.length === 0 ? (
          <h4 className="quaternary-title">
            Brak zestawów dla {this.props.setsToFetch}
          </h4>
        ) : (
          <React.Fragment>
            <h4 className="quaternary-title">
              Lista setów dla {this.props.setsToFetch}: ({sets.length})
            </h4>
            <ul className="ds-languages-list">
              {sets.map((set, i) => (
                <li key={i}>
                  <img
                    src={require(`../../images/icons/categories/${set.icon}.png`)}
                    alt="set icon"
                  />
                  <p>
                    {set.name} (ilość słówek: {set.foreignWords.length})
                  </p>
                  <button
                    className="no-border-btn pure-btn fetch-sets-btn"
                    onClick={() => this.setState({ setToFetch: set._id })}
                  >
                    Edytuj
                  </button>
                  <button
                    className="no-border-btn pure-btn delete-language-btn"
                    onClick={() =>
                      this.setState({
                        removeSet: {
                          removeSetConfirmation: true,
                          setToRemove: set._id
                        }
                      })
                    }
                  >
                    Usuń
                  </button>
                </li>
              ))}
            </ul>
            {removeSet.removeSetConfirmation && (
              <div className="remove-language-confirmation">
                <p>Czy na pewno usunąć?</p>
                <button
                  onClick={this.removeSet}
                  className="no-border-btn pure-btn ess-btn pink-btn"
                >
                  Tak
                </button>
                <button
                  className="no-border-btn pure-btn ess-btn dark-blue-btn"
                  onClick={() =>
                    this.setState({
                      removeSet: {
                        removeSetConfirmation: false,
                        SetToRemove: ""
                      }
                    })
                  }
                >
                  Nie
                </button>
              </div>
            )}
          </React.Fragment>
        )}

        {setToFetch && (
          <DSSetEdition
            setToFetch={setToFetch}
            updateSetsList={this.updateSetsList}
          />
        )}
      </div>
    );
  }
}

export default DSSets;
