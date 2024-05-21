import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuctionApp = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userName, setUserName] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get('http://uptime-auction-api.azurewebsites.net/api/Auction');
        const data = response.data;
        setAuctions(data);
        setFilteredAuctions(data);

        const uniqueCategories = [...new Set(data.map(auction => auction.productCategory))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredAuctions(auctions);
    } else {
      const filtered = auctions.filter(auction => auction.productCategory === category);
      setFilteredAuctions(filtered);
    }
  };

  const handleBidSubmit = async (productId) => {
    if (!userName || !bidAmount) {
      alert('Please enter your name and bid amount.');
      return;
    }

    const timestamp = new Date().toISOString(); // Generate timestamp
    const uniqueIdentifier = `${userName}-${timestamp}`; // Unique identifier

    try {
      // Send bid to server
      await axios.post('http://localhost:3002/submit-bid', { 
        productId: productId,
        userName: userName,
        bidAmount: bidAmount,
        uniqueIdentifier: uniqueIdentifier
      });

      alert('Bid submitted successfully.');
      setUserName('');
      setBidAmount('');
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again.');
    }
  };

  return (
    <div>
      <h1>Current Auctions</h1>
      <div>
        <label>Category: </label>
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
          <option value=''>All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={() => handleCategoryChange('')}>Reset</button>
      </div>
      <ul>
        {filteredAuctions.map(auction => (
          <li key={auction.productId}>
            <h2>{auction.productTitle}</h2>
            <p>{auction.productDescription}</p>
            <p>Ends at: {new Date(auction.biddingEndDate).toLocaleString()}</p>
            <form onSubmit={(e) => { e.preventDefault(); handleBidSubmit(auction.productId); }}>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Bid Amount (€)"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <button type="submit">Place Bid</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionApp;
