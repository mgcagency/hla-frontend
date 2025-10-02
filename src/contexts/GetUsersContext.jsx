import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../api/Admin/allUserApi";
import { deleteUser } from "../api/Admin/deleteUser";

const GetUsersContext = createContext();

export const useGetUsers = () => {
  return useContext(GetUsersContext);
};

export const GetUserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [users, setUsers] = useState([]);

  const updateUsers = (allUsers) => {
    if (Array.isArray(allUsers)) {
      setUsers(allUsers);
      setTeachers(allUsers.filter((user) => user.role === "teacher"));
      setStudents(allUsers.filter((user) => user.role === "student"));
      setParents(allUsers.filter((user) => user.role === "parent"));
    } else {
      console.error("Expected an array of users");
    }
  };

  const refetch = async () => {
    try {
      const response = await getUsers();
      const allUsers = response.data;
      console.log("refetch called!");
      if (Array.isArray(allUsers)) {
        updateUsers(allUsers);
      } else {
        console.error("Expected an array of users");
      }
    } catch (error) {
      console.error("Error fetching the users:", error);
    }
  };

  return (
    <GetUsersContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        users,
        teachers,
        students,
        parents,
        setUsers,
        updateUsers,
        refetch,
      }}
    >
      {children}
    </GetUsersContext.Provider>
  );
};
