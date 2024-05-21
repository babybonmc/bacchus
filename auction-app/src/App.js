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

export default App;
