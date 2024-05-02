import React, { useEffect, useState } from "react";
import { fetchStockDetails } from "../services/stockService.js";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadStocks = async () => {
      // Example stocks
      const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
      const stockData = await Promise.all(
        symbols.map((symbol) => fetchStockDetails(symbol))
      );
      setStocks(stockData);
    };

    const loadNews = async () => {
      const apiKey = "29482fa5b1d447fbb42e2ec3baf5201a";
      const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
      try {
        const response = await axios.get(newsUrl);
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    loadStocks();
    loadNews();
  }, []);

  return (
    <main className="container">
      <h2>Welcome to Social Stock App</h2>
      {/* Display stocks */}
      {stocks.map((stock, index) => (
        <div key={index} className="card stock-card">
          <h3>
            {stock["Meta Data"] ? stock["Meta Data"]["2. Symbol"] : "N/A"}
          </h3>
          <p>
            Latest Close:{" "}
            {stock["Time Series (Daily)"]
              ? Object.values(stock["Time Series (Daily)"])[0]["4. close"]
              : "N/A"}
          </p>
          <Link
            to={`/stock/${
              stock["Meta Data"] ? stock["Meta Data"]["2. Symbol"] : "N/A"
            }`}
          >
            View Details
          </Link>
        </div>
      ))}

      {/* Display news */}
      <div className="news-container">
        <h2>Latest News</h2>
        {news.map((article, index) => (
          <div key={index} className="card news-card">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;