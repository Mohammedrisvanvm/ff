import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { getCoinsControllerlimit20, getCoinsControllerlimit5 } from "../controller/coin.controller";
import { allowedOrigins } from "../middleware/credientials";

interface ISentMessage {
  conversationId: string;
  messageText: string;
  senderId: string;
  receiverId: string;
}

export const socketConnect = (server: HTTPServer) => {
  const io = new Server(server, {
    maxHttpBufferSize: 1e8,
    transports: ["websocket", "polling"],
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    
   getCoinsControllerlimit5(socket);
   getCoinsControllerlimit20(socket);

    socket.on("disconnect", () => {
      console.info("Disconnect received from" + socket.id);
    });
  });

  console.info("Socket Io Started.");
};
