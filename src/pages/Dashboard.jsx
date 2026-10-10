import { Activity, Brain, CircleHelp, Code2, Target } from "lucide-react";
import { useQuestions } from "../hooks/useQuestions";
import StatCard from "../components/StatCard";
import QuestionTable from "../components/QuestionTable";
import { cardSurface, sectionSubtitle, sectionTitle } from "../ui";

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
      <section className="grid grid-cols-4 gap-[17px] max-[1200px]:grid-cols-2 max-[380px]:grid-cols-1! max-sm:gap-2.5">
        <StatCard icon={CircleHelp} label="Total Questions" value={questions.length} detail="In your tracker" accent="blue" />
        <StatCard icon={Code2} label="Completed DSA" value={dsaCompleted} detail={`${dsaTotal} DSA total`} accent="green" />
        <StatCard icon={Activity} label="In Progress" value={inProgress} detail="Keep it up" accent="amber" />
        <StatCard icon={Target} label="Overall Progress" value={`${progress}%`} detail={`${completed} completed`} accent="violet" />
      </section>

      <section className={`${cardSurface} mt-5 p-[21px] max-sm:p-[17px]`}>
        <div className="flex items-center justify-between gap-3.5">
          <div>
            <h2 className={sectionTitle}>Preparation progress</h2>
            <p className={sectionSubtitle}>Your completed questions across all categories</p>
          </div>
          <div className="flex size-[39px] items-center justify-center rounded-[11px] border border-[#e4f1e8] bg-[#f0faf3] text-[#17864f]"><Brain size={21} /></div>
        </div>

        <div className="mt-[19px] flex items-center gap-[15px]">
          <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#e8edf1]">
            <div className="h-full rounded-[inherit] bg-[#20a363] transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <strong className="min-w-[38px] text-right text-[13px] text-[#263449]">{progress}%</strong>
        </div>

        <div className="mt-[13px] flex flex-wrap gap-[18px] text-[11px] text-[#798596] max-sm:gap-2.5 max-sm:text-[10px]">
          <span className="inline-flex items-center gap-1.5"><i className="size-[7px] rounded-full bg-[#20a363]" />{completed} completed</span>
          <span className="inline-flex items-center gap-1.5"><i className="size-[7px] rounded-full bg-[#eab348]" />{inProgress} in progress</span>
          <span className="inline-flex items-center gap-1.5"><i className="size-[7px] rounded-full bg-[#c5ccd6]" />{pending} pending</span>
        </div>
      </section>

      <QuestionTable />
    </>
  );
}
