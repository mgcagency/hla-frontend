import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Navbar/TeacherToggleBtnHeader";

import { useGetUsers } from "../../contexts/GetUsersContext";

import { useLocation } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import TasksDropDown from "../../components/Admin/Teachers/TasksDropDown";
import TeacherTaskCard from "../../components/Admin/Teachers/TeacherTaskCard";
// import { taskCardDetails } from "../../constants/taskCardDetails";
import AddTask from "../../components/Admin/Teachers/AddTask";
import TaskAddedPopup from "../../components/Admin/Teachers/TaskAddedPopup";
import { useOverLay } from "../../contexts/OverlayContext";
import SelectTeacherPopup from "../../components/Admin/Schedule_Classes/SelectTeacherPopup";
import { getTeacherTasks } from "../../api/Admin/taskApi";

export default function ViewTeacherTasks() {
  const [profileSelectedPage, setProfileSelectedPage] = useState("Tasks");
  const [selectedOption, setSelectedOption] = useState("All");
  const [taskModal, setTaskModal] = useState(false);
  const [selectTPopup, setSelectTPopup] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);

  const navigate = useNavigate();

  const { refetch } = useGetUsers();

  const location = useLocation();

  const { isOverlayEnable, toggleOverlay } = useOverLay();

  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
    toggleOverlay();
  };

  const toggleAddedPopup = () => {
    setAddedPopup(!addedPopup);
  };

  const toggleSelectTPopup = () => {
    setSelectTPopup(!selectTPopup);
  };

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  const getAllTeacherTasks = async () => {
    setLoading(true);
    const data = await getTeacherTasks(location?.state?.teacher?._id);
    setTasks(data);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    const taskCardDetails = getAllTeacherTasks();
    // if(!loading){
    //   const filteredTasks =
    //   selectedOption === "All"
    //   ? taskCardDetails
    //   : taskCardDetails.filter((task) => task.status === "completed");

    //   setTasks(filteredTasks);
    // }
  }, []);

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        {/* Header  */}
        <Header
          selectedPage={profileSelectedPage}
          handlePageToggle={setProfileSelectedPage}
          teacher={location?.state}
        />
        {/* Main Page  */}
        {/* Heading and Add Buttonn Div */}
        <div className="flex flex-row justify-between px-10 pt-10 pb-4">
          <div className="gap-3 flex flex-row items-center">
            <p className="text-lg font-medium">Tasks</p>
            {!isOverlayEnable && (
              <TasksDropDown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            )}
          </div>
          <div className="text-white text-sm font-normal flex flex-col smMd:flex-row">
            <button
              onClick={toggleTaskModal}
              className="bg-customMaroon p-2 px-4 border rounded-md flex flex-row items-center"
            >
              <IoAdd size={16} />
              <p className="ml-2">Assign New Task</p>
            </button>
          </div>
        </div>

        <div>
          {tasks.length == 0 && (
            <div className="py-10 px-10">No tasks to display!</div>
          )}
        </div>

        <div className="px-10 items-stretch flex flex-col mdLg:grid mdLg:grid-cols-2 xl:grid-cols-3 gap-2 gap-y-4">
          {tasks.map((task, index) => (
            <TeacherTaskCard
              key={index}
              title={task.title}
              details={task.content}
              deadline={task.deadline}
              status={task.status}
            />
          ))}
        </div>
        {selectTPopup && <SelectTeacherPopup toggleFunc={toggleSelectTPopup} />}
        {addedPopup && (
          <TaskAddedPopup
            toggleFunc={toggleAddedPopup}
            toggleModal={toggleTaskModal}
          />
        )}
        {taskModal && (
          <AddTask
            refetchTasks={getAllTeacherTasks}
            toggleFunc={toggleTaskModal}
            addedPopup={addedPopup}
            toggleAddedPopup={toggleAddedPopup}
            selectTPopup={selectTPopup}
            toggleSelectTPopup={toggleSelectTPopup}
          />
        )}
      </div>
    </>
  );
}
