import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import SelectTeacherCard from "./SelectTeacherCard";
import { IMAGES } from "../../../assets";
import { selectTeacherDetails } from "../../../constants/selectTeacherDetails";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import Loader from "../../Loader/Loader";

export default function SelectTeacherPopup({
  toggleFunc,
  setSelectedTeacher,
  selectedTeacher = "",
}) {
  const { teachers, refetch } = useGetUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher); // Set the selected teacher
  };

  const giveBgColor = (index) => {
    const mod = index % 6;
    if (mod == 0) return "bg-customCard1Color";
    else if (mod == 1) return "bg-customCard2Color";
    else if (mod == 2) return "bg-custmCard3Color";
    else if (mod == 3) return "bg-customCard4Color";
    else if (mod == 4) return "bg-customCard5Color";
    else if (mod == 5) return "bg-customCard6Color";
    else if (mod == 6) return "bg-customCard7Color";
    else return "bg-green-500";
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <div className="w-[400px] bg-customPopupBgColor p-4 pt-2 rounded-3xl font-sans space-y-3 border border-gray-300">
          {/* Close Button  */}
          <div className="flex justify-between">
            <div className="flex-1"></div>
            <div className="flex-[3] flex justify-between">
              <p className="font-medium ml-5 mt-3 text-xl">Select Teacher</p>
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
              <button className="px-2 py-3 flex rounded-l-lg bg-customLightGreyBg items-center justify-center">
                {/* <FiSearch className="text-gray-400" size={18} /> */}
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
              {filteredTeachers.length} Results
            </p>

            {loading && (
              <div className="flex h-56 items-center justify-center">
                <Loader/>
              </div>
            )}

            {!loading && (
              <div className="w-full h-[220px] overflow-y-auto register-scrollbar2 ">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher, index) => (
                    <SelectTeacherCard
                      key={index}
                      img={teacher.photo}
                      name={teacher.name}
                      email={teacher.email}
                      bgColor={giveBgColor(index)}
                      selected={
                        selectedTeacher && selectedTeacher.key === index
                      }
                      onClick={() =>
                        toggleSelectTeacher({ ...teacher, key: index })
                      }
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-[220px]">
                    <img
                      src={IMAGES.search_icon}
                      alt="Search Icon"
                      className="w-20 h-20"
                    />
                  </div>
                )}
              </div>
            )}
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
