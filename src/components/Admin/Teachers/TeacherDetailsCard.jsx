import React, { useState, useEffect } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { RxPencil1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useOverLay } from "../../../contexts/OverlayContext";
import { IMAGES } from "../../../assets";
import { Loader2 } from "../../Loader/Loader";
import { useGetClasses } from "../../../contexts/GetClassesContext";

export default function TeacherDetailsCard({
  teacher,
  checked = false,
  toggleEditModal,
  toggleDeletedPopup,
  assignedClasses,
}) {
  const navigate = useNavigate();
  const [deletedPopup, setDeletedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    // Function to handle resizing
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 1024);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewClick = () => {
    navigate("/admin/teachers/view-teacher-timetable", {
      state: {teacher, assignedClasses}
    });
  };

  const handleTaskViewClick = () => {
    navigate("/admin/teachers/view-teacher-tasks", {
      state: {teacher, assignedClasses}
    });
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    // Container Div
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor shadow-md">
      {/* checkbox div  */}
      <div
        className={`flex-1 cursor-pointer ${
          checked ? "text-customMaroon" : "text-customLightGray"
        }`}
        onClick={() => toggleCheckbox(id)}
      >
        {checked ? (
          <MdOutlineCheckBox size={20} />
        ) : (
          <MdOutlineCheckBoxOutlineBlank size={20} />
        )}
      </div>

      {/* name div  */}
      <div className="flex-[5] flex flex-row items-center">
        <div className="justify-center hidden md:flex md:justify-normal md:flex-none">
          {imageLoading && (
            <div className="mx-2 h-8 w-8 flex justify-center items-center">
              <Loader2 />
            </div>
          )}
          <img
            src={teacher?.photo || IMAGES.student_avatar}
            alt="Teacher Pic"
            className={`h-8 w-8 rounded-full ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={handleImageLoad}
          />
        </div>
        <p className="ml-2">{teacher?.name}</p>
      </div>
     
      {/* Assigned Classes  */}
      <p className="flex-[4]">{assignedClasses.length}</p>

      {/* Wellness */}
      <p className="flex-[3] text-customGray">Pending</p>
      
      {/* Wellness */}
      <p className="flex-[3] text-customGray">Pending</p>

      {/* Tasks*/}
      <div className="flex-[2] flex flex-row items-center justify-between">
        <div
          onClick={handleViewClick}
          className="flex text-customMaroon items-center hover:underline cursor-pointer"
        >
          <p className="ml-1">View</p>
          <IoIosArrowForward className="ml-1" />
        </div>
      </div>

      {/* Timetable  and Edit Delete Icons Div*/}
      <div className="flex-[4] flex flex-row items-center justify-between">
        <div
          onClick={handleTaskViewClick}
          className="flex text-customMaroon items-center hover:underline cursor-pointer"
        >
          <p className="ml-1">View</p>
          <IoIosArrowForward className="ml-1" />
        </div>

        {/* Delete Edit Icons  */}
        <div className="text-customDeleteEditColor mdLg:mr-3 flex flex-row">
          <button
            onClick={() => toggleDeletedPopup(teacher)}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <LuTrash2 size={18} />
          </button>
          <button
            onClick={() => toggleEditModal(teacher)}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <RxPencil1 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
