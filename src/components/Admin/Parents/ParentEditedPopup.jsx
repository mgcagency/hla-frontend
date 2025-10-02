import React from "react";
import { GoCheck } from "react-icons/go";

export default function ParentEditedPopup({toggleFunc, toggleModal }) {
  const handleOkClick = ()=> {
    toggleFunc();
    toggleModal();
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[340px] bg-customPopupBgColor p-4 rounded-3xl font-sans space-y-3 border border-gray-300">
          <div className="flex-1 flex flex-row items-center ">
            <GoCheck className="text-customGreen" size={20} />
            <p className="text-customGray font-bold text-lg ml-2">
              Parent Updated Successfully
            </p>
          </div>

          <div className="flex-[2] font-normal text-sm text-customPopupTextColor mb-2">
            The parent has been updated in the system successfully.
          </div>

          <div className=" flex justify-end">
            <button
              className="p-2 px-9 bg-customGreen text-customPopupBgColor text-sm font-normal rounded-3xl"
              onClick={handleOkClick}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
