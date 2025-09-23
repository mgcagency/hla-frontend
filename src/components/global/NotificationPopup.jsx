import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";

export default function NotificationPopup({ toggleFunc, notifications = []}) {
  const { user } = useUser();


  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen z-10">
      <div className="w-[300px] bg-white p-4 rounded-3xl shadow-lg">
        <div className="font-semibold text-lg mb-4">Notifications</div>

        {notifications.length === 0 ? (
          <div className="text-gray-500">You currently have no notifications.</div>
        ) : (
        <ul className="space-y-2 max-h-[200px] overflow-y-auto">
  {notifications.map((n, index) => (
    <li key={index} className="bg-gray-100 p-2 rounded-md text-sm">
      {n.messages.map((msg, i) => (
        <div key={i}>
<strong>{msg.sender === user._id ? "You" : n.senderName}:</strong> {msg.content}
          <span className="text-xs text-gray-400">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </li>
  ))}
</ul>
        )}

        <div className="flex justify-end mt-4">
          <button
            className="p-2 px-9 bg-red-500 text-white text-sm rounded-3xl"
            onClick={toggleFunc}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
