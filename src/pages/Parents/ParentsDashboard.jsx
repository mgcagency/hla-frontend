import React, { useEffect, useState } from "react";
import ParentsNavbar from "../../components/Navbar/ParentsNavbar";
import { timetableData } from "../../constants/timetableData";
import ParentsCustomCalendar from "../../components/Parents/ParentsCustomCalendar";
import ParentsCompClassesCard from "../../components/Parents/ParentsCompClassesCard";
import { useGetClasses } from "../../contexts/GetClassesContext";
import { useUser } from "../../contexts/UserContext";
import { groupClassesByDay } from "../../utils/GroupClassesByDay";
import CompletedClassesCard from "../../components/Admin/Students/StudentCompClassesCard";
import { giveCardColors } from "../../utils/CardColors";
import TimetableCard from "../../components/Admin/Students/TimetableCard";
import { giveBgColor } from "../../utils/BgColor";
import { formatSelectedDays } from "../../utils/FormatSelectedDays";
import { statusColor } from "../../utils/StatusColor";

export default function ParentsDashboard() {
  const [st_classes, setStClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useUser();
  console.log("user here:", user)
  const { classes, getClassesByUserId } = useGetClasses();
  const [selectedOne, setSelectedOne] = useState(user.registeredChildren[0]);

  console.log("selectedOne: ", selectedOne);

  useEffect(() => {
    const getClasses = async () => {
      const filteredClasses = await getClassesByUserId(selectedOne?._id);
      setStClasses(filteredClasses);
    };
    getClasses();
  }, [selectedOne]);

  // console.log("all Classes", st_classes);

  const compClasses = st_classes.filter((cls) => cls.status === "Completed");
  const classesByDay = groupClassesByDay(st_classes);

  const selectedDay = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const selectedDayClasses = classesByDay[selectedDay] || [];

  // console.log("Parent here: ", user);
  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full space-y-4`}
      >
        <ParentsNavbar
          registeredChildren={user.registeredChildren}
          setSelectedOne={setSelectedOne}
        />

        {/* Main Page  */}
        <div className="flex flex-col lg:flex-row gap-x-4 px-10 text-customGray font-medium text-lg">
          {/* Timetable  */}
          <div className="flex-[2] mr-10 ">
            <p className="mb-4">Today's Timetable</p>

            <table className="w-full border-collapse text-xs text-customDarkerBlue ">
              <tbody>
                {timetableData.map((item, index) => {
                  const classForTime = selectedDayClasses.find(
                    (cls) => cls.startTime === item.time
                  );
                  return (
                    <tr key={index}>
                      <td
                        style={{ width: "8%" }}
                        className={`pb-6 border-r border-gray-300 ${
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
                          <TimetableCard
                            bgColor={giveBgColor(index)}
                            title={classForTime.title}
                            classType={classForTime.location.name}
                            days={formatSelectedDays(classForTime.weekDays)}
                            startTime={classForTime.startTime}
                            endTime={classForTime.endTime}
                            status={classForTime.status}
                            statusColor={statusColor(classForTime.status)}
                            teacherName={classForTime.teacher_id.name}
                            teacherImg={classForTime.teacher_id.photo}
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
              <ParentsCustomCalendar onDateChange={setSelectedDate} />
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
                    <CompletedClassesCard
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
