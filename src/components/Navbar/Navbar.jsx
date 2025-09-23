import React, { useState, useEffect } from "react";
import { TbBell } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import NotificationPopup from "../global/NotificationPopup";
import { IMAGES } from "../../assets";
import { useGetUsers } from "../../contexts/GetUsersContext";

export default function Navbar({ heading, img, name, role }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { students, teachers, refetch } = useGetUsers();

  useEffect(() => {
    refetch();
  }, []);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentViewClick = (student, assignedClasses = []) => {
    navigate("/admin/students/view-student-timetable", {
      state: { student, assignedClasses },
    });
  };

  const handleTeacherViewClick = (teacher, assignedClasses = []) => {
    navigate("/admin/teachers/view-teacher-timetable", {
      state: { teacher, assignedClasses },
    });
  };

  return (
    <div className="flex flex-row w-auto h-[80px] bg-white rounded-tl-3xl pl-10 md:pl-16 items-center relative">
      {isPopupVisible && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}

      {/* Heading */}
      <div className="flex-1 md:flex-1 lg:flex-[4] pl-10 md:pl-0 flex justify-start ">
        <p className="font-medium font-inter text-2xl">{heading}</p>
      </div>

      {/* SearchBar */}
      <div className="flex flex-1 lg:flex-[2] items-center border border-gray-300 rounded relative">
        <button className="bg-white px-2 py-3 flex rounded-l-lg items-center justify-center">
          <img
            src={IMAGES.search_icon1}
            alt="Search Icon"
            className="w-[18px] h-[16px]"
          />
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search students or teachers..."
          className="text-sm focus:outline-none h-10 w-full px-2 py-1"
        />

        {/* Dropdown Results */}
        {showDropdown && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-md max-h-64 overflow-y-auto z-50 p-2">
            {/* Students */}
            {filteredStudents.length > 0 && (
              <>
                <p className="text-xs font-semibold text-gray-500 px-2 py-1">
                  Students
                </p>
                {filteredStudents.map((student) => (
                  <div
                    key={student._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between rounded"
                  >
                    <div className="flex items-center">
                      <img
                        src={student.photo || IMAGES.avatar}
                        alt="student avatar"
                        className="h-8 w-8 rounded-full mr-3"
                      />
                      <span className="text-sm text-gray-800">
                        {student.name}
                      </span>
                    </div>

                    {/* View link */}
                    <div
                      onClick={() => handleStudentViewClick(student, student.assignedClasses)}
                      className="flex text-customMaroon items-center hover:underline cursor-pointer"
                    >
                      <p className="ml-1 text-sm">View</p>
                      <IoIosArrowForward className="ml-1" />
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Teachers */}
            {filteredTeachers.length > 0 && (
              <>
                <p className="text-xs font-semibold text-gray-500 px-2 py-1 mt-2">
                  Teachers
                </p>
                {filteredTeachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between rounded"
                  >
                    <div className="flex items-center">
                      <img
                        src={teacher.photo || IMAGES.avatar}
                        alt="teacher avatar"
                        className="h-8 w-8 rounded-full mr-3"
                      />
                      <span className="text-sm text-gray-800">
                        {teacher.name}
                      </span>
                    </div>

                    {/* View link */}
                    <div
                      onClick={() => handleTeacherViewClick(teacher, teacher.assignedClasses)}
                      className="flex text-customMaroon items-center hover:underline cursor-pointer"
                    >
                      <p className="ml-1 text-sm">View</p>
                      <IoIosArrowForward className="ml-1" />
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Empty State */}
            {filteredStudents.length === 0 && filteredTeachers.length === 0 && (
              <p className="p-2 text-gray-500 text-sm">No results found</p>
            )}
          </div>
        )}
      </div>

      {/* Notification + Profile */}
      <div className="flex-1 md:flex-1 lg:flex-[2] flex items-center ">
        {/* <div
          className="flex-1 ml-5 cursor-pointer pr-3"
          onClick={togglePopup}
        >
          {isPopupVisible && <NotificationPopup toggleFunc={togglePopup} />}
          <TbBell size={22} />
          <GoDotFill
            className="text-customLightRed absolute top-7 ml-[10px]"
            size={13}
          />
        </div> */}

        {/* Profile */}
        <div className="flex-[6] flex justify-start items-center border-l border-l-gray-200">
          <div className="pl-3">
            <img
              src={img || IMAGES.avatar}
              alt="Profile Pic"
              className="h-[40px] w-[40px] rounded-full"
            />
          </div>
          <div className="ml-4 hidden md:block">
            <p className="font-bold text-customDarkBlue text-sm font-inter">
              {name}
            </p>
            <p className="text-customRoleColor text-xs font-inter">
              {role || "Admin"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
