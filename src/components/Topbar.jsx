import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import { iconButton } from "../ui";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/questions": "Questions",
  "/dsa": "DSA Practice",
  "/interview-prep": "Interview Prep",
  "/settings": "Settings",
};

export default function Topbar({ onMenu, dark, onToggleTheme }) {
  const location = useLocation();
  const heading = PAGE_TITLES[location.pathname] ?? "Page not found";

  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center gap-[14px] border-b border-[#e4e8ee] bg-white/94 px-[30px] backdrop-blur-[14px] max-sm:h-[60px] max-sm:gap-[7px] max-sm:px-3 dark:border-[#354155] dark:bg-[rgb(27_37_52/95%)]">
      <button
        className={`${iconButton} hidden! max-lg:inline-flex!`}
        onClick={onMenu}
        aria-label="Toggle sidebar"
      >
        <Menu size={21} />
      </button>

      <h1 className="truncate text-[clamp(23px,2vw,29px)] font-extrabold tracking-[-0.9px] text-[#172033] max-sm:text-2xl dark:text-[#eef2f7]">
        {heading}
      </h1>

      <div className="ml-auto flex items-center gap-[5px] max-sm:gap-0">
        <button
          className={iconButton}
          onClick={onToggleTheme}
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button
          className={iconButton}
          onClick={() => window.alert("You're all caught up!")}
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-[#21a364] shadow-[0_0_0_2px_#fff]" />
        </button>
      </div>
    </header>
  );
}
