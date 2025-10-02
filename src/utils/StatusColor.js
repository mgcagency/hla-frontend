
export const statusColor = (status) => {
    if (status === "On Going") return "text-customGreen";
    else if (status === "Completed") return "text-customDarkBlue";
    else return "text-customLightGray";
 
  };