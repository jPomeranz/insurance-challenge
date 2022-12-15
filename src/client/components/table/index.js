import React, { Component } from 'react';

class Table extends Component {
    render() {
        const heading = this.props.heading;
        const rows = this.props.rows;
        return (
            <table style={{ width: 500 }}>
                <thead>
                    <tr>
                        {heading.map(head => <th key={head}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => <TableRow row={row} key={index} />)}
                </tbody>
            </table>
        );
    }
}

class TableRow extends Component {
    render() {
        const row = this.props.row;
        return (
            <tr>
                {row.map((val, index) => <td style={{ textAlign: 'center' }} key={index}>{val}</td>)}
            </tr>
        )
    }
}

export default Table;