"use client";
import { addStocks, removeStocks } from "@/lib/features/stockSlice";
import { AppDispatch, AppSelector } from "@/lib/redux/store";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import StockDisplay from "./StockDisplay";
import TopFiveStock from "./TopFiveStock";
import { Audio } from "react-loader-spinner";

const MainStock = () => {
  const realtimeData = AppSelector((state) => state.stockReducer.value);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios.get("http://localhost:4444/api/v1/get").then((res) => {
  //     if(res.data.data)
  //     dispatch(addStocks(res.data.data));
  //   });
  // }, []);

  const socket = React.useRef<Socket>();

  React.useEffect(() => {
    socket.current = io("http://localhost:4444");
    const getLocalRealtimeData = () => {
      const localRealtimeData = localStorage.getItem("stock");
      if (localRealtimeData) return JSON.parse(localRealtimeData);
      return [];
    };

    const localData = getLocalRealtimeData();
    if (localData.length > 0) {
      dispatch(removeStocks());
      dispatch(addStocks(localData));
    }

    socket.current?.on("realtimedata20", (data) => {
      localStorage.removeItem("stock");
      dispatch(removeStocks());
      localStorage.setItem("stock", JSON.stringify(data));
      dispatch(addStocks(data));
    });
  }, []);
  const displayData =
    realtimeData.length === 0
      ? typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("stock") || "[]")
        : []
      : realtimeData;

  return (
    <>
     {realtimeData.length == 0 ? (
          <>
            <div className="flex items-center justify-center">
              <Audio
                height="80"
                width="80"
                color="orange"
                ariaLabel="loading"
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="font-extrabold font-serif text-5xl">WELCOME</p>
            </div>
          </>
        ) : (
          <>
      <div className="mb-32">
        <div className="flex justify-center">
          <span className="font-extrabold text-4xl">Live Stock</span>{" "}
        </div>
        <TopFiveStock />
      </div>
      <div className="flex justify-center mb-14">
        <span className="font-extrabold text-4xl">Other Stock</span>{" "}
      </div>
      <div className="grid grid-cols-5 gap-5">
        {displayData.map((stock: any) => (
          <StockDisplay key={stock.code} stock={stock} />
        ))}
      </div>
      </>
        )}
    </>
 
  );
};

export default MainStock;
