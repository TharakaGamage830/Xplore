# Xplore - Mini Travel Experience Listing Platform

Xplore is a simple full-stack web application built for a technical challenge. Basically, it allows travel businesses and local guides to post their unique experiences so travelers can easily find them.

Check out the live demo here: [https://xplore-alpha-lovat.vercel.app/](https://xplore-alpha-lovat.vercel.app/)

## Project Overview
The main idea behind Xplore is to bridge the gap between small travel operators and explorers. Many local guides don't have their own websites, so this platform gives them a space to reach people. Users can create accounts, post their listings with prices and images, and others can browse them on a public feed.

## Tech Stack
I used a modern stack to keep things fast and scalable:
*   Frontend: Next.js (App Router), React, Tailwind CSS
*   Backend: Node.js, Express.js (with Gzip compression enabled)
*   Database: MongoDB with Mongoose
*   Auth: JWT-based authentication with secure cookies
*   Icons: Custom SVGs (for better performance)

## Features I've Implemented
I managed to finish all the core requirements and most of the optional ones too.

### Core Stuff:
*   Registration & Login: Users can join up and stay logged in securely.
*   Create Listings: Logged-in users can post experiences with titles, locations, images, and descriptions.
*   Public Feed: Everyone can see the listings, showing the newest ones first.
*   Detail View: You can click on any card to see the full details, including price and who posted it.

### Extras (Optional Features):
*   Search & Filter: You can search for listings by title or location.
*   Like & Save: Users can like posts or save them for later (dedicated tabs for these too).
*   Edit & Delete: If you're the owner, you can update or remove your listings.
*   Load More Pagination: I added a pagination system so the feed loads quickly.
*   Responsive Design: Works perfectly on mobile, tablet, and desktop.
*   Performance Optimization: Images are optimized using Next.js Image component and backend responses are compressed.

## How to Run it Locally

### Prerequisites
Make sure you have Node.js and MongoDB installed on your machine.

### 1. Setup the Backend
*   Go to the `server` folder.
*   Create a `.env` file and add your `MONGO_URI` and `JWT_SECRET`.
*   Run `npm install` to get the dependencies.
*   Start the server with `npm start` or `node index.js`.

### 2. Setup the Frontend
*   Move to the `client` folder.
*   Create a `.env.local` and set `NEXT_PUBLIC_API_URL=http://localhost:5000/api`.
*   Run `npm install`.
*   Run `npm run dev` to start the development server.
*   Open [http://localhost:3000](http://localhost:3000) in your browser.
