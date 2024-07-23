"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnect = void 0;
const socket_io_1 = require("socket.io");
const coin_controller_1 = require("../controller/coin.controller");
const credientials_1 = require("../middleware/credientials");
const socketConnect = (server) => {
    const io = new socket_io_1.Server(server, {
        maxHttpBufferSize: 1e8,
        transports: ["websocket", "polling"],
        cors: {
            origin: credientials_1.allowedOrigins,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        (0, coin_controller_1.getCoinsControllerlimit5)(socket);
        (0, coin_controller_1.getCoinsControllerlimit20)(socket);
        socket.on("disconnect", () => {
            console.info("Disconnect received from" + socket.id);
        });
    });
    console.info("Socket Io Started.");
};
exports.socketConnect = socketConnect;
