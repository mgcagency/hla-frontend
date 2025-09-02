import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RxPencil1 } from "react-icons/rx";
import { IoMdMore } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function OptionsDropDown({ wellbeing, toggleDeletePopup }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    toggleDeletePopup(wellbeing);
  }

  const handleEditClick = () => { 
    navigate(`/admin/wellbeing/edit-wellbeing`, {
      state : wellbeing
    }
    );
  }

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
          <MenuItem onClick={handleEditClick}>
            <div className="flex items-center px-4 py-2 font-medium text-customGray cursor-pointer text-sm hover:bg-gray-200 rounded-lg">
              <RxPencil1 className="mr-2" size={18} />
              <span>Edit</span>
            </div>
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>
            <div className="flex items-center px-4 py-2 text-sm font-medium text-customLightRed cursor-pointer hover:bg-gray-200 rounded-lg">
              <LuTrash2 className="mr-2" size={18} />
              <span>Delete</span>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
