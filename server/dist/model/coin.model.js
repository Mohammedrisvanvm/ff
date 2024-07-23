"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinModel = void 0;
const mongoose_1 = require("mongoose");
const coinSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    rate: { type: Number, required: true },
    volume: { type: Number, required: true },
    cap: { type: Number, required: true },
    delta: {
        hour: { type: Number, required: true },
        day: { type: Number, required: true },
        week: { type: Number, required: true },
        month: { type: Number, required: true },
        quarter: { type: Number, required: true },
        year: { type: Number, required: true },
    },
}, { timestamps: true });
const CoinModel = (0, mongoose_1.model)("Coin", coinSchema);
exports.CoinModel = CoinModel;
