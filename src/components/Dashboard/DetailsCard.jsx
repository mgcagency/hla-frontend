import React from "react";
import Loader from "../Loader/Loader";

export default function DetailsCard({ icon, label, value, loading , link}) {
  return (
    <>
    <a href={link} className="flex flex-1">
      <div className="flex flex-1 px-5 mr-5 backdrop-blur-sm opacity-90 flex-col h-[150px] bg-blue-50 md:bg-customWhite55 rounded-2xl  border-[1.5px]  border-customDetailCardBorderColor shadow-customDetailCardShadow">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader /> {/* Display loader */}
          </div>
        ) : (
          <>
            <div className="bg-white mt-5 mb-2 flex-[2] w-[45px] h-[40px] rounded-xl flex justify-center items-center">
              <div className="flex-shrink-0 w-[23px] h-[23px] ">{icon}</div>
            </div>

            <div className="flex-1">
              <p className="text-customRoleColor text-sm md:text-xs lg:text-sm font_normal font-inter">
                {label}
              </p>
            </div>

            <div className="flex-[2]">
              <p className="text-customGray font-bold text-2xl">{value}</p>
            </div>
          </>
        )}
      </div>
      </a>
    </>
  );
}
