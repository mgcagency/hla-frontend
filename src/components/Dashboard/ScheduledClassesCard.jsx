import React, { useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import ProfileCard from "./ProfileCard";
import { BsClock } from "react-icons/bs";
import { IMAGES } from "../../assets";
import EditDeleteDropDown from "./EditDeleteDropDown";
import { daysOfWeek } from "../../constants/daysofWeek";
import { formatSelectedDays } from "../../utils/FormatSelectedDays";
import { getLocationType } from "../../utils/GetLocationType";
import { useNavigate } from "react-router-dom";

export default function ScheduledClassesCard({
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
  toggleEditModal,
  toggleDeletePopup,
  dotsMenu,
  onDelete,
  assignedClasses = [],
  student = null,
  teacher = null,
}) {
   const navigate = useNavigate();

 const safeAssignedClasses = Array.isArray(assignedClasses) ? assignedClasses : [];

  const handleStudentViewClick = () => {
    navigate("/admin/students/view-student-timetable", {
      state: { student, assignedClasses: safeAssignedClasses },
    });
  };

  const handleTeacherViewClick = () => {
    navigate("/admin/teachers/view-teacher-timetable", {
      state: { teacher, assignedClasses: safeAssignedClasses },
    });
  };

  return (
    <div className={`flex-1 rounded-lg ${bgColor} p-3 pl-4`}>
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium font-inter">{title}</p>
        {dotsMenu && (
          <EditDeleteDropDown
            onDelete={onDelete}
            toggleEditModal={toggleEditModal}
            classs={classs}
            toggleDeletePopup={toggleDeletePopup}
          />
        )}
      </div>

      <div>
        <p className="text-customRoleColor font-inter text-xs mb-2">
          {getLocationType(location)}
        </p>
      </div>
{/* 
      <div className="flex flex-row md:flex-col lg:flex-row gap-6 md:gap-2 mb-4">
        <ProfileCard role={"Student"} name={studentName} img={studentImg} />
        <ProfileCard role={"Teacher"} name={teacherName} img={teacherImg} />
      </div> */}
      <div className="flex flex-row md:flex-col lg:flex-row gap-6 md:gap-2 mb-4">
        <div onClick={handleStudentViewClick} className="cursor-pointer">
          <ProfileCard role={"Student"} name={studentName} img={studentImg} />
        </div>
        <div onClick={handleTeacherViewClick} className="cursor-pointer">
          <ProfileCard role={"Teacher"} name={teacherName} img={teacherImg} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div>
          <p className="text-customRoleColor text-sm md:text-xs">
            {/* {formatSelectedDays(days)} */}
          </p>
        </div>

        <div className="flex flex-row items-center pr-2">
          <BsClock color="gray" />
          <p className="text-customRoleColor text-xs md:text-xxs lg:text-xs ml-2">
            {startTime} - {endTime}
          </p>
        </div>
      </div>
    </div>
  );
}
