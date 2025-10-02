import React, { useEffect } from "react";

export default function NotificationPopup({ toggleFunc }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10 ">
        <div className="w-[300px] bg-customPopupBgColor p-4 rounded-3xl font-sans space-y-3 border border-gray-300">
          <div className="flex-[2] font-semibold text-lg text-customDarkerBlue mb-10">
            You have currently have no notifications.
          </div>

          <div className=" flex justify-end">
            <button
              className="p-2 px-9 bg-red-500 w-full text-customPopupBgColor text-sm font-normal rounded-3xl"
              onClick={toggleFunc}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
