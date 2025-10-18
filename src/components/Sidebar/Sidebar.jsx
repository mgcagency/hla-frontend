
import React from "react";
// import mainlogo from "../../assets/new-logo.png";
import mainlogo from "../../assets/RVA-Logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebar_links } from "../../constants/sidebarLinks";
import { IMAGES } from "../../assets";

export default function Sidebar() {
  return (
    // <div className="fixed top-0 left-0 flex flex-col h-screen mx-4">
    <div className="flex flex-col h-screen mx-4">
      {/* Logo Div */}
      <div className="flex-1 w-full flex justify-center items-center border-customWhite10 mt-4 mb-4 ">
        <a href="/admin/dashboard">
        {/* <img src={mainlogo} alt="Academy Logo" className="w-[120px] h-[120px] " /> */}
        <img src={IMAGES.main_logo} alt="Academy Logo" className="w-[120px] h-[120px] " />
        </a>
      </div>

      {/* Sidebar Links Div  */}
      <div className="flex-[4] w-full mt-4 text-customWhite80">
        {sidebar_links.map((item) => (
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
          ? "bg-customYellow text-white"
          : "hover:bg-customYellowLight/50 hover:text-white"
      }`}
    >
      <span className=" mr-3 flex-shrink-0 w-[23px] h-[23px] ">{item.icon}</span>
      {item.label}
    </div>
  );
}
