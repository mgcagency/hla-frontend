import { IMAGES } from "../assets";

export const getDetailsData = ({users, teachers, students, parents}) => { 
  return [
  {
    icon: <img src={IMAGES.users_card_icon} alt="users_icon" className="" />,
    label: "Total Users",
    value: users.length,
  },
  {
    icon: (
      <img src={IMAGES.teachers_card_icon} alt="teachers_icon" className="" />
    ),
    label: "Teachers",
    value: teachers.length,
    link: "/admin/teachers"
  },
  {
    icon: (
      <img src={IMAGES.students_card_icon} alt="students_icon" className="" />
    ),
    label: "Students",
    value: students.length,
    link: "/admin/students"

  },
  {
    icon: (
      <img src={IMAGES.teachers_card_icon} alt="parents_icon" className="" />
    ),
    label: "Parents",
    value: parents.length,
    link: "/admin/parents"
  },
]};
