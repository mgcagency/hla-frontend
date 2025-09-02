import moment from "moment/moment";
import React, { useState } from "react";
import { markTaskComplete } from "../../api/Teacher/taskApi";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

export default function TeacherTaskCard({
  title,
  refetch,
  details,
  deadline,
  status,
  me,
  allData,
}) {
  const [loading, setLoading] = useState(false);

  const handleCompleteTask = async () => {
    setLoading(true);
    const result = await markTaskComplete(allData?._id);
    if(result.success){
      toast.success("Task Completed Succesfully!");
      await refetch();
    }else{
      toast.error("Error occured while completing the task");
    }
    console.log("response for completed task is : ", result)
    setLoading(false);
  };

  return (
    <div className="bg-customTogglePageBgColor w-full max-w-md rounded-xl min-h-32 p-4 font-sans font-normal text-customGray border-2 border-gray-200">
      <div className="flex justify-between items-center w-full mb-2">
        <p className="text-base font-medium">{title}</p>
      </div>
      <div className="text-sm text-customDarkBlue font-light mb-8">
        {details}
      </div>

      <div className="flex flex-row justify-between items-center text-sm">
        <p className="text-customDarkBlue">
          {moment(deadline).format("Do MMM YYYY")}
        </p>

        {loading && <Loader />}

        {!loading && me &&
          (status == "pending" ? (
            <p
              className="text-gray-500 hover:text-gray-400 font-medium cursor-pointer"
              onClick={handleCompleteTask}
            >
              Mark Complete
            </p>
          ) : (
            <p className="text-customGreen font-medium">Completed</p>
          ))}

        {!loading && !me && (
          <div className="text-customGreen font-medium">
            {status == "pending" ? "" : "Completed"}
          </div>
        )}
      </div>
    </div>
  );
}
