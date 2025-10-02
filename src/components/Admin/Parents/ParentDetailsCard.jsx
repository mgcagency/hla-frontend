import React, { useState, useEffect } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { IMAGES } from "../../../assets";
import { LuTrash2 } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { RxPencil1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useOverLay } from "../../../contexts/OverlayContext";
import ChildrenDropDown from "./ChildrenDropDown";
import { Loader2 } from "../../Loader/Loader";

export default function ParentDetailsCard({
  parent,
  checked,
  toggleCheckbox,
  toggleEditModal,
  toggleDeletedPopup,
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
    console.log("Parent", parent);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewClick = () => {
    navigate("/admin/teachers/view-teacher-timetable", {
      state: { teacherId: id },
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
        onClick={() => toggleCheckbox(parent?._id )}
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
            src={parent?.photo || IMAGES.student_avatar}
            alt="Parent Pic"
            className={`h-[30px] w-[30px] rounded-full ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={handleImageLoad}
          />
        </div>
        <p className="ml-2">{parent?.name}</p>
      </div>
      {/* email  */}
      <p className="flex-[6] ">
        {isLargeScreen
          ? parent?.email
          : parent?.email.length > 20
          ? parent?.email.slice(0, 17) + "..."
          : parent?.email}
      </p>
      {/* Phone No */}
      <p className="flex-[4]">{new Date(parent?.createdAt).toLocaleDateString()}</p>

      {/* Registered Children   and Edit Delete Icons Div*/}
      <div className="flex-[6] flex flex-row items-center justify-between">
        <ChildrenDropDown children={parent?.registeredChildren} />

        {/* Delete Edit Icons  */}
        <div className="text-customDeleteEditColor mdLg:mr-3 flex flex-row">
          <button
            onClick={() => toggleDeletedPopup(parent)}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <LuTrash2 size={18} />
          </button>
          <button
            onClick={() => toggleEditModal(parent)}
            className="p-2 rounded-md mdLg:mr-2"
          >
            <RxPencil1 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
