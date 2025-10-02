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

export default function StudentDetailsCard({
  student,
  checked = false,
  toggleCheckbox,
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
    navigate("/admin/students/view-student-timetable", {
      state: {student, assignedClasses},
    });
  };

  const handleReportClick = () => {
    navigate("/admin/students/view-student-profile", {
      state: {student, assignedClasses},
    });
  }

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
        onClick={() => toggleCheckbox(student?._id)}
      >
        {checked ? (
          <MdOutlineCheckBox size={20} />
        ) : (
          <MdOutlineCheckBoxOutlineBlank size={20} />
        )}
      </div>

      {/* name div  */}
      <div className="flex-[4] flex flex-row items-center">
        <div className="justify-center hidden md:flex md:justify-normal md:flex-none">
          {imageLoading && (
            <div className="mx-2 h-8 w-8 flex justify-center items-center">
              <Loader2 /> 
            </div>
          )}
          <img
            src={student?.photo || IMAGES.student_avatar}
            alt="Student Pic"
            className={`h-8 w-8 rounded-full ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={handleImageLoad}
          />
        </div>
        <p className="ml-2">{student?.name}</p>
      </div>
      {/* email  */}
      <p className="flex-[5] text-sm ">
        {isLargeScreen
          ? student?.email
          : student?.email.length > 15
          ? student?.email.slice(0, 12) + "..."
          : student?.email}
      </p>
      {/* phone No  */}
      {/* <p className="flex-[4]">{student?.phoneNo}</p> */}
      <p className="flex-[4]">{new Date(student?.createdAt).toLocaleDateString()}</p>

      {/* Report */}
      <div
          onClick={handleReportClick}
          className="flex text-customGreen flex-[2] items-center hover:underline cursor-pointer"
        >
          <p>Report</p>
          <IoIosArrowForward className="ml-1" />
        </div>


      {/* Timetable  and Edit Delete Icons Div*/}
      <div className="flex-[4] flex flex-row items-center justify-between">
        <div
          onClick={handleViewClick}
          className="flex text-customMaroon items-center hover:underline cursor-pointer"
        >
          <p>View</p>
          <IoIosArrowForward className="ml-1" />
        </div>

        {/* Delete Edit Icons  */}
        <div className="text-customDeleteEditColor mdLg:mr-3 flex flex-row">
          <button
            onClick={() => toggleDeletedPopup(student)}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <LuTrash2 size={18} />
          </button>
          <button
            onClick={() => toggleEditModal(student)}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <RxPencil1 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
