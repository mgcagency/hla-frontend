import React, { useEffect } from "react";

export default function Popup({ toggleFunc }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10 ">
        <div className="w-[380px] bg-customPopupBgColor p-4 rounded-3xl font-sans space-y-3 border border-gray-300">
          <div className="flex-[2] font-semibold text-lg text-customDarkerBlue mb-10">
            Select admin and then press continue and login to access dashboard
          </div>

          <div className=" flex justify-end">
            <button
              className="p-2 px-9 bg-customGreen text-customPopupBgColor text-sm font-normal rounded-3xl"
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
