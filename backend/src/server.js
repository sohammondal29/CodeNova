import express from "express";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import codeRoutes from "./routes/codeRoutes.js";

const app = express();
const __dirname = path.resolve();

// CREATE HTTP SERVER
const httpServer = createServer(app);

// SOCKET.IO SERVER
const io = new Server(httpServer, {
  cors: {
    origin: ENV.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  // JOIN ROOM
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // REALTIME CODE SYNC
  socket.on("code-change", ({ roomId, code, language }) => {
    socket.to(roomId).emit("receive-code", {
      code,
      language,
    });
  });

  socket.on("output-change", ({ roomId, output }) => {
    socket.to(roomId).emit("receive-output", {
      output,
    });
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED:", socket.id);
  });
});

// MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(clerkMiddleware());

// ROUTES
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat", chatRoutes);

app.use("/api/sessions", sessionRoutes);

app.use("/api/code", codeRoutes);

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "API is up and running",
  });
});

// PRODUCTION BUILD
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

// START SERVER
const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(ENV.PORT, () => {
      console.log("Server running on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();