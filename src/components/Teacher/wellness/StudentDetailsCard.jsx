import React, { useState, useEffect } from "react";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import moment from "moment/moment";

export default function StudentDetailsCard({ student, data, assignedClasses }) {
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    // Function to handle resizing
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 1024);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReportClick = () => {
    navigate("/teacher/wellness/submission-form", {
      state: { student, assignedClasses, data },
    });
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    // Container Div
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor shadow-md">
      {/* name div  */}
      <div className="flex-[4] flex flex-row items-center">
        <p className="ml-2">{data?.formLink}</p>
      </div>
      {/* email  */}
      <div className="flex-[5] flex gap-2">
        <p
          className={` text-sm ${
            student?.submitted == true ? "text-green-600" : "text-red-600"
          }`}
        >
          {student?.submitted == true ? "Submitted" : "Pending"}
        </p>
        <p>
          {student?.submitted == true
            ? moment(student.submittedAt).format("Do MMM YYYY")
            : ""}
        </p>
      </div>

      {loading && <Loader />}

      {student?.submitted == true ? (
        <div
          onClick={handleReportClick}
          className="flex text-customGreen flex-[4] items-center hover:underline cursor-pointer"
        >
          <p>View</p>
          <IoIosArrowForward className="ml-1" />
        </div>
      ) : (
        !loading && (
          <div
            className="flex flex-[4] justify-center"
            onClick={handleReportClick}
          >
            <p className=" bg-customMaroon text-white py-2 px-4 rounded-md text-sm hover:bg-customMaroon/90 cursor-pointer items-center flex justify-center">
              Submit form
            </p>
          </div>
        )
      )}
    </div>
  );
}
