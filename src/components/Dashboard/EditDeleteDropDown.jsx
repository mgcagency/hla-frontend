import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RxPencil1 } from "react-icons/rx";
import { IoMdMore } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";

export default function OptionsDropDown({
  onDelete,
  toggleEditModal,
  classs,
  toggleDeletePopup,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="inline-flex justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMdMore size={20} className="cursor-pointer" />
      </MenuButton>
      <MenuItems
        transition
        className="absolute rounded-xl right-0 z-10 mt-2 w-32 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div className="py-1">
          <MenuItem>
            <div
              onClick={() => toggleEditModal(classs)}
              className="flex items-center px-4 py-2 font-medium text-customGray text-sm hover:bg-gray-200 rounded-lg cursor-pointer"
            >
              <RxPencil1 className="mr-2" size={18} />
              <span>Edit</span>
            </div>
          </MenuItem>
          <MenuItem>
            <div
              onClick={() => toggleDeletePopup(classs)}
              className="flex items-center px-4 py-2 text-sm font-medium text-customLightRed hover:bg-gray-200 rounded-lg cursor-pointer"
            >
              <LuTrash2 className="mr-2" size={18} />
              <span>Delete</span>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
