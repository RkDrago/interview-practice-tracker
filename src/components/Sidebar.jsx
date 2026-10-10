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
import { iconButton } from "../ui";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/questions", label: "Questions", icon: CheckSquare },
  { to: "/dsa", label: "DSA Practice", icon: Code2 },
  { to: "/interview-prep", label: "Interview Prep", icon: Brain },
];

const navLinkBase =
  "flex min-h-[43px] items-center gap-[11px] rounded-[9px] px-[11px] text-[13px] transition-colors duration-150";

const navIdle =
  "font-[550] text-[#5e697b] hover:bg-[#f5f7f9] hover:text-[#263449] dark:text-[#c0cada] dark:hover:bg-[#273448] dark:hover:text-[#c0cada]";

const navActive =
  "bg-[#eaf6ee] font-bold text-[#13824b] dark:bg-[#173b2d] dark:text-[#70e0a6]";

const navLinkClass = (isActive) =>
  `${navLinkBase} ${isActive ? navActive : navIdle}`;

export default function Sidebar({ open, onClose }) {
  const { questions } = useQuestions();
  const completed = questions.filter(
    (question) => question.status === "Completed"
  ).length;
  const progress = questions.length
    ? Math.round((completed / questions.length) * 100)
    : 0;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-[240px] flex-col border-r border-[#e3e7ed] bg-white transition-transform duration-200 ease-out dark:border-[#354155] dark:bg-[#1b2534] ${
        open
          ? "max-lg:translate-x-0 max-lg:shadow-[12px_0_40px_rgb(15_23_42/13%)]"
          : "max-lg:-translate-x-full"
      }`}
    >
      <div className="flex h-[72px] shrink-0 items-center gap-[11px] border-b border-[#edf0f4] px-[18px] dark:border-[#354155]">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#159957] text-white">
          <Target size={22} />
        </div>

        <div>
          <p className="text-base font-extrabold tracking-[-0.4px] text-[#182235] dark:text-[#eef2f7]">
            PrepTrack
          </p>
          <p className="mt-[3px] text-[11px] text-[#8490a1]">
            Interview workspace
          </p>
        </div>

        <button
          className={`${iconButton} ml-auto hidden! max-lg:inline-flex!`}
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>

      <div className="px-3 pt-[27px]">
        <p className="mb-[11px] px-[11px] text-[10px] font-[750] tracking-[1.3px] text-[#9aa4b3]">
          WORKSPACE
        </p>

        <nav className="grid gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>

              {label === "Questions" && (
                <span className="ml-auto rounded-md bg-[#edf0f4] px-[7px] py-[3px] text-[10px] font-bold text-[#657084]">
                  {questions.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-3 pt-[27px]">
        <p className="mb-[11px] px-[11px] text-[10px] font-[750] tracking-[1.3px] text-[#9aa4b3]">
          PERSONAL
        </p>

        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) => navLinkClass(isActive)}
        >
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>
      </div>

      <div className="mt-auto px-[13px] pt-[15px] pb-[18px]">
        <div className="rounded-[13px] border border-[#d8eee0] bg-[#f0faf3] p-[15px] dark:border-[#315743] dark:bg-[#1c3629]">
          <div className="flex size-[41px] items-center justify-center rounded-[11px] bg-white text-[#17864f]">
            <Activity size={19} />
          </div>
          <p className="mt-[11px] text-[13px] font-[750] text-[#24332b] dark:text-[#e5e7eb]">
            Keep going!
          </p>
          <p className="mt-[5px] mb-3 text-[11px] leading-[1.65] text-[#738477]">
            Small daily practice leads to big results.
          </p>

          <div className="h-[7px] overflow-hidden rounded-full bg-[#d9ecdf]">
            <div
              className="h-full rounded-[inherit] bg-[#20a363] transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-[11px] font-[750] text-[#18814d]">
            {progress}% completed
          </p>
        </div>

        <div className="mt-[15px] flex items-center gap-[10px] border-t border-[#edf0f4] px-[2px] pt-[15px] dark:border-[#354155]">
          <div className="flex size-9 items-center justify-center rounded-full bg-[#e6eaf0] text-[13px] font-extrabold text-[#495568]">
            <img src="" alt="" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#263246] dark:text-[#eef2f7]">
              Student
            </p>
            <p className="mt-1 text-[10px] text-[#8b95a4]">
              Interview candidate
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
