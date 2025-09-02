import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function TeacherHeader({ selectedPage, handlePageToggle, teacher }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/admin/teachers");
  };

  useEffect(() => {
    if (selectedPage === "Profile") {
      navigate(`/admin/teachers/view-teacher-profile` , { state: teacher });
    } else if (selectedPage === "Tasks") {
      navigate(`/admin/teachers/view-teacher-tasks`, { state: teacher });
    }else {
      navigate(`/admin/teachers/view-teacher-timetable`, { state: teacher });
    }
  }, [selectedPage]);

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

      {/* Page Toggler   */}
      <div className="flex-[2]">
        <div className=" bg-customTogglePageBgColor w-[350px]  border rounded-full text-customDarkBlue text-sm">
          <button
            onClick={() => handlePageToggle("Timetable")}
            className={`py-2 px-4 w-1/3 rounded-full 
                ${
                  selectedPage === "Timetable"
                    ? "bg-customMaroon text-white"
                    : ""
                }
            `}
          >
            Timetable
          </button>
          <button
            onClick={() => handlePageToggle("Profile")}
            className={`py-2 px-4 w-1/3 rounded-full 
              ${selectedPage === "Profile" ? "bg-customMaroon text-white" : ""}
          `}
          >
            Profile
          </button>
          <button
            onClick={() => handlePageToggle("Tasks")}
            className={`py-2 px-4 w-1/3 rounded-full 
              ${selectedPage === "Tasks" ? "bg-customMaroon text-white" : ""}
          `}
          >
            Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
