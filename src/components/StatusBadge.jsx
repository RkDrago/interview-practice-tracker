
export function StatusBadge({ status }) {
  const className = {
    Completed: "status-completed",
    "In Progress": "status-progress",
    Pending: "status-pending",
  }[status] || "status-pending";

  return (
    <span className={`status-badge ${className}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

export function DifficultyBadge({ difficulty }) {
  const className = {
    Easy: "difficulty-easy",
    Medium: "difficulty-medium",
    Hard: "difficulty-hard",
  }[difficulty] || "difficulty-medium";

  return (
    <span className={`difficulty-badge ${className}`}>
      {difficulty}
    </span>
  );
}
