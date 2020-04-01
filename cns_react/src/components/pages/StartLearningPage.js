import React from "react";
import UserNavigation from "../navigations/UserNavigation";
import GuestNavigation from "../navigations/GuestNavigation";
import Footer from "../elements/Footer";
import QueryString from "query-string";
import { fetchUserSet, fetchGuestSet } from "../../actions/sets";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import Chart from "react-google-charts";
import { IoMdRefresh } from "react-icons/io";
import Loading from "../utils/Loading";

class StartLearningPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalSet: {},
      set: {},
      method: "",
      loading: true,
      stats: {
        correct: 0,
        answers: ["-", "-", "-", "-", "-", "-"],
        answersIndex: 0,
        styleOfAnswers: [
          "default",
          "default",
          "default",
          "default",
          "default",
          "default"
        ],
        time: 0,
        userAnswer: ""
      }
    };
  }

  checkKey = e => {
    if (e.key === "Enter") this.checkAnswer();
  };

  checkAnswer = (val, e) => {
    if (this.state.stats.answersIndex === 0) {
      this.timer = setInterval(
        () =>
          this.setState({
            stats: {
              ...this.state.stats,
              time: this.state.stats.time + 1
            }
          }),
        1000
      );
    }

    if (this.state.set.foreignWords.length === 1) {
      clearInterval(this.timer);
      if (window.innerWidth < 1300) {
        setTimeout(() => {
          document.getElementById("statistics").scrollIntoView({
            behavior: "smooth"
          });
        }, 800);
      }
    }

    if (this.state.set.foreignWords.length > 0) {
      if (this.state.method === "with") {
        const answer = this.state.stats.userAnswer.toLowerCase();
        const correctAnswer = this.state.set.foreignWords[0].toLowerCase();
        if (answer === correctAnswer) val = "correct-answer";
        else val = "wrong-answer";
      }

      const stats = this.state.stats;
      const set = this.state.set;

      const removedF = this.state.set.foreignWords[0];
      const removedP = this.state.set.polishWords[0];

      const newForeignWords = set.foreignWords.filter((item, i) => i !== 0);
      const newPolishWords = set.polishWords.filter((item, i) => i !== 0);
      const newAnswer = removedF + " - " + removedP;
      var newAnswers;
      var newStyleOfAnswers;

      if (stats.answersIndex < 6) {
        newAnswers = stats.answers.map((item, i) => {
          if (i === stats.answersIndex) return newAnswer;
          else return item;
        });

        newStyleOfAnswers = stats.styleOfAnswers.map((item, i) => {
          if (i === stats.answersIndex) return val;
          else return item;
        });
      } else {
        newAnswers = [...stats.answers, newAnswer];
        newStyleOfAnswers = [...stats.styleOfAnswers, val];
      }

      const newAnswersIndex = stats.answersIndex + 1;

      this.setState({
        set: {
          foreignWords: newForeignWords,
          polishWords: newPolishWords
        },
        stats: {
          ...this.state.stats,
          answers: newAnswers,
          answersIndex: newAnswersIndex,
          styleOfAnswers: newStyleOfAnswers,
          correct:
            val === "correct-answer"
              ? this.state.stats.correct + 1
              : this.state.stats.correct,
          userAnswer: ""
        }
      });
    }
  };

  handleChange = e => {
    this.setState({
      stats: {
        ...this.state.stats,
        userAnswer: e.target.value
      }
    });
  };

  shuffleArray = (array, array2) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      [array2[i], array2[j]] = [array2[j], array2[i]];
    }
  };

  resetState = () => {
    this.setState({
      originalSet: this.state.originalSet,
      set: this.state.originalSet,
      method: this.state.method,
      loading: false,
      stats: {
        correct: 0,
        wrong: 0,
        answers: ["-", "-", "-", "-", "-", "-"],
        answersIndex: 0,
        styleOfAnswers: [
          "default",
          "default",
          "default",
          "default",
          "default",
          "default"
        ],
        time: 0,
        userAnswer: ""
      }
    });
  };

  componentDidMount() {
    const data = QueryString.parse(this.props.location.search);
    if (data.public == "yes") {
      this.props.fetchGuestSet(data.id).then(set => {
        this.shuffleArray(set.foreignWords, set.polishWords);

        this.setState({
          originalSet: set,
          set: set,
          method: data.method,
          loading: false
        });
      });
    } else {
      this.props.fetchUserSet(data.id).then(set => {
        this.shuffleArray(set.foreignWords, set.polishWords);

        this.setState({
          originalSet: set,
          set: set,
          method: data.method,
          loading: false
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.stats.answersIndex !== this.state.stats.answersIndex) {
      const { scrollbar } = this.refs;
      scrollbar.scrollToBottom();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { isAuthenticated } = this.props;
    const { method, stats, loading } = this.state;
    const { foreignWords, polishWords } = this.state.set;

    return (
      <div className="start-learning-page">
        {isAuthenticated ? (
          <UserNavigation history={this.props.history} />
        ) : (
          <GuestNavigation />
        )}
        <div className="start-learning-main">
          {loading ? (
            <Loading />
          ) : (
            <div className="learning-section">
              <div className="s-container learning-container">
                <div className="learning-box">
                  <h3 className="tertiary-title">
                    Pozostałe słówka: {foreignWords.length}
                  </h3>

                  {method === "with" ? (
                    <div className="with-box">
                      <div className="word-banner1">
                        <p>{polishWords[0] ? polishWords[0] : "-"}</p>
                      </div>
                      <div className="word-banner2">
                        <input
                          className="pure-btn answer-input"
                          value={stats.userAnswer}
                          onChange={this.handleChange}
                          onKeyPress={this.checkKey}
                        />
                      </div>
                      <button
                        className="no-border-btn pure-btn ess-btn blue-btn"
                        onClick={this.checkAnswer}
                      >
                        sprawdź
                      </button>
                    </div>
                  ) : (
                    <div className="without-box">
                      <div className="word-banner3">
                        <p>{foreignWords[0] ? foreignWords[0] : "-"}</p>
                      </div>
                      <button
                        className="no-border-btn pure-btn wo-btn"
                        onClick={() => this.checkAnswer("correct-answer")}
                      >
                        znam
                      </button>
                      <button
                        className="no-border-btn pure-btn wo-btn-2"
                        onClick={() => this.checkAnswer("wrong-answer")}
                      >
                        nie znam
                      </button>
                    </div>
                  )}
                </div>

                <div className="answers-section">
                  <h3 className="tertiary-title">Odpowiedzi:</h3>
                  <div className="answers-box">
                    <Scrollbars style={{ height: 252 }} ref="scrollbar">
                      {stats.answers.map((item, i) => (
                        <p key={i} className={stats.styleOfAnswers[i]}>
                          {stats.answers[i]}
                        </p>
                      ))}
                    </Scrollbars>
                  </div>
                </div>
              </div>

              <div id="statistics" className="statistics-section">
                <div className="s-container">
                  <h2 className="secondary-title">Wyniki</h2>
                  {foreignWords.length === 0 ? (
                    <React.Fragment>
                      <Chart
                        height={"280px"}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ["Task", "Hours per Day"],
                          ["Poprawne", stats.correct],
                          ["Niepoprawne", stats.answersIndex - stats.correct]
                        ]}
                        options={{
                          colors: ["#4ba851", "#db3f3f"],
                          backgroundColor: "transparent",
                          chartArea: {
                            width: "100%",
                            height: "70%"
                          },
                          legend: {
                            position: "top",
                            alignment: "center",
                            textStyle: { fontSize: 14 }
                          },
                          pieSliceTextStyle: { fontSize: 16 }
                        }}
                        rootProps={{ "data-testid": "1" }}
                      />
                      <div className="timer">
                        <p className="seconds">{stats.time} sek</p>
                      </div>
                      <div className="again-btn" onClick={this.resetState}>
                        <div>
                          <IoMdRefresh className="icon" />
                          <p>Zacznij ponownie</p>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p className="statistics-text">
                        Ukończ rozwiązywanie zestawu, a pojawi się w tym miejscu
                        twój wynik.
                      </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(
  mapStateToProps,
  { fetchUserSet, fetchGuestSet }
)(StartLearningPage);
