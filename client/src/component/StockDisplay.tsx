"use client";
import { StockState } from "@/lib/features/stockSlice";
import React from "react";

type StockDisplayProps = {
  stock: StockState;
};
const StockDisplay: React.FC<StockDisplayProps> = ({ stock }) => {
  return (
    <div className="p-4 border rounded-lg shadow-2xl shadow-orange-600 text-black">
      <h2 className="text-xl font-semibold mb-2">{stock.code}</h2>
      <div className="mb-2">
        <span className="font-bold  ">Cap:</span>
        <span className="text-green-600"> {stock.cap}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Rate:</span>
        <span className="text-green-600"> {stock.rate.toFixed(2)}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Volume:</span>
        <span className="text-green-600"> {stock.volume}</span>
      </div>
      {stock.delta && (
        <div className="mb-2">
          <span className="font-bold">Delta:</span>
          <ul className="list-disc list-inside ml-4 font-bold">
            <li>
              Hour:
              <span className="text-green-600 font-normal">
                {" "}
                {stock.delta.hour.toFixed(4)}
              </span>{" "}
            </li>
            <li>
              Day:
              <span className="text-green-600 font-normal">
                {" "}
                {stock.delta.day.toFixed(4)}
              </span>{" "}
            </li>
            <li>
              Week:
              <span className="text-green-600 font-normal">
                {" "}
                {stock.delta.week.toFixed(4)}
              </span>{" "}
            </li>
            <li>
              Month:
              <span className="text-green-600 font-normal">
                {" "}
                {stock.delta.month.toFixed(4)}
              </span>{" "}
            </li>
            <li>
              Year:
              <span className="text-green-600 font-normal">
                {" "}
                {stock.delta.year.toFixed(4)}
              </span>{" "}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockDisplay;
