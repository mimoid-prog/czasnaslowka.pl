import React from "react";
import UserNavigation from "../navigations/UserNavigation";
import UserSetsEdit from "../elements/UserSetsEdit";
import SetEdition from "../elements/SetEdition";
import Footer from "../elements/Footer";
import Loading from "../utils/Loading";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchUserSet,
  fetchSets,
  createSet,
  editSet,
  removeSet
} from "../../actions/sets";

class MySetsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      set: {},
      set2: {},
      firstRun: true,
      setHasChanges: false,
      mySetsMessage: {
        id: "",
        question: "",
        desc: "",
        confirmation: "",
        show: false,
        action: ""
      }
    };

    this.child = React.createRef();
  }

  createSet = set =>
    this.props.createSet(set).then(answer => {
      const id = answer.data[answer.data.length - 1].id;
      this.loadSet(id);
    });

  editSet = set => this.props.editSet(set);

  ifSetHasChanges = value => {
    this.setState({ setHasChanges: value });
  };

  loadSet = id => {
    this.props.fetchUserSet(id).then(set => {
      this.setState({
        set: set,
        setLoaded: true,
        mySetsMessage: { show: false },
        setHasChanges: false
      });
    });
  };

  checkForChanges = (setID, action) => {
    if (this.state.setHasChanges === true) {
      this.mySetsMessageData(setID, action);
    } else {
      if (action === "load") {
        this.loadSet(setID);
      } else {
        this.openEmptySet();
      }
    }
  };

  mySetsMessageData = (setID, action, name) => {
    const question =
      action === "remove"
        ? `Czy na pewno usunąć zestaw ${name}?`
        : "Czy na pewno chcesz porzucić zmiany?";

    const desc =
      action === "remove"
        ? "Jest to działanie nieodwracalne."
        : "Niezapisane treści zostaną utracone.";

    const confirmation = action === "remove" ? "Tak, usuń" : "Tak, kontynuuj";

    this.setState({
      mySetsMessage: {
        id: setID,
        question,
        desc,
        confirmation,
        show: true,
        action
      }
    });
  };

  mySetsMessageAction = () => {
    const action = this.state.mySetsMessage.action;

    if (action === "remove") {
      this.props.removeSet(this.state.mySetsMessage.id).then(() => {
        if (this.state.mySetsMessage.id === this.state.set._id) {
          this.openEmptySet();
        }
        this.setState({ mySetsMessage: { show: false } });
      });
    } else if (action === "load") {
      this.loadSet(this.state.mySetsMessage.id);
    } else {
      this.openEmptySet();
      this.setState({
        mySetsMessage: { show: false },
        setHasChanges: false
      });
    }
  };

  openEmptySet = () => {
    this.setState({
      set: {
        id: "",
        name: "",
        language: "english",
        foreignWords: [],
        polishWords: []
      },
      setLoaded: true
    });
  };

  componentDidMount() {
    if (this.props.fetched === false) {
      this.props.fetchSets().then(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, set, mySetsMessage } = this.state;

    return (
      <div>
        {mySetsMessage.show && <div className="layer" />}
        <div className="my-sets-page">
          <UserNavigation history={this.props.history} />
          {loading ? (
            <div className="my-sets-main">
              <Loading />
            </div>
          ) : (
            <div className="my-sets-main spliting-box">
              <div className="user-sets-section">
                <div className="s-container">
                  <UserSetsEdit
                    mySetsMessageData={this.mySetsMessageData}
                    checkForChanges={this.checkForChanges}
                  />
                </div>
              </div>

              <SetEdition
                createSet={this.createSet}
                editSet={this.editSet}
                set={set}
                submit={this.createSet}
                ifSetHasChanges={this.ifSetHasChanges}
                checkForChanges={this.checkForChanges}
                ref={this.child}
              />
            </div>
          )}
          <Footer />
        </div>

        {mySetsMessage.show && (
          <div className="my-sets-message">
            <h4 className="quaternary-title">{mySetsMessage.question}</h4>
            <p>{mySetsMessage.desc}</p>
            <button
              className="no-border-btn pure-btn my-sets-message-btn-1"
              onClick={this.mySetsMessageAction}
            >
              {mySetsMessage.confirmation}
            </button>
            <button
              className="no-border-btn pure-btn my-sets-message-btn-2"
              onClick={() => this.setState({ mySetsMessage: { show: false } })}
            >
              Anuluj
            </button>
          </div>
        )}
      </div>
    );
  }
}

MySetsPage.propTypes = {
  fetchUserSet: PropTypes.func.isRequired,
  fetchSets: PropTypes.func.isRequired,
  createSet: PropTypes.func.isRequired,
  editSet: PropTypes.func.isRequired,
  removeSet: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    fetched: !!state.sets.fetched
  };
}

export default connect(mapStateToProps, {
  fetchUserSet,
  fetchSets,
  createSet,
  editSet,
  removeSet
})(MySetsPage);
