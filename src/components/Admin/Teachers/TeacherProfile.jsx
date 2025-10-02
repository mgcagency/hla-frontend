import React, { useState } from "react";
import { IMAGES } from "../../../assets";
import { RiCloseLine } from "react-icons/ri";
import Loader from "../../Loader/Loader";

export default function TeacherProfile({ teacher, toggleFunc }) {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="h-screen overflow-y-auto register-scrollbar3 rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans">
      {/* Close button */}
      <div className="flex justify-start p-4">
        <div
          onClick={toggleFunc}
          className="bg-white border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
        >
          <RiCloseLine className="text-customGrayText" />
        </div>
      </div>

      <div className="w-[400px] items-center p-8">
        {/* Heading */}
        <div className="flex justify-center mb-6">
          <p className="mt-6 font-medium text-2xl">Teacher Profile</p>
        </div>

        {/* Teacher Photo */}
        <div className="flex justify-center mb-6">
          {imageLoading && <Loader />}
          <img
            src={teacher?.photo || IMAGES.teacher_avatar}
            alt="Teacher"
            className={`w-24 h-24 rounded-full ${imageLoading ? "hidden" : "block"}`}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Teacher Details */}
        <div className="text-sm space-y-4">
          <div>
            <p className="text-customLightGray mb-1">Name</p>
            <p className="font-medium">{teacher?.name}</p>
          </div>

          <div>
            <p className="text-customLightGray mb-1">Email</p>
            <p className="font-medium">{teacher?.email}</p>
          </div>

          {/* <div>
            <p className="text-customLightGray mb-1">Phone</p>
            <p className="font-medium">{teacher?.phoneNo || "N/A"}</p>
          </div> */}

         <div>
  <p className="text-customLightGray mb-1">Students</p>
  {Array.isArray(teacher?.assignedStudents) && teacher.assignedStudents.length > 0 ? (
    teacher.assignedStudents.map((student, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <img
          src={student.photo || IMAGES.student_avatar}
          alt={student.name}
          className="h-10 w-10 rounded-full"
        />
        <p className="font-normal text-sm">{student.name}</p>
      </div>
    ))
  ) : (
    <p className="font-medium">No students assigned</p>
  )}
</div>
        </div>
      </div>
    </div>
  );
}
