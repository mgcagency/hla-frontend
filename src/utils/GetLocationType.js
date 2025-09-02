
export const getLocationType = (location) => {
    if (
      location === "Student's Home" ||
      location === "Face to Face" ||
      location === "Off-site"
    ) {
      return "Physical";
    } else {
      return "Online";
    }
  };