import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { fieldInput, iconButton, primaryButton, secondaryButton } from "../ui";

const EMPTY_FORM = {
  title: "",
  category: "DSA",
  difficulty: "Medium",
  status: "Pending",
  notes: "",
};

export default function QuestionModal({
  question,
  defaultCategory = "DSA",
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      question
        ? { ...EMPTY_FORM, ...question }
        : { ...EMPTY_FORM, category: defaultCategory }
    );
    setError("");
  }, [question, defaultCategory]);

  function submit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a question title.");
      return;
    }

    onSave({ ...form, title: form.title.trim() });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[rgb(15_23_42/43%)] p-5 backdrop-blur-[3px] max-sm:items-start max-sm:p-3.5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="w-full max-w-[500px] overflow-hidden rounded-[15px] border border-[#e6eaf0] bg-white shadow-[0_24px_80px_rgb(15_23_42/20%)] max-sm:my-auto dark:border-[#354155] dark:bg-[#1b2534]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-modal-title"
      >
        <div className="flex items-start justify-between gap-[15px] border-b border-[#edf0f4] px-[23px] py-[21px] max-sm:p-[17px] dark:border-[#354155]">
          <div>
            <h2 className="text-[17px] font-extrabold text-[#1d293b] dark:text-[#eef2f7]">
              {question ? "Edit question" : "Add a question"}
            </h2>
            <p className="mt-1.5 text-[11px] text-[#8a95a5]">
              Keep your interview preparation organized.
            </p>
          </div>
          <button className={iconButton} onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="grid gap-4 px-[23px] py-[22px] max-sm:p-[17px]">
          <div className="grid min-w-0 gap-[7px]">
            <label htmlFor="question-title" className="text-[11px] font-bold text-[#39465a] dark:text-[#dce4ef]">
              Question title *
            </label>
            <input
              id="question-title"
              autoFocus
              className={fieldInput}
              maxLength={180}
              value={form.title}
              onChange={(event) => {
                setForm({ ...form, title: event.target.value });
                setError("");
              }}
              placeholder="e.g. Explain closures in JavaScript"
            />
            {error && <p className="text-[11px] text-[#d04444]">{error}</p>}
          </div>

          <div className="grid grid-cols-2 gap-[13px] max-[380px]:grid-cols-1">
            <div className="grid min-w-0 gap-[7px]">
              <label htmlFor="question-category" className="text-[11px] font-bold text-[#39465a] dark:text-[#dce4ef]">
                Category
              </label>
              <select
                id="question-category"
                className={fieldInput}
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              >
                <option>DSA</option>
                <option>Git</option>
                <option>Technical</option>
              </select>
            </div>

            <div className="grid min-w-0 gap-[7px]">
              <label htmlFor="question-difficulty" className="text-[11px] font-bold text-[#39465a] dark:text-[#dce4ef]">
                Difficulty
              </label>
              <select
                id="question-difficulty"
                className={fieldInput}
                value={form.difficulty}
                onChange={(event) =>
                  setForm({ ...form, difficulty: event.target.value })
                }
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          <div className="grid min-w-0 gap-[7px]">
            <label htmlFor="question-status" className="text-[11px] font-bold text-[#39465a] dark:text-[#dce4ef]">
              Status
            </label>
            <select
              id="question-status"
              className={fieldInput}
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value })
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="grid min-w-0 gap-[7px]">
            <label htmlFor="question-notes" className="text-[11px] font-bold text-[#39465a] dark:text-[#dce4ef]">
              Notes (optional)
            </label>
            <textarea
              id="question-notes"
              className={`${fieldInput} resize-y leading-[1.6]`}
              rows={3}
              maxLength={1000}
              value={form.notes}
              onChange={(event) =>
                setForm({ ...form, notes: event.target.value })
              }
              placeholder="Approach, solution notes, or things to revisit..."
            />
          </div>

          <div className="mt-0.5 flex justify-end gap-[9px] border-t border-[#edf0f4] pt-[17px] dark:border-[#354155]">
            <button type="button" className={secondaryButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={primaryButton}>
              <Check size={16} />
              {question ? "Save changes" : "Add question"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
