import React, { useState } from "react";
import { TbBell } from "react-icons/tb";
import { IMAGES } from "../../assets";
import { GoDotFill } from "react-icons/go";
import NotificationPopup from "../global/NotificationPopup";

export default function Navbar({ heading, img, name, role }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="flex flex-row w-auto h-[80px] bg-white rounded-tl-3xl pl-10 md:pl-16 items-center">
      {isPopupVisible && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      {/* Heading Div */}
      <div className="flex-1 md:flex-1 lg:flex-[4] pl-10 md:pl-0 flex justify-start ">
        <p className="font-medium font-inter text-2xl">{heading}</p>
      </div>

      {/* SearchBar Div  */}
      <div className="flex flex-1 lg:flex-[2] items-center border border-gray-300 rounded">
        {/* <button className="bg-white px-2 py-3 flex rounded-l-lg items-center justify-center">
          
          <LuSearch className="text-customDarkBlue " size={18}/>
        </button> */}
        <button className="bg-white px-2 py-3 flex rounded-l-lg items-center justify-center">
          {/* <LuSearch /> */}
          <img
            src={IMAGES.search_icon1}
            alt="Search Icon"
            className="w-[18px]  h-[16px]"
          />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-full px-2 py-1"
        />
      </div>

      {/* Notification and Profile Div */}
      <div className="flex-1 md:flex-1 lg:flex-[2] flex items-center ">
        {/* Notification Icon  */}
        <div
          className="flex-1 ml-5 cursor-pointer pr-3 md:pr-2 lg:pr-1 xl:pr-0"
          onClick={togglePopup}
        >
          {isPopupVisible && <NotificationPopup toggleFunc={togglePopup} />}
          <TbBell size={22} />
          <GoDotFill
            className="text-customLightRed absolute top-7 ml-[10px] "
            size={13}
          />
        </div>

        {/* Profile Div  */}
        <div className="flex-[6] flex justify-start items-center border-l border-l-gray-200">
          {/* Profile Icon  */}
          <div className="flex justify-center md:justify-normal md:flex-none pl-3 mdLg:pl-4 lg:pl-5">
            {/* {imageLoading && (
              <div className="mx-2 h-[30px] w-[30px] flex justify-center items-center">
                <Loader2 /> 
              </div>
            )} */}
            {/* <img                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
              src={img || IMAGES?.avatar}
              alt="Profile Pic"
              className={`h-[40px] w-[40px] rounded-full`}
              // onLoad={handleImageLoad}
            /> */}
          </div>

          {/* Text  */}
          <div className="ml-20 flex-1 md:flex-auto md:mr-0 md:ml-4 hidden md:block">
            <p className="font-bold text-customDarkBlue text-sm font-inter">
              {name}
            </p>
            <p className="text-customRoleColor text-xs font-inter">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
