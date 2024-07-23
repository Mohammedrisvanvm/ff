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
const axios_1 = __importDefault(require("axios"));
const node_cron_1 = __importDefault(require("node-cron"));
const coin_model_1 = require("../model/coin.model");
const cron_model_1 = require("../model/cron.model");
const apiUrl = "https://api.livecoinwatch.com/coins/list";
const apiKey = "4cfe7b4e-8f8b-4aba-a35c-c4cbf78eede1";
let task;
const fetchDataAndStore = (cronName) => () => __awaiter(void 0, void 0, void 0, function* () {
    const cronLog = new cron_model_1.CronLogModel({
        cronName,
        startTime: new Date().toLocaleTimeString(undefined, { hour12: false }),
        status: 0,
    });
    yield cronLog.save();
    try {
        yield cron_model_1.CronLogModel.findByIdAndUpdate(cronLog.id, {
            $set: { status: 1, resp_data: "started" },
        });
        const response = yield axios_1.default.post(apiUrl, {
            currency: "USD",
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 20,
            meta: false,
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
        });
        const data = response.data;
        yield coin_model_1.CoinModel.insertMany(data);
        yield cron_model_1.CronLogModel.findByIdAndUpdate(cronLog.id, {
            endTime: new Date().toLocaleTimeString(undefined, { hour12: false }),
            status: 2,
            resp_data: "completed",
        });
    }
    catch (error) {
        console.error("Error:", error);
        yield cron_model_1.CronLogModel.findByIdAndUpdate(cronLog.id, {
            endTime: new Date().toLocaleTimeString(undefined, { hour12: false }),
            status: -1,
            resp_data: error,
        });
        task.stop();
    }
});
const cronrun = () => __awaiter(void 0, void 0, void 0, function* () {
    task = node_cron_1.default.schedule(`*/5 * * * * *`, fetchDataAndStore("FetchDataCron"));
    task.start();
});
exports.default = cronrun;
