import express from "express";
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

const allowedOrigins = [
  "http://localhost:5173",
  "https://codenova-soham.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/code", codeRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is up and running" });
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("code-change", ({ roomId, code, language }) => {
    socket.to(roomId).emit("receive-code", { code, language });
  });

  socket.on("output-change", ({ roomId, output }) => {
    socket.to(roomId).emit("receive-output", { output });
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED:", socket.id);
  });
});

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
