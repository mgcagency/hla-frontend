import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IMAGES } from "../../../assets";
import { Loader2 } from "../../Loader/Loader";

export default function TimetableCard({
  title,
  bgColor,
  classType,
  days,
  startTime,
  endTime,
  status,
  statusColor,
  teacherName,
  teacherImg,
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className={`${bgColor} rounded-xl p-3 pr-5`}>
      {/* Upper Div  */}
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row items-center">
          <p className="text-customDarkerBlue font-medium text-sm">{title}</p>
          <p className="text-customLightGray font-normal text-xs ml-2">
            ({classType})
          </p>
        </div>

        <div className="flex flex-row items-center">
          {imageLoading && (
            <div className="mx-2 h-8 w-8 flex justify-center items-center">
              <Loader2 />
            </div>
          )}
          <img
            src={teacherImg}
            alt="Teacher image"
            className= {`w-5 h-5 rounded-full ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={handleImageLoad}
          />
          <p className="text-customLightBlue text-xs ml-2">{teacherName}</p>
        </div>
      </div>

      {/* Lower Div */}
      <div className="flex flex-row justify-between ">
        <p className="text-customLightBlue text-xs font-normal">{days}</p>
        <div className="text-customGreen flex flex-row items-center">
          {status === "On Going" ? <GoDotFill /> : null}
          <p className={`${statusColor} font-medium text-xs ml-1`}>
            {status === "Upcoming" ? `${startTime} - ${endTime}` : `${status}`}
          </p>
        </div>
      </div>
    </div>
  );
}
