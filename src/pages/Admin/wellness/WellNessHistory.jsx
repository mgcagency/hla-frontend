import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import StudentDetailsCard from "../../../components/Admin/wellness/history/StudentDetailsCard";

import { IMAGES } from "../../../assets";
import { MdOutlineFilterList } from "react-icons/md";
import { useUser } from "../../../contexts/UserContext";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import { useGetClasses } from "../../../contexts/GetClassesContext";


const WellNessHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [studentModal, setStudentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { students, refetch } = useGetUsers();
  const { fetchClasses, classes } = useGetClasses();
  const { user } = useUser();

  useEffect(() => {
    const fetchStudents = async () => {
      await refetch();
      setLoading(false);
      await fetchClasses();
    };

    const fetchAndSetClasses = async () => {};

    fetchStudents();
    fetchAndSetClasses();
  }, []);

  useEffect(() => {
    if (studentModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [studentModal]);

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  // Calculate the index range of students to display for the current page
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Function to handle next page
  const nextPage = () => {
    if (indexOfLastStudent < filteredStudents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    // Full Screen
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full`}
      >
        <div className=" flex-[5] w-full ">
          {/* NavBar  */}
          <Navbar
            heading={"Wellness"}
            img={user?.photo}
            name={user?.name}
            role={user?.role}
          />

          {/* Screen Main Content  */}
          <div className="mt-10 w-full px-8 mb-16">
            {/* Buttons & Search Container  */}
            <div className="flex flex-row w-auto items-center gap-10 mb-2 font-sans">
              {/* Buttons Div  */}
              <div className="flex flex-row flex-wrap md:flex-nowrap text-xxs md:text-xs gap-4 md:gap-0 space-x-2 items-center">
                {/* <button className="flex flex-row justify-center p-2 pr-3 border rounded-lg border-gray-300">
                  <MdOutlineFilterList
                    className="text-customBlue font-bold"
                    size={16}
                  />
                  <p className=" text-customBlue font-medium ml-2">Filters</p>
                </button> */}
              </div>

              {/* SearchBar Div  */}
              <div className="flex items-center border h-12 border-gray-300 rounded-lg">
                <button className="bg-white px-2 py-3 rounded-l-lg flex items-center justify-center">
                  {/* <FiSearch className="text-gray-400" size={18} /> */}
                  <img
                    src={IMAGES.search_icon1}
                    alt="Search Icon"
                    className="w-[18px]  h-[16px]"
                  />
                </button>
                <input
                  type="text"
                  placeholder="Search Student"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="text-sm focus:outline-none active:outline-none rounded-r-lg h-10 w-full px-2 py-1 "
                />
              </div>
            </div>

            {/* Table Headings  */}
            <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText bg-customTableHeaderColor border border-gray-200">
              <p className="flex-[4] ">Month</p>
              <p className="flex-[5] ">Status</p>
              <p className="flex-[4] ">Form</p>
              <p className="flex-[2] ">Reminder</p>
            </div>

            {/* Table  */}
            <div>
              {loading && (
                <div className="flex h-40 justify-center items-center">
                  <Loader />
                </div>
              )}
              {!loading &&
                (currentStudents.length === 0 ? (
                  <div className="flex h-40 justify-center items-center col-span-full">
                    <p>No Teachers Present</p>
                  </div>
                ) : (
                  <div>
                    {currentStudents.map((student) => {
                      const assignedClasses = classes.filter(
                        (classs) => classs.student_id._id === student._id
                      );
                      return (
                        <StudentDetailsCard
                          key={student._id}
                          student={student}
                          assignedClasses={assignedClasses}
                        />
                      );
                    })}
                  </div>
                ))}
            </div>

            {/* Prev & Next Buttons  */}
            <div className="flex flex-row items-center text-customBlue font-sans justify-between p-3 px-4 shadow-md">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className=" flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
              >
                <p className=" text-xs font-medium ml-2">Previous</p>
              </button>
              <p className=" font-medium text-sm">{`${currentPage} out of ${Math.ceil(
                filteredStudents.length / studentsPerPage
              )}`}</p>
              <button
                onClick={nextPage}
                disabled={indexOfLastStudent >= filteredStudents.length}
                className="flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
              >
                <p className="text-xs font-medium ml-2">Next</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WellNessHistory;
