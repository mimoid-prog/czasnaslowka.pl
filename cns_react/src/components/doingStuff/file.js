import React from "react";
import UserNavigation from "../navigations/UserNavigation";
import axios from "axios";

class DoingStuff extends React.Component {
  state = {
    rank: "",
    message: ""
  };

  saveFile = () => {
    const file = document.getElementById("fileInput").files[0];

    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
      var file = reader.result;
      var fileWithoutBreaks = file.replace(/(\r\n|\n|\r)/gm, "");
      var words = fileWithoutBreaks.split(";");
      var filePolishWords = [];
      var fileForeignWords = [];
      var isForeignTurn = false;
      var p = 0;
      var f = 0;
      var setName = "";
      var setLanguage = "";
      var setLanguageName = "";
      for (var i = 0; i < words.length - 1; i++) {
        if (i === 0) setName = words[i];
        else if (i === 1) setLanguage = words[i];
        else if (i === 2) setLanguageName = words[i];
        else {
          if (isForeignTurn) {
            fileForeignWords[f] = words[i];
            f++;
          } else {
            filePolishWords[p] = words[i];
            p++;
          }
        }

        isForeignTurn = !isForeignTurn;
      }

      var set = {
        name: setName,
        language: setLanguage,
        languageName: setLanguageName,
        foreignWords: fileForeignWords,
        polishWords: filePolishWords
      };

      axios
        .post("/api/sets", { set })
        .then(res => console.log(res.data.message));
    };
    reader.readAsText(file);
  };

  checkIfFile = () => {
    if (document.getElementById("fileInput").files.length > 0) {
      this.setState({ message: "Tak, pobrano plik." });
    } else this.setState({ message: "Nie, porażka..." });
  };

  componentDidMount() {
    axios
      .post("/api/verifyRank/")
      .then(res => this.setState({ rank: res.data.rank }));
  }

  render() {
    const { rank, message } = this.state;
    return (
      <div>
        {rank === "mode" ? (
          <div className="doing-stuff">
            <UserNavigation history={this.props.history} />
            <div className="container">
              <div className="doing-stuff-panel">
                <h2 className="secondary-title">Panel administratora</h2>
                <hr />
                <h4 className="quaternary-title">Zapisz plik publiczny</h4>
                <input type="file" id="fileInput" />
                <button
                  className="no-border-btn pure-btn ess-btn blue-btn"
                  onClick={this.checkIfFile}
                >
                  Sprawdź czy pobrano plik
                </button>
                <button
                  className="no-border-btn pure-btn ess-btn dark-blue-btn"
                  onClick={this.saveFile}
                >
                  Zapisz
                </button>
                <hr />
                {message && <p className="form-error-info">{message}</p>}
              </div>
            </div>
          </div>
        ) : (
          <h2>Wyjazd, gościu.</h2>
        )}
      </div>
    );
  }
}

export default DoingStuff;
