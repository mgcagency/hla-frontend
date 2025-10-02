import moment from "moment/moment";
import React from "react";


export default function TeacherTaskCard({ title, details, deadline, status }) {
  return (
    <div className="bg-customTogglePageBgColor w-full max-w-md rounded-xl min-h-32 p-4 font-sans font-normal text-customGray border-2 border-gray-200">
      <div className="flex justify-between items-center w-full mb-2">
        <p className="text-base font-medium">{title}</p>
      </div>
      <div className="text-sm text-customDarkBlue font-light mb-8">
        {details}
      </div>
      
      <div className="flex flex-row justify-between items-center text-sm">
        <p className="text-customDarkBlue">{moment(deadline).format("Do MMM YYYY") }</p>
        <p className="text-customGreen font-medium">{status == "pending"? "" : "Completed"}</p>
      </div>
      
    </div>
  );
}
