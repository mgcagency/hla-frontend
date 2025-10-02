import React, { useEffect, useState } from "react";
import { IMAGES } from "../../../assets";
import ScheduledClassesCard from "../../Dashboard/ScheduledClassesCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuTrash2 } from "react-icons/lu";
import { deleteClass } from "../../../api/Admin/deleteClass";
import { useGetClasses } from "../../../contexts/GetClassesContext";
import Loader from "../../Loader/Loader";

export default function DeletePopup({ toggleFunc, classs }) {
  const [loader, setLoader] = useState(false);
  const [bgColor, setBgColor] = useState("");

  const { fetchClasses } = useGetClasses();

  const handleCancelClick = () => {
    toggleFunc();
  };

  useEffect(() => {
    const bgColors = [
      "bg-customCard1Color",
      "bg-customCard2Color",
      "bg-customCard3Color",
      "bg-customCard4Color",
      "bg-customCard5Color",
      "bg-customCard6Color",
      "bg-customCard7Color",
    ];
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    setBgColor(randomColor);
  }, []);

  const handleDeleteClick = async () => {
    setLoader(true);
    console.log("Delete function called: ", classs?._id);
    try {
      await deleteClass(classs?._id);
      toast.success("CLass Deleted Successfully");
      await fetchClasses();
      setTimeout(() => toggleFunc(), 200);
      setLoader(false)
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", error);
      setLoader(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <ToastContainer position="bottom-right" />
        <div className="w-[370px] bg-customPopupBgColor p-4 rounded-3xl font-sans space-y-3 border border-gray-300">
          <div className="flex-1 flex flex-row items-center">
            <LuTrash2 className="text-customLightRed" size={25} />
            <p className="text-customGray font-bold text-lg ml-2">Delete</p>
          </div>

          <div className="flex-[2] font-normal text-base text-customPopupTextColor mb-4">
            Are you sure you want to delete this class ?
          </div>

          <div className="mb-2">
            <ScheduledClassesCard
              title={classs?.title}
              location={classs?.location.name}
              teacherName={classs?.teacher_id.name}
              teacherImg={classs?.teacher_id.photo}
              studentName={classs?.student_id.name}
              studentImg={classs?.student_id.photo}
              startTime={classs?.startTime}
              endTime={classs?.startTime}
              days={classs?.weekDays}
              bgColor={bgColor}
            />
          </div>

          <div className="flex gap-2">
            <button
              className="p-2 px-9 w-full bg-customLightGreyBg text-customGray text-sm font-normal rounded-3xl"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            {loader ? (
              <Loader />
            ) : (
              <button
                className="p-2 px-9 w-full bg-customLightRed text-customPopupBgColor text-sm font-normal rounded-3xl"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
