import React, { useState } from "react";
import { IMAGES } from "../../../assets";
import { RiCloseLine } from "react-icons/ri";
import Loader from "../../Loader/Loader";

export default function StudentProfile({ student, toggleFunc }) {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="h-screen overflow-y-auto register-scrollbar3 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans">
      {/* Close button */}
      <div className="flex justify-start p-4">
        <div
          onClick={toggleFunc}
          className="bg-white border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
        >
          <RiCloseLine className="text-customGrayText" />
        </div>
      </div>

      <div className="w-[400px] items-center p-8">
        {/* Heading */}
        <div className="flex justify-center mb-6">
          <p className="mt-6 font-medium text-2xl">Student Profile</p>
        </div>

        {/* Student Photo */}
        <div className="flex justify-center mb-6">
          {imageLoading && <Loader />}
          <img
            src={student?.photo || IMAGES.student_avatar}
            alt="Student"
            className={`w-24 h-24 rounded-full ${imageLoading ? "hidden" : "block"}`}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Student Details */}
        <div className="text-sm space-y-4">
          <div>
            <p className="text-customLightGray mb-1">Name</p>
            <p className="font-medium">{student?.name}</p>
          </div>

          <div>
            <p className="text-customLightGray mb-1">Email</p>
            <p className="font-medium">{student?.email}</p>
          </div>

          {/* <div>
            <p className="text-customLightGray mb-1">Phone</p>
            <p className="font-medium">{student?.phoneNo || "N/A"}</p>
          </div> */}

          {/* If you want, you can add a "Guardian" or "Parent" section here */}
          {/* <div>
            <p className="text-customLightGray mb-1">Parent</p>
            <p className="font-medium">{student?.parentName || "N/A"}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
