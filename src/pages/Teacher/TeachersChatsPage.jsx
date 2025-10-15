import React, { useEffect, useRef, useState } from "react";
import TeacherNavbar from "../../components/Navbar/TeacherNavbar";
import ChatCard from "../../components/Teacher/ChatCard";
import { IoIosCheckmark } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { BiSolidMessageRoundedDetail, BiSolidMicrophone } from "react-icons/bi";
import { HiPaperClip } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { useGetUsers } from "../../contexts/GetUsersContext";
import Loader, { Loader2 } from "../../components/Loader/Loader";
import { editUser } from "../../api/Admin/editUser";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router-dom";

export default function TeacherChatsPage() {
  const [message, setMessage] = useState({
    members: [],
    messages: [
      {
        sender: "",
        content: "",
        mediaType: "text",
        timestamp: new Date(),
      },
    ],
  });
  const [allMsgs, setAllMsgs] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const buttonRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const { socket, initializeSocket } = useSocket();
  const { user } = useUser();
  const { students, refetch } = useGetUsers();
  const location = useLocation();

  // Fetch students
  useEffect(() => {
    setLoading(true);
    const fetchStudents = async () => {
      await refetch();
      setLoading(false);
    };
    fetchStudents();
  }, []);

  const handleImageLoad = () => setImageLoading(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      buttonRef.current.click();
    }
  };

    // 🔹 Upload file to Firebase
    const uploadFile = async (file) => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `chat_uploads/${Date.now()}_${file.name}`);
        const response = await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(response.ref);
        return fileUrl;
      } catch (err) {
        console.error("Upload failed:", err);
        toast.error("Upload failed");
        return null;
      }
    };

  // ---------- SEND TEXT MESSAGE ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.messages[0].content?.trim()) return;

    socket.emit("message", message);
    setAllMsgs((prevMsgs) => [...prevMsgs, message.messages[0]]);
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
  };

  // ---------- HANDLE ATTACHMENT ----------
  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // upload to Firebase
    const fileUrl = await uploadFile(file);
    if (!fileUrl) return;

    let mediaType = "file";
    if (file.type.startsWith("image/")) {
      mediaType = "image";
    }

    const newMsg = {
      sender: user._id,
      content: fileUrl,
      mediaType,
      timestamp: new Date(),
    };

    socket.emit("message", { ...message, messages: [newMsg] });
    setAllMsgs((prev) => [...prev, newMsg]);
  };

  // ---------- HANDLE MICROPHONE ----------
  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const audioFile = new File([audioBlob], `audio_${Date.now()}.webm`, {
            type: "audio/webm",
          });

          const audioUrl = await uploadFile(audioFile);

          const newMsg = {
            sender: user._id,
            content: audioUrl,
            mediaType: "audio",
            timestamp: new Date(),
          };

          socket.emit("message", { ...message, messages: [newMsg] });
          setAllMsgs((prev) => [...prev, newMsg]);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Microphone error:", error);
        toast.error("Unable to access microphone.");
      }
    }
  };

  // ---------- SOCKET ----------
  useEffect(() => {
    initializeSocket();
  }, [initializeSocket]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", async () => {
        try {
          await editUser({ isOnline: true }, user?._id);
          refetch();
        } catch (error) {
          console.error("Error updating online status", error);
        }
      });

      socket.on("receive-message", (data) => {
        setAllMsgs((prevMsgs) => [...prevMsgs, data.messages[0]]);
      });

      return () => {
        socket.off("connect");
        socket.off("receive-message");
      };
    }
  }, [socket]);

const handleUserSelect = (selectedUser) => {
  setSelectedUser(selectedUser);
  setMessage((prevMessage) => ({
    ...prevMessage,
    members: [user._id, selectedUser._id],
  }));
  socket.emit("get-chats", [user?._id, selectedUser?._id]);
};

  // socket?.on("chat-history", (data) => {
  //   setAllMsgs(data.messages);
  // });
  useEffect(() => {
  if (socket) {
    socket.on("chat-history", (data) => {
      if (data && data.messages) {
        setAllMsgs(data.messages);
      }
    });

    socket.on("receive-message", (data) => {
      if (data && data.messages) {
        setAllMsgs((prevMsgs) => [...prevMsgs, data.messages[0]]);
      }
    });

    return () => {
      socket.off("chat-history");
      socket.off("receive-message");
    };
  }
}, [socket]);



 useEffect(() => {
  if (socket && location.state?.selectedUser) {
    handleUserSelect(location.state.selectedUser);
  }
}, [socket, location.state]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col pt-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full font-sans">
      <ToastContainer position="bottom-right" />

      <TeacherNavbar name={user?.name} img={user?.photo} />

      <div className="flex flex-row max-h-screen">
        {/* Left Sidebar */}
        <div className="flex-1 bg-customLightGreyBg pl-2 pr-4 py-5 mb-4 rounded-tr-3xl rounded-bl-3xl">
          <div className="text-customDarkBlue flex justify-center font-medium text-base mb-6">
            Conversations
          </div>

          {loading ? (
            <div className="h-[73vh] flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="overflow-y-auto h-[73vh] register-scrollbar2">
              {students.map((item, index) => {
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

        {/* Right Chat Section */}
        {!selectedUser ? (
          <div className="flex-[2] flex flex-col pr-4 py-5 items-center">
            <p className="flex-1"> No chat selected </p>
            <div className="flex-[10] flex flex-col items-center justify-center mb-12">
              <BiSolidMessageRoundedDetail size={100} color="lightgray" />
              <p className="text-customGrayText">
                Select a student to start chatting
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-[2] flex flex-col pr-4 py-5">
            {/* Header */}
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
                    {selectedUser?.isOnline && (
                      <GoDotFill className="text-customOnlineColor" />
                    )}
                    <p
                      className={`text-customLightGrayShade text-xxs font-normal text-start ${
                        selectedUser?.isOnline ? "" : "ml-1"
                      }`}
                    >
                      {selectedUser?.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body + Footer */}
            <div className="flex-[10] flex flex-col-reverse pl-4">
              {/* Footer */}
              <div className="flex flex-row items-center mt-4">
                <div className="flex flex-row w-full items-center space-x-2 px-1 pr-4 border-gray-300 rounded-lg shadow-lg">
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
                            mediaType: "text",
                            sender: user._id,
                            timestamp: new Date(),
                          },
                        ],
                      })
                    }
                  ></textarea>

                  {/* Mic */}
                  <BiSolidMicrophone
                    className={`${
                      isRecording ? "text-red-500" : "text-customMsgIconsColor"
                    } w-5 h-5 cursor-pointer`}
                    onClick={handleMicClick}
                  />

                  {/* Paperclip */}
                  <HiPaperClip
                    className="text-customMsgIconsColor w-5 h-5 cursor-pointer"
                    onClick={handleAttachmentClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Send */}
                <div
                  ref={buttonRef}
                  onClick={handleSubmit}
                  className="rounded-full p-2 ml-2 bg-customMaroon cursor-pointer"
                >
                  <RiSendPlaneFill className="text-white" />
                </div>
              </div>

              {/* Messages */}
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
                            ? "flex px-4 p-3 rounded-l-3xl rounded-tr-3xl ml-auto max-w-[90vh] bg-customMaroon"
                            : "flex p-3 max-w-[90vh] rounded-r-xl rounded-bl-xl bg-customYellowShade"
                        }`}
                      >
                        {msg.mediaType === "audio" ? (
                          <audio controls src={msg.content} />
                        ) : msg.mediaType === "image" ? (
                          <img
                            src={msg.content}
                            alt="attachment"
                            className="max-w-[200px] max-h-[200px] rounded-md"
                          />
                        ) : msg.mediaType === "file" ? (
                          <a
                            href={msg.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-500"
                          >
                            File Attachment
                          </a>
                        ) : (
                          <div className="flex flex-row">
                            <p
                              className={`${
                                msg.sender !== user?._id
                                  ? "text-black text-sm"
                                  : "text-white text-sm"
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
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
