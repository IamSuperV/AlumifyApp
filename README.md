# Alumify - Production Ready Web App

## Tech Stack
- MongoDB, Express, React, Node.js (MERN)
- Tailwind CSS
- JWT Authentication

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` file (copy from `.env.example`- wait, create one if missing).
4. `node server.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## API Documentation
- `POST /api/auth/register`: Create account
- `POST /api/auth/login`: Login
- `GET /api/user/me`: Get profile (Protected)
- `GET /api/admin/users`: Get all users (Admin)

## Admin Access
To make a user an admin, please update the database directly as this is a secure production practice (seed scripts can also be used).
