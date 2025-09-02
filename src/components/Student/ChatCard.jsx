import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Loader2 } from "../Loader/Loader";

export default function ChatCard({
  img,
  name,
  lastSeen,
  msgShown,
  status,
  onClick,
  chat,
  currentUserId,
}) {
  const [msgReceived, setMsgReceived] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const getLastMessageContent = () => {
    if (!chat || !chat.messages.length) return "Tap to start messaging";
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage.sender === currentUserId
      ? `You: ${lastMessage.content}`
      : lastMessage.content;
  };

  const isMessageFromCurrentUser = () => {
    if (!chat || !chat.messages.length) return false;
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage.sender === currentUserId;
  };

  // useEffect(() => {
  //   if (msgShown.includes("You:")) {
  //     setMsgReceived(true);
  //   } else {
  //     setMsgReceived(false);
  //   }
  // }, [msgShown]);

  return (
    <div
      onClick={onClick}
      className="flex p-2 items-center relative cursor-pointer"
    >
      {status === true && (
        <GoDotFill
          className="absolute bottom-1 left-1 text-customOnlineColor"
          size={20}
        />
      )}
      {imageLoading && (
        <div className="mx-2 h-8 w-8 mb-4 flex justify-center items-center">
          <Loader2 />
        </div>
      )}
      <img
        src={img}
        alt="Avatar"
        className={`w-9 h-9 rounded-full ${imageLoading ? "hidden" : "block"}`}
        onLoad={handleImageLoad}
      />

      <div className="flex w-full flex-col ml-2">
        <div className="flex justify-between text-customBlackGreyish font-medium ">
          <p className="text-sm">{name}</p>
          <p className="text-xxs text-customLightGrayShade hidden lg:flex">
            {chat ? formatTime(chat?.messages[chat.messages.length - 1].timestamp) : ""}
          </p>
        </div>
        <p
          className={`${
            isMessageFromCurrentUser()
              ? "text-customYellow"
              : "text-customDarkBlue"
          } ${
            !chat
              ? "text-customLightGray"
              : ""
          } text-xs font-medium hidden smMd:flex md:hidden lg:flex`}
        >
          {getLastMessageContent()}
        </p>
      </div>
    </div>
  );
}
