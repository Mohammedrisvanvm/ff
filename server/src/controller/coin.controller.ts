import { Request, Response } from "express";
import { CoinModel } from "../model/coin.model";
import axios from "axios";
import { Socket } from "socket.io";

export const getCoinsControllerlimit20 = async (socket: Socket) => {
  try {
    setInterval(async () => {
      const data = await CoinModel.find().sort({ _id: -1 }).limit(20);
      socket.emit(
        "realtimedata20",
        data
      );
    }, 10000);
  } catch (error) {
    console.log(error);
  }
};
export const getCoinsControllerlimit5 = async (socket: Socket) => {
  try {
    setInterval(async () => {
      const Codes = new Set(["BTC", "SOL", "ETH", "USDT", "BNB"]);

      const data = await CoinModel.find().sort({ _id: -1 }).limit(20);

      const realTimeData = data.filter((item) => {
        return Codes.has(item.code);
      });

      socket.emit(
        "realtimedata",
        realTimeData.sort((a, b) => a.code.localeCompare(b.code))
      );
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};
export const fetchDatalist = async (req: Request, res: Response) => {
  try {
    axios
      .post(
        "https://api.livecoinwatch.com/coins/list",
        {
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 20,
          meta: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "4cfe7b4e-8f8b-4aba-a35c-c4cbf78eede1",
          },
        }
      )
      .then(async (response: any) => {
        await CoinModel.insertMany(response.data);
        res.json(response.data)
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
