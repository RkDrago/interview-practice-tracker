
import { useMemo, useState } from "react";
import {
  Brain, Code2, Download, FileText, MoreVertical, Pencil,
  Plus, Search, Trash2, X, Filter,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useQuestions } from "../hooks/useQuestions";
import QuestionModal from "./QuestionModal";
import { StatusBadge, DifficultyBadge } from "./StatusBadge";

export default function QuestionTable({ fixedCategory, heading = "Question tracker" }) {
  const { questions, addQuestion, updateQuestion, deleteQuestion } = useQuestions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Statuses");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuId, setMenuId] = useState(null);

  const search = searchParams.get("search") || "";

  function setSearch(value) {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) params.set("search", value);
    else params.delete("search");
    setSearchParams(params, { replace: true });
  }

  const filtered = useMemo(() => {
    return questions.filter((question) => {
      const text = `${question.title} ${question.notes} ${question.category}`.toLowerCase();

      return (
        (!search || text.includes(search.toLowerCase())) &&
        (!fixedCategory || question.category === fixedCategory) &&
        (category === "All Categories" || question.category === category) &&
        (status === "All Statuses" || question.status === status) &&
        (difficulty === "All Difficulties" || question.difficulty === difficulty)
      );
    });
  }, [questions, search, fixedCategory, category, status, difficulty]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function save(form) {
    if (editing) updateQuestion(editing.id, form);
    else addQuestion(form);
    setModalOpen(false);
    setEditing(null);
  }

  function exportCSV() {
    const escapeCell = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = [
      ["Question", "Category", "Difficulty", "Status", "Notes", "Date"],
      ...filtered.map((q) => [
        q.title, q.category, q.difficulty, q.status, q.notes, q.date,
      ]),
    ];

    const csv = rows.map((row) => row.map(escapeCell).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "interview-questions.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function clearFilters() {
    setSearch("");
    setCategory("All Categories");
    setStatus("All Statuses");
    setDifficulty("All Difficulties");
  }

  return (
    <>
      <section className="surface-card question-section">
        <div className="question-section-header">
          <div>
            <h2>{heading}</h2>
            <p>Manage your practice questions and interview topics.</p>
          </div>
          <div className="table-header-actions">
            <span className="results-count">{filtered.length} results</span>
            <button className="secondary-button" onClick={exportCSV}>
              <Download size={16} /> Export
            </button>
            <button className="primary-button" onClick={openAdd}>
              <Plus size={17} /> Add Question
            </button>
          </div>
        </div>

        <div className="filter-grid">
          <div className="filter-search">
            <Search size={17} />
            <input
              aria-label="Filter questions"
              placeholder="Search by title or keyword..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          {!fixedCategory && (
            <select aria-label="Category filter" className="field-input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All Categories</option>
              <option>DSA</option>
              <option>Git</option>
              <option>Technical</option>
            </select>
          )}

          <select aria-label="Status filter" className="field-input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select aria-label="Difficulty filter" className="field-input" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {(search || category !== "All Categories" || status !== "All Statuses" || difficulty !== "All Difficulties") && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear filters <X size={13} />
          </button>
        )}

        <div className="table-scroll">
          <table className="question-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Added</th>
                <th className="action-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((question) => {
                const Icon =
                  question.category === "DSA" ? Code2 :
                  question.category === "Git" ? FileText : Brain;

                return (
                  <tr key={question.id}>
                    <td>
                      <div className="question-title-cell">
                        <div className="question-type-icon"><Icon size={18} /></div>
                        <div className="question-title-content">
                          <p title={question.title}>{question.title}</p>
                          {question.notes && <span title={question.notes}>{question.notes}</span>}
                        </div>
                      </div>
                    </td>
                    <td><span className="category-text">{question.category}</span></td>
                    <td><DifficultyBadge difficulty={question.difficulty} /></td>
                    <td><StatusBadge status={question.status} /></td>
                    <td><span className="date-text">{question.date || "—"}</span></td>
                    <td className="action-column">
                      <div className="row-action-wrap">
                        <button
                          className="icon-button"
                          aria-label={`Actions for ${question.title}`}
                          onClick={() => setMenuId(menuId === question.id ? null : question.id)}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {menuId === question.id && (
                          <>
                            <button className="menu-dismiss" aria-label="Close actions" onClick={() => setMenuId(null)} />
                            <div className="row-action-menu">
                              <button onClick={() => { setEditing(question); setModalOpen(true); setMenuId(null); }}>
                                <Pencil size={15} /> Edit
                              </button>
                              <button className="delete-action" onClick={() => {
                                if (window.confirm("Delete this question?")) deleteQuestion(question.id);
                                setMenuId(null);
                              }}>
                                <Trash2 size={15} /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon"><Filter size={23} /></div>
              <h3>No questions found</h3>
              <p>Try another search or adjust your filters.</p>
              <button className="secondary-button" onClick={clearFilters}>Clear filters</button>
            </div>
          )}
        </div>

        <div className="table-footer">
          Showing {filtered.length} of {questions.filter((q) => !fixedCategory || q.category === fixedCategory).length} questions
          <span>Changes are saved automatically</span>
        </div>
      </section>

      {modalOpen && (
        <QuestionModal
          key={editing?.id ?? `new-${fixedCategory ?? "DSA"}`}
          question={editing}
          defaultCategory={fixedCategory || "DSA"}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSave={save}
        />
      )}
    </>
  );
}
