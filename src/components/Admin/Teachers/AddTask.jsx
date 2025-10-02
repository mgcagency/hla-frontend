import React, { useState } from "react";
import { IMAGES } from "../../../assets";
import { RiCloseLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import "react-phone-input-2/lib/style.css";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import SelectTeacherPopup from "../Schedule_Classes/SelectTeacherPopup";
import { assignTask } from "../../../api/Admin/taskApi";
import { useUser } from "../../../contexts/UserContext";

export default function AddTask({
  toggleFunc,
  toggleAddedPopup,
  addedPopup,
  selectTPopup,
  refetchTasks,
  toggleSelectTPopup,
}) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const {user} = useUser();

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { refetch } = useGetUsers();

  const handleConfirmClick = async () => {
    setLoader(true);
    toggleAddedPopup();
    console.log("title : ", title);
    console.log("details : ", details);
    console.log("deadline : ", deadline);
    console.log("selectedteacher : ", selectedTeacher);
    if (title !== "" && details !== ""  && deadline !== "" && selectedTeacher) {
      const newTask = {
        title,
        content: details,
        deadline,
        status: "pending",
        teacher: selectedTeacher?._id,
        assignedBy: user._id
      };

      try {
        const response = await assignTask(newTask);
        console.log("add task resp is : ", response);
        await refetch();
        toast.success("Task Added Successful"); // Show success message
        await refetchTasks();
        toggleAddedPopup();
      } catch (error) {
        toast.error("Failed to add task ");
        console.error("Error adding all tasks:", error);
      }
    } else {
      toast.error("Please fill all the fields.");
    }
    setLoader(false);
  };

  return (
    <div className="h-screen rounded-l-3xl bg-customNewStudentCardColor absolute flex justify-end right-0 font-sans ">
      {addedPopup && <div className="bg-black fixed inset-0 opacity-50"></div>}
      <ToastContainer position="bottom-right" />

      <div className=" w-[400px]  items-center">
        {/* close button  */}
        <div className="flex justify-start flex-1">
          <div
            onClick={toggleFunc}
            className="bg-white mt-3 ml-4 border border-gray-200 rounded-full w-[35px] h-[35px] shadow-xl flex justify-center items-center cursor-pointer"
          >
            <RiCloseLine className="text-customGrayText" />
          </div>
        </div>
        {/* Heading  */}
        <div className="flex flex-1 justify-center mb-4">
          <p className=" mt-6 font-medium text-2xl">New Task</p>
        </div>

        {/* Form  */}
        <div className="flex-[5] p-8 text-xs ">
          {/* <form action=""> */}
          {/* Title Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Title</p>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Task Title"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Details Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Details</p>
            <textarea
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter Task Details"
              maxLength={500}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Deadline Field  */}
          <div className="mb-4">
            <p className="text-customLightGray mb-1 ">Deadline</p>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Enter Task Title"
              maxLength={35}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Select Teacher Field  */}
          <div className="mb-5">
            {!selectedTeacher ? (
              <>
                <p className="text-customLightGray mb-1 ">Assign To</p>
                <div
                  onClick={toggleSelectTPopup}
                  className="w-full px-4 py-2 text-sm text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <p>+ Assign Teacher</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-customLightGray mb-1 ">Assign To</p>
                </div>
                <div
                  onClick={toggleSelectTPopup}
                  className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
                >
                  <div className="relative inline-block">
                    <img
                      src={selectedTeacher.photo}
                      alt="teacher avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <p className="font-normal text-sm">{selectedTeacher.name}</p>
                </div>
              </>
            )}
          </div>

          {/* </form> */}
          {/* Register Button  */}
          <div className="w-full flex items-center justify-center mt-10 mb-8">
            {loader ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleConfirmClick}
                className="bg-customMaroon w-7/10 rounded-3xl py-3"
              >
                <p className=" text-white font-medium text-base">Confrim</p>
              </button>
            )}
          </div>
        </div>
      </div>
      {selectTPopup && (
        <SelectTeacherPopup
          toggleFunc={toggleSelectTPopup}
          setSelectedTeacher={setSelectedTeacher}
          selectedTeacher={selectedTeacher}
        />
      )}
    </div>
  );
}
