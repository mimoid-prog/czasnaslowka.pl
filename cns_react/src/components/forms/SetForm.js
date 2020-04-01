import React from 'react';
import PropTypes from 'prop-types'
import Loading from '../utils/Loading';
import { Link } from 'react-router-dom';

class SetForm extends React.Component {  
    state = {
        originalData: {
            id: '',
            name: '',
            language: 'english',
            foreignWords: ['','','','','','','',''],
            polishWords: ['','','','','','','','']
        },
        data: {
            id: '',
            name: '',
            language: 'english',
            foreignWords: ['','','','','','','',''],
            polishWords: ['','','','','','','','']
        },
        errorMessage: '',
        loading: false,
        showCancelConfirmation: false
    }
    
    changes = () => {
        const { originalData, data } = this.state;
        let change = false;

        if(originalData.name !== data.name || originalData.language !== data.language) {
            change = true;
        } else {
            for(var i=0; i<data.foreignWords.length; i++) {
                if(originalData.foreignWords[i] !== data.foreignWords[i] || originalData.polishWords[i] !== data.polishWords[i]) {
                    change = true;
                    break;
                }         
            }
        }

        if(change) this.props.ifChanges(true)
        else this.props.ifChanges(false);  
    }
    
    onSubmit = e => {
        const { originalData, data } = this.state;
        let change = false;

        if(originalData.name !== data.name || originalData.language !== data.language) {
            change = true;
        } else {
            for(var i=0; i<data.foreignWords.length; i++) {
                if(originalData.foreignWords[i] !== data.foreignWords[i] || originalData.polishWords[i] !== data.polishWords[i]) {
                    change = true;
                    break;
                }         
            }
        }

        if(change) {
            this.setState({ errorMessage: 'Zapisano' });
            this.props.submit(data);
        }
        else {
            this.setState({ errorMessage: 'Dokonaj zmian przed zapisaniem' });
        }
    }

    onChange = e => this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    onWordsChange = e => {
        const lang = e.target.getAttribute("data-lang");
        const number = Number(e.target.getAttribute("data-number"));

        if(lang === "foreign") {
            const arr = this.state.data.foreignWords.slice();
            arr[number] = e.target.value;
            this.setState({
                data: { ...this.state.data, foreignWords: arr }
            });
        } else {
            const arr = this.state.data.polishWords.slice();
            arr[number] = e.target.value;
            this.setState({
                data: { ...this.state.data, polishWords: arr }
            });
        }
    }

    addInput = () => {
        const foreignArr = this.state.data.foreignWords.slice();
        const polishArr = this.state.data.polishWords.slice();
        const amountOfLines = foreignArr.length;

        if(foreignArr[amountOfLines-2]!=='' || polishArr[amountOfLines-2]!=='') {
            foreignArr.push('');
            polishArr.push('');

            this.setState({
                data: { 
                    ...this.state.data, 
                    foreignWords: foreignArr,
                    polishWords: polishArr
                }
            });
        }
    }
    
    componentDidUpdate(prevProps) {    
        if(this.props.set !== prevProps.set) {
            const { set } = this.props;

            if(set.foreignWords.length<8) {
                for(var i=set.foreignWords.length; i<8; i++) {
                    set.foreignWords.push('');
                    set.polishWords.push('');
                }
            }

            this.setState({
                originalData: {
                    id: set._id,
                    name: set.name,
                    language: set.language,
                    foreignWords: set.foreignWords,
                    polishWords: set.polishWords
                },
                data: {
                    id: set._id,
                    name: set.name,
                    language: set.language,
                    foreignWords: set.foreignWords,
                    polishWords: set.polishWords
                }
            })
        }
    }

    render() {
        
        const { data, errorMessage, loading } = this.state;
        const amountOfLines = data.foreignWords.length;
        
        return (
                    <div>
                        <h2 className="secondary-title banner r-banner">{data.id ? "Edytowanie zestawu" : "Utwórz nowy zestaw"}</h2>
                        <ul className="set-edition-list">
                            <li>
                                <div className="name-of-set-item">
                                    <label>Nazwa zestawu:</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={data.name} 
                                        onChange={this.onChange}
                                        maxLength="28"
                                        spellCheck="false"
                                        required 
                                        />
                                </div>

                                <div className="language-of-set-item">
                                    <label>Wybierz język:</label>
                                    <select 
                                        value={data.language} 
                                        onChange={this.onChange} 
                                        name='language'
                                        required>
                                        <option value="english">angielski</option>
                                        <option value="german">niemiecki</option>
                                        <option value="french">francuski</option>
                                    </select>
                                </div>
                            </li>
                            <li className="words-item">
                                <ul className="words-columns">
                                    <li className="words-languages">
                                        <label>Język obcy:</label>
                                        <label>Język polski:</label>
                                    </li>
                                    <li>
                                        <ul id="words-list" className="words-list">
                                            {[...Array(amountOfLines)].map((e, i) => (
                                                <li key={i}>
                                                    <input 
                                                        type="text"
                                                        data-lang="foreign"
                                                        data-number={i}
                                                        className="foreign-word" 
                                                        value={data.foreignWords[i]}
                                                        onChange={this.onWordsChange}
                                                        onClick={(i+1) === amountOfLines ? this.addInput : null}
                                                        spellCheck="false"
                                                        />
                                                    <input 
                                                        type="text"
                                                        data-lang="polish"
                                                        data-number={i}
                                                        className="polish-word" 
                                                        value={data.polishWords[i]}
                                                        onChange={this.onWordsChange}
                                                        onClick={(i+1) === amountOfLines ? this.addInput : null}
                                                        spellCheck="false"
                                                        />
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li className="buttons-item">
                                <button 
                                    onClick={() => this.onSubmit()} 
                                    className="pure-btn ess-btn normal-btn">
                                    Zapisz
                                </button>
                                
                                <button 
                                    onClick={() => this.props.showMessage('Czy na pewno anulować tworzenie zestawu')} 
                                    className="pure-btn ess-btn reverse-btn">
                                    Anuluj
                                </button>                   
                            </li>
                            
                            
                            <p>{errorMessage && errorMessage}</p>
                        </ul>
                    </div>
                )
            }
};

SetForm.propTypes = {
    submit: PropTypes.func.isRequired,
    set: PropTypes.object.isRequired
};

export default SetForm;