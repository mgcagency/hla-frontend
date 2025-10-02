import { IMAGES } from "../assets";

export const sidebar_links = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <img src={IMAGES.dashboard_icon} alt="dashboard_icon" className="" />,
    path: "/admin/dashboard",
  },
  {
    key: "schedule_classes",
    label: "Schedule Classes",
    icon: (
      <img
        src={IMAGES.schedule_class_icon}
        alt="schedule classesicon"
        className=""
      />
    ),
    path: "/admin/schedule_classes",
  },
  {
    key: "teachers",
    label: "Teachers",
    icon: <img src={IMAGES.teachers_icon} alt="teachers_icon" className="" />,
    path: "/admin/teachers",
  },
  {
    key: "students",
    label: "Students",
    icon: <img src={IMAGES.students_icon} alt="students_icon" className="" />,
    path: "/admin/students",
  },
  {
    key: "parents",
    label: "Parents",
    icon: <img src={IMAGES.parents_icon} alt="parents_icon" className="" />,
    path: "/admin/parents",
  },
  {
    key: "wellbeing",
    label: "Wellbeing",
    icon: <img src={IMAGES.wellbeing_icon} alt="wellbeing_icon" className="" />,
    path: "/admin/wellbeing",
  },
  {
    key: "monthly_plan",
    label: "Planning",
    icon: <img
    src={IMAGES.plan}
    alt="schedule classesicon"
    className=""
  />,
    path: "/admin/monthly-plan",
  },
  {
    key: "wellness",
    label: "Wellness",
    icon: <img src={IMAGES.wellness} alt="wellness_icon" className="" />,
    path: "/admin/wellness",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <img src={IMAGES.settings_icon} alt="settings_icon" className="" />,
    path: "/admin/settings",
  },
];
