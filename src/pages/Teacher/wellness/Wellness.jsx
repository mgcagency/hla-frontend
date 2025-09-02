import React, { useEffect, useState } from "react";
import {
  getAllWellness,
  getWellnessHistory,
} from "../../../api/Teacher/wellness";
import StudentDetailsCard from "../../../components/Teacher/wellness/StudentDetailsCard";
import { useGetClasses } from "../../../contexts/GetClassesContext";
import { useUser } from "../../../contexts/UserContext";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import StudentNavbar from "../../../components/Navbar/TeacherNavbar";
import { MdOutlineFilterList } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import Loader from "../../../components/Loader/Loader";
import { IMAGES } from "../../../assets";

const Wellness = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [studentModal, setStudentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { students, refetch } = useGetUsers();
  const { fetchClasses, classes } = useGetClasses();
  const [formLinkField, setFormLinkField] = useState(false);
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [formLink, setFormLink] = useState("");

  const toggleFormField = () => {
    setFormLinkField(!formLinkField);
  };

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
  const filteredStudents = data;
  // const filteredStudents = data?.filter((student) =>
  //   student?.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );


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

  const fetchData = async () => {
    setLoading(true);
    const resp = await getWellnessHistory(user._id);
    if (resp.success) {
      setData(resp?.data);
      console.log("wellness in teachr UI data is : ", resp);
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
          <StudentNavbar
            heading={"Wellness Form"}
            img={user?.photo}
            name={user?.name}
            role={user?.role}
          />

          <div className="px-10 py-4">
            <p className="text-3xl font-medium">Wellness Forms</p>
          </div>

          <div className="mt-10 w-full px-8 mb-16">
            {/* Table Headings  */}
            <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText bg-customTableHeaderColor border border-gray-200">
              <p className="flex-[4] ">Month</p>
              <p className="flex-[5] ">Status</p>
              <p className="flex-[4] ">From</p>
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
                    <p>No Data Present</p>
                  </div>
                ) : (
                  <div>
                    {currentStudents.map((student) => {
                      return (
                        <StudentDetailsCard
                          data={student}
                          key={student._id}
                          assignedClasses={[]}
                          student={student.submissions[0]}
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

export default Wellness;
