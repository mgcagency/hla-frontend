import React from "react";

import { IMAGES } from "../../assets";

export default function ParentsCompClassesCard({
  borderColor,
  circleBgColor,
  bgColor,
  subject,
  teacherName,
}) {
  return (
    // whole card div
    <div
      className={`border rounded-2xl ${borderColor} ${bgColor} font-sans text-customGray pt-3 pb-1 pl-3 pr-4`}
    >
      {/* Upper Div  */}
      <div className="flex flex-row items-center mb-1 justify-between ">
        {/* Upper Left Div  */}
        <div className="flex flex-row items-center">
          <div className={`${circleBgColor} p-3 rounded-full flex-shrink-0 `}>
            <img
              src={IMAGES.users_icon}
              alt="Users Icon"
              className="h-[13px] w-[15px] "
            />
          </div>
          <div className="ml-2 lg:ml-1">
            <p className="text-xs font-semibold ">{subject}</p>
            <p className="text-xxs font-normal text-customLightGray">Online</p>
          </div>
        </div>

        {/* Upper Right Div  */}
        <div className="flex items-center justify-center flex-row lg:flex-col xl:flex-row xl:mb-4">
          <img
            src={IMAGES.avatar}
            alt="Teacher Image"
            className="h-5 w-5 rounded-full"
          />
          <p className="text-xxs font-normal text-customLightBlue ml-2 lg:ml-1">
            {teacherName}
          </p>
        </div>
      </div>

      {/* Lower Div  */}
      <div>
        <p className="font-normal text-xxs">Mon, 11:00 am - 1:00 pm</p>
      </div>
    </div>
  );
}
