// src/App.jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  // State variables
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  // Fetch data from CoinLore API
  useEffect(() => {
    fetch('https://api.coinlore.net/api/tickers/')
      .then((response) => response.json())
      .then((data) => {
        setCoins(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  // Pagination logic
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);
  const totalPages = Math.ceil(coins.length / coinsPerPage);

  // Handlers for pagination buttons
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {loading ? (
          <p className="text-center text-blue-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-2 py-3 sm:px-4 sm:py-2 border-b-2 border-blue-600 text-left bg-blue-600 text-white text-sm sm:text-base">
                    Coin
                  </th>
                  <th className="px-2 py-3 sm:px-4 sm:py-2 border-b-2 border-blue-600 text-left bg-blue-600 text-white text-sm sm:text-base">
                    Code
                  </th>
                  <th className="px-2 py-3 sm:px-4 sm:py-2 border-b-2 border-blue-600 text-left bg-blue-600 text-white text-sm sm:text-base">
                    Price (USD)
                  </th>
                  <th className="px-2 py-3 sm:px-4 sm:py-2 border-b-2 border-blue-600 text-left bg-blue-600 text-white text-sm sm:text-base">
                    Total Supply
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCoins.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="px-2 py-3 sm:px-4 sm:py-2 border-b text-sm sm:text-base">
                      {coin.name}
                    </td>
                    <td className="px-2 py-3 sm:px-4 sm:py-2 border-b text-sm sm:text-base">
                      {coin.symbol}
                    </td>
                    <td className="px-2 py-3 sm:px-4 sm:py-2 border-b text-sm sm:text-base">
                      ${parseFloat(coin.price_usd).toFixed(2)}
                    </td>
                    <td className="px-2 py-3 sm:px-4 sm:py-2 border-b text-sm sm:text-base">
                      {parseInt(coin.tsupply).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col sm:flex-row justify-between mt-4">
              {/* Conditionally render the Previous button */}
              {currentPage > 1 ? (
                <button
                  onClick={handlePrevious}
                  className="mb-2 sm:mb-0 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}
              {/* Conditionally render the Next button */}
              {currentPage < totalPages ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base"
                >
                  Next
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
