import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineFilterList,
} from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import ParentDetailsCard from "../../components/Admin/Parents/ParentDetailsCard";
import { parentDetails } from "../../constants/parentDetails";
import AddParent from "../../components/Admin/Parents/AddParent";
import EditParent from "../../components/Admin/Parents/EditParent";
import { useOverLay } from "../../contexts/OverlayContext";
import SelectStudentPopup from "../../components/Admin/Parents/SelectChildrenPopup";
import ParentAddedPopup from "../../components/Admin/Parents/ParentAddedPopup";
import ParentEditedPopup from "../../components/Admin/Parents/ParentEditedPopup";
import ParentDeletedPopup from "../../components/Admin/Parents/ParentDeletedPopup";
import { useGetUsers } from "../../contexts/GetUsersContext";
import { useUser } from "../../contexts/UserContext";
import { IMAGES } from "../../assets";
import Loader from "../../components/Loader/Loader";

export default function ParentPage() {
  // const [parents, setParents] = useState(parentDetails);
  const [searchQuery, setSearchQuery] = useState("");

  const [allChecked, setAllChecked] = useState(false);
  const [parentModal, setParentModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);
  const [editedPopup, setEditedPopup] = useState(false);
  const [deletedPopup, setDeletedPopup] = useState(false);
  const [selectPopup, setSelectPopup] = useState(false);

  const [selectedParent, setSelectedParent] = useState(null);
  const [deletedParent, setDeletedParent] = useState(null);

  const { toggleOverlay } = useOverLay();
  const { parents, refetch } = useGetUsers();

  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const fetchStudents = async () => {
      await refetch();
      setLoading(false);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (parentModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [parentModal]);

  const filteredParents = parents.filter((parent) =>
    parent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const parentsPerPage = 6;

  // Calculate the index range of teachers to display for the current page
  const indexOfLastParent = currentPage * parentsPerPage;
  const indexOfFirstParent = indexOfLastParent - parentsPerPage;
  const currentParents = filteredParents.slice(
    indexOfFirstParent,
    indexOfLastParent
  );

  // Function to handle next page
  const nextPage = () => {
    if (indexOfLastParent < filteredParents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleParentModal = () => {
    setParentModal(!parentModal);
    toggleOverlay();
  };

  const toggleEditModal = (parent) => {
    setSelectedParent(parent);
    setEditModal(!editModal);
    toggleOverlay();
  };

  const toggleAddedPopup = () => {
    setAddedPopup(!addedPopup);
  };

  const toggleEditedPopup = () => {
    setEditedPopup(!editedPopup);
  };

  const toggleSelectPopup = () => {
    setSelectPopup(!selectPopup);
  };

  const toggleDeletedPopup = (parent) => {
    setDeletedParent(parent);
    setDeletedPopup(!deletedPopup);
    toggleOverlay();
  };

  // const toggleCheckbox = (id) => {
  //   setParents((prevParents) =>
  //     prevParents.map((parent) =>
  //       parent.id === id ? { ...parent, checked: !parent.checked } : parent
  //     )
  //   );
  // };

  const toggleAllCheckboxes = () => {
    setAllChecked(!allChecked);
  };

  return (
    // Full Screen
    <>
      <div
        className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full`}
      >
        <div className=" flex-[5] w-full ">
          {/* NavBar  */}
          <Navbar
            heading={"Parents"}
            img={user?.photo}
            name={user?.name}
            role={user?.role}
          />

          {/* Screen Main Content  */}
          <div className="mt-10 w-full px-8 mb-16">
            {/* Buttons & Search Container  */}
            <div className="flex flex-row w-auto justify-between mb-2 font-sans">
              {/* Buttons Div  */}
              <div className="flex flex-1 flex-row flex-wrap md:flex-nowrap text-xxs md:text-xs gap-4 md:gap-0 space-x-2 items-center">
                <button className="flex flex-row justify-center p-2 pr-3 border rounded-lg border-gray-300">
                  <MdOutlineFilterList
                    className="text-customBlue font-bold"
                    size={16}
                  />
                  <p className=" text-customBlue font-medium ml-2">Filters</p>
                </button>
                <button
                  onClick={toggleParentModal}
                  className="flex flex-row items-center justify-center p-2 pr-3 border rounded-lg border-gray-300 bg-customMaroon"
                >
                  <GoPlus color="white" size={15} />
                  <p className="text-white font-normal ml-2">Add Parent</p>
                </button>

                <p className="text-xs text-customDarkBlue font-medium">
                  1 row selected
                </p>
              </div>

              {/* SearchBar Div  */}
              <div className="flex items-center border h-12 border-gray-300 rounded-lg">
                <button className="bg-white px-2 py-3 rounded-l-lg flex items-center justify-center">
                  <img
                    src={IMAGES.search_icon1}
                    alt="Search Icon"
                    className="w-[18px]  h-[16px]"
                  />
                </button>
                <input
                  type="text"
                  placeholder="Search Parent"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="text-sm focus:outline-none active:outline-none rounded-r-lg h-10 w-full px-2 py-1 "
                />
              </div>
            </div>

            {/* Table Headings  */}
            <div className="flex flex-row items-center shadow-md p-3 font-sans font-normal text-xs text-customGrayText bg-customTableHeaderColor border border-gray-200">
              {/* checkbox  */}
              <div
                className="flex-1 cursor-pointer text-customMaroon"
                onClick={toggleAllCheckboxes}
              >
                {allChecked ? (
                  <MdOutlineCheckBox size={20} />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={20}
                    className="text-customLightGray"
                  />
                )}
              </div>

              <p className="flex-[4] ">Name</p>
              <p className="flex-[6] ">Email</p>
              <p className="flex-[4] ">Created At</p>
              <p className="flex-[6] ">Registered Children</p>
            </div>

            {/* Table  */}
            <div>
              {/* {loading && (
                <div className="flex h-40 justify-center items-center">
                  <Loader />
                </div>
              )} */}

              {!loading ? (
                currentParents?.length === 0 ? (
                  <div className="flex h-40 justify-center items-center col-span-full">
                    <p>No parents added</p>
                  </div>
                ) : (
                  <div>
                    {currentParents.map((parent) => (
                      <ParentDetailsCard
                        key={parent._id}
                        parent={parent}
                        // toggleCheckbox={toggleCheckbox}
                        toggleEditModal={toggleEditModal}
                        toggleDeletedPopup={toggleDeletedPopup}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="flex h-40 justify-center items-center">
                  <Loader />
                </div>
              )}
            
              {addedPopup && (
                <ParentAddedPopup
                  name={"John Doe"}
                  toggleFunc={toggleAddedPopup}
                  toggleModal={toggleParentModal}
                />
              )}
              {editedPopup && (
                <ParentEditedPopup
                  toggleFunc={toggleEditedPopup}
                  toggleModal={toggleEditModal}
                />
              )}
              {deletedPopup && (
                <ParentDeletedPopup
                  parent={deletedParent}
                  toggleFunc={toggleDeletedPopup}
                />
              )}
              {selectPopup && (
                <SelectStudentPopup toggleFunc={toggleSelectPopup} />
              )}
            </div>

            {/* Prev & Next Buttons  */}
            <div className="flex flex-row items-center text-customBlue font-sans justify-between p-3 px-4 shadow-md">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className=" flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
              >
                <p className=" text-xs font-medium ml-2">Previous</p>
              </button>
              <p className=" font-medium text-sm">{`${currentPage} out of ${Math.ceil(
                filteredParents.length / parentsPerPage
              )}`}</p>
              <button
                onClick={nextPage}
                disabled={indexOfLastParent >= filteredParents.length}
                className="flex justify-center p-2 pr-3 border rounded-lg border-gray-300"
              >
                <p className="text-xs font-medium ml-2">Next</p>
              </button>
            </div>
          </div>
        </div>
        {parentModal && (
          <AddParent
            toggleFunc={toggleParentModal}
            addedPopup={addedPopup}
            toggleAddedPopup={toggleAddedPopup}
            selectPopup={selectPopup}
            toggleSelectPopup={toggleSelectPopup}
          />
        )}
        {editModal && (
          <EditParent
            parent={selectedParent}
            toggleFunc={toggleEditModal}
            editedPopup={editedPopup}
            toggleEditedPopup={toggleEditedPopup}
            selectPopup={selectPopup}
            toggleSelectPopup={toggleSelectPopup}
          />
        )}
      </div>
    </>
  );
}
