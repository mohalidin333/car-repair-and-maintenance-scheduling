import React from "react";
import { PiExclamationMark } from "react-icons/pi";

export default function CancelModalComponent({ ok }: { ok: () => void }) {
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
            Cancel Appointment
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to cancel this appointment?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => ok()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => ok()}
              className="px-4 py-2 border border-red-600 hover:text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
