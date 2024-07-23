import { Router } from "express";
import { fetchDatalist } from "../controller/coin.controller";


const coinRoute=Router()

coinRoute.get("/get",fetchDatalist)
export default coinRoute