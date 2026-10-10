import { badge } from "../ui";

const STATUS_STYLES = {
  Completed: "bg-[#eaf8ef] text-[#15854b]",
  "In Progress": "bg-[#fff5e3] text-[#a97010]",
  Pending: "bg-[#f0f2f5] text-[#657185]",
};

const DIFFICULTY_STYLES = {
  Easy: "bg-[#eaf8ef] text-[#15854b]",
  Medium: "bg-[#fff5e2] text-[#a97010]",
  Hard: "bg-[#fff0f0] text-[#c34545]",
};

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Pending;

  return (
    <span className={`${badge} ${style}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function DifficultyBadge({ difficulty }) {
  const style = DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES.Medium;

  return <span className={`${badge} ${style}`}>{difficulty}</span>;
}
