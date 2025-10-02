import React, { useEffect, useState } from "react";
import { IMAGES } from "../../assets";
import StudentDropDown from "../Parents/StudentDropDown";

export default function ParentsNavbar({registeredChildren, setSelectedOne}) {
  return (
    <div className="flex flex-row w-full h-[80px] rounded-tl-3xl md:pl-5 items-center font-sans font-medium text-base">
      <StudentDropDown registeredChildren={registeredChildren} setSelectedOne={setSelectedOne}/>
    </div>
  );
}
