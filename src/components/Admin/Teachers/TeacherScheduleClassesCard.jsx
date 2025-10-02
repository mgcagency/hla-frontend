import React from "react";
import ProfileCard from "../../Dashboard/ProfileCard";
import EditDeleteDropDown from "../../Dashboard/EditDeleteDropDown";
import { IMAGES } from "../../../assets";
import { daysOfWeek } from "../../../constants/daysofWeek";
import { formatSelectedDays } from "../../../utils/FormatSelectedDays";
import { getLocationType } from "../../../utils/GetLocationType";

export default function TeacherScheduleClassesCard({
  classs,
  title,
  location,
  teacherName,
  teacherImg,
  studentName,
  studentImg,
  startTime,
  endTime,
  days,
  bgColor,
  dotsMenu,
  time,
  status,
  onClick,
  onDelete,
}) {
  
// console.log("classs cjeck", review)
  return (
    <div
      onClick={onClick}
      className={`flex-1 rounded-lg ${bgColor} p-3 pl-4 cursor-pointer`}
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium font-inter">{title}</p>
        {dotsMenu && <EditDeleteDropDown onDelete={onDelete} />}
      </div>

      <div>
        <p className="text-customRoleColor font-inter text-xs mb-2">
          {getLocationType(location)}
        </p>
      </div>

      <div className="flex flex-row md:flex-col lg:flex-row gap-6 md:gap-2 mb-4">
        <ProfileCard role={"Student"} name={studentName} img={studentImg} />
        <ProfileCard role={"Teacher"} name={teacherName} img={teacherImg} />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="text-customRoleColor text-sm md:text-xs">
          <p>{formatSelectedDays(days)} </p>
          <p>
            {" "}
            {startTime} - {endTime}{" "}
          </p>
        </div>

        <p className="text-customGreen text-xs md:text-xxs lg:text-xs mr-2">
          {classs?.review_id ? "Reviewed" : ""}
        </p>
      </div>
    </div>
  );
}
