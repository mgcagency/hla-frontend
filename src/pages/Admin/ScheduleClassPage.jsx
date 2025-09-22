import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { IoAdd } from "react-icons/io5";
import ScheduledClassesCard from "../../components/Dashboard/ScheduledClassesCard";
import AddSchedule from "../../components/Admin/Schedule_Classes/AddSchedule";
import { useOverLay } from "../../contexts/OverlayContext";
import SelectStudentPopup from "../../components/Admin/Schedule_Classes/SelectStudentPopup";
import SelectTeacherPopup from "../../components/Admin/Schedule_Classes/SelectTeacherPopup";
import SelectLocationPopup from "../../components/Admin/Schedule_Classes/SelectLocationPopup";
import SelectTimePopup from "../../components/Admin/Schedule_Classes/SelectTimePopup";
import SelectDaysPopup from "../../components/Admin/Schedule_Classes/SelectDaysPopup";
import ConfirmPopup from "../../components/Admin/Schedule_Classes/ConfirmPopup";
import { useUser } from "../../contexts/UserContext";
import Loader from "../../components/Loader/Loader";
import { useGetClasses } from "../../contexts/GetClassesContext";
import { giveBgColor } from "../../utils/BgColor";
import ClassEditedPopup from "../../components/Admin/Schedule_Classes/ClassEditedPopup";
import EditSchedule from "../../components/Admin/Schedule_Classes/EditSchedule";
import DeletePopup from "../../components/Admin/Schedule_Classes/DeletePopup";

export default function ScheduleClassPage() {
  const [scheduleModal, setScheduleModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { toggleOverlay } = useOverLay();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectStPopup, setSelectStPopup] = useState(false);
  const [selectTPopup, setSelectTPopup] = useState(false);
  const [selectLocationPopup, setSelectLocationPopup] = useState(false);
  const [selectTimePopup, setSelectTimePopup] = useState(false);
  const [selectDaysPopup, setSelectDaysPopup] = useState(false);
  const [confrimPopup, setConfrimPopup] = useState(false);
  const [classEditedPopup, setClassEditedPopup] = useState(false);
  const [newClass, setNewClass] = useState({});
  const [selectedClass, setSelectedClass] = useState({});

  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { classes, fetchClasses } = useGetClasses();

  useEffect(() => {
    const fetch = async () => {
      await fetchClasses();
      setLoading(false);
    };
    fetch();
  }, []);

  const toggleScheduleModal = () => {
    setScheduleModal(!scheduleModal);
    toggleOverlay();
  };

  const toggleEditModal = (classs) => {
    setSelectedClass(classs);
    setEditModal(!editModal);
    toggleOverlay();
  };

  const toggleDeletePopup = (classs) => {
    setSelectedClass(classs)
    setDeletePopup(!deletePopup);
    toggleOverlay();
  }

  const toggleSelectStPopup = () => {
    setSelectStPopup(!selectStPopup);
  };

  const toggleSelectTPopup = () => {
    setSelectTPopup(!selectTPopup);
  };

  const toggleSelectLocationPopup = () => {
    setSelectLocationPopup(!selectLocationPopup);
  };

  const toggleSelectTimePopup = () => {
    setSelectTimePopup(!selectTimePopup);
  };

  const toggleSelectDaysPopup = () => {
    setSelectDaysPopup(!selectDaysPopup);
  };

  const toggleConfirmPopup = (classs) => {
    setNewClass(classs);
    setConfrimPopup(!confrimPopup);
  };

  const toggleClassEditedPopup = () => {
    setClassEditedPopup(!classEditedPopup);
  }

  useEffect(() => {
    if (scheduleModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [scheduleModal]);

  return (
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full `}
      >
        <div className=" flex-[5] w-full font-sans">
          {/* NavBar  */}
          <Navbar
            heading={"Schedule"}
            img={user?.photo}
            name={user?.name}
            role={user?.role}
          />

          {/* Heading and Buttons Div  */}
          <div className="flex flex-row justify-between px-10 pt-10 pb-4">
            {/* Name and Image div  */}
            <p className="text-lg font-medium">Recently Scheduled Sessions</p>

            <div className="text-white text-sm font-normal flex flex-col smMd:flex-row">
              <button
                onClick={toggleScheduleModal}
                className="bg-customMaroon p-2 px-4 border rounded-md flex flex-row items-center"
              >
                <IoAdd size={16} />
                <p className="ml-2">Add New Class</p>
              </button>
            </div>
          </div>
          {selectStPopup && (
            <SelectStudentPopup toggleFunc={toggleSelectStPopup} />
          )}
          {selectTPopup && (
            <SelectTeacherPopup toggleFunc={toggleSelectTPopup} />
          )}
          {selectLocationPopup && (
            <SelectLocationPopup toggleFunc={toggleSelectLocationPopup} />
          )}
          {selectTimePopup && (
            <SelectTimePopup toggleFunc={toggleSelectTimePopup} />
          )}
          {selectDaysPopup && (
            <SelectDaysPopup toggleFunc={toggleSelectDaysPopup} />
          )}
          {deletePopup && (
            <DeletePopup toggleFunc={toggleDeletePopup} classs={selectedClass} />
          )}
          {confrimPopup && (
            <ConfirmPopup
              toggleFunc={toggleConfirmPopup}
              toggleModal={toggleScheduleModal}
              classs={newClass}
            />
          )}
          {classEditedPopup && (
            <ClassEditedPopup toggleFunc={toggleClassEditedPopup} toggleModal={toggleEditModal} />
          )}
          {loading && (
            <div className="flex h-80 items-center justify-center">
              <Loader />
            </div>
          )}

          {!loading && (
            <div className="mx-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {classes?.length === 0 ? (
                <div className="flex h-40 justify-center items-center col-span-full">
                  <p>No classes scheduled</p>
                </div>
              ) : (
                classes?.slice().reverse().map((item, index) => (
                  <ScheduledClassesCard
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
                    bgColor={giveBgColor(index)}
                    dotsMenu={true}
                    toggleEditModal= {toggleEditModal}
                    toggleDeletePopup = {toggleDeletePopup}
                  assignedClasses={classes.filter(
                  (cls) =>
                    cls.student_id?._id === item.student_id?._id ||
                    cls.teacher_id?._id === item.teacher_id?._id
                  )}
                  teacher={item.teacher_id}      // pass full teacher object
                  student={item.student_id} 
                  />
                ))
              )}
            </div>
          )}
        </div>
        {scheduleModal && (
          <AddSchedule
            toggleFunc={toggleScheduleModal}
            selectStPopup={selectStPopup}
            toggleSelectStPopup={toggleSelectStPopup}
            selectTPopup={selectTPopup}
            toggleSelectTPopup={toggleSelectTPopup}
            selectLocationPopup={selectLocationPopup}
            toggleSelectLocationPopup={toggleSelectLocationPopup}
            selectTimePopup={selectTimePopup}
            toggleSelectTimePopup={toggleSelectTimePopup}
            selectDaysPopup={selectDaysPopup}
            toggleSelectDaysPopup={toggleSelectDaysPopup}
            confrimPopup={confrimPopup}
            toggleConfirmPopup={(data) => toggleConfirmPopup(data)}
          />
        )}
        {editModal && (
          <EditSchedule
            classs={selectedClass}
            toggleFunc={toggleEditModal}
            selectStPopup={selectStPopup}
            toggleSelectStPopup={toggleSelectStPopup}
            selectTPopup={selectTPopup}
            toggleSelectTPopup={toggleSelectTPopup}
            selectLocationPopup={selectLocationPopup}
            toggleSelectLocationPopup={toggleSelectLocationPopup}
            selectTimePopup={selectTimePopup}
            toggleSelectTimePopup={toggleSelectTimePopup}
            selectDaysPopup={selectDaysPopup}
            toggleSelectDaysPopup={toggleSelectDaysPopup}
            classEditedPopup = {classEditedPopup}
            toggleClassEditedPopup = {toggleClassEditedPopup}
          />
        )}
      </div>
    </>
  );
}
