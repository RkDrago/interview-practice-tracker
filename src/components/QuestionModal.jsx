
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

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
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-modal-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="question-modal-title">
              {question ? "Edit question" : "Add a question"}
            </h2>
            <p>Keep your interview preparation organized.</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="modal-form">
          <div className="form-field">
            <label htmlFor="question-title">Question title *</label>
            <input
              id="question-title"
              autoFocus
              className="field-input"
              maxLength={180}
              value={form.title}
              onChange={(event) => {
                setForm({ ...form, title: event.target.value });
                setError("");
              }}
              placeholder="e.g. Explain closures in JavaScript"
            />
            {error && <p className="field-error">{error}</p>}
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="question-category">Category</label>
              <select
                id="question-category"
                className="field-input"
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

            <div className="form-field">
              <label htmlFor="question-difficulty">Difficulty</label>
              <select
                id="question-difficulty"
                className="field-input"
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

          <div className="form-field">
            <label htmlFor="question-status">Status</label>
            <select
              id="question-status"
              className="field-input"
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

          <div className="form-field">
            <label htmlFor="question-notes">Notes (optional)</label>
            <textarea
              id="question-notes"
              className="field-input"
              rows={3}
              maxLength={1000}
              value={form.notes}
              onChange={(event) =>
                setForm({ ...form, notes: event.target.value })
              }
              placeholder="Approach, solution notes, or things to revisit..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              <Check size={16} />
              {question ? "Save changes" : "Add question"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
