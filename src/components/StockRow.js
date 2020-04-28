import React from 'react'
import TimeAgo from 'react-timeago';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class StockRow extends React.Component {

    changeStockValueColor = stock =>{
        if (stock.current_value < stock.history.slice(-2)[0].value) {
            return 'red';
        } else if (stock.current_value > stock.history.slice(-2)[0].value) {
            return 'green';
        } else {
            return null;
        }
    };

    render() {
        let history = this.props.stockData.history;
        return (
            <tr>
                <td>{this.props.stockName.toUpperCase()}</td>
                <td className={this.changeStockValueColor(this.props.stockData)}>
                    {this.props.stockData.current_value.toFixed(2)}
                </td>
                <td>
                    <TimeAgo date={ history.slice(-1)[0].time } />
                </td>
            </tr>
        );
    }
}

export default StockRow;