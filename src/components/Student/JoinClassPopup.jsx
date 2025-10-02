import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { IMAGES } from "../../assets";
import { BiLink } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";
import { Loader2 } from "../Loader/Loader";

export default function JoinClassPopup({ toggleFunc, classs }) {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  console.log("classs Location: ", classs.location )

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[360px] bg-customPopupBgColor p-4 pt-2 pb-8 rounded-3xl font-sans space-y-3 border border-gray-300">
          {/* Close Button  */}
          <div className="flex justify-between mb-4">
            <div className="flex-1"></div>
            <div className="flex-[3] flex justify-between mb-3">
              <p className="font-medium mt-2 text-2xl">Today's Class</p>
              <div
                onClick={toggleFunc}
                className="bg-white ml-2  border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
              >
                <RiCloseLine className="text-customGrayText" />
              </div>
            </div>
          </div>

          {/* Main div */}
          <div className="h-[220px] space-y-2 px-3 text-customGray font-medium">
            <p className="text-xl">{classs.title}</p>
            <div className="flex flex-row items-center text-sm space-x-2 ">
              {imageLoading && (
                <div className="mx-2 h-8 w-8 flex justify-center items-center">
                  <Loader2 />
                </div>
              )}
              <img
                src={classs.teacher_id.photo}
                alt="Teacher Avatar"
                className={`w-8 h-8 rounded-full ${
                  imageLoading ? "hidden" : "block"
                }`}
                onLoad={handleImageLoad}
              />
              <p className="font-medium">{classs.teacher_id.name}</p>
            </div>
            <div className="flex flex-col pt-3">
              <p className="text-lg">Class Type</p>
              <p className="text-customMaroon text-sm">({classs.location.name})</p>
            </div>
            {classs.location.name === "Student's Home" || classs.location.name === "Face to Face" ? (
              <div className="text-customYellow flex flex-row items-center gap-2">
                <BiLink size={22} />
                <p className="text-xs">{classs.location.name}</p>
              </div>
            ) : classs.location.name === "Off-site" ? (
              <div className="text-customYellow flex flex-row items-center gap-2">
                <BiLink size={22} />
                <p className="text-xs">{`Latitude: ${classs.location.coordinates.latitude}, Longitude: ${classs.location.coordinates.longitude}`}</p>
                {/* <p className="text-xs">{`Latitude: ${location.name}`}</p> */}
              </div>
            ) : classs.location.name === "Virtual" || classs.location.name === "Learning Pack" || classs.location.name === "Online Course" ? (
              <div className="text-customYellow flex flex-row items-center gap-2">
                <BiLink size={22} />
                <p className="text-xs">{classs.location.url}</p>
              </div>
            ) : null}
          </div>

          <div className=" flex justify-center ">
            <button
              className="flex flex-row items-center justify-center py-3 px-9 mt-2 bg-customMaroon w-8/12 text-white text-sm font-normal rounded-3xl space-x-2"
              onClick={toggleFunc}
            >
              Join Class
              <MdArrowForwardIos className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
