import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parents_sidebar_links } from "../../constants/parentsSidebarLinks";
import { IMAGES } from "../../assets";

export default function ParentsSidebar() {
  return (
    <div className="flex flex-col h-screen mx-4">
      {/* Logo Div */}
      <div className="flex-1 flex justify-center bg-white/80 w-32 h-32 ml-4 mt-4 items-center border-b-2 border-customWhite10 ">
      <a href="/teacher/dashboard">
       
        <img
          src={IMAGES.main_logo}
          alt="Academy Logo"
          className="w-[100px] h-[100px]"
        />
        </a>
      </div>

      {/* Sidebar Links Div  */}
      <div className="flex-[4] w-full mt-4 text-customWhite80 mr-5">
        {parents_sidebar_links.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname.includes(item.key);

  const handleClick = () => {
    console.log(item);
    navigate(item.path);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-normal items-center text-sm py-2 pl-3 pr-3 rounded mb-2 cursor-pointer font-inter ${
        isActive
          ? "bg-customYellow/50 text-white"
          : "hover:bg-customYellowLight/50 hover:text-white"
      }`}
    >
      <span className=" mr-3 flex-shrink-0 w-[23px] h-[23px]">{item.icon}</span>
      {item.label}
    </div>
  );
}
