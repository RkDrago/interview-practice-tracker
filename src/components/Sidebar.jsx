
import { NavLink } from "react-router-dom";
import {
  Activity,
  Brain,
  CheckSquare,
  Code2,
  LayoutDashboard,
  Settings,
  Target,
  X,
} from "lucide-react";
import { useQuestions } from "../hooks/useQuestions";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/questions", label: "Questions", icon: CheckSquare },
  { to: "/dsa", label: "DSA Practice", icon: Code2 },
  { to: "/interview-prep", label: "Interview Prep", icon: Brain },
];

export default function Sidebar({ open, onClose }) {
  const { questions } = useQuestions();
  const completed = questions.filter(
    (question) => question.status === "Completed"
  ).length;
  const progress = questions.length
    ? Math.round((completed / questions.length) * 100)
    : 0;

  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Target size={22} />
        </div>

        <div>
          <p className="brand-name">PrepTrack</p>
          <p className="brand-caption">Interview workspace</p>
        </div>

        <button
          className="icon-button sidebar-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>

              {label === "Questions" && (
                <span className="nav-count">{questions.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">PERSONAL</p>

        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
        >
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>
      </div>

      <div className="sidebar-bottom">
        <div className="motivation-card">
          <div className="motivation-icon">
            <Activity size={19} />
          </div>
          <p className="motivation-title">Keep going!</p>
          <p className="motivation-text">
            Small daily practice leads to big results.
          </p>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="progress-caption">{progress}% completed</p>
        </div>

        <div className="profile-row">
          <div className="profile-avatar">S</div>
          <div>
            <p className="profile-name">Student</p>
            <p className="profile-caption">Interview candidate</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
