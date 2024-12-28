import React, { useEffect, useState } from "react";
import { fetchPortfolioValue } from "../api/stockservice";

const PortfolioValue = () => {
    const [portfolioValue, setPortfolioValue] = useState(0);

    useEffect(() => {
        const fetchValue = async () => {
            try {
                const response = await fetchPortfolioValue();
                setPortfolioValue(response.data);
            } catch (error) {
                console.error("Error fetching portfolio value", error);
            }
        };
        fetchValue();
    }, []);

    return <h3>Total Portfolio Value: ${portfolioValue.toFixed(2)}</h3>;
};

export default PortfolioValue;
