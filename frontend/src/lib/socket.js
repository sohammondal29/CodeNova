import { io } from "socket.io-client";

const SOCKET_URL = "https://codenova-green.vercel.app/";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});
