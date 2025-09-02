import React, { useEffect, useState } from "react";
import { IMAGES } from "../../assets";
import { teacherTimetableData } from "../../constants/teacherTimetableData";
import TeacherCustomCalendar from "../../components/Teacher/TeacherCustomCalendar";
import TeacherCompClassesCard from "../../components/Teacher/TeacherCompClassesCard";
import TeacherNavbar from "../../components/Navbar/TeacherNavbar";
import ClassNotStartedPopup from "../../components/Teacher/ClassNotStartedPopup";
import StartClassPopup from "../../components/Teacher/StartClassPopup";
import GiveReviewPopup from "../../components/Teacher/GiveReviewPopup";
import { useOverLay } from "../../contexts/OverlayContext";
import AddReview from "../../components/Teacher/AddReview";
import ReviewSubmittedPopup from "../../components/Teacher/ReviewSubmittedPopup";
import { useGetClasses } from "../../contexts/GetClassesContext";
import { useUser } from "../../contexts/UserContext";
import { groupClassesByDay } from "../../utils/GroupClassesByDay";
import TeacherTimetableCard from "../../components/Teacher/TeacherTimetableCard";
import { giveBgColor } from "../../utils/BgColor";
import { statusColor } from "../../utils/StatusColor";
import { giveCardColors } from "../../utils/CardColors";
import { useGetUsers } from "../../contexts/GetUsersContext";

export default function TeacherDashboard() {
  const [selecetedClass, setSelectedClass] = useState(null);
  const [popupState, setPopupState] = useState({ id: null, type: null, classs:null });
  const [popup2State, setPopup2State] = useState({
    id: null,
    type: null,
    classs: null,
  });
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewSubmittedPopup, setReviewSubmittedPopup] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);

  const [teacher_classes, setTeacherClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const { classes, getClassesByUserId } = useGetClasses();
  const { user } = useUser();

  useEffect(() => {
    const getClasses = async () => {
      const filteredClasses = await getClassesByUserId(user?._id);
      setTeacherClasses(filteredClasses);
      setReviewCompleted(false);
    };
    getClasses();
  }, [reviewSubmittedPopup, reviewCompleted]);

  // console.log("classes", classes);
  // console.log("teacher_classes: ", teacher_classes)

  const compClasses = teacher_classes?.filter(
    (cls) => cls.status === "Completed"
  );

  const classesByDay = groupClassesByDay(teacher_classes);

  const selectedDay = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const selectedDayClasses = classesByDay[selectedDay] || [];

  const toggleReviewModal = (classs) => {
    setSelectedClass(classs);
    setReviewModal(!reviewModal);
  };

  const toggleReviewSubmittedPopup = () => {
    setReviewSubmittedPopup(!reviewSubmittedPopup);
  };

  const handleCardClick = (id, status, classs) => {
    if (status === "Completed") return;
    setPopupState({ id, type: status, classs });
    toggleOverlay();
  };

  const closePopup = () => {
    setPopupState({ id: null, type: null, classs: null });
    toggleOverlay();
  };

  const handleCard2Click = (id, status, classs) => {
    if (status !== undefined ) return;
    setPopup2State({ id, type: status, classs });
    toggleOverlay();
  };

  const closePopup2 = () => {
    setPopup2State({ id: null, type: null, classs: null });
    toggleOverlay();
  };

  const isPopupOpen =
    reviewModal !== false ||
    popupState.type !== null ||
    popup2State.type !== null;

  return (
    <>
      {reviewModal && <div className="bg-black fixed inset-0 opacity-50"></div>}
      <div
        className={`flex flex-col pt-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full space-y-4`}
      >
        <TeacherNavbar name={user?.name} img={user?.photo} />

        {/* Main Page  */}
        <div className="flex flex-col lg:flex-row gap-x-4 px-10 text-customGray font-medium text-lg">
          {/* Timetable  */}
          <div className="flex-[2] mr-10 ">
            <p className="mb-4">Today's Timetable</p>
            {popupState.type !== null &&
              popupState.type !== "On Going" &&
              popupState.type !== "Completed" && (
                <ClassNotStartedPopup
                  toggleFunc={closePopup}
                  classs={popupState.classs}
                />
              )}
            {popupState.type === "On Going" && (
              <StartClassPopup
                toggleFunc={closePopup}
                classs={popupState.classs}
              />
            )}

            <table className="w-full border-collapse text-xs text-customDarkerBlue ">
              <tbody>
                {teacherTimetableData.map((item, index) => {
                  const classForTime = selectedDayClasses.find(
                    (cls) => cls.startTime === item.time
                  );
                  return (
                    <tr key={index}>
                      <td
                        style={{ width: "8%" }}
                        className={`pb-4 border-r border-gray-300 ${
                          classForTime ? "" : "pb-4"
                        } align-top`}
                      >
                        {item.time}
                      </td>
                      <td
                        style={{ width: "90%" }}
                        className={`${classForTime ? "" : "pb-4 "}`}
                      >
                        <hr
                          className={`w-full border-t-2 border-dashed border-gray-200 ${
                            classForTime ? "" : "mt-[-8px]"
                          }`}
                        />
                        {classForTime ? (
                          <TeacherTimetableCard
                            classs={classForTime}
                            bgColor={giveBgColor(index)}
                            status={classForTime.status}
                            statusColor={statusColor(classForTime.status)}
                            onclick={handleCardClick}
                            isPopupOpen={isPopupOpen}
                          />
                        ) : (
                          item.class
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* right div  */}
          <div className="flex-1 ">
            <div className="flex items-center justify-center">
              <TeacherCustomCalendar onDateChange={setSelectedDate} />
            </div>
            {/* Completed Classes Div  */}
            <div className=" mt-8 p-2">
              <div className="flex flex-row items-center justify-between mb-2">
                <p className="text-base font-medium font-sans">
                  Completed Classes
                </p>
                <p className="text-xs text-customYellow hover:underline cursor-pointer">
                  See all
                </p>
              </div>

              <div className="h-[230px] overflow-y-auto register-scrollbar space-y-4 mr-2 ">
                {compClasses.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-sm text-customLightGray">
                      No completed classes
                    </p>
                  </div>
                ) : (
                  compClasses.map((cls, index) => (
                    <TeacherCompClassesCard
                      key={index}
                      classs={cls}
                      colors={giveCardColors(index)}
                      onClick={handleCard2Click}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        {popup2State.type === undefined && (
          <GiveReviewPopup
            toggleFunc={closePopup2}
            reviewModal={reviewModal}
            toggleReviewModal={toggleReviewModal}
            classs= {popup2State.classs}
            setReviewCompleted={setReviewCompleted}
          />
        )}
      </div>
      {reviewModal && (
        <AddReview
          toggleFunc={toggleReviewModal}
          reviewSubmittedPopup={reviewSubmittedPopup}
          toggleReviewSubmittedPopup={toggleReviewSubmittedPopup}
          classs = {selecetedClass}
          setReviewCompleted={setReviewCompleted}
        />
      )}
      {reviewSubmittedPopup && (
        <ReviewSubmittedPopup toggleFunc={toggleReviewSubmittedPopup} toggleModal={toggleReviewModal} />
      )}
    </>
  );
}
