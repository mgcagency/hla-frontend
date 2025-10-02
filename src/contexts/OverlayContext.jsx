import React, { createContext, useContext, useState } from "react";

export const OverlayContext = createContext();

export const useOverLay = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }) => {
  const [isOverlayEnable, setIsOverlayEnable] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayEnable(!isOverlayEnable);
  };

  return (
    <OverlayContext.Provider value={{ isOverlayEnable, toggleOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};
