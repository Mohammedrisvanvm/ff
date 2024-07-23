# Real-Time Stock and Crypto Data Application

This project consists of a client-side and server-side application designed to fetch, store, and display real-time stock and cryptocurrency data.

## Project Structure

- `client/` - Contains the client-side code.
- `server/` - Contains the server-side code.

## Technologies Used

- **Client:** Next.js (or Express), TypeScript, Redux Toolkit, Socket.IO
- **Server:** Next.js (or Express), TypeScript, Redux Toolkit, Socket.IO, Node-cron
- **Database:** MongoDB

### Features

- Poll real-time data every few seconds for cryptocurrencies (e.g., GOOG, BTC) from an API of LiveCoinWatch
- Utilised socket.io for real-time data transfer
- Used Node-cron for run automatically fetch and update db with real time data
- Store the data in a MongoDB database.
- Used Redux Toolkit for advance state management
- utilised tailwind for design

### PROJECT SETUP

1. clone project
   ```bash
     git clone https://github.com/Mohammedrisvanvm/ff.git
   ```

### Client Setup

1. **Navigate to the Client directory:**

   ```bash
   cd client
   ```

   ```bash
    npm install
   ```

   ```bash
    npm run start
   ```

## Server-Side Setup

1. **Navigate to the Server directory:**

   ```bash
   cd server
   ```

   ```bash
    npm install
   ```

   ```bash
    npm run start
   ```

You can adjust the details according to your specific setup and preferences!
