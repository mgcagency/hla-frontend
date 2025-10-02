import React, { createContext, useContext, useState } from "react";
import { getClasses } from "../api/Admin/allClassesApi";

const GetClassesContext = createContext();

export const useGetClasses = () => {
  return useContext(GetClassesContext);
};

export const GetClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchClasses = async () => {
    try {
      const response = await getClasses();
      const result = await response.data;
      setClasses(result);
    } catch (error) {
      console.error("Error fetching the users:", error);
    }
  };

  const getClassesByUserId = async (userId) => {
    let tempArray = classes;
    //  if(!dataFetched) {
    const response = await getClasses();
    const result = await response.data;
    tempArray = result;
    setClasses(result);
    // setDataFetched(true);
    //  }
    const filteredClasses = tempArray.filter((item) => {
      return item.student_id._id === userId || item.teacher_id._id === userId;
    });
    return filteredClasses;
  };

  return (
    <GetClassesContext.Provider
      value={{
        classes,
        fetchClasses,
        getClassesByUserId,
      }}
    >
      {children}
    </GetClassesContext.Provider>
  );
};
