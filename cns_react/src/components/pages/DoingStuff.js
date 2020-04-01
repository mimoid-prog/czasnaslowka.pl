import React from "react";
import UserNavigation from "../navigations/UserNavigation";
import api from "../../api";
import DSLanguages from "../doingStuff/DSLanguages";
import DSSets from "../doingStuff/DSSets";

class DoingStuff extends React.Component {
  state = {
    rank: "",
    setsToFetch: ""
  };

  setsToFetch = lang => this.setState({ setsToFetch: lang });

  componentDidMount() {
    api.doingStuff.verifyRank().then(rank => this.setState({ rank }));
  }

  render() {
    const { rank, setsToFetch } = this.state;
    return (
      <div>
        {rank == "mode" ? (
          <div className="doing-stuff">
            <UserNavigation history={this.props.history} />
            <div className="container">
              <div className="doing-stuff-panel">
                <h2 className="secondary-title">Panel administratora</h2>
                <hr />
                <div className="ds-inner">
                  <DSLanguages setsToFetch={this.setsToFetch} />
                  {setsToFetch && (
                    <DSSets
                      setsToFetch={setsToFetch}
                      setToFetchFunc={this.setToFetch}
                    />
                  )}
                </div>
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
