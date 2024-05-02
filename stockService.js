import axios from "axios";

const API_KEY = "RTUMJI401DA9WQNK"; // Replace with your actual API key
const BASE_URL = "https://www.alphavantage.co/query";

export const fetchStockDetails = async (symbol) => {
  try {
    const params = {
      function: "TIME_SERIES_DAILY",
      symbol: symbol,
      apikey: API_KEY,
    };
    const response = await axios.get(BASE_URL, { params });
    return response.data; // Process this data according to your needs
  } catch (error) {
    console.error("Error fetching stock details: ", error);
    return null; // Handle errors as needed
  }
};
