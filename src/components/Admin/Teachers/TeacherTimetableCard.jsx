import React from "react";
import { GoDotFill } from "react-icons/go";
import { IMAGES } from "../../../assets";

export default function TeacherTimetableCard({
  className,
  bgColor,
  classType,
  days,
  status,
  statusColor,
  teacherName,
}) {
  return (
    <div className={`${bgColor} rounded-xl p-3 pr-5`}>
      {/* Upper Div  */}
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row items-center">
          <p className="text-customDarkerBlue font-medium text-sm">
            {className}
          </p>
          <p className="text-customLightGray font-normal text-xs ml-2">
            {classType}
          </p>
        </div>

        <div className="flex flex-row items-center">
          <img
            src={IMAGES.avatar2}
            alt="Teacher image"
            className="w-[20px] h-[20px]"
          />
          <p className="text-customLightBlue text-xs ml-2">{teacherName}</p>
        </div>
      </div>

      {/* Lower Div */}
      <div className="flex flex-row justify-between ">
        <p className="text-customLightBlue text-xs font-normal">{days}</p>
        <div className="text-customGreen flex flex-row items-center">
          {status === "On Going" ? <GoDotFill /> : null}
          <p className={`${statusColor} font-medium text-sm ml-1`}>{status}</p>
        </div>
      </div>
    </div>
  );
}
