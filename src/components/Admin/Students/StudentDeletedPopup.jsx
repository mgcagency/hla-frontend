import React, { useEffect, useState } from "react";
import { GoCheck } from "react-icons/go";
import { LuTrash2 } from "react-icons/lu";
import { IMAGES } from "../../../assets";
import { deleteUser } from "../../../api/Admin/deleteUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUsers } from "../../../contexts/GetUsersContext";
import { Loader2 } from "../../Loader/Loader";

export default function StudentDeletedPopup({ student, toggleFunc }) {
  const { refetch } = useGetUsers();
  
  const [loader, setLoader] = useState(false);

  const handleDeleteClick = async () => {
    setLoader(true);
    console.log("delete function called: ", student?._id);
    try {
      await deleteUser(student?._id);
      refetch();
      toast.success("User Deleted Successfully");
      toggleFunc();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", error);
    }
    setLoader(false);
  };

  

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen w-auto z-10">
        <ToastContainer position="bottom-right" />

        <div className="w-[320px] bg-customPopupBgColor p-4 rounded-3xl font-sans space-y-3 border border-gray-300">
          <div className="flex-1 flex flex-row items-center p-2 ">
            <LuTrash2 className="text-customLightRed" size={25} />
            <p className="text-customLightRed font-semibold text-xl ml-3">
              Delete
            </p>
          </div>

          <div className="flex-[2] font-normal text-sm text-customPopupTextColor mb-2">
            Are you sure you want to delete{" "}
            <span className="name font-semibold text-customDarkBlue">
              <span className="items-center">
                <img
                  src={student?.photo || IMAGES.student_avatar}
                  alt="avatar"
                  className="w-6 h-6 mr-1 inline-block "
                />
                {student?.name}
              </span>
            </span>{" "}
            from the system?
          </div>

          <div className="flex-[2] font-normal text-sm text-customPopupTextColor mb-2">
            This action cannot be undone. Deleting this student will remove all
            their data.
          </div>

          <div className=" flex flex-col space-y-2 items-center justify-center">
            <button
              className="p-2 px-9 bg-customCancelBtnColor text-customGray text-sm font-normal rounded-3xl w-full"
              onClick={toggleFunc}
            >
              Cancel
            </button>
            {loader ? (
              <Loader2 />
            ) : (
              <button
                className="p-2 px-9 bg-customLightRed text-white text-sm font-normal rounded-3xl w-full"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
