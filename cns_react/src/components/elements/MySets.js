import React from 'react';
import { connect } from "react-redux";
import { fetchSets } from "../../actions/sets";
import { Link } from "react-router-dom";
import Loading from "../utils/Loading";

class MySets extends React.Component {   
    state = {
        loading: true,
        sets: false
    }

    componentDidMount() {
        this.props.fetchSets()
            .then((fetchedSets) => {
                this.setState({
                    loading: false,
                    sets: fetchedSets
                });
            });
    }

render() {  
    const { loading, sets } = this.state;

    return (
        <div>
            <h2 className="secondary-title sets-title">Twoje zestawy</h2>
            <div className="own-sets-box">
                {loading && <Loading /> }

                {!loading && !sets && (
                    <div className="own-sets-message custom-field">
                        <h3 className="tertiary-title">Nie posiadasz żadnych zestawów.</h3>
                        <p>Przejdź do zakładki <Link to="/my_sets">Moje zestawy</Link>, aby utworzyć nowy zestaw.</p>
                    </div>
                )}

                {!loading && sets && (
                    <ul className="list-of-languages">
                        {sets.map((item) => (
                            <li className="set-field">{item.name}</li>  
                        ))}
                    </ul>
                )}
            </div> 
        </div>
    );
}
};

export default connect(null, { fetchSets })(MySets);