import React, { useState } from "react";
import { Loader2 } from "../Loader/Loader";

export default function ProfileCard({ role, name, img }) {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="bg-customWhite50 border-2 border-white rounded-lg py-2 px-4 pr-8 md:px-2 md:pr-4">
      <div>
        <p className="font-sans font-normal text-sm mb-2">{role}</p>
      </div>

      <div className="flex flex-row items-center">
        {imageLoading && (
          <div className="mx-2 h-[30px] w-[30px] flex justify-center items-center">
            <Loader2 /> 
          </div>
        )}
        <img
          src={img}
          alt="Image"
          className={`h-8 w-8 flex-1 flex-shrink-0 flex-grow-0 rounded-full ${
            imageLoading ? "hidden" : "block"
          }`}
          onLoad={handleImageLoad}
        />
        <p className="font-sans font-medium text-xs flex-[5] ml-2">{name}</p>
      </div>
    </div>
  );
}
