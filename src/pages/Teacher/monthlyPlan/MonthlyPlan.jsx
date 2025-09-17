// import React, { useEffect, useState } from 'react'
// import { getMonthlyPlan } from '../../../api/Teacher/monthlyPlan';

// const MonthlyPlan = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const fetchData = async () => {
//       setLoading(true);
//       const resp = await getMonthlyPlan();
//       if (resp.success) {
//         setData(resp?.data);
//       }
//       setLoading(false);
//     };

//     useEffect(() => {
//       fetchData();
//     }, []);

//   return (
//     <div>
//         <div>

//         </div>
//     </div>
//   )
// }

// export default MonthlyPlan

import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/TeacherNavbar";
import Loader from "../../../components/Loader/Loader";
import StudentDetailsCard from "../../../components/Teacher/monthly-plan/StudentDetailsCard";

import { FaSave } from "react-icons/fa";
import { IMAGES } from "../../../assets";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineFilterList } from "react-icons/md";
import { useUser } from "../../../contexts/UserContext";
import { getWellness } from "../../../api/Admin/wellness";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import {
  getMonthlyPlan,
  getMonthlyPlanHistory,
} from "../../../api/Teacher/monthlyPlan";

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
    const resp = await getMonthlyPlanHistory(user?._id);
    console.log("resp for monthly plan is : ", resp);
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
        <div className=" flex-[5] w-full">
          <Navbar
            heading={"Monthly Plan History"}
            img={user?.photo}
            name={user?.name}
            role={user?.role}
          />

          <div className="mt-10 w-full px-8 mb-16">
            <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText bg-customTableHeaderColor border border-gray-200">
              <p className="flex-[4] ">Month</p>
              <p className="flex-[5] ">Status</p>
              <p className="flex-[4] ">Plan File</p>
            </div>

            <div>
              {loading && (
                <div className="flex h-40 justify-center items-center">
                  <Loader />
                </div>
              )}
              {!loading &&
                (currentStudents.length === 0 ? (
                  <div className="flex h-40 justify-center items-center col-span-full">
                    <p>No Data Present</p>
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
