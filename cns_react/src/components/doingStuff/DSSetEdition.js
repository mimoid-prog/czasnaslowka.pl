import React, { Component } from "react";
import api from "../../api";
import { Scrollbars } from "react-custom-scrollbars";

class DSSetEdition extends Component {
  state = {
    set: {
      id: "",
      name: "",
      icon: "",
      language: "",
      foreignWords: ["", "", "", "", "", "", "", ""],
      polishWords: ["", "", "", "", "", "", "", ""]
    },
    setMessage: ""
  };

  createNewSet = () =>
    this.setState({
      set: {
        id: "",
        name: "",
        icon: "",
        language: "",
        foreignWords: ["", "", "", "", "", "", "", ""],
        polishWords: ["", "", "", "", "", "", "", ""]
      }
    });

  onSubmit = e => {
    this.setState({ setMessage: "Ładowanie" });
    const data = this.state.set;
    const filtered1 = data.foreignWords.filter(value => value !== "");
    const filtered2 = data.polishWords.filter(value => value !== "");

    if (!data.name || (filtered1.length === 0 && filtered2.length === 0)) {
      this.setState({
        setMessage:
          "Wypełnij wszystkie wymagane pola, czyli nazwa zestawu, język i co najmniej jedna para wyrazów."
      });
    } else {
      if (!data._id) {
        let clonedF = [...data.foreignWords];
        let clonedP = [...data.polishWords];

        const arrays = this.checkForEmptySpaces(clonedF, clonedP);
        api.doingStuff
          .createSet({
            ...data,
            foreignWords: arrays[0],
            polishWords: arrays[1]
          })
          .then(() =>
            this.setState({ setMessage: "Utworzono" }, () =>
              this.props.updateSetsList()
            )
          )
          .catch(() =>
            this.setState({
              setMessage: "Tworzenie nowego seta nie powiodło się"
            })
          );
      } else {
        let clonedF = [...data.foreignWords];
        let clonedP = [...data.polishWords];

        const arrays = this.checkForEmptySpaces(clonedF, clonedP);
        api.doingStuff
          .editSet({
            ...data,
            foreignWords: arrays[0],
            polishWords: arrays[1]
          })
          .then(() => {
            this.setState({ setMessage: "Zapisano" });
          })
          .catch(() =>
            this.setState({ setMessage: "Nie udało się zapisać seta" })
          );
      }
    }
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

  onChange = e => {
    this.setState({
      set: {
        ...this.state.set,
        [e.target.name]: e.target.value
      }
    });
  };

  onWordsChange = e => {
    const lang = e.target.getAttribute("data-lang");
    const number = Number(e.target.getAttribute("data-number"));

    if (lang === "foreign") {
      const arr = this.state.set.foreignWords.slice();
      arr[number] = e.target.value;
      this.setState({
        set: {
          ...this.state.set,
          foreignWords: arr
        }
      });
    } else {
      const arr = this.state.set.polishWords.slice();
      arr[number] = e.target.value;
      this.setState({
        set: {
          ...this.state.set,
          polishWords: arr
        }
      });
    }
  };

  addInput = () => {
    const foreignArr = this.state.set.foreignWords.slice();
    const polishArr = this.state.set.polishWords.slice();
    foreignArr.push("");
    polishArr.push("");

    this.setState(
      {
        set: {
          ...this.state.set,
          foreignWords: foreignArr,
          polishWords: polishArr
        }
      },
      () => this.refs.scrollbar.scrollToBottom()
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.setToFetch !== prevProps.setToFetch) {
      api.doingStuff
        .fetchSet(this.props.setToFetch)
        .then(set => {
          delete set[0].owner;
          if (set[0].foreignWords.length < 8) {
            for (var i = set[0].foreignWords.length; i < 8; i++) {
              set[0].foreignWords.push("");
              set[0].polishWords.push("");
            }
          } else {
            set[0].foreignWords.push("");
            set[0].polishWords.push("");
          }
          this.setState({ set: set[0] });
        })
        .catch(() => console.log("Nie udało się pobrać seta"));
    }
  }

  componentDidMount() {
    api.doingStuff
      .fetchSet(this.props.setToFetch)
      .then(set => {
        delete set[0].owner;
        if (set[0].foreignWords.length < 8) {
          for (var i = set[0].foreignWords.length; i < 8; i++) {
            set[0].foreignWords.push("");
            set[0].polishWords.push("");
          }
        } else {
          set[0].foreignWords.push("");
          set[0].polishWords.push("");
        }
        this.setState({ set: set[0] });
      })
      .catch(() => console.log("Nie udało się pobrać seta"));
  }

  render() {
    const { set, setMessage } = this.state;
    const amountOfLines = set.foreignWords.length;
    console.log(set);
    return (
      <div>
        <h4 className="quaternary-title">
          {set._id ? "Edycja zestawu" : "Nowy zestaw"}
        </h4>
        <label>Nazwa zestawu</label>
        <input
          name="name"
          type="text"
          value={set.name}
          onChange={this.onChange}
          spellCheck="false"
          required
        />
        <label>Ikona</label>
        <input
          name="icon"
          type="text"
          value={set.icon}
          onChange={this.onChange}
          spellCheck="false"
          required
        />
        <label>Język</label>
        <input
          name="language"
          type="text"
          value={set.language}
          onChange={this.onChange}
          spellCheck="false"
          required
        />
        <label>Język obcy - Język polski</label>
        <ul id="words-list" className="words-list ds-words-list">
          <Scrollbars style={{ height: 304 }} ref="scrollbar">
            {[...Array(amountOfLines)].map((e, i) => (
              <li key={i}>
                <input
                  type="text"
                  data-lang="foreign"
                  data-number={i}
                  className="foreign-word"
                  value={set.foreignWords[i]}
                  onChange={this.onWordsChange}
                  spellCheck="false"
                  maxLength="46"
                />
                <input
                  type="text"
                  data-lang="polish"
                  data-number={i}
                  className="polish-word"
                  value={set.polishWords[i]}
                  onChange={this.onWordsChange}
                  spellCheck="false"
                  maxLength="46"
                />
              </li>
            ))}
          </Scrollbars>
        </ul>
        <div className="ds-set-edition-buttons">
          <button
            className="no-border-btn pure-btn ess-btn pink-btn"
            onClick={this.addInput}
          >
            Dodaj input
          </button>
          <button
            className="no-border-btn pure-btn ess-btn blue-btn"
            onClick={this.onSubmit}
          >
            Zapisz
          </button>
          <button
            className="no-border-btn pure-btn ess-btn dark-blue-btn ds-create-new-set-btn"
            onClick={this.createNewSet}
          >
            Utwórz nowy
          </button>
        </div>
        <p>Message: {setMessage && setMessage}</p>
      </div>
    );
  }
}

export default DSSetEdition;
