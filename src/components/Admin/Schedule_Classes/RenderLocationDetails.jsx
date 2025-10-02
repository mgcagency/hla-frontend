import React from "react";

export const renderLocationDetails = ({
  selectedLocation,
  url,
  setUrl,
  setOffsiteAddress, 
  offsiteAddress,
  coords,
  setCoords,
}) => {
  if (selectedLocation === null) return null;

  const location = selectedLocation;
  if (location.name === "Student's Home" || location.name === "Face to Face") {
    return null;
  } else if (location.name === "Off-site") {
    return (
      <>
        <div className="flex flex-row items-center text-customYellow font-sans text-sm font-medium gap-1">
          {location.icon}
          <p>{location.title}</p>
        </div>
        {/* <div className="w-full px-4 py-3 text-xs text-customLightGray bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer">
          <p>{location.inputArea}</p
        </div> */}
        {/* <div className="">
          <input
            type="text"
            required
            value={coords.latitude}
            onChange={(e) => setCoords({ ...coords, latitude: e.target.value })}
            placeholder="Enter Latitude"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <input
            type="text"
            required
            value={coords.longitude}
            onChange={(e) => setCoords({ ...coords, longitude: e.target.value })}
            placeholder="Enter Longitude"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
          />
        </div> */}
        <div className="">
          <input
            type="text"
            required
            value={offsiteAddress}
            onChange={(e) => setOffsiteAddress(e.target.value)}
            placeholder="Enter home address"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-row items-center text-customYellow font-sans text-sm font-medium gap-1">
          {location.icon}
          <p>{location.title}</p>
        </div>
        <div className="">
          <input
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Url"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </>
    );
  }
};
