import React, { useState } from "react";
import { profileLinks } from "../../constants/profileLinks";
import { IMAGES } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Loader from "../../components/Loader/Loader";
import { useSocket } from "../../contexts/SocketContext";
import { useGetUsers } from "../../contexts/GetUsersContext";
import { editUser } from "../../api/Admin/editUser";
import { ToastContainer, toast } from "react-toastify"

export default function TeacherProfilePage() {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  
  const { disconnectSocket } = useSocket();
  const {refetch} = useGetUsers(); 

  const { user } = useUser();

  const handleLogout = async () => {
    const updateUser = {
      isOnline: false,
    };
    try {
      const response = await editUser(updateUser, user?._id);
      console.log("check the user after update:", response);
      refetch();
      toast.success("Updating Successful");
    } catch (error) {
      toast.error("Failed to update online status ");
      console.error("Error updating online status", error);
    }
    finally{
      await disconnectSocket();
      localStorage.clear();
      navigate("/");
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  return (
    <>
      <div
        className={`flex items-center justify-center p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full space-y-4`}
      >
        <ToastContainer position="bottom-right" />
        <div className="flex flex-col w-[330px] py-10 px-3 rounded-3xl bg-customLightGreyBg font-sans font-semibold text-customDarkBlue">
          {/* Heading  */}
          <div className="flex justify-center text-xl mb-10">My Profile</div>

          {/* Pic and Details */}
          <div className="flex flex-col items-center space-y-4 mb-12">
            {imageLoading && (
              <div className="mx-2 h-8 w-8 mb-4 flex justify-center items-center">
                <Loader />
              </div>
            )}
            <img
              src={user?.photo || IMAGES.student_avatar}
              alt="Avatar"
              className={`w-20 h-20 rounded-full ${
                imageLoading ? "hidden" : "block"
              }`}
              onLoad={handleImageLoad}
            />
            <div className="flex flex-col items-center">
              <p className="text-lg">{user?.name}</p>
              <p className="font-normal text-xs">{user?.email}</p>
            </div>
          </div>

          {/* Buttons  */}
          <div>
            <p className="mb-3 ml-2">Account</p>
            <div>
              {profileLinks.map((item, index) => (
                // <div
                //   key={index}
                //   onClick={item.label === "Log Out" ? handleLogout : null}
                //   className="flex items-center space-x-3 rounded-lg hover:bg-slate-200 p-2 cursor-pointer"
                // >
                <div
                  key={index}
                  onClick={
                    item.label === "Log Out"
                      ? () => setLogoutConfirm(true) // <-- open confirmation
                      : null
                  }
                  className="flex items-center space-x-3 rounded-lg hover:bg-slate-200 p-2 cursor-pointer"
                >
                  <div className={`${item.icon_bg} p-3 rounded-lg`}>
                    <img
                      src={item.icon}
                      alt={`${item.label} icon`}
                      className="w-4 h-4"
                    />
                  </div>
                  {/* <p className="text-customGray font-medium text-sm">
                    {item.label}
                  </p> */}

                  {item.path ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-customGray font-medium text-sm"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <p className="text-customGray font-medium text-sm">{item.label}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
           {/* Logout Confirmation Popup */}
        {logoutConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-2xl p-6 w-80 shadow-lg text-center">
              <h2 className="text-lg font-semibold text-customDarkBlue">
                Confirm Logout
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={() => setLogoutConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="text-white text-sm font-normal bg-customMaroon p-2 px-4 border rounded-md flex flex-row items-center"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
