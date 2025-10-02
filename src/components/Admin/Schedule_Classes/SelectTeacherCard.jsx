import React, { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Loader2 } from "../../Loader/Loader";

export default function SelectTeacherCard({
  img,
  name,
  email,
  selected,
  bgColor,
  onClick,
}) {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center rounded-2xl mb-2 w-full ${bgColor} p-3 ${
        selected ? "border border-customMaroon" : ""
      } cursor-pointer`}
    >
      <div className="flex flex-row gap-2">
        {imageLoading && (
          <div className="mx-2 h-[30px] w-[30px] flex justify-center items-center">
            <Loader2 />
          </div>
        )}
        <img
          src={img}
          alt="Student Image"
          className={`w-10 h-10 rounded-full ${
            imageLoading ? "hidden" : "block"
          }`}
          onLoad={handleImageLoad}
        />

        <div className="text-customDarkBlue font-medium">
          <p className="text-sm">{name}</p>
          <p className="text-xxs">{email}</p>
        </div>
      </div>

      <div>
        {selected && (
          <div>
            <IoIosCheckmarkCircle className="text-customMaroon" size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
