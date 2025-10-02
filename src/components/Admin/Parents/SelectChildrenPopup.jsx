import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import SelectChildrenCard from "./SelectChildrenCard";
import { selectChildrenDetails } from "../../../constants/selectChildrenDetails";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import { IMAGES } from "../../../assets";

export default function SelectChildrenPopup({
  toggleFunc,
  setSelectedStudents,
  selectedStudents = [],
}) {
  const { students } = useGetUsers();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectStudent = (index) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[400px] bg-customPopupBgColor p-4 pt-2 rounded-3xl font-sans space-y-3 border border-gray-300">
          {/* Close Button  */}
          <div className="flex justify-between">
            <div className="flex-1"></div>
            <div className="flex-[3] flex justify-between">
              <p className="font-medium ml-5 mt-3 text-xl">Select Student</p>
              <div
                onClick={toggleFunc}
                className="bg-white ml-2  border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
              >
                <RiCloseLine className="text-customGrayText" />
              </div>
            </div>
          </div>

          {/* Select Student Heading  */}
          <div className="flex items-center justify-center"></div>

          {/* Search and Scroll Bar  */}
          <div className="px-3">
            {/* Search Bar  */}
            <div className="flex flex-1 lg:flex-[2] items-center border border-gray-300 rounded-lg mb-4">
              <button className="px-2 py-3 flex bg-customLightGreyBg rounded-l-lg items-center justify-center">
                <img
                  src={IMAGES.search_icon1}
                  alt="Search Icon"
                  className="w-[18px]  h-[16px]"
                />
              </button>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchQuery}
                className="text-sm rounded-r-lg bg-customLightGreyBg focus:outline-none active:outline-none h-10 w-full px-2 py-1"
              />
            </div>

            <p className="font-normal text-xs text-customLightGray mb-1">
              {filteredStudents.length} Results
            </p>

            <div className="w-full h-[220px] overflow-y-auto register-scrollbar2 ">
              {filteredStudents.map((student, index) => (
                <SelectChildrenCard
                  key={index}
                  img={student.photo}
                  name={student.name}
                  email={student.email}
                  bgColor={student.bgColor}
                  selected={selectedStudents.includes(student)}
                  onClick={() => toggleSelectStudent(student)}
                />
              ))}
            </div>
          </div>

          <div className=" flex justify-center">
            <button
              className="py-3 px-9 mt-2 bg-customMaroon w-8/12 text-customPopupBgColor text-sm font-normal rounded-3xl"
              onClick={toggleFunc}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
