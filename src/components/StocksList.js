import React from 'react';
import StockRow from './StockRow';
import 'bootstrap/dist/css/bootstrap.min.css';

const StocksList = props => {
    return (
        <div className='stocks_list'>
            <div className='card-header'>
                <div className='card-header-title'> Stocks </div>
            </div>
                <table className='table'>
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Value</th>
                        <th scope="col">Updated At</th>
                    </tr>
                    </thead>

                    <tbody>
                        {Object.keys(props.stocks).map((stockName, index) => {
                                let currentStock = props.stocks[stockName];
                                return (
                                    <StockRow
                                        key={index} stockName = {stockName}
                                        stockData = {currentStock}
                                    />
                                )
                            }
                        )}
                        { props.isLoaded() ? null : <div>Loading...</div> }
                    </tbody>
                </table>
        </div>
    );
};

export default StocksList;