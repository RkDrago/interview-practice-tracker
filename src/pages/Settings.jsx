
import { Database, RotateCcw, Settings as SettingsIcon } from "lucide-react";
import { useQuestions } from "../hooks/useQuestions";

export default function Settings() {
    const { questions, resetQuestions } = useQuestions();

    function reset() {
        if (window.confirm("Restore the original demo questions? Your current changes will be replaced.")) {
            resetQuestions();
        }
    }

    return (
        <>
            <section className="surface-card settings-card">
                <div className="settings-icon"><Database size={21} /></div>
                <div className="settings-content">
                    <h2>Local data storage</h2>
                    <p>
                        Your questions are saved in this browser using localStorage.
                        There are currently {questions.length} questions in your tracker.
                    </p>
                </div>
            </section>

            <section className="surface-card settings-card">
                <div className="settings-icon settings-icon-danger"><RotateCcw size={21} /></div>
                <div className="settings-content">
                    <h2>Reset sample data</h2>
                    <p>
                        Restore the original sample questions. This replaces your current
                        tracker data in this browser.
                    </p>
                </div>
                <button className="secondary-button danger-button" onClick={reset}>
                    Reset data
                </button>
            </section>
        </>
    );
}
