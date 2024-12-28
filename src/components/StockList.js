import React from "react";
import { deleteStock } from "../api/stockservice";

const StockList = ({ stocks, onDelete, onEdit }) => {
    const handleDelete = async (id) => {
        try {
            await deleteStock(id);
            onDelete(id);
        } catch (error) {
            console.error("Error deleting stock", error);
        }
    };

    return (
        <ul>
            {stocks.map((stock) => (
                <li key={stock.id}>
                    {stock.name} ({stock.ticker}) - Quantity: {stock.quantity}, Value: $
                    {stock.currentPrice * stock.quantity}
                    <button onClick={() => onEdit(stock)}>Edit</button>
                    <button onClick={() => handleDelete(stock.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default StockList;
