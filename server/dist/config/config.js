"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = true ? 'mongodb://127.0.0.1:27017/fomofactory' : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@carland.zzuutla.mongodb.net/Carland`;
const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 3000;
exports.config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
