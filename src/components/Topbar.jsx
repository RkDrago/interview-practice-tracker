
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Topbar({ onMenu, dark, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchable = ["/", "/questions", "/dsa", "/interview-prep"].includes(
    location.pathname
  );

  function updateSearch(value) {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params, { replace: true });
  }

  return (
    <header className="topbar">
      <button
        className="icon-button mobile-menu-button"
        onClick={onMenu}
        aria-label="Toggle sidebar"
      >
        <Menu size={21} />
      </button>

      {searchable && (
        <form
          className="top-search-wrapper"
          onSubmit={(event) => {
            event.preventDefault();
            if (location.pathname === "/") {
              navigate(`/questions${searchParams.toString() ? `?${searchParams}` : ""}`);
            }
          }}
        >
          <Search size={17} className="search-icon" />
          <input
            key={location.pathname}
            className="top-search"
            aria-label="Search questions"
            placeholder="Search questions..."
            value={searchParams.get("search") || ""}
            onChange={(event) => updateSearch(event.target.value)}
          />
        </form>
      )}

      <div className="topbar-actions">
        <button
          className="icon-button"
          onClick={onToggleTheme}
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button
          className="icon-button notification-button"
          onClick={() => window.alert("You're all caught up!")}
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot" />
        </button>
      </div>
    </header>
  );
}
