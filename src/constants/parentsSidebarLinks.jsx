import { IMAGES } from "../assets";

export const parents_sidebar_links = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <img src={IMAGES.dashboard_icon} alt="dashboard_icon" className="" />,
    path: "/parents/dashboard",
  },
  {
    key: "wellbeing",
    label: "Wellbeing",
    icon: <img src={IMAGES.wellbeing_icon} alt="wellbeing_icon" className="" />,
    path: "/parents/wellbeings",
  },
  {
    key: "profile",
    label: "Profile",
    icon: <img src={IMAGES.profile_icon} alt="profile_icon" className="" />,
    path: "/parents/profile",
  },
];
