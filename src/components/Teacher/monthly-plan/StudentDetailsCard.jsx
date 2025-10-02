import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import Loader from "../../Loader/Loader";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { submitMonthlyPlan } from "../../../api/Teacher/monthlyPlan";
import DriveUpload from "../../../utils/driveUpload";

export default function StudentDetailsCard({ student, data }) {

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async () => {
    setLoading(true);
    const resp = await submitMonthlyPlan(
      { user: student.user, fileUrl: "file url from UI of teacher" },
      data?._id
    );
    console.log("function resp is : ", resp);
    if (resp.success) {
      toast.success("Form submitted successfully!");
    }
    setLoading(false);
  };

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 1024);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row w-full items-center p-3 text-xs lg:text-sm text-customStudentCardTextColor shadow-md">
      {/* name div  */}
      <div className="flex-[4] flex flex-row items-center">
        <p className="ml-2">{data?.month || "jan"}</p>
      </div>
      {/* email  */}
      <div className="flex-[5] flex gap-2">
        <p className={` text-sm ${ student?.submitted == true ? "text-green-600" : "text-red-600" }`}>
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
          onClick={() =>{}}
          className="flex text-customGreen flex-[4] items-center hover:underline cursor-pointer"
        >
          <p>doc name </p>
          <IoIosArrowForward className="ml-1" />
        </div>
      ) : (
        !loading && (
          <div
            className="flex flex-[4]"
            onClick={handleSubmitForm}
          >
            <input type="text" className="hidden" id="form" />
            <label
              htmlFor="form"
              className=" bg-customMaroon text-white py-2 px-4 rounded-md text-sm hover:bg-customMaroon/90 cursor-pointer items-center flex justify-center"
            >
              Upload
            </label>
          </div>
        )
      )}

      {/* <DriveUpload /> */}
    </div>
  );
}
