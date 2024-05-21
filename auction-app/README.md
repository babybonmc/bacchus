## Description
The Bacchus app allows users to view current auctions and place bids on selected items. Users can enter their full name and bet amount in euros. The application automatically generates a unique ID for each bet based on the username and current time.

## Installation
1. Clone the repository:
    ```sh
    git clone <URL of your repository>
    cd <repository name>
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

## Launch
1. Start the server:
    ```sh
    node server.js
    ```
    You should see the message: `Server running at http://localhost:3002/`
2. Launch the client part in another terminal:
    ```sh
    npm start
    ```
    The application will open in the default browser at `http://localhost:3000`.

## Usage
1. **View auctions:**
    - Open your browser and go to `http://localhost:3000`.
    - Select a category to filter auctions or select "All" to see all auctions.
2. **Placing a bet:**
    - Find the auction you are interested in.
    - Enter your full name and bet amount in euros.
    - Click the "Place Bid" button to submit your bid.

## Testing with Postman (optional)

### Submitting a bid
1. Open Postman.
2. Create a new request.
3. Set the request method to `POST`.
4. Enter the URL `http://localhost:3002/submit-bid`.
5. Go to the `Body` tab and select `raw`, then select `JSON`.
6.Paste the following JSON into the request body:
    ```json
    {
      "productId": "exampleProductId",
      "userName": "John Doe",
      "bidAmount": 100,
      "uniqueIdentifier": "John Doe-2023-05-21T10:00:00Z"
    }
    ```
7. Click the `Send` button.

### Receive all bids
1. Create a new request.
2. Set the request method to `GET`.
3. Enter the URL `http://localhost:3002/bids`.
4. Click the `Send` button.
5. You will see a JSON with an array of all bids.

## Technical details

- **Client:** React.js
- **Server:** Node.js, Express.js