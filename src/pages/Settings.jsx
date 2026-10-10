import { Database, RotateCcw } from "lucide-react";
import { useQuestions } from "../hooks/useQuestions";
import { cardSurface, sectionTitle, secondaryButton } from "../ui";

export default function Settings() {
    const { questions, resetQuestions } = useQuestions();

    function reset() {
        if (window.confirm("Restore the original demo questions? Your current changes will be replaced.")) {
            resetQuestions();
        }
    }

    return (
        <>
            <section className={`${cardSurface} mb-[15px] flex items-start gap-[15px] p-[22px] max-sm:flex-wrap max-sm:p-4`}>
                <div className="flex size-[41px] shrink-0 items-center justify-center rounded-[11px] border border-[#e4f0e8] bg-[#eff9f2] text-[#17864f]"><Database size={21} /></div>
                <div className="flex-1 min-w-0">
                    <h2 className={sectionTitle}>Local data storage</h2>
                    <p className="mt-2 text-xs leading-[1.7] text-[#8490a0]">
                        Your questions are saved in this browser using localStorage.
                        There are currently {questions.length} questions in your tracker.
                    </p>
                </div>
            </section>

            <section className={`${cardSurface} mb-[15px] flex items-start gap-[15px] p-[22px] max-sm:flex-wrap max-sm:p-4`}>
                <div className="flex size-[41px] shrink-0 items-center justify-center rounded-[11px] border border-[#f5dfdf] bg-[#fff1f1] text-[#c94c4c]"><RotateCcw size={21} /></div>
                <div className="flex-1 min-w-0">
                    <h2 className={sectionTitle}>Reset sample data</h2>
                    <p className="mt-2 text-xs leading-[1.7] text-[#8490a0]">
                        Restore the original sample questions. This replaces your current
                        tracker data in this browser.
                    </p>
                </div>
                <button className={`${secondaryButton} text-[#c44848] max-sm:ml-14`} onClick={reset}>
                    Reset data
                </button>
            </section>
        </>
    );
}
