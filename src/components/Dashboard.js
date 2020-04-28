import React from 'react'
import StocksList from "./StocksList";

const stocksUrl = 'ws://stocks.mnet.website/';

class Dashboard extends React.Component {
    state = {
        stocks: {},
        connectionError: false
    };

    componentDidMount = () => {
        this.connection = new WebSocket(stocksUrl);
        this.connection.onmessage = this.saveNewStockValues;
        this.connection.onclose = () => { this.setState({connectionError: true}) }
    };

    saveNewStockValues = event => {
        let result = JSON.parse(event.data);
        let [up_values_count, down_values_count] = [0, 0];

        // time stored in histories should be consisitent across stocks(better for graphs)
        let current_time = Date.now();
        let newStocks = this.state.stocks;
        result.map((stock) => {
            if(this.state.stocks[stock[0]]) {
                newStocks[stock[0]].current_value > Number(stock[1]) ? up_values_count++ : down_values_count++;

                newStocks[stock[0]].current_value = Number(stock[1]);
                newStocks[stock[0]].history.push({time: current_time, value: Number(stock[1])})
            } else {
                newStocks[stock[0]] = { current_value: stock[1], history: [{time: Date.now(), value: Number(stock[1])}], is_selected: false }
            }
        });
        this.setState({stocks: newStocks});
    };

    isLoaded = () => {
        return Object.keys(this.state.stocks).length > 0;
    };

    render() {
        return (
            <div className='container'>
                <div className='columns'>
                    <StocksList
                        stocks={this.state.stocks}
                        isLoaded={this.isLoaded}
                    />
                </div>
            </div>
        );
    }
}

export default Dashboard;