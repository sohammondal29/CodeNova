import { io } from "socket.io-client";

const SOCKET_URL = "https://codenova-rmy8.onrender.com/";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});
