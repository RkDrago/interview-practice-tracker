
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <div className={`app-shell ${dark ? "dark-mode" : ""}`}>
      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-column">
        <Topbar
          onMenu={() => setSidebarOpen((previous) => !previous)}
          dark={dark}
          onToggleTheme={() => setDark((previous) => !previous)}
        />

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
