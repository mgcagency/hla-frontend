import React from "react";
import "./index.css";
import GlobalLayoutAdmin from "./layout/GlobalLayoutAdmin";
import GlobalLayoutStudent from "./layout/GlobalLayoutStudent";
import GlobalLayoutTeacher from "./layout/GlobalLayoutTeacher";
import GlobalLayoutParents from "./layout/GlobalLayoutParents";

import LandingPage from "./pages/LandingPage";

import Dashboard from "./pages/Admin/Dashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import ViewStudentTimetable from "./pages/Admin/ViewStudentTimetable";
import ViewStudentProfile from "./pages/Admin/ViewStudentProfile";
import ViewTeacherTimetable from "./pages/Admin/ViewTeacherTimetable";
import ViewTeacherProfile from "./pages/Admin/ViewTeacherProfile";
import ViewTeacherTasks from "./pages/Admin/ViewTeacherTasks";
import StudentPage from "./pages/Admin/StudentPage";
import ParentPage from "./pages/Admin/ParentPage";
import TeacherPage from "./pages/Admin/TeacherPage";
import ReviewClass from "./pages/Admin/ReviewClass";
import ScheduleClassPage from "./pages/Admin/ScheduleClassPage";
import WellbeingPage from "./pages/Admin/WellbeingPage";
import NewWellBeing from "./pages/Admin/NewWellBeing";
import EditWellBeing from "./pages/Admin/EditWellBeing";
import AdminProfilePage from "./pages/Admin/AdminProfilePage";


import ParentsLogin from "./pages/Parents/ParentsLogin";
import ParentsDashboard from "./pages/Parents/ParentsDashboard";
import ParentsProfilePage from "./pages/Parents/ParentsProfilePage";
import ParentViewWellbeing from "./pages/Parents/ParentViewWellbeing";

import TeacherLogin from "./pages/Teacher/TeacherLogin";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import TeacherProfilePage from "./pages/Teacher/TeacherProfile";
import TeacherChatsPage from "./pages/Teacher/TeachersChatsPage";
import TeacherViewWellbeing from "./pages/Teacher/TeacherViewWellbeing";

import StudentLogin from "./pages/Student/StudentLogin";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentChatsPage from "./pages/Student/StudentChatsPage";
import StudentProfilePage from "./pages/Student/StudentProfilePage";
import StudentViewWellbeing from "./pages/Student/StudentViewWellbeing";
import Tasks from "./pages/Teacher/Tasks";
import Wellness from "./pages/Admin/wellness/Wellness";
import WellNessHistory from "./pages/Admin/wellness/WellNessHistory";
import MonthlyPlan from "./pages/Admin/monthly-plan/MonthlyPlan";

import TMonthlyPlan from "./pages/Teacher/monthlyPlan/MonthlyPlan";


import TWellness from "./pages/Teacher/wellness/Wellness";
import WellnessFrom from "./pages/Teacher/wellness/WellnessFrom";
import PrivacyPolicy from "./pages/Common/PrivacyPolicy";
import TermsAndConditions from "./pages/Common/TermsConditions";
import ForgotPassword from "./pages/Common/ForgotPassword";

export const routes = [
  {
    path: "/admin",
    element: <GlobalLayoutAdmin />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/students",
        element: <StudentPage />,
      },
      {
        path: "/admin/students/view-student-timetable",
        element: <ViewStudentTimetable />,
      },
      {
        path: "/admin/students/view-student-profile",
        element: <ViewStudentProfile />,
      },
      {
        path: "/admin/teachers",
        element: <TeacherPage />,
      },
      {
        path: "/admin/teachers/view-teacher-timetable",
        element: <ViewTeacherTimetable />,
      },
      {
        path: "/admin/teachers/view-teacher-profile",
        element: <ViewTeacherProfile />,
      },
      {
        path: "/admin/teachers/review-class",
        element: <ReviewClass />,
      },
      {
        path: "/admin/teachers/view-teacher-tasks",
        element: <ViewTeacherTasks />,
      },
      {
        path: "/admin/parents",
        element: <ParentPage />,
      },
      {
        path: "/admin/schedule_classes",
        element: <ScheduleClassPage />,
      },
      {
        path: "/admin/wellbeing",
        element: <WellbeingPage />,
      },
      // {
      //   path: "/admin/monthly_plan",
      //   element: <WellbeingPage />,
      // },
      {
        path: "/admin/monthly-plan",
        element: <MonthlyPlan />,
      },
      {
        path: "/admin/wellness",
        element: <Wellness />,
      },
      {
        path: "/admin/wellness/history",
        element: <WellNessHistory />,
      },
      {
        path: "/admin/wellbeing/new-wellbeing",
        element: <NewWellBeing />,
      },
      {
        path: "/admin/wellbeing/edit-wellbeing",
        element: <EditWellBeing />,
      },
      {
        path: "/admin/settings",
        element: <AdminProfilePage />,
      },
    ],
  },
  {
    path: "/student",
    element: <GlobalLayoutStudent />,
    children: [
      {
        path: "/student/dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "/student/chats",
        element: <StudentChatsPage />,
      },
      {
        path: "/student/profile",
        element: <StudentProfilePage />,
      },
      {
        path: "/student/wellbeings",
        element: <StudentViewWellbeing />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <GlobalLayoutTeacher />,
    children: [
      {
        path: "/teacher/dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "/teacher/tasks",
        element: <Tasks />,
      },
      {
        path: "/teacher/chats",
        element: <TeacherChatsPage />,
      },
      {
        path: "/teacher/profile",
        element: <TeacherProfilePage />,
      },
      {
        path: "/teacher/wellbeings",
        element: <TeacherViewWellbeing />,
      },
      {
        path: "/teacher/wellness",
        element: <TWellness />,
      },
      {
        path: "/teacher/monthly-plan",
        element: <TMonthlyPlan />,
      },
      {
        path: "/teacher/wellness/submission-form",
        element: <WellnessFrom />,
      },
    ],
  },
  {
    path: "/parents",
    element: <GlobalLayoutParents />,
    children: [
      {
        path: "/parents/dashboard",
        element: <ParentsDashboard />,
      },
      {
        path: "/parents/profile",
        element: <ParentsProfilePage />,
      },
      {
        path: "/parents/wellbeings",
        element: <ParentViewWellbeing />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/student-login",
    element: <StudentLogin />,
  },
  {
    path: "/teacher-login",
    element: <TeacherLogin />,
  },
  {
    path: "/parents-login",
    element: <ParentsLogin />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  
];
