import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <div
      className={`min-h-screen bg-[#f7f9fc] text-[#172033] dark:bg-[#111827] dark:text-[#e5e7eb] ${
        dark ? "dark-mode" : ""
      }`}
    >
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 hidden! border-0 bg-[rgb(15_23_42/30%)] max-lg:block!"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="ml-[240px] min-h-screen bg-[#f7f9fc] dark:bg-[#111827] max-lg:ml-0">
        <Topbar
          onMenu={() => setSidebarOpen((previous) => !previous)}
          dark={dark}
          onToggleTheme={() => setDark((previous) => !previous)}
        />

        <main className="mx-auto w-full max-w-[1750px] px-[30px] py-8 min-[1600px]:px-[42px] max-sm:px-[13px] max-sm:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
