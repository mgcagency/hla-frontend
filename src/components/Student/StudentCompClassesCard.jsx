import React, { useState } from "react";

import { IMAGES } from "../../assets";
import { getLocationType } from "../../utils/GetLocationType";
import { formatSelectedDays } from "../../utils/FormatSelectedDays";
import { Loader2 } from "../Loader/Loader";

export default function StudentCompClassesCard({ colors, classs }) {
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoad = () => {
    setImageLoading(false);
  };
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
            <p className="text-xxs font-normal text-customLightGray">
              {getLocationType(classs.location.name)}
            </p>
          </div>
        </div>

        {/* Upper Right Div  */}
        <div className="flex items-center justify-center flex-row lg:flex-col xl:flex-row xl:mb-4">
          {imageLoading && (
            <div className="mx-2 h-8 w-8 flex justify-center items-center">
              <Loader2 />
            </div>
          )}
          <img
            src={classs.teacher_id.photo}
            alt="Teacher Image"
            className={`h-5 w-5 rounded-full ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={handleImageLoad}
          />
          <p className="text-xxs font-normal text-customLightBlue ml-2 lg:ml-1">
            {classs.teacher_id.name}
          </p>
        </div>
      </div>

      {/* Lower Div  */}
      <div>
        <div className="flex flex-row mdLg:flex-col xl:flex-row">
          <p className="font-normal text-xxs mr-2">
            {formatSelectedDays(classs.weekDays)}
          </p>
          <p className="font-normal text-xxs">
            {classs.startTime} - {classs.endTime}
          </p>
        </div>
      </div>
    </div>
  );
}
