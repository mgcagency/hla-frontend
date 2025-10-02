import React, { useEffect, useState } from "react";
import SimpleBackHeader from "../../components/Navbar/SimpleBackHeader";
import { useLocation } from "react-router-dom";
import TeacherScheduledClassesCard from "../../components/Admin/Teachers/TeacherScheduleClassesCard";
import { reviewsAnswers } from "../../constants/teacherReviews";
import { giveBgColor } from "../../utils/BgColor";

export default function ReviewClass() {
  const location = useLocation();
  const [bgColor, setBgColor] = useState("");
  const { selectedClass } = location.state || {};
  const review = selectedClass.review_id.question


  useEffect(() => {
    const bgColors = [
      "bg-customCard1Color",
      "bg-customCard2Color",
      "bg-customCard3Color",
      "bg-customCard4Color",
      "bg-customCard5Color",
      "bg-customCard6Color",
      "bg-customCard7Color",
    ];
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    setBgColor(randomColor);
  }, []);

  const giveTextColor = (text) => {
    if(text === "Yes" || text === "Fully" || text === "Hit" || text === "Exceeded"){
      return "text-customGreen"
    } else if(text.trim().substring(0, 2) === "No" || text === "No" || text === "Not At All"){
      return "text-customLightRed"
    }
    else if(text === "Partially" || text === "Working Towards"){
      return "text-customYellow"
    }
    else {
      return "text-customDarkBlue"
    }
  }

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        <SimpleBackHeader />

        {/* Main Page Content  */}
        <div className="font-sans text-customGray p-6">
          {/* Class Details Div  */}
          <div className="w-10/12 sm:w-8/12 md:w-5/12 lg:w-4/12">
            <p className="font-semibold text-lg mb-2">Class Details</p>
            {selectedClass && (
              <TeacherScheduledClassesCard
              title={selectedClass.title}
              location={selectedClass.location.name}
              teacherName={selectedClass.teacher_id.name}
              teacherImg={selectedClass.teacher_id.photo}
              studentName={selectedClass.student_id.name}
              studentImg={selectedClass.student_id.photo}
              startTime={selectedClass.startTime}
              endTime={selectedClass.endTime}
              days={selectedClass.weekDays}
              dotsMenu={false}
              status={selectedClass.status}
              classs = {selectedClass}
              bgColor={bgColor}
              />
            )}
          </div>

          {/* Teacher Reviews Div */}
          <div className="mt-5">
            <p className="font-semibold text-lg mb-2">Teacher Reviews</p>
            <div>
              <table className="table-fixed w-full border-collapse border border-gray-300 text-base">
                <tbody>
                  {review.map((item, index) => {
                    return (
                      <tr key={index} className="border border-gray-200">
                        <td className="p-2 border border-gray-200 w-1/2">
                          {item.q}
                        </td>
                        <td className={`p-2 border border-gray-200 w-1/2 ${giveTextColor(item.a)}`}>
                          {item.a}
                        </td>
                      </tr>
                    );
                  })}                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
