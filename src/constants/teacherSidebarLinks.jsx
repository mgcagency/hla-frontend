import { IMAGES } from "../assets";

export const teacher_sidebar_links = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <img src={IMAGES.dashboard_icon} alt="dashboard_icon" className="" />,
    path: "/teacher/dashboard",
  },
  {
    key: "tasks",
    label: "Tasks",
    icon: <img src={IMAGES.dashboard_icon} alt="dashboard_icon" className="" />,
    path: "/teacher/tasks",
  },
  {
    key: "chats",
    label: "Chats",
    icon: <img src={IMAGES.chats_icon} alt="settings_icon" className="" />,
    path: "/teacher/chats",
  },
  {
    key: "monthly-plan",
    label: "Monthly Plan",
    icon: <img src={IMAGES.plan} alt="settings_icon" className="" />,
    path: "/teacher/monthly-plan",
  },
  {
    key: "wellbeing",
    label: "Wellbeing",
    icon: <img src={IMAGES.wellbeing_icon} alt="wellbeing_icon" className="" />,
    path: "/teacher/wellbeings",
  },
  {
    key: "wellness",
    label: "Wellness",
    icon: <img src={IMAGES.wellness} alt="wellbeing_icon" className="" />,
    path: "/teacher/wellness",
  },
  {
    key: "profile",
    label: "Profile",
    icon: <img src={IMAGES.profile_icon} alt="profile_icon" className="" />,
    path: "/teacher/profile",
  },
];
