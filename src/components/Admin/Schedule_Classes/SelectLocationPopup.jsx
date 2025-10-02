import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { IMAGES } from "../../../assets";
import { lessonLocations } from "../../../constants/lessonLocations";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { renderLocationDetails } from "./RenderLocationDetails";

export default function SelectLocationPopup({
  toggleFunc,
  setSelectedLocation,
}) {
  const [localSelectedLocation, setLocalSelectedLocation] = useState(null);
  const [url, setUrl] = useState("https://meet.google.com/zqx-jgyc-ukn");
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [offsiteAddress, setOffsiteAddress] = useState("");

  const handleLocationClick = (location) => {
    setLocalSelectedLocation(location);
  };

  const handleConfirm = () => {
    setSelectedLocation({...localSelectedLocation, url, offsiteAddress});
    toggleFunc();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[500px] bg-customPopupBgColor p-4 pt-2 rounded-3xl font-sans space-y-3 border border-gray-300">
          {/* Close Button  */}
          <div className="flex justify-between mb-4">
            <div className="flex-1"></div>
            <div className="flex-[4] flex justify-between">
              <p className="font-medium ml-2 mt-2 text-xl">
                Select Location of Lesson
              </p>
              <div
                onClick={toggleFunc}
                className="bg-white ml-2  border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
              >
                <RiCloseLine className="text-customGrayText" />
              </div>
            </div>
          </div>

          <div className="font-normal text-sm grid grid-cols-3 gap-4 mb-4 px-2">
            {lessonLocations.map((location, index) => (
              <div
                key={index}
                onClick={() => handleLocationClick(location)}
                className={`p-2 bg-customLightGreyBg items-center rounded-lg cursor-pointer hover:bg-gray-200 relative ${
                  localSelectedLocation === location
                    ? "border-[1.5px] border-customMaroon"
                    : ""
                }`}
              >
                {localSelectedLocation === location && (
                  <IoIosCheckmarkCircle className="absolute -top-2 -left-3 text-customMaroon h-5 w-5" />
                )}
                <p className="text-center">{location.name}</p>
              </div>
            ))}
          </div>

          <hr className="border-gray-200 mx-2 pb-2" />

          {/* Changing div */}
          <div className="h-[150px] space-y-2 px-2">
            {renderLocationDetails({ selectedLocation: localSelectedLocation, url, setUrl, coords, setCoords, setOffsiteAddress, offsiteAddress })}
          </div>

          <div className=" flex justify-center ">
            <button
              className={`py-3 px-9 mt-2 w-8/12 text-sm font-normal rounded-3xl ${
                localSelectedLocation === null
                  ? "bg-customLightGray text-white cursor-not-allowed"
                  : "bg-customMaroon text-customPopupBgColor"
              }`}
              onClick={handleConfirm}
              disabled={localSelectedLocation === null}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
