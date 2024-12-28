import React, { useState, useEffect } from "react";
import { fetchStocks } from "./api/stockservice.js";
import AddStockForm from "./components/AddStockForm";
import EditStockForm from "./components/EditStockForm";
import StockList from "./components/StockList";
import PortfolioValue from "./components/PortfolioValue";

const App = () => {
    const [stocks, setStocks] = useState([]);
    const [editingStock, setEditingStock] = useState(null);

    useEffect(() => {
        const fetchAllStocks = async () => {
            try {
                const response = await fetchStocks();
                setStocks(response.data);
            } catch (error) {
                console.error("Error fetching stocks", error);
            }
        };
        fetchAllStocks();
    }, []);

    const handleAddStock = (newStock) => setStocks([...stocks, newStock]);
    const handleDeleteStock = (id) => setStocks(stocks.filter((stock) => stock.id !== id));
    const handleEditStock = (updatedStock) =>
        setStocks(stocks.map((stock) => (stock.id === updatedStock.id ? updatedStock : stock)));

    return (
        <div>
            <h1>Stock Portfolio Tracker</h1>
            <PortfolioValue />
            <AddStockForm onAdd={handleAddStock} />
            {editingStock && (
                <EditStockForm
                    stock={editingStock}
                    onUpdate={(updatedStock) => {
                        handleEditStock(updatedStock);
                        setEditingStock(null);
                    }}
                />
            )}
            <StockList
                stocks={stocks}
                onDelete={handleDeleteStock}
                onEdit={(stock) => setEditingStock(stock)}
            />
        </div>
    );
};

export default App;
  