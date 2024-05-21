const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory storage for bids
const bids = [];

// Endpoint to submit a bid
app.post('/submit-bid', (req, res) => {
  const { productId, userName, bidAmount, uniqueIdentifier } = req.body;
  if (!productId || !userName || !bidAmount || !uniqueIdentifier) {
    return res.status(400).send('All fields are required.');
  }
  bids.push({ productId, userName, bidAmount, uniqueIdentifier, timestamp: new Date() });
  res.status(200).send('Bid submitted successfully.');
});

// Endpoint to get all bids (for testing purposes)
app.get('/bids', (req, res) => {
  res.json(bids);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
