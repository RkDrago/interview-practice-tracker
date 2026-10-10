import { useMemo, useState } from "react";
import {
  Brain, Code2, Download, FileText, MoreVertical, Pencil,
  Plus, Search, Trash2, X, Filter,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useQuestions } from "../hooks/useQuestions";
import QuestionModal from "./QuestionModal";
import { StatusBadge, DifficultyBadge } from "./StatusBadge";
import {
  cardSurface, fieldInput, iconButton, primaryButton,
  sectionSubtitle, sectionTitle, secondaryButton,
} from "../ui";

const menuItemClass =
  "flex w-full items-center gap-2 rounded-md border-0 bg-transparent px-[9px] py-[9px] text-left text-[11px] text-[#475468] hover:bg-[#f4f6f8]";

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
      <section className={`${cardSurface} overflow-visible`}>
        <div className="flex items-center justify-between gap-[15px] px-[22px] pt-[21px] pb-[18px] max-sm:flex-col max-sm:items-start max-sm:p-[17px]">
          <div>
            <h2 className={sectionTitle}>{heading}</h2>
            <p className={sectionSubtitle}>
              Manage your practice questions and interview topics.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 max-sm:w-full max-sm:justify-start">
            <span className="rounded-[7px] bg-[#f0f2f5] px-[9px] py-[7px] text-[10px] font-bold text-[#647084] max-sm:mr-auto">
              {filtered.length} results
            </span>
            <button className={secondaryButton} onClick={exportCSV}>
              <Download size={16} /> Export
            </button>
            <button className={primaryButton} onClick={openAdd}>
              <Plus size={17} /> Add Question
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(180px,1fr)_repeat(3,minmax(130px,175px))] gap-2.5 border-b border-[#edf0f4] px-[22px] pb-[19px] max-[1200px]:grid-cols-2 max-sm:grid-cols-1! max-sm:px-[17px] max-sm:pb-4">
          <div className="flex h-[39px] min-w-0 items-center gap-[9px] rounded-lg border border-[#e0e5ec] px-[11px] text-[#96a0af] dark:border-[#3c495c] dark:bg-[#202c3d] dark:text-[#e5e7eb]">
            <Search size={17} />
            <input
              aria-label="Filter questions"
              placeholder="Search by title or keyword..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full min-w-0 border-0 bg-transparent text-[11px] text-[#263449] outline-none placeholder:text-[#a0a9b7] dark:text-[#e5e7eb]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="flex shrink-0 border-0 bg-transparent text-[#7b8798]"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {!fixedCategory && (
            <select aria-label="Category filter" className={fieldInput} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All Categories</option>
              <option>DSA</option>
              <option>Git</option>
              <option>Technical</option>
            </select>
          )}

          <select aria-label="Status filter" className={fieldInput} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select aria-label="Difficulty filter" className={fieldInput} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {(search || category !== "All Categories" || status !== "All Statuses" || difficulty !== "All Difficulties") && (
          <button
            className="mx-[22px] mt-[13px] flex items-center gap-[5px] border-0 bg-transparent text-[11px] font-bold text-[#168b51] max-sm:ml-[17px]"
            onClick={clearFilters}
          >
            Clear filters <X size={13} />
          </button>
        )}

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[770px] border-collapse text-left">
            <thead className="bg-[#f8fafc] dark:bg-[#202c3d]">
              <tr>
                <th className="px-[13px] py-[14px] text-[9px] font-[750] tracking-[0.7px] uppercase whitespace-nowrap text-[#8a95a5] first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px]">Question</th>
                <th className="px-[13px] py-[14px] text-[9px] font-[750] tracking-[0.7px] uppercase whitespace-nowrap text-[#8a95a5] first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px]">Category</th>
                <th className="px-[13px] py-[14px] text-[9px] font-[750] tracking-[0.7px] uppercase whitespace-nowrap text-[#8a95a5] first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px]">Difficulty</th>
                <th className="px-[13px] py-[14px] text-[9px] font-[750] tracking-[0.7px] uppercase whitespace-nowrap text-[#8a95a5] first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px]">Status</th>
                <th className="px-[13px] py-[14px] text-[9px] font-[750] tracking-[0.7px] uppercase whitespace-nowrap text-[#8a95a5] first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px]">Added</th>
                <th className="w-[70px] px-[13px] py-[14px] text-right text-[9px] font-[750] tracking-[0.7px] uppercase whitespace-nowrap text-[#8a95a5] first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((question) => {
                const Icon =
                  question.category === "DSA" ? Code2 :
                  question.category === "Git" ? FileText : Brain;

                return (
                  <tr key={question.id} className="transition-colors duration-[130ms] hover:bg-[#fafcfb] dark:hover:bg-[#202c3d]">
                    <td className="border-t border-[#eff2f5] px-[13px] py-[13px] align-middle first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px] dark:border-[#354155]">
                      <div className="flex min-w-[210px] items-center gap-[11px]">
                        <div className="flex size-[37px] shrink-0 items-center justify-center rounded-[9px] bg-[#f0f3f7] text-[#647187]"><Icon size={18} /></div>
                        <div className="min-w-0 max-w-[280px]">
                          <p title={question.title} className="overflow-hidden text-ellipsis text-[11px] font-bold leading-[1.6] text-[#273348] dark:text-[#e5e7eb]">{question.title}</p>
                          {question.notes && <span title={question.notes} className="mt-[3px] block overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#98a1af]">{question.notes}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="border-t border-[#eff2f5] px-[13px] py-[13px] align-middle first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px] dark:border-[#354155]"><span className="text-[11px] font-semibold text-[#59667a]">{question.category}</span></td>
                    <td className="border-t border-[#eff2f5] px-[13px] py-[13px] align-middle first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px] dark:border-[#354155]"><DifficultyBadge difficulty={question.difficulty} /></td>
                    <td className="border-t border-[#eff2f5] px-[13px] py-[13px] align-middle first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px] dark:border-[#354155]"><StatusBadge status={question.status} /></td>
                    <td className="border-t border-[#eff2f5] px-[13px] py-[13px] align-middle first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px] dark:border-[#354155]"><span className="text-[10px] whitespace-nowrap text-[#7e8999]">{question.date || "—"}</span></td>
                    <td className="w-[70px] border-t border-[#eff2f5] px-[13px] py-[13px] text-right align-middle first:pl-[22px] last:pr-[17px] max-sm:first:pl-[15px] dark:border-[#354155]">
                      <div className="relative flex justify-end">
                        <button
                          className={iconButton}
                          aria-label={`Actions for ${question.title}`}
                          onClick={() => setMenuId(menuId === question.id ? null : question.id)}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {menuId === question.id && (
                          <>
                            <button className="fixed inset-0 z-[14] border-0 bg-transparent" aria-label="Close actions" onClick={() => setMenuId(null)} />
                            <div className="absolute top-9 right-0 z-[15] w-[140px] rounded-[10px] border border-[#e3e8ee] bg-white p-[5px] shadow-[0_10px_30px_rgb(15_23_42/12%)]">
                              <button className={menuItemClass} onClick={() => { setEditing(question); setModalOpen(true); setMenuId(null); }}>
                                <Pencil size={15} /> Edit
                              </button>
                              <button className={`${menuItemClass} text-[#d44848]`} onClick={() => {
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
            <div className="flex flex-col items-center px-5 py-12 text-center">
              <div className="flex size-[47px] items-center justify-center rounded-[13px] bg-[#f0f3f7] text-[#8290a3]"><Filter size={23} /></div>
              <h3 className="mt-3.5 text-sm text-[#283448] dark:text-[#eef2f7]">No questions found</h3>
              <p className="mt-[7px] mb-4 text-[11px] text-[#8a95a5]">Try another search or adjust your filters.</p>
              <button className={secondaryButton} onClick={clearFilters}>Clear filters</button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-between gap-[9px] border-t border-[#edf0f4] px-[22px] py-[14px] text-[10px] text-[#8a95a5] max-sm:px-[15px] max-sm:py-[13px] dark:border-[#354155]">
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
