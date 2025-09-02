import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { daysOfWeek } from "../../../constants/daysofWeek";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function SelectDaysPopup({ toggleFunc, setSelectedDays, setDays, setRepeat, repeat }) {
  const [selectedDays, setSelectedDaysState] = useState([]);

  const handleDaysClick = (index, day) => {

    setSelectedDaysState((prevSelectedDays) =>
      prevSelectedDays.includes(index)
        ? prevSelectedDays.filter((day) => day !== index)
        : [...prevSelectedDays, index]
    );

    setDays((p) => p.includes(day?.day) ? p.filter((item) => item !== day.day) : [...p, day.day]);

  };

  const formatSelectedDays = (days) => {
    if (days.length === 0) return "No days selected";

    const dayLabels = days.map((index) => daysOfWeek[index].label);
    const ranges = [];
    let start = dayLabels[0];
    let end = start;

    for (let i = 1; i < dayLabels.length; i++) {
      if (days[i] === days[i - 1] + 1) {
        end = dayLabels[i];
      } else {
        ranges.push(start === end ? start : `${start}-${end}`);
        start = dayLabels[i];
        end = start;
      }
    }
    ranges.push(start === end ? start : `${start}-${end}`);

    return ranges.join(", ");
  };

  const handleConfirm = () => {
    setSelectedDays(selectedDays);
    toggleFunc();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[500px] bg-customPopupBgColor p-4 pt-2 rounded-3xl font-sans space-y-3 border border-gray-300">
          {/* Close Button  */}
          <div className="flex justify-between mb-4">
            <div className="flex-1"></div>
            <div className="flex-[3] flex justify-between">
              <p className="font-medium ml-5 mt-2 text-xl">
                Select Days of Week
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
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDaysClick(index, day)}
                className={`p-2 bg-customLightGreyBg items-center rounded-lg cursor-pointer hover:bg-gray-200 relative ${
                  selectedDays.includes(index)
                    ? "border-[1.5px] border-customMaroon"
                    : ""
                }`}
              >
                {selectedDays.includes(index) && (
                  <IoIosCheckmarkCircle className="absolute -top-2 -left-3 text-customMaroon h-5 w-5" />
                )}
                <p className="text-center">{day.day}</p>
              </div>
            ))}
          </div>

          <hr className="border-gray-200 mx-2 pb-2" />

          {/* Changing div */}
          <div className="h-[120px] space-y-2 px-2">
            <div className="flex flex-row items-center justify-between text-customDarkBlue font-sans text-sm font-medium gap-1">
              <div className="w-6/12 px-4 py-3 text-SM text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer">
                <p>{formatSelectedDays(selectedDays)}</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-sm mr-2">Repeat every Month</p>
                <div
                  onClick={() => setRepeat(!repeat)}
                  className={`relative w-10 h-5 flex items-center mr-2 align-middle select-none cursor-pointer transition duration-200 ease-in rounded-full ${
                    repeat ? "bg-customMaroon" : "bg-gray-500"
                  }`}
                >
                  <span
                    className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                      repeat ? "translate-x-5" : "translate-x-1"
                    }`}
                  ></span>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex justify-center ">
            <button
              onClick={handleConfirm}
              className="py-3 px-9 mt-2 bg-customMaroon w-8/12 text-customPopupBgColor text-sm font-normal rounded-3xl"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}