import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStockDetails } from "../services/stockService.js";

function StockDetails() {
  const { id } = useParams();
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetchStockDetails(id).then((data) => {
      setStockData(data);
    });
  }, [id]);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  const latestData = stockData["Time Series (Daily)"]
    ? Object.entries(stockData["Time Series (Daily)"])[0][1]
    : null;

  return (
    <div className="stock-details">
      <h1>Stock Details: {id}</h1>
      <div className="price">
        <strong>Current Price:</strong>{" "}
        {latestData ? latestData["4. close"] : "N/A"}
      </div>
      <div className="historical-data">
        <strong>Historical Performance:</strong>
        <ul>
          {stockData["Time Series (Daily)"] &&
            Object.entries(stockData["Time Series (Daily)"])
              .slice(0, 5)
              .map(([date, data], index) => (
                <li key={index}>
                  {date}: Close at {data["4. close"]}
                </li>
              ))}
        </ul>
      </div>
      <button onClick={() => alert("Add to Watchlist")}>
        Add to Watchlist
      </button>
      <button onClick={() => alert("Add to Portfolio")}>
        Add to Portfolio
      </button>
      {/* Placeholder for chat section */}
      <div className="chat">
        <h2>Discussion</h2>
        <p>Chat about this stock will appear here.</p>
      </div>
    </div>
  );
}

export default StockDetails;
