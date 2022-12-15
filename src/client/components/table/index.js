import React, { Component } from 'react';

class Table extends Component {
    render() {
        const { labels, rowKeyOrder, rows } = this.props;
        return (
            <table style={{ width: 500 }}>
                <thead>
                    <tr>
                        {labels.map(label => <th key={label}>{label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => <TableRow row={row} key={index} rowKeyOrder={rowKeyOrder} />)}
                </tbody>
            </table>
        );
    }
}

// Accepts an object representing a row and a list of keys to output
class TableRow extends Component {
    render() {
        const { rowKeyOrder, row } = this.props;
        return (
            <tr>
                {rowKeyOrder.map((key, index) => <td style={{ textAlign: 'center' }} key={index}>{row[key]}</td>)}
            </tr>
        )
    }
}

export default Table;