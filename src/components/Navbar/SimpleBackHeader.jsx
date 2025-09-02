import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function StudentHeader() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-row w-full h-[80px] rounded-tl-3xl md:pl-5 items-center font-sans font-medium text-base">
      <div className="flex-1">
        <button
          onClick={handleBackClick}
          className="flex items-center text-customDarkBlue ml-16 md:ml-0"
        >
          <IoIosArrowBack />
          <p className=" ml-1">Back</p>
        </button>
      </div>
    </div>
  );
}
