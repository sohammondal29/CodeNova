# CodeNova

CodeNova is a full-stack MERN-based coding interview and collaboration platform built for live problem solving, session management, and real-time interaction. It combines a polished React frontend with an Express/Node backend, MongoDB for persistence, Clerk for authentication, Stream for video/chat, and Socket.IO for live collaboration.

## Features

* User authentication with Clerk
* Create, join, and manage coding sessions
* View active sessions and recent sessions
* Real-time code synchronization
* Video/chat integration with Stream
* Persistent session data in MongoDB
* Protected backend routes
* Responsive UI for desktop and mobile
* Deployed frontend on Vercel and backend on Render

## Tech Stack

**Frontend**

* React
* Vite
* React Router
* TanStack Query
* Axios
* Clerk React
* Stream React SDK
* Tailwind CSS

**Backend**

* Node.js
* Express
* MongoDB + Mongoose
* Clerk Express
* Socket.IO
* Inngest
* Stream server SDK
* CORS

**Deployment**

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## Project Structure

```text
CodeNova/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── package.json
│   └── .env
└── README.md
```

## Getting Started

### Prerequisites

* Node.js 18+ recommended
* npm or yarn
* MongoDB Atlas account
* Clerk account
* Stream account
* Render and Vercel accounts for deployment

### Clone the repository

```bash
git clone https://github.com/your-username/CodeNova.git
cd CodeNova
```

## Environment Variables

### Backend (`backend/.env`)

Create a `.env` file inside the `backend` folder and add the required variables.

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DB_URL=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
ONECOMIPLER_API_KEY=your_onecompiler_api_key
```

### Frontend (`frontend/.env`)

Create a `.env` file inside the `frontend` folder and add the public variables.

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
```

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend usually runs on `http://localhost:5173`.

## How It Works

### Authentication

Users sign in with Clerk. The backend protects session routes using authentication middleware so only valid users can create or manage sessions.

### Sessions

A session stores:

* problem name
* difficulty
* host
* participant
* status
* Stream call ID
* timestamps

### Real-Time Collaboration

Socket.IO is used for live updates such as:

* joining rooms
* code changes
* output changes

### Video and Chat

Stream powers the real-time video and chat experience inside a session.

## API Endpoints

### Health

```http
GET /health
```

### Sessions

```http
POST /api/sessions
GET /api/sessions/active
GET /api/sessions/my-recent
GET /api/sessions/:id
POST /api/sessions/:id/join
POST /api/sessions/:id/end
```

### Chat

```http
GET /api/chat/token
```

### Inngest

```http
POST /api/inngest
```

## Deployment Notes

### Frontend on Vercel

* Set `VITE_API_URL` to your deployed backend URL
* Set `VITE_SOCKET_URL` if needed
* Add a `vercel.json` rewrite file so React Router routes work correctly

Example `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend on Render

* Set `NODE_ENV=production`
* Set `CLIENT_URL` to your deployed frontend URL
* Add all required secrets in Render environment variables
* Set the backend root directory to `backend`
* Start command should point to `src/server.js`

## Common Issues

### Clerk publishable key error

Make sure the frontend uses:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_or_pk_live_key
```

Do not use the Clerk secret key in the frontend.

### CORS errors

Ensure the backend CORS config allows your deployed frontend origin.

### Failed to create room

Check:

* `STREAM_API_SECRET` is set on the backend
* Clerk auth is working in production
* backend logs for controller errors

### React Router 404 on refresh

Make sure `vercel.json` exists in the frontend root.

## Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## License

This project is for educational and portfolio purposes. Add a license if you plan to open source it formally.

## Author

Created by Soham Mondal.
