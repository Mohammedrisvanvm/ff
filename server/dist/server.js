"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoDB_1 = require("./config/mongoDB");
const socket_helper_1 = require("./helper/socket.helper");
const credientials_1 = __importStar(require("./middleware/credientials"));
const coin_route_1 = __importDefault(require("./route/coin.route"));
const cron_helper_1 = __importDefault(require("./helper/cron.helper"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4444;
(0, mongoDB_1.DBconnect)();
(0, cron_helper_1.default)();
const server = http_1.default.createServer(app);
(0, socket_helper_1.socketConnect)(server);
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: false, limit: "50mb" }));
app.use(credientials_1.default);
app.use((0, cors_1.default)({
    origin: credientials_1.allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use("/api/v1", coin_route_1.default);
app.get("/", (req, res) => {
    res.send(`Express + TypeScript Server`);
});
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
