import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IMAGES } from "../../assets";
import { MdArrowForwardIos } from "react-icons/md";
import { formatSelectedDays } from "../../utils/FormatSelectedDays";
import { Loader2 } from "../Loader/Loader";

export default function StudentTimetableCard({
  classs,
  bgColor,
  status,
  statusColor,
  onclick,
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  return (
    <div
      className={`${bgColor} rounded-xl p-3 pr-5 cursor-pointer`}
      onClick={() => {
        onclick(classs._id, classs.status, classs);
      }}
    >
      {/* Upper Div  */}
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row items-center">
          <p className="text-customDarkerBlue font-medium text-sm">
            {classs.title}
          </p>
          <p className="text-customLightGray font-normal text-xs ml-2">
            ({classs.location.name})
          </p>
        </div>

        <div className="flex flex-row items-center">
          {imageLoading && (
            <div className="mx-2 h-8 w-8 flex justify-center items-center">
              <Loader2 />
            </div>
          )}
          <img
            src={classs.teacher_id.photo}
            alt="Teacher image"
            className={`w-5 h-5 rounded-full ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={handleImageLoad}
          />
          <p className="text-customLightBlue text-xs ml-2">
            {classs.teacher_id.name}
          </p>
        </div>
      </div>

      {/* Lower Div */}
      <div className="flex flex-row justify-between ">
        <p className="text-customLightBlue text-xs font-normal">
          {formatSelectedDays(classs.weekDays)}
        </p>
        <div className="text-customGray flex flex-row items-center space-x-1">
          <div className={`${statusColor} font-medium text-xs ml-1`}>
            {status === "Upcoming"
              ? `${classs.startTime} - ${classs.endTime}`
              : ``}
            {status === "On Going" ? (
              <div className="text-customDarkBlue flex flex-row items-center justify-center gap-2">
                Join Class <MdArrowForwardIos />
              </div>
            ) : null}
            {status === "Completed" ? "Completed" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
