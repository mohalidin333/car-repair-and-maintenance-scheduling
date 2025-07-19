import React from "react";
import { PiExclamationMark } from "react-icons/pi";

export default function StockNotEnoughModalComponent({
  setIsStockEnough,
}: {
  setIsStockEnough: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed z-50 h-screen top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm mx-4 transform transition-all duration-300 scale-100 hover:scale-105">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <PiExclamationMark size={32} className="text-red-600" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Insufficient Stock
          </h3>
          <p className="text-gray-600 mb-6">
            Sorry, we don&apos;t have enough items in stock to fulfill your request.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setIsStockEnough(true)}
              className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
