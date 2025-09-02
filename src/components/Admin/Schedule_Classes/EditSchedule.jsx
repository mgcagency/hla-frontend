import React, { useState } from "react";
import { IMAGES } from "../../../assets";
import { RiCloseLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import SelectStudentPopup from "./SelectStudentPopup";
import SelectTeacherPopup from "./SelectTeacherPopup";
import SelectLocationPopup from "./SelectLocationPopup";
import SelectTimePopup from "./SelectTimePopup";
import SelectDaysPopup from "./SelectDaysPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { daysOfWeek } from "../../../constants/daysofWeek";
import Loader from "../../Loader/Loader";
import {editClass} from "../../../api/Admin/editClass";
import { useGetClasses } from "../../../contexts/GetClassesContext";

export default function EditSchedule({
  classs,
  toggleFunc,
  toggleClassEditedPopup,
  classEditedPopup,
  selectStPopup,
  toggleSelectStPopup,
  selectTPopup,
  toggleSelectTPopup,
  selectLocationPopup,
  toggleSelectLocationPopup,
  selectTimePopup,
  toggleSelectTimePopup,
  selectDaysPopup,
  toggleSelectDaysPopup,
}) {
  const [title, setTitle] = useState(classs?.title);
  const [selectedStudents, setSelectedStudents] = useState(classs.student_id);
  const [selectedTeacher, setSelectedTeacher] = useState(classs.teacher_id);
  const [selectedLocation, setSelectedLocation] = useState(classs.location);
  const [selectedTime, setSelectedTime] = useState(`${classs.startTime} - ${classs.endTime}`);
  const [startTime, setStartTime] = useState(classs.startTime);
  const [endTime, setEndTime] = useState(classs.endTime);
  const [days, setDays] = useState(classs.weekDays);
  const [selectedDays, setSelectedDays] = useState([]);
  const [repeat, setRepeat] = useState(classs.repeat);

  const [loading, setLoading] = useState(false);

  const {classes, fetchClasses} = useGetClasses();  

const handleUpdateClick = async () => {
  setLoading(true);
  const updatedClass = {
    title,
    student_id: selectedStudents._id,
    teacher_id: selectedTeacher._id,
    location: {
      name: selectedLocation.name,
      offsiteAddress: selectedLocation.offsiteAddress,
      url: selectedLocation.url,
    },
    startTime: startTime,
    endTime: endTime,
    weekDays: days,
    repeat: repeat,
    status: "Upcoming",
  };
  try {
    const response = await editClass(updatedClass, classs._id);
    console.log("update class ", response.data);
    await fetchClasses();
    setLoading(false);
    toast.success("Class updated successfully");
    toggleClassEditedPopup();
  } catch (error) {
    console.log("err is : ", error);
    setLoading(false);
    toast.error("Failed to update class");
  }
  setLoading(false)
};

  console.log("Edit Student: class", classs);

  const formatSelectedDays = (days) => {
    const daysIds = days?.map((day) => {
      const dayObj = daysOfWeek.find((d) => d.day === day);
      return dayObj ? dayObj.id : null;
    }).filter(id => id !== null);
    daysIds?.sort();
    
    const dayLabels = daysIds.map((dayNum) => daysOfWeek[dayNum-1].label);
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

  const locationType = (location) => {
    if (
      location.name === "Student's Home" ||
      location.name === "Face to Face"
    ) {
      return location.inputArea;
    } else if (location.name === "Off-site") {
      return `Latitude: ${location.offsiteAddress}`;
    } else {
      return location.url;
    }
  };

  const handleTimeSelect = (startTime, endTime) => {
    setStartTime(startTime);
    setEndTime(endTime);
    setSelectedTime(`${startTime} - ${endTime}`);
  };

  return (
    <div className="h-screen overflow-y-auto register-scrollbar3 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {classEditedPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {selectStPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {selectTPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {selectLocationPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {selectTimePopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {selectDaysPopup && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      <ToastContainer position="bottom-right" />

      <div className=" w-[400px]  items-center">
        {/* close button  */}
        <div className="flex justify-start flex-1">
          <div
            onClick={toggleFunc}
            className="bg-white  mt-3 ml-4 border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
          >
            <RiCloseLine className="text-customGrayText" />
          </div>
        </div>
        {/* Heading  */}
        <div className="flex flex-1 justify-center mb-2">
          <p className=" mt-6 font-medium text-2xl">Update Class</p>
        </div>

        {/* Form  */}
        <div className="flex-[5] p-8 text-xs ">
          {/* <form action=""> */}
          {/* Title Field  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1 ">Class Title</p>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Class Title"
              maxLength={35}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Select Student Field  */}
          <div className="mb-5">
            {!selectedStudents ? (
              <>
                <p className="text-customLightGray mb-1 ">Student</p>
                <div
                  onClick={toggleSelectStPopup}
                  className="w-full px-4 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Select Student</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Student</p>
                </div>

                <div
                  onClick={toggleSelectStPopup}
                  className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
                >
                  <div className="relative inline-block ">
                    <img
                      src={selectedStudents?.photo}
                      alt="student avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <p className="font-normal text-sm">{selectedStudents.name}</p>
                </div>
              </>
            )}
          </div>

          {/* Select Teacher Field  */}
          <div className="mb-5">
            {!selectedTeacher ? (
              <>
                <p className="text-customLightGray mb-1 ">Teacher</p>
                <div
                  onClick={toggleSelectTPopup}
                  className="w-full px-4 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Assign Teacher</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Teacher</p>
                </div>
                <div
                  onClick={toggleSelectTPopup}
                  className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
                >
                  <div className="relative inline-block">
                    <img
                      src={selectedTeacher.photo}
                      alt="teacher avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <p className="font-normal text-sm">{selectedTeacher.name}</p>
                </div>
              </>
            )}
          </div>

          {/* Location of Lesson  */}
          <div className="mb-5">
            <p className="text-customLightGray mb-1">Location of Lesson</p>
            <div
              onClick={toggleSelectLocationPopup}
              className="w-full px-4 py-2 flex justify-between items-center text-sm text-customGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              {selectedLocation !== null ? (
                <>
                  <p>{selectedLocation.name}</p>
                  <img
                    src={IMAGES.edit_icon2}
                    alt="edit icon"
                    className="h-4 w-4"
                  />
                </>
              ) : (
                <>
                  <p>Select</p>
                  <IoIosArrowDown className=" text-customGray" />
                </>
              )}
            </div>
            {selectedLocation !== null && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-customYellow text-xs">
                  {selectedLocation.icon}
                  <p>{locationType(selectedLocation)}</p>
                </div>
              </div>
            )}
          </div>

          {/*Time Duration*/}
          <div className="mb-5">
            <p className="text-customLightGray mb-1">Time Duration</p>
            <div
              onClick={toggleSelectTimePopup}
              className="w-full px-4 py-2 flex justify-between items-center text-sm text-customDarkBlue bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <p>{selectedTime !== "" ? selectedTime : "Select Time"}</p>
            </div>
          </div>

          {/*Days of Week*/}
          <div className="mb-5">
            <p className="text-customLightGray mb-1">Days of Week</p>
            <div
              onClick={toggleSelectDaysPopup}
              className="w-full px-4 py-2 flex justify-between items-center text-sm text-customDarkBlue bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <p>{formatSelectedDays(days)}</p>
            </div>
          </div>
          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10">
            {loading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleUpdateClick}
                className="bg-customMaroon w-7/10 rounded-3xl py-3"
              >
                <p className=" text-white font-medium text-base">Update</p>
              </button>
            )}
          </div>
        </div>
      </div>
      {selectStPopup && (
        <SelectStudentPopup
          toggleFunc={toggleSelectStPopup}
          setSelectedStudents={setSelectedStudents}
          selectedStudents={selectedStudents}
        />
      )}
      {selectTPopup && (
        <SelectTeacherPopup
          toggleFunc={toggleSelectTPopup}
          setSelectedTeacher={setSelectedTeacher}
          selectedTeacher={selectedTeacher}
        />
      )}
      {selectLocationPopup && (
        <SelectLocationPopup
          toggleFunc={toggleSelectLocationPopup}
          setSelectedLocation={setSelectedLocation}
        />
      )}
      {selectTimePopup && (
        <SelectTimePopup
          toggleFunc={toggleSelectTimePopup}
          onTimeSelect={handleTimeSelect}
        />
      )}
      {selectDaysPopup && (
        <SelectDaysPopup
          toggleFunc={toggleSelectDaysPopup}
          setSelectedDays={setSelectedDays}
          setRepeat={setRepeat}
          repeat={repeat}
          setDays={setDays}
        />
      )}
    </div>
  );
}
