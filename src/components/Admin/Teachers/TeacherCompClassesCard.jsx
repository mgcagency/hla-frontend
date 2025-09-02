import React from "react";
import { IMAGES } from "../../../assets";
import { getLocationType } from "../../../utils/GetLocationType";
import { formatSelectedDays } from "../../../utils/FormatSelectedDays";

export default function TeacherCompClassesCard({

  colors,
  classs
}) {
  return (
    // whole card div
    <div
      className={`border rounded-2xl ${colors[2]} ${colors[1]} font-sans text-customGray pt-3 pb-1 pl-3 pr-4`}
    >
      {/* Upper Div  */}
      <div className="flex flex-row items-center mb-1 justify-between ">
        {/* Upper Left Div  */}
        <div className="flex flex-row items-center">
          <div className={`${colors[0]} p-3 rounded-full flex-shrink-0 `}>
            <img
              src={IMAGES.users_icon}
              alt="Users Icon"
              className="h-[13px] w-[15px] "
            />
          </div>
          <div className="ml-2 lg:ml-1">
            <p className="text-xs font-semibold ">{classs.title}</p>
            <p className="text-xxs font-normal text-customLightGray">{getLocationType(classs.location.name)}</p>
          </div>
        </div>

        {/* Upper Right Div  */}
        <div className="flex items-center justify-center flex-row lg:flex-col">
          <img
            src={classs.teacher_id.photo}
            alt="Teacher Image"
            className="h-[20px] w-[20px] rounded-full"
          />
          <p className="text-xxs font-normal text-customLightBlue ml-2  lg:ml-1">
            {classs.teacher_id.name}
          </p>
        </div>
      </div>

      {/* Lower Div  */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row mdLg:flex-col xl:flex-row">
          <p className="font-normal text-xxs mr-2">{formatSelectedDays(classs.weekDays)}</p>
          <p className="font-normal text-xxs">{classs.startTime} - {classs.endTime}</p>
        </div>
        <p className="font-medium text-xxs text-customGreen">{classs.review_id ? "Reviewed": ""}</p>
      </div>
    </div>
  );
}
