import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import StudentDetailsCard from "../../../components/Admin/wellness/StudentDetailsCard";

import { FaSave } from "react-icons/fa";
import { IMAGES } from "../../../assets";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineFilterList } from "react-icons/md";
import { useUser } from "../../../contexts/UserContext";
import { getWellness } from "../../../api/Admin/wellness";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import { getMonthlyPlan } from "../../../api/Admin/monthlyPlan";

const MonthlyPlan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formLinkField, setFormLinkField] = useState(false);
  const { user } = useUser();
  const [formLink, setFormLink] = useState("");

  const toggleFormField = () => {
    setFormLinkField(!formLinkField);
  };

  // Filter students based on search query
  // const filteredStudents = data;
 const filteredStudents = data
    .map((plan) => {
      const matchedSubmissions = plan.submissions?.filter((submission) =>
        (submission.user?.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      return { ...plan, submissions: matchedSubmissions || [] };
    })
    .filter((plan) => plan.submissions.length > 0);


  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const fetchData = async () => {
    setLoading(true);
    const resp = await getMonthlyPlan();
    if (resp.success) {
      setData(resp?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // Full Screen
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full`}
      >
        <div className=" flex-[5] w-full ">
          {/* NavBar  */}
          <Navbar
            heading={"Planning"}
            img={user?.photo}
            name={user?.name}
            role={user?.role}
          />

          {/* Screen Main Content  */}
          <div className="mt-10 w-full px-8 mb-16">
            {/* Buttons & Search Container  */}
            <div className="flex items-center">
              <div className="flex flex-1 flex-row w-auto items-center gap-10 mb-2 font-sans">
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
              <div className="flex-1">
                <div className="bg-slate-50 justify-between border items-center gap-1 border-black/20 py-3 px-4 rounded-md flex">
                  <div className="">
                    <p>Monthly Plan Document</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!formLinkField ? (
                      <p>{formLink} </p>
                    ) : (
                      <input
                        type="text"
                        value={formLink}
                        onChange={(e) => {
                          setFormLink(e.target.value);
                        }}
                        className="py-1 px-2 rounded-md outline-none w-full"
                      />
                    )}
                    {!formLinkField && (
                      <p className="cursor-pointer" onClick={toggleFormField}>
                        <RiEdit2Fill />
                      </p>
                    )}
                    {formLinkField && (
                      <p className="cursor-pointer" onClick={toggleFormField}>
                        <FaSave />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Table Headings  */}
            <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText bg-customTableHeaderColor border border-gray-200">
              <p className="flex-[4] ">Teacher</p>
              <p className="flex-[5] ">Status</p>
              <p className="flex-[4] ">History</p>
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
                    {currentStudents.map((plan) =>
  plan.submissions?.map((student) => (
    <StudentDetailsCard
      data={student}
      key={student._id}
      assignedClasses={[]}
      student={student.user}
    />
  ))
)}
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

export default MonthlyPlan;
