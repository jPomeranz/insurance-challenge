import React, { Component } from 'react';
import Table from '../table';
import carrierService from '../../services/carriers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { state: '', policyType: '', carriers: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const carriers = await carrierService.fetchCarriers(this.state.state, this.state.policyType);
        // TODO: Handle errors
        this.setState({ carriers });
    }

    render() {
        const headerLabels = ['State', 'Carrier', 'PolicyType'];
        const headerKeys = ['state', 'carrierName', 'policyType'];
        return (
            <>
                <div style={{ padding: '20px 20px 20px 20px' }}>
                    <h2>Insurance Challenge</h2>
                    <p>Search for insurance carriers below</p>
                    <form onSubmit={this.handleSubmit} style={{ width: '10em' }}>
                        <p>
                            <label>
                                State:
                                <select name='state' value={this.state.state} onChange={this.handleChange}>
                                    <option value=''></option>
                                    <option value='IL'>Illinois</option>
                                    <option value='IN'>Indiana</option>
                                    <option value='MI'>Michigan</option>
                                </select>
                            </label>
                        </p>
                        <p>
                            <label>
                                Policy Type:
                                <select name='policyType' value={this.state.policyType} onChange={this.handleChange}>
                                    <option value=''></option>
                                    <option value='FIRE'>Fire</option>
                                    <option value='AUTO'>Auto</option>
                                    <option value='FLOOD'>Flood</option>
                                </select>
                            </label>
                        </p>
                        <input type='submit' value='Submit' />
                    </form>
                    <br />
                    {this.state.carriers && <Table labels={headerLabels} rowKeyOrder={headerKeys} rows={this.state.carriers} />}
                </div>

            </>
        );
    }
}

export default App;