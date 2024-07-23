"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDatalist = exports.getCoinsControllerlimit5 = exports.getCoinsControllerlimit20 = void 0;
const coin_model_1 = require("../model/coin.model");
const axios_1 = __importDefault(require("axios"));
const getCoinsControllerlimit20 = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield coin_model_1.CoinModel.find().sort({ _id: -1 }).limit(20);
            socket.emit("realtimedata20", data);
        }), 10000);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCoinsControllerlimit20 = getCoinsControllerlimit20;
const getCoinsControllerlimit5 = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const Codes = new Set(["BTC", "SOL", "ETH", "USDT", "BNB"]);
            const data = yield coin_model_1.CoinModel.find().sort({ _id: -1 }).limit(20);
            const realTimeData = data.filter((item) => {
                return Codes.has(item.code);
            });
            socket.emit("realtimedata", realTimeData.sort((a, b) => a.code.localeCompare(b.code)));
        }), 5000);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCoinsControllerlimit5 = getCoinsControllerlimit5;
const fetchDatalist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default
            .post("https://api.livecoinwatch.com/coins/list", {
            currency: "USD",
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 20,
            meta: false,
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "4cfe7b4e-8f8b-4aba-a35c-c4cbf78eede1",
            },
        })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            yield coin_model_1.CoinModel.insertMany(response.data);
            res.json(response.data);
        }))
            .catch((error) => {
            console.error("Error:", error);
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.fetchDatalist = fetchDatalist;
