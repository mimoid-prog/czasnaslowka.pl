import React from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import BubbleLoading from "../utils/BubbleLoading";

class SetEdition extends React.Component {
  state = {
    originalData: {
      id: "",
      name: "",
      language: "english",
      foreignWords: ["", "", "", "", "", "", "", ""],
      polishWords: ["", "", "", "", "", "", "", ""]
    },
    data: {
      id: "",
      name: "",
      language: "english",
      foreignWords: ["", "", "", "", "", "", "", ""],
      polishWords: ["", "", "", "", "", "", "", ""]
    },
    help: false,
    errorMessage: "",
    message: "",
    loading: false
  };

  checkForEmptySpaces = (f, p) => {
    let i = 0;

    while (i < f.length) {
      if (f[i] === "" || p[i] === "") {
        f.splice(i, 1);
        p.splice(i, 1);
        i--;
      }
      i++;
    }
    return [f, p];
  };

  onKeyPress = e => {
    console.log(e);
    if (e.which === 13) e.preventDefault();
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(e);
    if (e.keyCode === 13) return false;

    this.setState({ loading: true });
    const { originalData, data } = this.state;
    const filtered1 = data.foreignWords.filter(value => value !== "");
    const filtered2 = data.polishWords.filter(value => value !== "");

    if (!data.name || (filtered1.length === 0 && filtered2.length === 0)) {
      this.setState({
        errorMessage:
          "Wypełnij wszystkie wymagane pola, czyli nazwa zestawu, język i co najmniej jedna para wyrazów.",
        loading: false
      });
    } else {
      if (!originalData.id) {
        let clonedF = [...data.foreignWords];
        let clonedP = [...data.polishWords];

        const arrays = this.checkForEmptySpaces(clonedF, clonedP);

        this.props
          .createSet({
            ...data,
            foreignWords: arrays[0],
            polishWords: arrays[1]
          })
          .then(() => this.setState({ message: "Zapisano", loading: false }));
      } else {
        let change = false;

        if (
          originalData.name !== data.name ||
          originalData.language !== data.language
        ) {
          change = true;
        } else {
          for (var i = 0; i < data.foreignWords.length; i++) {
            if (
              originalData.foreignWords[i] !== data.foreignWords[i] ||
              originalData.polishWords[i] !== data.polishWords[i]
            ) {
              change = true;
              break;
            }
          }
        }

        if (change) {
          let clonedF = [...data.foreignWords];
          let clonedP = [...data.polishWords];

          const arrays = this.checkForEmptySpaces(clonedF, clonedP);

          this.props
            .editSet({
              ...data,
              foreignWords: arrays[0],
              polishWords: arrays[1]
            })
            .then(() => this.setState({ message: "Zapisano", loading: false }));
        } else {
          this.setState({ message: "Dokonaj zmian przed zapisaniem" });
        }
      }

      //This function sends info to his parent (MySetsPage) if there were any changes to current set. In this example we send false because after pressing 'save' set is saved or there werent any changes. In both situations current set is the same as in the db.
      this.props.ifSetHasChanges(false);
    }
  };

  onChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });

    this.props.ifSetHasChanges(true);
  };

  onWordsChange = e => {
    const lang = e.target.getAttribute("data-lang");
    const number = Number(e.target.getAttribute("data-number"));

    if (lang === "foreign") {
      const arr = this.state.data.foreignWords.slice();
      arr[number] = e.target.value;
      this.setState({
        data: {
          ...this.state.data,
          foreignWords: arr
        }
      });
    } else {
      const arr = this.state.data.polishWords.slice();
      arr[number] = e.target.value;
      this.setState({
        data: {
          ...this.state.data,
          polishWords: arr
        }
      });
    }

    this.props.ifSetHasChanges(true);
  };

  addInput = () => {
    const foreignArr = this.state.data.foreignWords.slice();
    const polishArr = this.state.data.polishWords.slice();
    const amountOfLines = foreignArr.length;

    if (
      foreignArr[amountOfLines - 2] !== "" ||
      polishArr[amountOfLines - 2] !== ""
    ) {
      foreignArr.push("");
      polishArr.push("");

      this.setState(
        {
          data: {
            ...this.state.data,
            foreignWords: foreignArr,
            polishWords: polishArr
          }
        },
        () => this.refs.scrollbars.scrollToBottom()
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.set !== prevProps.set) {
      const { set } = this.props;

      if (set.foreignWords.length < 8) {
        for (var i = set.foreignWords.length; i < 8; i++) {
          set.foreignWords.push("");
          set.polishWords.push("");
        }
      } else {
        set.foreignWords.push("");
        set.polishWords.push("");
      }

      this.setState({
        originalData: {
          id: set._id,
          name: set.name,
          language: set.language,
          foreignWords: set.foreignWords,
          polishWords: set.polishWords,
          message: ""
        },
        data: {
          id: set._id,
          name: set.name,
          language: set.language,
          foreignWords: set.foreignWords,
          polishWords: set.polishWords
        },
        errorMessage: "",
        message: ""
      });
    }
  }

  render() {
    const { data, errorMessage, message, help, loading } = this.state;
    const amountOfLines = data.foreignWords.length;

    return (
      <div className="set-edition-section">
        <div className="s-container">
          <form onSubmit={this.onSubmit} onKeyPress={this.onKeyPress}>
            <h2 className="secondary-title set-edition-title">
              {data.id ? "Edytowanie zestawu" : "Utwórz nowy zestaw"}
            </h2>
            <ul className="set-edition-list">
              <li>
                <div className="name-of-set-item">
                  <label>
                    Nazwa zestawu:
                    {errorMessage && (
                      <span className="set-edition-error"> !!!</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={this.onChange}
                    maxLength="24"
                    spellCheck="false"
                    required
                  />
                </div>

                <div className="language-of-set-item">
                  <label>
                    Wybierz język:
                    {errorMessage && (
                      <span className="set-edition-error"> !!!</span>
                    )}
                  </label>

                  <select
                    value={data.language}
                    onChange={this.onChange}
                    name="language"
                    required
                  >
                    <option value="english">angielski</option>
                    <option value="french">francuski</option>
                    <option value="spanish">hiszpański</option>
                    <option value="german">niemiecki</option>
                    <option value="swedish">szwedzki</option>
                    <option value="russian">rosyjski</option>
                    <option value="italian">włoski</option>
                  </select>
                </div>
              </li>
              <li className="words-item">
                <ul className="words-columns">
                  <li className="words-languages">
                    <label>
                      Język obcy:
                      {errorMessage && (
                        <span className="set-edition-error"> !!!</span>
                      )}
                    </label>
                    <label>
                      Język polski:
                      {errorMessage && (
                        <span className="set-edition-error"> !!!</span>
                      )}
                    </label>
                  </li>
                  <li>
                    <ul id="words-list" className="words-list">
                      <Scrollbars style={{ height: 304 }} ref="scrollbars">
                        {[...Array(amountOfLines)].map((e, i) => (
                          <li key={i}>
                            <input
                              type="text"
                              data-lang="foreign"
                              data-number={i}
                              className="foreign-word"
                              value={data.foreignWords[i]}
                              onChange={this.onWordsChange}
                              onClick={
                                i + 1 === amountOfLines ? this.addInput : null
                              }
                              spellCheck="false"
                              maxLength="46"
                            />
                            <input
                              type="text"
                              data-lang="polish"
                              data-number={i}
                              className="polish-word"
                              value={data.polishWords[i]}
                              onChange={this.onWordsChange}
                              onClick={
                                i + 1 === amountOfLines ? this.addInput : null
                              }
                              spellCheck="false"
                              maxLength="46"
                            />
                          </li>
                        ))}
                      </Scrollbars>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="buttons-item">
                <button
                  type="submit"
                  className="pure-btn ess-btn pink-btn save-btn"
                >
                  {loading ? (
                    <BubbleLoading width="25px" height="25px" />
                  ) : (
                    "Zapisz"
                  )}
                </button>

                <button
                  type="button"
                  onClick={e => this.props.checkForChanges(e, "new")}
                  className="pure-btn ess-btn reverse-btn"
                >
                  Utwórz nowy
                </button>
              </li>
            </ul>
            <p className="form-error-info ">{errorMessage && errorMessage}</p>
            <p className="form-error-info ">{message && message}</p>
            <div className="help-box">
              <img
                onClick={() => this.setState({ help: !help })}
                src={require("../../images/faq.png")}
                alt="faq"
              />
              <div className={`help-content ${help ? "active" : ""}`}>
                <p>
                  Aby utworzyć zestaw musisz podać nazwę zestawu, język oraz
                  wypisać przynajmniej jedną parę słówek.
                </p>
                <p>Max długość nazwy zestawu - 24 znaki</p>
                <p>Słówka - max 50 par słówek</p>
                <p>Max dłuość jednego słówka - 30 znaków</p>
                <p>Max liczba zestawów - 10</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SetEdition.propTypes = {
  createSet: PropTypes.func.isRequired,
  editSet: PropTypes.func.isRequired,
  set: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  ifSetHasChanges: PropTypes.func.isRequired
};

export default SetEdition;
