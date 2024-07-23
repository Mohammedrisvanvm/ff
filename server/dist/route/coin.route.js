"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coin_controller_1 = require("../controller/coin.controller");
const coinRoute = (0, express_1.Router)();
coinRoute.get("/get", coin_controller_1.fetchDatalist);
exports.default = coinRoute;
