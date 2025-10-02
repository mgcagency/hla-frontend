import React, { useEffect, useRef, useState } from "react";
import StudentNavbar from "../../components/Navbar/StudentNavbar";
import { IMAGES } from "../../assets";
import ChatCard from "../../components/Student/ChatCard";
import { chatsCardDetails } from "../../constants/chatsCardDetails";
import { IoIosCheckmark, IoMdMore } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidMessageRoundedDetail, BiSolidMicrophone } from "react-icons/bi";
import { HiPaperClip } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";
import { useGetUsers } from "../../contexts/GetUsersContext";
import Loader, { Loader2 } from "../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify"
import { editUser } from "../../api/Admin/editUser";

export default function StudentChatsPage() {
  const [message, setMessage] = useState({
    members: [],
    messages: {
      sender: "",
      content: "",
      mediaType: "text",
      timestamp: new Date(),
    },
  });
  const [allMsgs, setAllMsgs] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [sentMsg, setSentMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [receiveMsg, setReceiveMsg] = useState("");
  const { socket, initializeSocket, disconnectSocket } = useSocket();
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const buttonRef = useRef(null);

  const { user } = useUser();
  const { teachers, students, refetch } = useGetUsers();

  useEffect(() => {
    setLoading(true);
    const fetchStudents = async () => {
      await refetch();
      setLoading(false);
    };

    fetchStudents();
  }, []);

  // console.log("teachers: ", teachers)

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      buttonRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.messages[0].content.trim()) return;
    socket.emit("message", message);
    setSentMsg(message.messages[0].content);
    setMessage((prevMessage) => ({
      ...prevMessage,
      messages: [
        {
          sender: user._id,
          content: "",
          mediaType: "text",
          timestamp: new Date(),
        },
      ],
    }));
    setAllMsgs((prevMsgs) => [...prevMsgs, message.messages[0]]);

    setSentMsg("");
  };

  useEffect(() => {
    socket?.emit("get-all-chats", user?._id);
    socket?.on("all-chats", (data) => {
      setAllChats(data);
    });
  }, [socket]);

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
    setMessage((prevMessage) => ({
      ...prevMessage,
      members: [user._id, selectedUser._id],
    }));

    socket.emit("get-chats", [user?._id, selectedUser?._id]);
  };

  socket?.on("chat-history", (data) => {
    setAllMsgs(data.messages);
  });

  useEffect(() => {
    initializeSocket();
  }, [initializeSocket]);

  useEffect(() => {
    if (socket) {
      console.log("Socket initialized, setting up event listeners...");

      socket.on("connect", async () => {
        console.log("connected", user?.name);
        const updateUser = {
          isOnline: true,
        };
        try {
          const response = await editUser(updateUser, user?._id);
          console.log("check the user after update:", response);
          refetch();
          // toast.success("Updating Successful"); 
        } catch (error) {
          // toast.error("Failed to update online status ");
          console.error("Error updating online status", error);
        }
      });

      socket.on("receive-message", (data) => {
        console.log("Received message:", data.messages[0]);
        // setReceiveMsg(data.messages[0].content);
        setAllMsgs((prevMsgs) => [...prevMsgs, data.messages[0]]);
      });

      return () => {
        socket.off("connect");
        socket.off("receive-message");
      };
    }
  }, [socket]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div
        className={`flex flex-col pt-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full font-sans`}
      >
        <ToastContainer position="bottom-right" />
        <StudentNavbar name={user?.name} img={user?.photo} />

        {/* Main Content Div  */}
        <div className="flex flex-row max-h-screen">
          {/* Left Div  */}
          <div className="flex-1 bg-customLightGreyBg pl-2 pr-4 py-5 mb-4 rounded-tr-3xl rounded-bl-3xl">
            {/* Heading */}
            <div className="text-customDarkBlue flex justify-center font-medium text-base mb-6">
              Conversations
            </div>

            {/* Chat Card  */}
            {loading ? (
              <div className="h-[73vh] flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="overflow-y-auto h-[73vh] register-scrollbar2 ">
                {teachers.map((item, index) => {
                  const chat = allChats.find(
                    (chat) =>
                      chat.members.includes(user._id) &&
                      chat.members.includes(item._id)
                  );
                  return (
                    <ChatCard
                      key={index}
                      img={item?.photo}
                      name={item?.name}
                      lastSeen={item.lastSeen}
                      msgShown={item.msgShown}
                      status={item?.isOnline}
                      onClick={() => handleUserSelect(item)}
                      chat={chat}
                      currentUserId={user._id}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Div  */}
          {!selectedUser ? (
            <div className="flex-[2] flex flex-col pr-4 py-5 items-center ">
              <p className="flex-1"> No chat selected </p>
              <div className="flex-[10] flex flex-col items-center justify-center mb-12">
                <BiSolidMessageRoundedDetail size={100} color="lightgray" />
                <p className="text-customGrayText">
                  Select a teacher to start chatting
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-[2] flex flex-col pr-4 py-5 ">
              {/* Top Div  */}
              <div className="flex-1 flex flex-row space-x-3 items-center pl-3 pr-6 py-2 border-y border-y-gray-200">
                <div className="flex-shrink-0">
                  {imageLoading && (
                    <div className="mx-2 h-8 w-8 mb-4 flex justify-center items-center">
                      <Loader2 />
                    </div>
                  )}
                  <img
                    src={selectedUser?.photo}
                    alt="Student Avatar"
                    className={`w-12 h-12 rounded-full ${
                      imageLoading ? "hidden" : "block"
                    }`}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-sm text-customBlackGreyish font-semibold">
                      {selectedUser?.name}
                    </p>
                    <div className="flex flex-row items-center -ml-1">
                    {selectedUser?.isOnline === true ? <GoDotFill className="text-customOnlineColor" />: null}
                      <p className={`text-customLightGrayShade text-xxs font-normal text-start ${selectedUser?.isOnline === true ? "" : "ml-1"}`}>
                      {selectedUser?.isOnline === true ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex flex-row space-x-3 items-center">
                    <FiPhone size={18} />
                    <SlOptionsVertical size={16} />
                  </div> */}
                </div>
              </div>

              {/* Bottom Div  */}
              <div className="flex-[10] flex flex-col-reverse pl-4">
                {/* Footer Div  */}
                <div className="flex flex-row items-center mt-4">
                  <div className="flex flex-row w-full items-center space-x-2 px-1 pr-4 border-gray-300 rounded-lg shadow-lg focus-within:outline-none focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500">
                    <textarea
                      rows="1"
                      placeholder="Type your message..."
                      onKeyDown={handleKeyPress}
                      className="w-full px-3 py-2 text-sm outline-none resize-none overflow-hidden rounded-l-lg"
                      value={message?.messages[0]?.content || ""}
                      onChange={(e) =>
                        setMessage({
                          ...message,
                          messages: [
                            {
                              ...message.messages[0],
                              content: e.target.value,
                              sender: user._id,
                              timestamp: new Date(),
                            },
                          ],
                        })
                      }
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                    ></textarea>
                    <BiSolidMicrophone className="text-customMsgIconsColor w-5 h-5" />
                    <HiPaperClip className="text-customMsgIconsColor w-5 h-5" />
                  </div>
                  {/* send Button */}
                  <div
                    ref={buttonRef}
                    onClick={handleSubmit}
                    className="rounded-full p-2 ml-2 bg-customMaroon items-center justify-center cursor-pointer"
                  >
                    <RiSendPlaneFill className="text-white" />
                  </div>
                </div>
                {/* Chat Area Div  */}
                <div className="h-[62vh] register-scrollbar2 flex flex-col-reverse gap-y-1 overflow-y-auto">
                  {allMsgs
                    .slice()
                    .reverse()
                    .map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.sender === user?._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.sender !== user?._id && (
                          <img
                            src={selectedUser?.photo}
                            className="w-6 h-6 rounded-full"
                            alt="User Avatar"
                          />
                        )}
                        <div
                          className={` ${
                            msg.sender === user?._id
                              ? "flex px-4 p-3 rounded-l-3xl rounded-tr-3xl md:rounded-l-full md:rounded-tr-full ml-auto max-w-[90vh]  bg-customMaroon"
                              : "flex p-3 max-w-[90vh] rounded-r-xl rounded-bl-xl sm:rounded-r-3xl sm:rounded-bl-3xl md:rounded-r-full md:rounded-bl-full bg-customYellowShade "
                          }`}
                        >
                          <div className="flex flex-row">
                            <p
                              className={`${
                                msg.sender !== user?._id
                                  ? "text-black text-sm font-normal"
                                  : "text-white text-sm font-normal"
                              }`}
                            >
                              {msg.content}
                            </p>
                            <div
                              className={`flex flex-row ml-7 mt-[2px] ${
                                msg.sender !== user?._id
                                  ? "text-customGray"
                                  : "text-customLightGray"
                              } text-xxs font-medium`}
                            >
                              <p className="mt-[2px]">
                                {formatTime(msg.timestamp)}
                              </p>
                              <IoIosCheckmark size={18} />
                              {/* {msg.sender === user?._id && (
                            )} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
