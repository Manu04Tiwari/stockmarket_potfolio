import React, { useState } from "react";
import { updateStock } from "../api/stockservice";

const EditStockForm = ({ stock, onUpdate }) => {
    const [updatedStock, setUpdatedStock] = useState({ ...stock });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateStock(stock.id, updatedStock);
            onUpdate(response.data);
        } catch (error) {
            console.error("Error updating stock", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ticker"
                value={updatedStock.ticker}
                onChange={(e) => setUpdatedStock({ ...updatedStock, ticker: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Name"
                value={updatedStock.name}
                onChange={(e) => setUpdatedStock({ ...updatedStock, name: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={updatedStock.quantity}
                onChange={(e) => setUpdatedStock({ ...updatedStock, quantity: +e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Purchase Price"
                value={updatedStock.purchasePrice}
                onChange={(e) => setUpdatedStock({ ...updatedStock, purchasePrice: +e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Current Price"
                value={updatedStock.currentPrice}
                onChange={(e) => setUpdatedStock({ ...updatedStock, currentPrice: +e.target.value })}
                required
            />
            <button type="submit">Update Stock</button>
        </form>
    );
};

export default EditStockForm;
