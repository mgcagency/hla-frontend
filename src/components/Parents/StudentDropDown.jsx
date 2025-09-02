import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IMAGES } from "../../assets";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Loader2 } from "../Loader/Loader";

// const reg_Children = [
//   {
//     st_name: "Alex Jhons",
//     st_img: IMAGES.avatar2,
//   },
//   {
//     st_name: "Natalia Blath",
//     st_img: IMAGES.avatar4,
//   },
//   {
//     st_name: "Jordi Alba",
//     st_img: IMAGES.avatar6,
//   },
// ];

export default function StudentDropDown({
  registeredChildren,
  setSelectedOne,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(registeredChildren[0]);
  const [imageLoading, setImageLoading] = useState(
    new Array(registeredChildren.length).fill(true)
  );

  console.log("selectedStudent", selectedStudent)
  const handleImageLoad = (index) => {
    setImageLoading((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[index] = false;
      return newLoadingState;
    });
  };
  const [imageLoading2, setImageLoading2] = useState(true);
  const handleImageLoad2 = () => {
    setImageLoading2(false);
  };

  const handleClick = (child) => {
    setSelectedOne(child);
    setSelectedStudent(child);
    setIsOpen(false);
  };
  return (
    <Menu as="div" className=" inline-block text-left">
      <div>
        <MenuButton
          className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-customGray shadow-sm hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex-1 flex flex-row items-center space-x-3 ml-20 md:ml-2">
            {imageLoading2 && (
              <div className="mx-2 h-8 w-8 flex justify-center items-center">
                <Loader2 />
              </div>
            )}
            <img
              src={selectedStudent.photo}
              alt="Avatar"
              className={`w-10 h-10 rounded-full ${
                imageLoading2 ? "hidden" : "block"
              }`}
              onLoad={handleImageLoad2}
            />
            <div className="flex flex-col">
              <p className="text-customLightGray text-xs text-start font-medium">
                Student
              </p>
              <p className="text-customDarkBlue text-sm font-medium">
                {selectedStudent.name}
              </p>
            </div>
          </div>
          {isOpen ? (
            <IoIosArrowUp className="-mr-1 mt-3 h-5 w-5 text-customGray" />
          ) : (
            <IoIosArrowDown className="-mr-1 mt-3 h-5 w-5 text-customGray" />
          )}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-50 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div className="py-1">
          {registeredChildren.map((child, index) => (
            <MenuItem key={index} onClick={() => handleClick(child)}>
              <div className="flex items-center px-4 py-2 text-sm text-customGray font-medium hover:bg-gray-200 rounded-xl cursor-pointer">
                {imageLoading[index] && (
                  <div className="mx-2 h-8 w-8 flex justify-center items-center">
                    <Loader2 />
                  </div>
                )}
                <img
                  src={child.photo}
                  alt="student image"
                  className={`w-6 h-6 rounded-full mr-2 ${
                    imageLoading[index] ? "hidden" : "block"
                  }`}
                  onLoad={() => handleImageLoad(index)}
                />
                <p>{child.name}</p>
                {selectedStudent.name === child.name && (
                  <IoIosCheckmarkCircle className="ml-auto text-customMaroon w-5 h-5" />
                )}
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
