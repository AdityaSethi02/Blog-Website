# Blogging Website

## Overview
A blogging website that allows users to create, read, and manage blog posts. The application features a clean and modern interface with robust functionality powered by a strong tech stack.

## Tech Stack
- **Frontend**: React with **Typescript**
- **Backend**: Hono + Cloudflare Workers with **Typescript**
- **Type Validation**: Zod for Frontend and Backend validation
- **Database**: PostgreSQL using Prisma ORM with connection pooling
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **Common Zod Validation**: A reusable Zod validation package published on npmjs.

## Features
- User authentication
- Create, read, update, and delete blog posts
- Responsive design

## Getting Started

### Prerequisites
- Node.js (version 14 or later)
- PostgreSQL (for the database)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaSethi02/Blogging-Website.git

   cd Blogging-Website
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory and add your environment variables.

### Running the Application
To start the development servers for both frontend and backend:
```bash
# Frontend
cd frontend
npm start

# Backend
cd backend
npm start
```

Project Deployed: https://wordweaver-blog.vercel.app/signup