# URL Shortener

A simple, fast, and lightweight URL Shortener application built with Node.js, Express, and MongoDB.

## Features
- Generate short URLs for long links.
- Stores total visit counts and timestamp analytics for generated short URLs.
- EJS server-side rendering for a simple UI.

## Tech Stack
- **Node.js** & **Express.js**: Backend framework
- **MongoDB** & **Mongoose**: Database and ODM
- **EJS**: View engine
- **shortid**: To generate unique random short IDs
- **dotenv**: Environment variable management

## Prerequisites
- Node.js installed
- MongoDB connection string (local or MongoDB Atlas)

## Getting Started

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory by copying the `.env.example` file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and configure your `MONGODB_URI`:
   ```
   MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/..."
   ```

3. **Start the application:**
   For development (uses nodemon):
   ```bash
   npm run dev
   ```
   For production:
   ```bash
   npm start
   ```

4. **Usage:**
   Open your browser and navigate to `http://localhost:8001`. You can enter a long URL to get a shortened version.
