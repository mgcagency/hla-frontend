import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../../contexts/GetUsersContext";
import { useLocation } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import TasksDropDown from "../../components/Admin/Teachers/TasksDropDown";
import TeacherTaskCard from "../../components/Teacher/TeacherTaskCard";
import TeacherNavbar from "../../components/Navbar/TeacherNavbar";
import AddTask from "../../components/Admin/Teachers/AddTask";
import TaskAddedPopup from "../../components/Admin/Teachers/TaskAddedPopup";
import { useOverLay } from "../../contexts/OverlayContext";
import SelectTeacherPopup from "../../components/Admin/Schedule_Classes/SelectTeacherPopup";
import { getTeacherTasks } from "../../api/Admin/taskApi";
import { useUser } from "../../contexts/UserContext";
import { getTasksAssignedByMe } from "../../api/Teacher/taskApi";

export default function Tasks() {
  const [selectedOption, setSelectedOption] = useState("All");
  const [taskModal, setTaskModal] = useState(false);
  const [selectTPopup, setSelectTPopup] = useState(false);
  const [addedPopup, setAddedPopup] = useState(false);

  const { isOverlayEnable, toggleOverlay } = useOverLay();

  const { user } = useUser();

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
  const [myTasks, setMyTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  const getAllTeacherTasks = async () => {
    setLoading(true);
    const data = await getTeacherTasks(user?._id);
    const data2 = await getTasksAssignedByMe(user?._id);
    setTasks(data);
    setMyTasks(data2);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    getAllTeacherTasks();
  }, []);

  return (
    <>
      <div className="bg-white w-full h-full rounded-tl-3xl rounded-bl-3xl">
        <TeacherNavbar name={user?.name} img={user?.photo} />
        <div className="flex flex-1 ">
          <div className={`flex flex-col p-2 flex-1 `}>
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
            </div>

            <div>
              {tasks.length == 0 && (
                <div className="py-10 px-10">No tasks to display!</div>
              )}
            </div>

            <div className="px-10 items-stretch flex flex-col gap-2 gap-y-4">
              {tasks &&
                tasks?.map((task, index) => (
                  <TeacherTaskCard
                    refetch={getAllTeacherTasks}
                    key={index}
                    allData={task}
                    me={true}
                    title={task.title}
                    details={task.content}
                    deadline={task.deadline}
                    status={task.status}
                  />
                ))}
            </div>
            {selectTPopup && (
              <SelectTeacherPopup toggleFunc={toggleSelectTPopup} />
            )}
          </div>
          <div className={`flex flex-col p-2 flex-1 border-l border-black/20`}>
            <div className="flex flex-row justify-between px-10 pt-10 pb-4">
              <div className="gap-3 flex flex-row items-center">
                <p className="text-lg font-medium">Tasks I Assigned</p>
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
              {myTasks?.length == 0 && (
                <div className="py-10 px-10">No tasks to display!</div>
              )}
            </div>

            <div className="px-10 items-stretch flex flex-col gap-2 gap-y-4">
              {myTasks &&
                myTasks?.map((task, index) => (
                  <TeacherTaskCard
                    key={index}
                    title={task.title}
                    details={task.content}
                    deadline={task.deadline}
                    status={task.status}
                  />
                ))}
            </div>
            {selectTPopup && (
              <SelectTeacherPopup toggleFunc={toggleSelectTPopup} />
            )}
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
        </div>
      </div>
    </>
  );
}
