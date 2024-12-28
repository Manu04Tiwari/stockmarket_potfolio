import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioTracker = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [stock, setStock] = useState({ symbol: '', companyName: '', shares: '', purchasePrice: '', purchaseDate: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [totalValue, setTotalValue] = useState(0);
    const portfolioId = 1; // Use actual portfolio ID

    useEffect(() => {
        fetchPortfolio();
        fetchTotalValue();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/stocks`);
            setPortfolio(response.data);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    };

    const fetchTotalValue = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/stocks/portfolio-value/${portfolioId}`);
            setTotalValue(response.data);
        } catch (error) {
            console.error('Error fetching total value:', error);
        }
    };

    const addOrUpdateStock = async (e) => {
        e.preventDefault();
        try {
            if (editingIndex !== null) {
                await axios.put(`http://localhost:8080/api/stocks/${editingIndex}`, stock);
                setEditingIndex(null);
            } else {
                await axios.post('http://localhost:8080/api/stocks', stock);
            }
            setStock({ symbol: '', companyName: '', shares: '', purchasePrice: '', purchaseDate: '' });
            fetchPortfolio();
            fetchTotalValue();
        } catch (error) {
            console.error('Error adding/updating stock:', error);
        }
    };

    const deleteStock = async (index) => {
        try {
            await axios.delete(`http://localhost:8080/api/stocks/${index}`);
            fetchPortfolio();
            fetchTotalValue();
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    const editStock = (index) => {
        const stockToEdit = portfolio.find(stock => stock.id === index);
        setStock(stockToEdit);
        setEditingIndex(index);
    };

    return (
        <div>
            <h1>Portfolio Tracker</h1>
            <form onSubmit={addOrUpdateStock}>
                <input 
                    type="text" 
                    placeholder="Stock Symbol" 
                    value={stock.symbol} 
                    onChange={(e) => setStock({ ...stock, symbol: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={stock.companyName} 
                    onChange={(e) => setStock({ ...stock, companyName: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Shares" 
                    value={stock.shares} 
                    onChange={(e) => setStock({ ...stock, shares: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Purchase Price" 
                    value={stock.purchasePrice} 
                    onChange={(e) => setStock({ ...stock, purchasePrice: e.target.value })} 
                />
                <input 
                    type="date" 
                    placeholder="Purchase Date" 
                    value={stock.purchaseDate} 
                    onChange={(e) => setStock({ ...stock, purchaseDate: e.target.value })} 
                />
                <button type="submit">{editingIndex !== null ? 'Update Stock' : 'Add Stock'}</button>
            </form>
            <ul>
                {portfolio.map((stock) => (
                    <li key={stock.id}>
                        {stock.symbol} ({stock.companyName}): {stock.shares} shares @ ${stock.purchasePrice} purchased on {new Date(stock.purchaseDate).toLocaleDateString()}
                        <button onClick={() => editStock(stock.id)}>Edit</button>
                        <button onClick={() => deleteStock(stock.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Total Portfolio Value: ${totalValue.toFixed(2)}</h2>
        </div>
    );
};

export default PortfolioTracker;
