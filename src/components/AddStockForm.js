import React, { useState } from "react";
import { addStock } from "../api/stockservice";

const AddStockForm = ({ onAdd }) => {
    const [stock, setStock] = useState({
        ticker: "",
        name: "",
        quantity: 0,
        purchasePrice: 0,
        currentPrice: 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addStock(stock);
            onAdd(response.data);
            setStock({ ticker: "", name: "", quantity: 0, purchasePrice: 0, currentPrice: 0 });
        } catch (error) {
            console.error("Error adding stock", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ticker"
                value={stock.ticker}
                onChange={(e) => setStock({ ...stock, ticker: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Name"
                value={stock.name}
                onChange={(e) => setStock({ ...stock, name: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={stock.quantity}
                onChange={(e) => setStock({ ...stock, quantity: +e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Purchase Price"
                value={stock.purchasePrice}
                onChange={(e) => setStock({ ...stock, purchasePrice: +e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Current Price"
                value={stock.currentPrice}
                onChange={(e) => setStock({ ...stock, currentPrice: +e.target.value })}
                required
            />
            <button type="submit">Add Stock</button>
        </form>
    );
};

export default AddStockForm;
