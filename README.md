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
