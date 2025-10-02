import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import DetailsCard from "../../components/Dashboard/DetailsCard";
import ScheduledClassesCard from "../../components/Dashboard/ScheduledClassesCard";
import { getDetailsData } from "../../constants/detailsData";
import { useGetUsers } from "../../contexts/GetUsersContext";
import { IMAGES } from "../../assets";
import { useUser } from "../../contexts/UserContext";
import Loader from "../../components/Loader/Loader";
import { useGetClasses } from "../../contexts/GetClassesContext";
import { giveBgColor } from "../../utils/BgColor";
import ParentProfile from "../../components/Admin/Parents/ParentProfile";
import StudentProfile from "../../components/Admin/Students/StudentProfile";
import TeacherProfile from "../../components/Admin/Teachers/TeacherProfile";

export default function Dashboard() {
  const { teachers, students, parents, users, refetch, isLoggedIn } =
    useGetUsers();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const navigate = useNavigate();

  const { classes, fetchClasses } = useGetClasses();

  useEffect(() => {
    const fetch = async () => {
      await refetch();
      await fetchClasses();
      setLoading(false);
    };
    fetch();
  }, [isLoggedIn]);

  const [detailsData, setDetailData] = useState(null);

  useEffect(() => {
    if (users && teachers && students && parents) {
      const data = getDetailsData({ users, teachers, students, parents });
      setDetailData(data);
    }
  }, [teachers, students, parents, users, isLoggedIn, loading]);

 const handleUserClick = (user) => {
  if (user.role === "parent") {
    setSelectedParent(user);
    setSelectedStudent(null);
    setSelectedTeacher(null);
  } else if (user.role === "student") {
    setSelectedStudent(user);
    setSelectedParent(null);
    setSelectedTeacher(null);
  } else if (user.role === "teacher") {
    setSelectedTeacher(user);
    setSelectedParent(null);
    setSelectedStudent(null);
  } else {
    setSelectedParent(null);
    setSelectedStudent(null);
    setSelectedTeacher(null);
  }
};
  return (
    // Full Screen
    <div className="flex flex-row h-full">
      {/* White section */}
      <div className="bg-white flex-[5] w-full rounded-tl-3xl rounded-bl-3xl">
        {/* NavBar  */}
        <Navbar
          heading={"Dashboard"}
          img={user?.photo}
          name={user?.name}
          role={user?.role}
        />
        {/* Gradient Section  */}
        <div className="bg-custom-gradient3 w-full h-[100px] lg:h-[150px]"></div>

        {/* Main Section  */}

        {/* Details Cards */}
        <div className="-mt-20 mx-10 grid grid-cols-2 md:flex gap-2 md:flex-wrap">
          {detailsData?.map((item, index) => (
            <DetailsCard
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
              loading={loading}
              link={item.link}
            />
          ))}
        </div>

        {/* Recently Scheduled Classes Cards  */}
        <div className="mt-5">
          <div className="flex flex-row justify-between mx-8 mb-3">
            <p className="text-lg font-medium font-sans">
              Recently Scheduled Sessions
            </p>
            <p
              onClick={() => navigate("/admin/schedule_classes")}
              className="text-sm text-customYellow hover:underline cursor-pointer"
            >
              See all
            </p>
          </div>

          {loading ? (
            <div className="flex h-40 justify-center items-center">
              <Loader />
            </div>
          ) : classes.length === 0 ? (
            <div className="flex h-40 justify-center items-center">
              <p>No classes scheduled</p>
            </div>
          ) : (
            <div className="mx-5 flex flex-col md:flex-row gap-4">
              {classes
                .slice()
                .reverse()
                .slice(0, 3)
                .map((item, index) => (
                  <ScheduledClassesCard
                    key={index}
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
                    bgColor={giveBgColor(index)}
                     assignedClasses={classes.filter(
                      (cls) =>
                        cls.student_id?._id === item.student_id?._id ||
                        cls.teacher_id?._id === item.teacher_id?._id
                    )}
                       teacher={item.teacher_id}      // pass full teacher object
                      student={item.student_id} 
                  />
                ))}
            </div>
          )}
        </div>

        {/* Recently Added Users Table */}
        <div className="mt-5 mb-6">
          <div className="flex flex-row justify-between mx-8 mb-2">
            <p className="text-lg font-medium font-sans">
              Recently Added Users
            </p>
            {/* <p className="text-sm text-customYellow hover:underline cursor-pointer">
              See all
            </p> */}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[150px]">
              <Loader /> {/* Display loader */}
            </div>
          ) : users.length === 0 ? (
            <div className="flex justify-center items-center h-[150px]">
              <p>No users added recently</p>
            </div>
          ) : (
            <div className="mx-6 flex flex-col lg:grid lg:grid-cols-2 gap-3 font-medium ">
              {users
                .slice()
                .reverse()
                .slice(0, 6)
                .map((item, index) => (
                     <div
                key={index}
                className="w-full flex flex-row items-center space-x-5 p-2 shadow-md text-xs text-customLightGray rounded-lg cursor-pointer"
                onClick={() => handleUserClick(item)}
              >
                    <img
                      src={item.photo || IMAGES.user}
                      alt="User Pic"
                      className="w-7 h-7 rounded-full"
                    />
                    <p className="text-customGray text-sm ">{item.name}</p>
                    <p className=" ">{item.role}</p>
                    <p className=" ">{item.email}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

     {selectedParent && (
        <ParentProfile
          parent={selectedParent}
          toggleFunc={() => setSelectedParent(null)}
        />
      )}
      {selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          toggleFunc={() => setSelectedStudent(null)}
        />
      )} 
      {selectedTeacher && (
        <TeacherProfile
          teacher={selectedTeacher}
          toggleFunc={() => setSelectedTeacher(null)}
        />
      )}
   </div>
  );
}
