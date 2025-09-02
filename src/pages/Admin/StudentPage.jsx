import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineFilterList,
} from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import StudentDetailsCard from "../../components/Admin/Students/StudentDetailsCard";
import { studentDetails } from "../../constants/studentDetails";
import AddStudent from "../../components/Admin/Students/AddStudent";
import EditStudent from "../../components/Admin/Students/EditStudent";
import { useOverLay } from "../../contexts/OverlayContext";
import StudentAddedPopup from "../../components/Admin/Students/StudentAddedPopup";
import StudentEditedPopup from "../../components/Admin/Students/StudentEditedPopup";
import StudentDeletedPopup from "../../components/Admin/Students/StudentDeletedPopup";
import { useGetUsers } from "../../contexts/GetUsersContext";
import { useUser } from "../../contexts/UserContext";
import { IMAGES } from "../../assets";
import Loader from "../../components/Loader/Loader";
import { useGetClasses } from "../../contexts/GetClassesContext";

export default function StudentPage() {
  // const [students, setStudents] = useState(studentDetails);
  const [searchQuery, setSearchQuery] = useState("");

  const [allChecked, setAllChecked] = useState(false);
  const [studentModal, setStudentModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);
  const [editedPopup, setEditedPopup] = useState(false);
  const [deletedPopup, setDeletedPopup] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deletedStudent, setDeletedStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  const { toggleOverlay } = useOverLay();
  const { students, refetch } = useGetUsers();
  const { fetchClasses, classes } = useGetClasses();
  const { user } = useUser();

  useEffect(() => {
    const fetchStudents = async () => {
      await refetch();
      setLoading(false);
      await fetchClasses();
    };

    const fetchAndSetClasses = async () => {
    };

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

  const toggleStudentModal = () => {
    setStudentModal(!studentModal);
    toggleOverlay();
  };

  const toggleEditModal = (student) => {
    setSelectedStudent(student);
    setEditModal(!editModal);
    toggleOverlay();
  };

  const toggleAddedPopup = () => {
    setAddedPopup(!addedPopup);
  };

  const toggleEditedPopup = () => {
    setEditedPopup(!editedPopup);
  };

  const toggleDeletedPopup = (student) => {
    setDeletedStudent(student);
    setDeletedPopup(!deletedPopup);
    toggleOverlay();
  };

  const toggleAllCheckboxes = () => {
    setAllChecked(!allChecked);
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
            heading={"Students"}
            img={user?.photo}
            name={user?.name}
            role={user?.role}
          />

          {/* Screen Main Content  */}
          <div className="mt-10 w-full px-8 mb-16">
            {/* Buttons & Search Container  */}
            <div className="flex flex-row w-auto items-center justify-between mb-2 font-sans">
              {/* Buttons Div  */}
              <div className="flex flex-1 flex-row flex-wrap md:flex-nowrap text-xxs md:text-xs gap-4 md:gap-0 space-x-2 items-center">
                <button className="flex flex-row justify-center p-2 pr-3 border rounded-lg border-gray-300">
                  <MdOutlineFilterList
                    className="text-customBlue font-bold"
                    size={16}
                  />
                  <p className=" text-customBlue font-medium ml-2">Filters</p>
                </button>
                <button
                  onClick={toggleStudentModal}
                  className="flex flex-row items-center justify-center p-2 pr-3 border rounded-lg border-gray-300 bg-customMaroon"
                >
                  <GoPlus color="white" size={15} />
                  <p className="text-white font-normal ml-2">Add Student</p>
                </button>

                <p className="text-xs text-customDarkBlue font-medium">
                  1 row selected
                </p>
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
              {/* checkbox  */}
              <div
                className="flex-1 cursor-pointer text-customMaroon"
                onClick={toggleAllCheckboxes}
              >
                {allChecked ? (
                  <MdOutlineCheckBox size={20} />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={20}
                    className="text-customLightGray"
                  />
                )}
              </div>

              <p className="flex-[4] ">Name</p>
              <p className="flex-[5] ">Email</p>
              <p className="flex-[4] ">Created At</p>
              <p className="flex-[2] ">Report</p>
              <p className="flex-[4] ">Timetable</p>
            </div>

            {/* Table  */}
            <div>
              {loading &&
                <div className="flex h-40 justify-center items-center">
                  <Loader />
                </div>
                }
               { !loading && (
                 currentStudents.length === 0 ? (
                   <div className="flex h-40 justify-center items-center col-span-full">
                     <p>No Students added</p>
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
                           // toggleCheckbox={toggleCheckbox}
                           toggleEditModal={toggleEditModal}
                           toggleDeletedPopup={toggleDeletedPopup}
                         />
                       );
                     })}
                   </div>
                 )
               )}
              {addedPopup && (
                <StudentAddedPopup
                  toggleFunc={toggleAddedPopup}
                  toggleModal={toggleStudentModal}
                />
              )}
              {editedPopup && (
                <StudentEditedPopup
                  toggleFunc={toggleEditedPopup}
                  toggleModal={toggleEditModal}
                />
              )}
              {deletedPopup && (
                <StudentDeletedPopup
                  student={deletedStudent}
                  toggleFunc={toggleDeletedPopup}
                />
              )}
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
        {studentModal && (
          <AddStudent
            toggleFunc={toggleStudentModal}
            addedPopup={addedPopup}
            toggleAddedPopup={toggleAddedPopup}
          />
        )}
        {editModal && (
          <EditStudent
            student={selectedStudent}
            toggleFunc={toggleEditModal}
            editedPopup={editedPopup}
            toggleEditedPopup={toggleEditedPopup}
          />
        )}
      </div>
    </>
  );
}
