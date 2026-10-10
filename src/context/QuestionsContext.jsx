
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { INITIAL_QUESTIONS } from "../data/initialQuestions";

export const QuestionsContext = createContext(null);

const STORAGE_KEY = "interview-tracker-questions";

function getInitialQuestions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Fall back to sample data if storage is unavailable or invalid.
  }

  return INITIAL_QUESTIONS;
}

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState(getInitialQuestions);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [questions]);

  const addQuestion = useCallback((form) => {
    const question = {
      ...form,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString().slice(0, 10),
    };

    setQuestions((previous) => [question, ...previous]);
    return question;
  }, []);

  const updateQuestion = useCallback((id, changes) => {
    setQuestions((previous) =>
      previous.map((question) =>
        question.id === id ? { ...question, ...changes, id } : question
      )
    );
  }, []);

  const deleteQuestion = useCallback((id) => {
    setQuestions((previous) =>
      previous.filter((question) => question.id !== id)
    );
  }, []);

  const resetQuestions = useCallback(() => {
    setQuestions(INITIAL_QUESTIONS);
  }, []);

  const value = useMemo(
    () => ({
      questions,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      resetQuestions,
    }),
    [questions, addQuestion, updateQuestion, deleteQuestion, resetQuestions]
  );

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}
