import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Navbar/TeacherToggleBtnHeader";
import DropDown from "../../components/Admin/Teachers/DropDown";
import { classes } from "../../constants/completedClasses";
import { IMAGES } from "../../assets";
import EditStudent from "../../components/Admin/Students/EditStudent";
import { useGetUsers } from "../../contexts/GetUsersContext";
import { useOverLay } from "../../contexts/OverlayContext";
import { useLocation } from "react-router-dom";
import TeacherEditedPopup from "../../components/Admin/Teachers/TeacherEditedPopup";
import TeacherScheduleClassesCard from "../../components/Admin/Teachers/TeacherScheduleClassesCard";
import { giveBgColor } from "../../utils/BgColor";

export default function ViewTeacherProfile() {
  const [profileSelectedPage, setProfileSelectedPage] = useState("Profile");
  const [selectedOption, setSelectedOption] = useState("All");
  const navigate = useNavigate();

  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [editedPopup, setEditedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();

  const { refetch } = useGetUsers();

  const location = useLocation();

  const handleProfilePageToggle = (page) => {
    setProfileSelectedPage(page);
  };

  const toggleEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setEditModal(!editModal);
    toggleOverlay();
  };

  const toggleEditedPopup = () => {
    setEditedPopup(!editedPopup);
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log("Delete action triggered");
  };

  // console.log("profile state 1: ", location.state.teacher);
  // console.log("profile state 2: ", location.state.assignedClasses);

  const filteredClasses =
    selectedOption === "All"
      ? location.state.assignedClasses.filter(
          (cls) => cls.status === "Completed"
        )
      : location.state.assignedClasses.filter(
          (cls) => cls.status === "Completed" && cls?.review_id !== undefined
        );

  const handleCardClick = (selectedClass) => {
    // if (selectedClass.status === "Reviewed") {
    if (selectedClass.review_id) {
      navigate("/admin/teachers/review-class", { state: { selectedClass } });
    }
  };

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        {/* Header  */}
        <Header
          selectedPage={profileSelectedPage}
          handlePageToggle={setProfileSelectedPage}
          teacher={location?.state}
        />
        {editedPopup && <TeacherEditedPopup toggleFunc={toggleEditedPopup} />}
        {/* Main Page  */}
        <div className="flex flex-col items-center mdLg:flex-row mdLg:items-start gap-x-10 px-5 mt-10 text-customGray font-medium text-lg">
          {/* Left Div  */}
          <div className="flex-1 mb-8 mdLg:mb-0">
            <p className="mb-2 text-center mdLg:text-start">Profile</p>
            <div className="w-[400px] h-[500px] mdLg:w-auto mdLg:h-[600px] border-2 border-gray-300 rounded-lg p-4 px-6 space-y-4">
              {/* Edit Icon  */}
              <div
                onClick={toggleEditModal}
                className="flex flex-row-reverse items-center cursor-pointer "
              >
                <p className="text-sm ml-2">Edit</p>
                <img
                  src={IMAGES.edit_icon2}
                  alt="Edit Icon"
                  className="w-[15px] h-[15px]"
                />
              </div>

              {/* Profile Image and Name  */}
              <div className="flex flex-col items-center">
                <img
                  src={location?.state.teacher.photo}
                  alt="Edit Icon"
                  className="w-20 h-20 rounded-full mb-1"
                />
                <p>{location?.state.teacher.name}</p>
              </div>

              {/* profile Data  */}
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-customLightGray font-normal">
                    Name
                  </p>
                  <p className="text-sm">{location?.state.teacher.name}</p>
                </div>
                <div>
                  <p className="text-xs text-customLightGray font-normal">
                    Email
                  </p>
                  <p className="text-sm">{location?.state.teacher.email}</p>
                </div>
                <div>
                  {/* <p className="text-xs text-customLightGray font-normal">
                    Phone No
                  </p>
                  <p className="text-sm">{location?.state.teacher.phoneNo}</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Div  */}
          <div className="flex-[2] ">
            <div className="flex flex-row justify-between items-center mdLg:gap-0 gap-10 ">
              <p className=" text-center mdLg:text-start">
                Completed Classes
              </p>
              <DropDown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
            {/* Recently Scheduled Classes Cards  */}
            {filteredClasses.length === 0 ? (
              <div className="flex h-40 w-full text-base justify-center items-center">
                <p>No classes completed</p>
              </div>
            ) : (
              <div className="flex flex-col mdLg:grid mdLg:grid-cols-2 gap-4 mt-2 ">
                {filteredClasses.map((item, index) => (
                <TeacherScheduleClassesCard
                  key={index}
                  classs={item}
                  title={item.title}
                  location={item.location.name}
                  teacherName={item.teacher_id.name}
                  teacherImg={item.teacher_id.photo}
                  studentName={item.student_id.name}
                  studentImg={item.student_id.photo}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  days={item.weekDays}
                  dotsMenu={false}
                  status={item.status}
                  bgColor={giveBgColor(index)}
                  onClick={() => handleCardClick(item)}
                  onDelete={handleDelete}
                />
                ))}
              </div>
            )}
          </div>
        </div>
        {editModal && (
          <EditStudent
            student={location?.state}
            toggleFunc={toggleEditModal}
            editedPopup={editedPopup}
            toggleEditedPopup={toggleEditedPopup}
          />
        )}
      </div>
    </>
  );
}
