# Xplore - Mini Travel Experience Listing Platform

Xplore is a simple full-stack web application built for a technical challenge. Basically, it allows travel businesses and local guides to post their unique experiences so travelers can easily find them.

Live Demo: [https://xplore-alpha-lovat.vercel.app/](https://xplore-alpha-lovat.vercel.app/)

## Project Overview
The main idea behind Xplore is to bridge the gap between small travel operators and explorers. Many local guides don't have their own websites, so this platform gives them a space to reach people. Users can create accounts, post their listings with prices and images, and others can browse them on a public feed.

## Tech Stack
MERN stack is used to keep the development fast and simple:
* Frontend: Next.js (App Router), Tailwind CSS
* Backend: Node.js, Express.js (with Gzip compression)
* Database: MongoDB with Mongoose
* Auth: JWT-based authentication with secure cookies
* Icons: Custom SVGs instead of heavy libraries

## Architecture & Key Decisions

**Tech Stack Choice**

Next.js was selected as the frontend framework primarily because it was the recommended technology stack for this challenge. Although Next.js was a completely new technology to learn, the project provided a great opportunity to explore its App Router, file-based routing, and built-in image optimization features. Choosing this stack ensured the application follows modern web standards while pushing for personal technical growth. Node.js with Express keeps the backend simple for setting up API routes without a lot of boilerplate. MongoDB was the right fit for travel listings since each listing can have slightly different fields, and a document-based database handles that naturally without needing schema migrations.

**Authentication**

JWT stored in HTTP-only cookies. The main reason for HTTP-only is that frontend JavaScript can't access those cookies at all, so even if there's an XSS issue somewhere, the token is still protected. When a user logs in, the server signs a token and sets it as a cookie, and every request after that carries it automatically.

**Data Storage**

Listings are stored as MongoDB documents. Each document holds a `userId` reference so the creator is always identifiable. Images are stored as URLs rather than actual files — this keeps the database light and avoids dealing with file storage infrastructure. It works well for this use case since users can link images that are already hosted online.

**One Thing to Improve**

Replacing the URL input for images with a proper file upload system using something like Cloudinary would be a major upgrade. Right now it works, but a file upload is better if a user wants to post a photo directly from a device. Cloudinary handles storage, resizing, and compression, making the integration quite straightforward.

## Product Thinking Question (Scaling to 10k Listings)
If the platform grows to 10,000 listings, the current way of loading data will surely slow down. First, implementing deep pagination or an infinite scroll system is essential so data isn't fetched all at once. From the database side, adding "Text Indexes" on the title and location fields in MongoDB will keep searches fast even with a large dataset. On the API side, using a caching layer like Redis for the most popular listings will avoid hitting the database every time. Optimizing images further using a CDN will ensure they load instantly regardless of the user's location. Finally, adding more filters (like price range or date) is essential so users can actually find what is needed without scrolling forever.

## Features Implemented
Core and most of the optional features are working smoothly:

### Core Features:
* Registration & Login: Users can join up and stay logged in securely.
* Create Listings: Logged-in users can post experiences with titles, locations, images, and descriptions.
* Public Feed: Everyone can see the listings, showing the newest ones first.
* Detail View: Clicking any card shows full details, price, and the creator.

### Bonus Features:
* Search & Filter: Search by title or location.
* Like & Save: Users can like posts or save them for later (dedicated tabs included).
* Edit & Delete: Authors have full control over their own listings.
* Load More Pagination: Feed loads in small chunks for better speed.
* Performance: Gzip compression on backend and Next.js Image optimization on frontend.

## Setup Instructions

### Prerequisites
Node.js and MongoDB must be installed.

### 1. Setup the Backend
* Go to the `server` folder.
* Create a `.env` file and add `MONGO_URI` and `JWT_SECRET`.
* Run `npm install`.
* Start with `npm start` or `node index.js`.

### 2. Setup the Frontend
* Go to the `client` folder.
* Create a `.env.local` and set `NEXT_PUBLIC_API_URL=http://localhost:5000/api`.
* Run `npm install`.
* Run `npm run dev`.
* Open [http://localhost:3000](http://localhost:3000).
