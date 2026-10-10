
import { Activity, Brain, CheckCircle2, CircleHelp, Code2, Target } from "lucide-react";
import { useQuestions } from "../hooks/useQuestions";
import StatCard from "../components/StatCard";
import QuestionTable from "../components/QuestionTable";

export default function Dashboard() {
  const { questions } = useQuestions();

  const completed = questions.filter((q) => q.status === "Completed").length;
  const dsaTotal = questions.filter((q) => q.category === "DSA").length;
  const dsaCompleted = questions.filter(
    (q) => q.category === "DSA" && q.status === "Completed"
  ).length;
  const inProgress = questions.filter((q) => q.status === "In Progress").length;
  const pending = questions.length - completed - inProgress;
  const progress = questions.length
    ? Math.round((completed / questions.length) * 100)
    : 0;

  return (
    <>
      <section className="stats-grid">
        <StatCard icon={CircleHelp} label="Total Questions" value={questions.length} detail="In your tracker" accent="blue" />
        <StatCard icon={Code2} label="Completed DSA" value={dsaCompleted} detail={`${dsaTotal} DSA total`} accent="green" />
        <StatCard icon={Activity} label="In Progress" value={inProgress} detail="Keep it up" accent="amber" />
        <StatCard icon={Target} label="Overall Progress" value={`${progress}%`} detail={`${completed} completed`} accent="violet" />
      </section>

      <section className="surface-card progress-card">
        <div className="progress-heading">
          <div>
            <h2>Preparation progress</h2>
            <p>Your completed questions across all categories</p>
          </div>
          <div className="progress-heading-icon"><Brain size={21} /></div>
        </div>

        <div className="overall-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-legend">
          <span><i className="legend-dot completed-dot" />{completed} completed</span>
          <span><i className="legend-dot progress-dot" />{inProgress} in progress</span>
          <span><i className="legend-dot pending-dot" />{pending} pending</span>
        </div>
      </section>

      <QuestionTable />
    </>
  );
}
