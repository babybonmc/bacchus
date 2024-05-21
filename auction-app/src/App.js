import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fetchAuctions = async () => {
  const response = await axios.get('http://uptime-auction-api.azurewebsites.net/api/Auction');
  return response.data;
};

const AuctionApp = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userName, setUserName] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const loadAuctions = async () => {
      const data = await fetchAuctions();
      setAuctions(data);
      setFilteredAuctions(data);
      const uniqueCategories = [...new Set(data.map(auction => auction.productCategory))];
      setCategories(uniqueCategories);
    };

    loadAuctions();
  }, []);

  const handleCategoryChange = (category) => {
    if (category === '') {
      setFilteredAuctions(auctions);
    } else {
      const filtered = auctions.filter(auction => auction.productCategory === category);
      setFilteredAuctions(filtered);
    }
    setSelectedCategory(category);
  };

  const handleBidSubmit = (productId) => {
    if (!userName || !bidAmount) {
      alert('Пожалуйста, введите ваше имя и сумму ставки.');
      return;
    }

    // 
    alert(`Ставка принята: ${userName}, ${bidAmount}€ на товар ${productId}`);
    setUserName('');
    setBidAmount('');
  };

  return (
    <div>
      <h1>Текущие Аукционы</h1>
      <div>
        <label>Категория: </label>
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
          <option value=''>Все</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={() => handleCategoryChange('')}>Сбросить</button>
      </div>
      <ul>
        {filteredAuctions.map(auction => (
          <li key={auction.productId}>
            <h2>{auction.productTitle}</h2>
            <p>{auction.productDescription}</p>
            <p>Время окончания: {new Date(auction.biddingEndDate).toLocaleString()}</p>
            <form onSubmit={(e) => { e.preventDefault(); handleBidSubmit(auction.productId); }}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Сумма ставки (€)"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <button type="submit">Сделать ставку</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionApp;
