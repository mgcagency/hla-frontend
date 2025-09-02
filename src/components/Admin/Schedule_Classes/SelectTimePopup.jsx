import React from "react";
import { RiCloseLine } from "react-icons/ri";
import CustomClock from "./CustomClock";

export default function SelectTimePopup({ toggleFunc, onTimeSelect }) {
  const handleConfirm = (startTime, endTime) => {
    onTimeSelect(startTime, endTime);
    toggleFunc();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
      <div className="w-[500px] bg-customPopupBgColor p-4 pt-2 rounded-3xl font-sans space-y-3 border border-gray-300">
        <div className="flex flex-col justify-between">
          <CustomClock onConfirm={handleConfirm} onCancel={toggleFunc} />
        </div>
      </div>
    </div>
  );
}
