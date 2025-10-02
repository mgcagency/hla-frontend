import React, { useEffect, useState } from "react";

import { IMAGES } from "../../assets";
import { studentTimetableData } from "../../constants/studentTimetableData";
import StudentCustomCalendar from "../../components/Student/StudentCustomCalendar";
import StudentCompClassesCard from "../../components/Student/StudentCompClassesCard";
import StudentNavbar from "../../components/Navbar/StudentNavbar";
import ClassNotStartedPopup from "../../components/Student/ClassNotStartedPopup";
import JoinClassPopup from "../../components/Student/JoinClassPopup";
import { useOverLay } from "../../contexts/OverlayContext";
import { useUser } from "../../contexts/UserContext";
import { useGetClasses } from "../../contexts/GetClassesContext";
import { giveCardColors } from "../../utils/CardColors";
import StudentTimetableCard from "../../components/Student/StudentTimetableCard";
import { formatSelectedDays } from "../../utils/FormatSelectedDays";
import { statusColor } from "../../utils/StatusColor";
import { giveBgColor } from "../../utils/BgColor";
import { groupClassesByDay } from "../../utils/GroupClassesByDay";

export default function StudentDashboard() {
  const [popupState, setPopupState] = useState({ id: null, type: null });
  const [st_classes, setStClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { toggleOverlay, isOverlayEnable } = useOverLay();
  const { classes, getClassesByUserId } = useGetClasses();
  const { user } = useUser();

  useEffect(() => {
    const getClasses = async () => {
      const filteredClasses = await getClassesByUserId(user?._id);
      setStClasses(filteredClasses);
    };
    getClasses();
  }, []);

  // console.log("classes", classes);

  const compClasses = st_classes.filter((cls) => cls.status === "Completed");

  const classesByDay = groupClassesByDay(st_classes);

  const selectedDay = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const selectedDayClasses = classesByDay[selectedDay] || [];

  const handleCardClick = (id, status, classs) => {
    if (status === "Completed") return;
    setPopupState({ id, type: status, classs });
    toggleOverlay();
  };

  const closePopup = () => {
    setPopupState({ id: null, type: null, classs: null });
    toggleOverlay();
  };

  return (
    <>
      <div
        className={`flex flex-col pt-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full space-y-4`}
      >
        <StudentNavbar name={user?.name} img={user?.photo} data={user} />

        {/* Main Page  */}
        <div className="flex flex-col p-2 lg:flex-row gap-x-4 px-10 text-customGray font-medium text-lg">
          {/* Timetable  */}
          <div className="flex-[2] mr-10 ">
            <p className="mb-4">Today's Timetable</p>
            <div>
              {popupState.type !== null &&
                popupState.type !== "On Going" &&
                popupState.type !== "Completed" && (
                  <ClassNotStartedPopup
                    toggleFunc={closePopup}
                    classs={popupState.classs}
                  />
                )}
              {popupState.type === "On Going" && (
                <JoinClassPopup
                  toggleFunc={closePopup}
                  classs={popupState.classs}
                />
              )}
            </div>

            <table className="w-full border-collapse text-xs text-customDarkerBlue ">
              <tbody>
                {studentTimetableData.map((item, index) => {
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
                          <StudentTimetableCard
                            classs={classForTime}
                            bgColor={giveBgColor(index)}
                            status={classForTime.status}
                            statusColor={statusColor(classForTime.status)}
                            onclick={handleCardClick}
                          />
                        ) : (
                          <div>{item.class}</div>
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
              <StudentCustomCalendar onDateChange={setSelectedDate} />
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
                    <StudentCompClassesCard
                      key={index}
                      classs={cls}
                      colors={giveCardColors(index)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
