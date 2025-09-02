import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function LandingPageCard({ image, text, alt , selected,  buttonClickFunction}) {
  return (
    <div className={`${selected ? "bg-white" : "bg-customWhite70"} relative w-[150px] h-[154px] pt-[25.02px] pb-[12.46px] px-[37.05px] mb-8 rounded-[14.82px] cursor-pointer`} onClick={buttonClickFunction}>
      {selected && (
        <IoIosCheckmarkCircle className="absolute top-2 left-2 text-customMaroon" size={24}/>
      )}
      <img src={image} alt={alt} className="w-[123.51] h-[123.51]" />
      <p className="text-center font-bold text-lg">{text}</p>
    </div>
  );
}
