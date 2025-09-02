import React, { useState, useEffect } from "react";
import { IMAGES } from "../../../assets";
import Loader, { Loader2 } from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useOverLay } from "../../../contexts/OverlayContext";
import axios from "axios";
import { sendReminder } from "../../../api/Admin/monthlyPlan";
import { toast } from "react-toastify";

export default function StudentDetailsCard({ student, data, assignedClasses }) {
  
  const navigate = useNavigate();
  const [deletedPopup, setDeletedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSendReminder = async () => {
    setLoading(true);
    const resp = await sendReminder({ email: student?.email });
    console.log("mail resp is : ", resp);
    if(resp.success){
      toast.success("Email sent successfully!");
    }
    setLoading(false);
  };

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
      state: { student, assignedClasses },
    });
  };

  const handleReportClick = () => {
    navigate("/admin/wellness/history", {
      state: { student, assignedClasses },
    });
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    // Container Div
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor shadow-md">
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
      <p
        className={`flex-[5] text-sm ${
          data?.submitted == true ? "text-green-600" : "text-red-600"
        }`}
      >
        {data?.submitted == true ? "Submitted" : "Pending"}
      </p>

      {/* Report */}
      <div
        onClick={handleReportClick}
        className="flex text-customGreen flex-[2] items-center hover:underline cursor-pointer"
      >
        <p>View</p>
        <IoIosArrowForward className="ml-1" />
      </div>

      {loading && <Loader />}

      {!loading && (
        <div
          className="flex flex-[4] justify-center"
          onClick={handleSendReminder}
        >
          <p className=" bg-customMaroon text-white py-2 px-4 rounded-md text-sm hover:bg-customMaroon/90 cursor-pointer items-center flex justify-center">
            {/* {new Date(student?.createdAt).toLocaleDateString()} */}
            Send Reminder
          </p>
        </div>
      )}
    </div>
  );
}
