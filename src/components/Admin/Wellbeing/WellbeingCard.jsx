import React from "react";
import EditDeleteDropDown from "./EditDeleteDropDown";

export default function WellbeingCard({ wellbeing, toggleDeletePopup, menu }) {
  return (
    <div className="bg-customMaroon w-full max-w-md rounded-xl min-h-64 p-4 font-sans  text-white">
      <div className="flex justify-between items-center w-full mb-2">
        <p className="text-xl font-medium">{wellbeing?.title}</p>
        {menu && (
          <EditDeleteDropDown
            wellbeing={wellbeing}
            toggleDeletePopup={toggleDeletePopup}
          />
        )}
      </div>
      <div className="text-sm text-customWhite70 font-light">
        {wellbeing?.content}
      </div>
      <br />
      {wellbeing?.link && 
      <a target="_blank" className="text-white hover:text-white/80 text-sm font-bold cursor-pointer" href={wellbeing?.link}>
        See Our Policy Here
      </a>
      }
    </div>
  );
}
