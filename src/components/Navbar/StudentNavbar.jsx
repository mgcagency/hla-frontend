import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { TbBell } from "react-icons/tb";
import NotificationPopup from "../global/NotificationPopup";
import { Loader2 } from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";

export default function StudentNavbar({ name, img, data }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
   const { socket,initializeSocket } = useSocket();
    const { user } = useUser();
     const [notifications, setNotifications] = useState([]);
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  console.log("sidebar data is : ", data);

  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

   useEffect(() => {
      if (!socket) {
        initializeSocket();
      }
    }, [socket, initializeSocket]);
      // Listen for notifications
    useEffect(() => {
    if (!socket || !user?._id) return;
  
    // Handler for receiving notifications
    const handleNotification = (data) => {
      setNotifications(prev => [data, ...prev]);
    };
  
    // Listen on a user-specific event (you can also use a generic event if you prefer)
    socket.on(`receive-notification-${user._id}`, handleNotification);
  
    return () => {
      socket.off(`receive-notification-${user._id}`, handleNotification);
    };
  }, [socket, user]);

  return (
    <div className="flex flex-row w-full h-[70px] rounded-tl-3xl md:pl-10 items-center font-sans font-medium text-base">
      {isPopupVisible && (
        <div className="bg-black fixed inset-0 opacity-50"></div>
      )}
      <div className=" flex flex-row items-center space-x-3 ml-20 md:ml-2">
        {imageLoading && (
          <div className="mx-2 h-8 w-8 flex justify-center items-center">
            <Loader2 />
          </div>
        )}
        <img
          src={img}
          alt="Student Avatar"
          className={`w-10 h-10 rounded-full ${
            imageLoading ? "hidden" : "block"
          }`}
          onLoad={handleImageLoad}
        />
        <div onClick={() =>{navigate("/student/chats")}} className="flex flex-col gap-1">
          <p className="text-customDarkBlue text-sm font-medium">{name}</p>
          <p className="text-sm hover:underline hover:text-customMaroon cursor-pointer">{data?.teacher?.name}</p>
        </div>
      </div>

      {/* Notification Icon  */}
      <div className="flex-1 ml-5 relative  border-l border-l-gray-200 pl-4 pr-3 md:pr-2 lg:pr-1 xl:pr-0">
        {isPopupVisible && <NotificationPopup toggleFunc={togglePopup} notifications={notifications} />}
        <TbBell size={22} />
        {notifications.length > 0 && (
        <GoDotFill
          className="text-customLightRed absolute top-0 ml-[10px]"
          size={13}
          onClick={togglePopup}
        />
        )}
      </div>
    </div>
  );
}
