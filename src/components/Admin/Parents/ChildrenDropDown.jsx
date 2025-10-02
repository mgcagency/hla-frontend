import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Loader from "../../Loader/Loader";

export default function ChildrenDropDown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Menu as="div" className=" inline-block text-left">
      <div>
        <MenuButton
          className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-customGray shadow-sm hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {children?.length}
          {isOpen ? (
            <IoIosArrowUp className="-mr-1 h-3 w-3 text-customGray" />
          ) : (
            <IoIosArrowDown className="-mr-1 h-3 w-3 text-customGray" />
          )}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-50 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div className="py-1">
          {children?.map((child, index) => (
            <MenuItem key={index}>
              <div className="flex items-center px-4 py-2 text-sm text-customGray font-medium hover:bg-gray-200 rounded-xl">
                {imageLoading && (
                  <div className="mx-2 h-[30px] w-[30px] flex justify-center items-center">
                    <Loader />
                  </div>
                )}
                <img
                  src={child.photo}
                  alt={child.name}
                  className={`w-6 h-6 rounded-full mr-2 ${
                    imageLoading ? "hidden" : "block"
                  }`}
                  onLoad={handleImageLoad}
                />
                <p>{child.name}</p>
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
