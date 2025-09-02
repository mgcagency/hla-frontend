import { BiLink } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

export const lessonLocations = [
  {
    name: "Student's Home",
    icon: null,
    title: "",
    inputArea: "Student's Home",
  },
  {
    name: "Face to Face",
    icon: null,
    title: "",
    inputArea: "Face to Face",
  },
  {
    name: "Off-site",
    icon: <MdLocationOn size={22} />,
    title: "Add Location",
    inputArea: "Choose from Map",
  },
  {
    name: "Virtual",
    icon: <BiLink size={22} />,
    title: "Add Class Link",
    inputArea: "http:classroom.google/32j43hi3jk32h4",
  },
  {
    name: "Learning Pack",
    icon: <BiLink size={22} />,
    title: "Add Learning Resources Link",
    inputArea: "http:drive.google/32j43hi3jk32h4",
  },
  {
    name: "Online Course",
    icon: <BiLink size={22} />,
    title: "Add Online Course Link",
    inputArea: "http:udemy.appdevelopment/32j43hi3jk32h4",
  },
];
