import { io } from "socket.io-client";

// Use VITE_SOCKET_URL only when explicitly configured; otherwise keep the current-origin proxy.
const socket = io(import.meta.env.VITE_SOCKET_URL || undefined);

export const initSocket = () => {
  console.log("Inicializando socket...");

  // Check if socket is connected
  if (socket.connected) {
    console.log("Estou conectado");
  } else {
    console.log("Tentando conectar...");
  }

  // Listen for connection events
  socket.on("connect", () => {
    console.log("Conectado ao servidor:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado do servidor");
  });

  return socket;
};

export const socketAddListener = (listener = "", callback = () => {}) => {
  socket.on(listener, callback);
};

export const socketRemoveListener = (listener = "", callback = () => {}) => {
  socket.off(listener, callback);
};