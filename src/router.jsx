
import { createBrowserRouter, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import DSAPractice from "./pages/DSAPractice";
import InterviewPrep from "./pages/InterviewPrep";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "questions",
        element: <Questions />,
      },
      {
        path: "dsa",
        element: <DSAPractice />,
      },
      {
        path: "interview-prep",
        element: <InterviewPrep />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
