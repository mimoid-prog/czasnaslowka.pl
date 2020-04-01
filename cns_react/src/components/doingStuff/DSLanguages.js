import React, { Component } from "react";
import api from "../../api";
import PropTypes from "prop-types";

class DSLanguages extends Component {
  state = {
    languages: [],
    languageData: {
      languageName: "",
      language: "",
      image: ""
    },
    removeLanguage: {
      removeLanguageConfirmation: false,
      languageToRemove: ""
    },
    langMessage: ""
  };

  removeLanguage = () =>
    api.doingStuff
      .removeLanguage(this.state.removeLanguage.languageToRemove)
      .then(languages => {
        this.setState({
          languages,
          langMessage: "Usunięto",
          removeLanguage: {
            removeLanguageConfirmation: false,
            languageToRemove: ""
          }
        });
      })
      .catch(() => this.setState({ langMessage: "Coś poszło nie tak" }));

  addNewLanguage = () => {
    api.doingStuff
      .addNewLanguage(this.state.languageData)
      .then(() => {
        api.languages.fetchLanguages().then(languages => {
          this.setState({
            languages,
            langMessage: "Dodano"
          });
        });
      })
      .catch(err => this.setState({ langMessage: "Coś poszło nie tak." }));
  };

  onChange = e => {
    this.setState({
      languageData: {
        ...this.state.languageData,
        [e.target.name]: e.target.value
      }
    });
  };

  componentDidMount() {
    api.languages.fetchLanguages().then(languages => {
      console.log(languages);
      this.setState({ languages });
    });
  }

  render() {
    const { languages, languageData, langMessage, removeLanguage } = this.state;

    return (
      <div className="ds-languages-box">
        <h4 className="quaternary-title">
          Lista języków: ({languages.length})
        </h4>
        <ul className="ds-languages-list">
          {languages.map((lang, i) => (
            <li key={i}>
              <img
                src={require(`../../images/icons/flags/${lang.image}.png`)}
                alt="language icon"
              />
              <p>{lang.languageName}</p>
              <button
                className="no-border-btn pure-btn fetch-sets-btn"
                onClick={() => this.props.setsToFetch(lang.language)}
              >
                Pobierz sety
              </button>
              <button
                className="no-border-btn pure-btn delete-language-btn"
                onClick={() =>
                  this.setState({
                    removeLanguage: {
                      removeLanguageConfirmation: true,
                      languageToRemove: lang.languageName
                    }
                  })
                }
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
        {removeLanguage.removeLanguageConfirmation && (
          <div className="remove-language-confirmation">
            <p>Czy na pewno usunąć?</p>
            <button
              onClick={this.removeLanguage}
              className="no-border-btn pure-btn ess-btn pink-btn"
            >
              Tak
            </button>
            <button
              className="no-border-btn pure-btn ess-btn dark-blue-btn"
              onClick={() =>
                this.setState({
                  removeLanguage: {
                    removeLanguageConfirmation: false,
                    languageToRemove: ""
                  }
                })
              }
            >
              Nie
            </button>
          </div>
        )}

        <h4 className="quaternary-title">Dodaj nowy:</h4>
        <label>Nazwa (np. angielski)</label>
        <input
          name="languageName"
          type="text"
          value={languageData.languageName}
          onChange={this.onChange}
          spellCheck="false"
          required
        />

        <label>Język (np. english)</label>
        <input
          name="language"
          type="text"
          value={languageData.language}
          onChange={this.onChange}
          spellCheck="false"
          required
        />

        <label>Ikonka (np. english)</label>
        <input
          name="image"
          type="text"
          value={languageData.image}
          onChange={this.onChange}
          spellCheck="false"
          required
        />
        <button
          className="no-border-btn pure-btn ess-btn blue-btn"
          onClick={this.addNewLanguage}
        >
          Dodaj nowy
        </button>
        <p>Message: {langMessage && langMessage}</p>
      </div>
    );
  }
}

DSLanguages.propTypes = {
  setsToFetch: PropTypes.func.isRequired
};

export default DSLanguages;
