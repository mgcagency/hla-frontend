import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function DropDown({ selectedOption, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-customGray shadow-sm hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          {isOpen ? (
            <IoIosArrowUp className="-mr-1 h-3 w-3 text-customGray" />
          ) : (
            <IoIosArrowDown className="-mr-1 h-3 w-3 text-customGray" />
          )}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-customGray font-medium hover:bg-gray-200 rounded-xl"
              onClick={() => {
                setSelectedOption("This Week");
                setIsOpen(false);
              }}
            >
              This Week
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-customGray font-medium hover:bg-gray-200 rounded-xl"
              onClick={() => {
                setSelectedOption("This Month");
                setIsOpen(false);
              }}
            >
              This Month
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-customGray font-medium hover:bg-gray-200 rounded-xl"
              onClick={() => {
                setSelectedOption("Overall");
                setIsOpen(false);
              }}
            >
              Overall
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
