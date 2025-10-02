import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function StudentHeader({ selectedPage, handlePageToggle, student }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/admin/students");
  };


  useEffect(() => {
    if (selectedPage === "Profile") {
      navigate(`/admin/students/view-student-profile`, {
        state: student
      });
    } else {
      navigate(`/admin/students/view-student-timetable`, {
        state: student
      });
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
        <div className=" bg-customTogglePageBgColor w-64 ml-5 border rounded-full text-customDarkBlue text-sm">
          <button
            onClick={() => handlePageToggle("Timetable")}
            className={`py-2 px-4 w-1/2 rounded-full 
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
            className={`py-2 px-4 w-1/2 rounded-full 
              ${selectedPage === "Profile" ? "bg-customMaroon text-white" : ""}
          `}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
