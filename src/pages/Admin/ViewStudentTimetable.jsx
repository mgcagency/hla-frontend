import React, { useState, useRef } from "react";
import Header from "../../components/Navbar/StudentToggleBtnHeader";
import { BsDownload } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { timetableData } from "../../constants/timetableData";
import CustomCalendar from "../../components/Admin/Students/Calendar";
import CompletedClassesCard from "../../components/Admin/Students/StudentCompClassesCard";
import { useLocation, useNavigate } from "react-router-dom";
import { giveCardColors } from "../../utils/CardColors";
import { giveBgColor } from "../../utils/BgColor";
import TimetableCard from "../../components/Admin/Students/TimetableCard";
import { formatSelectedDays } from "../../utils/FormatSelectedDays";
import { statusColor } from "../../utils/StatusColor";
import { groupClassesByDay } from "../../utils/GroupClassesByDay";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ViewStudentTimetable() {
  const [timetableSelectedPage, setTimetableSelectedPage] = useState("Timetable");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPdf, setIsPdf] = useState(false);

  const contentRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleTimetablePageToggle = (page) => setTimetableSelectedPage(page);

  const compClasses = location.state.assignedClasses.filter(
    (cls) => cls.status === "Completed"
  );

  const classesByDay = groupClassesByDay(location.state.assignedClasses);
  const selectedDay = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const selectedDayClasses = classesByDay[selectedDay] || [];

  const getPdfDownload = async () => {
    setIsPdf(true);

    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      unit: "px",
      format: "a4",
      orientation: "landscape",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = Math.min(widthRatio, heightRatio);

    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = 10;

    pdf.addImage(imgData, "PNG", marginX, marginY, canvasWidth, canvasHeight);
    pdf.save(`${location.state.student.name}_report.pdf`);

    setTimeout(() => setIsPdf(false), 500);
  };

  return (
    <div className="flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full space-y-4">
      {/* Header */}
      <Header
        selectedPage={timetableSelectedPage}
        handlePageToggle={setTimetableSelectedPage}
        student={location.state}
      />

      {/* Name and Buttons */}
      <div className="flex flex-col smMd:flex-row justify-between px-10">
        <div className="flex flex-col items-center smMd:flex-row text-customDarkBlue text-sm font-semibold">
          <img
            src={location?.state.student.photo}
            alt="User Image"
            className="w-9 h-9 rounded-full"
          />
          <p className="mb-3 smMd:ml-3 smMd:mb-0">{location?.state.student.name}</p>
        </div>

        <div className="text-white gap-2 text-sm font-normal flex flex-col smMd:flex-row">
          <button
            onClick={getPdfDownload}
            className="bg-customMaroon p-1 px-4 border rounded-md flex flex-row items-center"
            disabled={isPdf}
          >
            <BsDownload size={16} />
            <p className="ml-2">{isPdf ? "Downloading..." : "Download Report"}</p>
          </button>

          <button
            onClick={() => navigate("/admin/schedule_classes")}
            className="bg-customMaroon p-1 px-4 border rounded-md flex flex-row items-center"
          >
            <IoAdd size={16} />
            <p className="ml-2">Schedule New Class</p>
          </button>
        </div>
      </div>

      {/* Main Content to capture */}
      <div ref={contentRef} className="flex flex-col lg:flex-row gap-x-4 px-10 text-customGray font-medium text-lg">
        {/* Timetable */}
        <div className="flex-[2] mr-10">
          <p className="mb-4">Today's Timetable</p>
          <table className="w-full border-collapse text-xs text-customDarkerBlue">
            <tbody>
              {timetableData.map((item, index) => {
                const classForTime = selectedDayClasses.find(
                  (cls) => cls.startTime === item.time
                );
                return (
                  <tr key={index}>
                    <td
                      style={{ width: "8%" }}
                      className={`pb-6 border-r border-gray-300 ${classForTime ? "" : "pb-4"} align-top`}
                    >
                      {item.time}
                    </td>
                    <td style={{ width: "90%" }} className={`${classForTime ? "" : "pb-4"}`}>
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

        {/* Right Panel */}
        <div className="flex-1">
          <div className="flex items-center justify-center">
            <CustomCalendar onDateChange={setSelectedDate} />
          </div>

          {/* Completed Classes */}
          <div className="mt-8 p-2">
            <div className="flex flex-row items-center justify-between mb-2">
              <p className="text-base font-medium font-sans">Completed Classes</p>
            </div>
            <div className="h-[230px] overflow-y-auto register-scrollbar space-y-4 mr-2">
              {compClasses.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <p className="text-sm text-customLightGray">No completed classes</p>
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
  );
}
