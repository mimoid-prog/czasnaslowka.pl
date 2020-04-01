import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirm } from "../../actions/auth";
import ReactLoading from "react-loading";
import SecondaryPage from "../pages/SecondaryPage";
import { Link } from "react-router-dom";

class Confirmation extends React.Component {
  state = {
    loading: true,
    content: {
      title: "",
      text: ""
    }
  };

  componentDidMount() {
    this.props.confirm(this.props.match.params.token).then(user => {
      if (user) {
        this.setState({
          loading: false,
          content: {
            title: "Konto aktywowane",
            text:
              "Twoje konto zostało aktywowane i możesz już z niego korzystać. Przejdź na stronę główną, aby się zalogować."
          }
        });
      } else {
        this.setState({
          loading: false,
          content: {
            title: "Ups, coś poszło nie tak",
            text:
              "Wystąpił błąd. Sprawdź poprawność linku lub wygeneruj nowy link weryfikacyjny."
          }
        });
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { title, text } = this.state.content;
    return (
      <SecondaryPage>
        {loading ? (
          <ReactLoading
            type="spin"
            color="#EC4545"
            height="40px"
            width="40px"
            className="spinner"
          />
        ) : (
          <div className="form-message">
            <h4 className="quaternary-title">{title}</h4>
            <p>{text}</p>
            <Link
              to="/"
              class="no-border-btn pure-btn pink-btn ess-btn form-home-btn"
            >
              Strona główna
            </Link>
          </div>
        )}
      </SecondaryPage>
    );
  }
}

Confirmation.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(Confirmation);
