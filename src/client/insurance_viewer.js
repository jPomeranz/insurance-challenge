'use strict';

class InsuranceViewer extends React.Component {
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
    const carriers = await this.fetchCarriers(this.state.state, this.state.policyType);
    this.setState({carriers});
  }

  async fetchCarriers(state, policyType) {
    const response = await fetch('/carriers?' + new URLSearchParams({
      state,
      policyType,
    }));
    // TODO: Handle errors
    const jsonResponse = await response.json();
    return jsonResponse.carriers;
  }

  render() {
    const heading = ['State', 'PolicyType', 'Carrier'];
    return (
      <>
        <form onSubmit={this.handleSubmit} style={{width: '10em'}}>
          <p>
            <label>
              State:
              <select name="state" value={this.state.state} onChange={this.handleChange}>
                <option value="" selected></option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="MI">Michigan</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              Policy Type:
              <select name="policyType" value={this.state.policyType} onChange={this.handleChange}>
                <option value="" selected></option>
                <option value="FIRE">Fire</option>
                <option value="AUTO">Auto</option>
                <option value="FLOOD">Flood</option>
              </select>
            </label>
          </p>
          <input type="submit" value="Submit" />
        </form>
        <p>
        <>
          {this.state.carriers && <Table heading={heading} body={this.state.carriers} />}
        </>
        </p>
      </>
    );
  }
}

class Table extends React.Component {
  render() {
    const heading = this.props.heading;
    const body = this.props.body;
    console.log(body);
    return (
      <table style={{ width: 500 }}>
        <thead>
          <tr>
            {heading.map(head => <th>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {body.map(row => <TableRow row={row} />)}
        </tbody>
      </table>
    );
  }
}

class TableRow extends React.Component {
  render() {
    const row = this.props.row;
    return (
      <tr>
        {row.map(val => <td style={{textAlign: 'center'}}>{val}</td>)}
      </tr>
    )
  }
}

const domContainer = document.querySelector('#insurance_viewer_container');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(InsuranceViewer));