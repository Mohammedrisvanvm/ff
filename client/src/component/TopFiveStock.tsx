"use client";
import {
  addStocksTopFive,
  removeStocksTopFive,
} from "@/lib/features/topFiveStock";
import { AppSelector } from "@/lib/redux/store";
import React from "react";
import { Audio } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";

const TopFiveStock = () => {
  const socket = React.useRef<Socket>();
  const realtimeData = AppSelector((state) => state.topFiveStockReducer.value);
  console.log(realtimeData);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const getLocalRealtimeData = () => {
      const localRealtimeData = localStorage.getItem("topFiveStock");
      if (localRealtimeData) return JSON.parse(localRealtimeData);
      return [];
    };

    const localData = getLocalRealtimeData();
    if (localData.length > 0) {
      dispatch(removeStocksTopFive());
      dispatch(addStocksTopFive(localData));
    }
    socket.current = io("http://localhost:4444");
    socket.current?.on("realtimedata", (data) => {
      localStorage.removeItem("topFiveStock");
      dispatch(removeStocksTopFive());
      localStorage.setItem("topFiveStock", JSON.stringify(data));
      dispatch(addStocksTopFive(data));
    });
  }, []);
  return (
    <div className="h-40 m-10 border rounded-lg shadow-2xl shadow-orange-600 text-black">
      {realtimeData.length == 0 ? (
        <div className="flex items-center justify-center">
          <Audio height="40" width="40" color="orange" ariaLabel="loading" />
        </div>
      ) : (
        <div className="grid grid-cols-5 ">
          {realtimeData.map((item) => (
            <>
              {" "}
              <div className="h-40 m-6 bg-white border-orange-200 border-3 rounded-lg shadow-2xl shadow-orange-600 text-black p-5">
                <div className="flex justify-center font-semibold capitalize">
                  <p className="font-bold">{item.code}</p>
                </div>
                <hr />
                <div className="justify-center font-semibold capitalize">
                  <div className="flex justify-between mt-4">
                    <p className="font-bold">cap</p>:
                    <span className="text-green-600">{item.cap}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold">Rate</p>:
                    <span className="text-green-600">
                      {item.rate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold">Value</p>:
                    <span className="text-green-600">{item.volume}</span>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopFiveStock;
