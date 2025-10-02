import React, { useState } from "react";
import { IMAGES } from "../../../assets";
import { FaCircleMinus } from "react-icons/fa6";
import Loader from "../../Loader/Loader";
import { RiCloseLine } from "react-icons/ri";


export default function ParentProfile({ parent , toggleFunc }) {
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
          <p className="mt-6 font-medium text-2xl">Parent Profile</p>
        </div>

        {/* Parent Photo */}
        <div className="flex justify-center mb-6">
          {imageLoading && <Loader />}
          <img
            src={parent?.photo || IMAGES.student_avatar}
            alt="Parent"
            className={`w-24 h-24 rounded-full ${imageLoading ? "hidden" : "block"}`}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Parent Details */}
        <div className="text-sm space-y-4">
          <div>
            <p className="text-customLightGray mb-1">Name</p>
            <p className="font-medium">{parent?.name}</p>
          </div>

          <div>
            <p className="text-customLightGray mb-1">Email</p>
            <p className="font-medium">{parent?.email}</p>
          </div>

          {/* <div>
            <p className="text-customLightGray mb-1">Phone</p>
            <p className="font-medium">{parent?.phoneNo || "N/A"}</p>
          </div> */}

          <div>
            <p className="text-customLightGray mb-1">Children</p>
            {parent?.registeredChildren?.length === 0 ? (
              <p className="font-medium">No children registered</p>
            ) : (
              parent.registeredChildren.map((child, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <img
                    src={child.photo || IMAGES.student_avatar}
                    alt={child.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <p className="font-normal text-sm">{child.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
