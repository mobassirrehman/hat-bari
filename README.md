# HatBari Online Grocery Store

A modern e-commerce application built with Next.js 15 and Express.js.

## 🔗 Live Demo
**Live Link:** [https://hat-bari.vercel.app](https://hat-bari.vercel.app)

## Features
- **Authentication**: NextAuth.js with Google and Credentials (Mock) login.
- **Product Management**: Browse, filter by category, and sort products.
- **Protected Routes**: Add items via a restricted dashboard for logged-in users.
- **Responsive UI**: Built with Tailwind CSS and Framer Motion for smooth animations.

## Routes
- `/` - Landing Page (7 Sections)
- `/shop` - Public Item List
- `/shop/[id]` - Item Details
- `/login` - Authentication Page
- `/add-item` - Protected page for adding new products

## Setup
1. Clone the repo
2. Run `npm install`
3. Set up `.env` with `NEXTAUTH_SECRET` and `EXPRESS_API_URL`
4. Run `npm run dev`