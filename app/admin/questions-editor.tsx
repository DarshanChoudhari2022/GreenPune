"use client";

import { useActionState, useState } from "react";
import { type QuestionItem } from "@/lib/questions-store";
import { saveQuestionAction, deleteQuestionAction } from "./actions";

export function QuestionsEditor({ initialQuestions }: { initialQuestions: QuestionItem[] }) {
  const [saveState, saveAction, savePending] = useActionState(saveQuestionAction, { ok: false, message: "" } as any);
  const [deleteState, deleteAction, deletePending] = useActionState(deleteQuestionAction, { ok: false, message: "" } as any);


  const [editingQuestion, setEditingQuestion] = useState<Partial<QuestionItem> | null>(null);

  const isEditing = !!editingQuestion?.id;

  function handleEdit(q: QuestionItem) {
    setEditingQuestion(q);
    // Scroll to form
    const formElement = document.getElementById("question-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleCancel() {
    setEditingQuestion(null);
  }

  return (
    <div className="questions-editor-wrapper">
      {/* Save Question Form */}
      <div className="admin-panel" id="question-form" style={{ marginTop: "24px" }}>
        <div className="admin-panel-header">
          <div>
            <p className="admin-kicker">{isEditing ? "Modify dynamic question" : "Create new input field"}</p>
            <h2>{isEditing ? `Edit Question: ${editingQuestion.id}` : "Add Question"}</h2>
          </div>
          {isEditing && (
            <button className="admin-ghost-button" onClick={handleCancel} type="button">
              Cancel Edit
            </button>
          )}
        </div>

        <form action={saveAction} className="admin-event-form" onSubmit={() => {
          // Clear edit mode after short delay if edit was successful
          setTimeout(() => {
            if (!saveState.error) {
              setEditingQuestion(null);
            }
          }, 500);
        }}>
          {isEditing ? (
            <input name="id" type="hidden" value={editingQuestion.id} />
          ) : (
            <label>
              <span>Field ID (Unique, e.g. canBringTree, flatNumber)</span>
              <input
                name="id"
                placeholder="lowercase_no_spaces"
                required
                pattern="^[a-zA-Z0-9_]+$"
                title="Only alphanumeric characters and underscores are allowed."
              />
            </label>
          )}

          <div className="admin-form-grid">
            <label>
              <span>Field Type</span>
              <select name="type" value={editingQuestion?.type || "text"} onChange={(e) => setEditingQuestion(prev => ({ ...prev, type: e.target.value as any }))}>
                <option value="text">Text Input (एक ओळ मजकूर)</option>
                <option value="textarea">Text Area (मोठी ओळ / पत्ता)</option>
                <option value="yes_no">Yes / No Radio (होय / नाही पर्याय)</option>
              </select>
            </label>

            <label style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", height: "100%", paddingTop: "24px" }}>
              <input
                name="required"
                type="checkbox"
                checked={editingQuestion?.required || false}
                onChange={(e) => setEditingQuestion(prev => ({ ...prev, required: e.target.checked }))}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <span style={{ fontWeight: "800", cursor: "pointer" }}>Is Required Field?</span>
            </label>

            <label>
              <span>English Question Label</span>
              <input
                name="labelEnglish"
                value={editingQuestion?.labelEnglish || ""}
                onChange={(e) => setEditingQuestion(prev => ({ ...prev, labelEnglish: e.target.value }))}
                placeholder="e.g. Can you bring a sapling?"
                required
              />
            </label>

            <label>
              <span>Marathi Question Label (मराठी प्रश्न)</span>
              <input
                name="labelMarathi"
                value={editingQuestion?.labelMarathi || ""}
                onChange={(e) => setEditingQuestion(prev => ({ ...prev, labelMarathi: e.target.value }))}
                placeholder="उदा. आपण आपले रोप स्वतः आणू शकता का?"
                required
              />
            </label>

            <label>
              <span>English Placeholder (Optional)</span>
              <input
                name="placeholderEnglish"
                value={editingQuestion?.placeholderEnglish || ""}
                onChange={(e) => setEditingQuestion(prev => ({ ...prev, placeholderEnglish: e.target.value }))}
                placeholder="e.g. Yes/No or Type here..."
              />
            </label>

            <label>
              <span>Marathi Placeholder (Optional)</span>
              <input
                name="placeholderMarathi"
                value={editingQuestion?.placeholderMarathi || ""}
                onChange={(e) => setEditingQuestion(prev => ({ ...prev, placeholderMarathi: e.target.value }))}
                placeholder="उदा. माहिती येथे भरा..."
              />
            </label>
          </div>

          {saveState.message ? (
            <p className={saveState.ok ? "admin-success" : "admin-error"}>{saveState.message}</p>
          ) : null}

          <button disabled={savePending} type="submit" style={{ marginTop: "12px" }}>
            {savePending ? "Saving Question..." : isEditing ? "Update Question" : "Create Question"}
          </button>
        </form>
      </div>

      {/* List Questions panel */}
      <div className="admin-panel" style={{ marginTop: "24px" }}>
        <div className="admin-panel-header">
          <div>
            <p className="admin-kicker">Manage Form Inputs</p>
            <h2>Current Form Questions</h2>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Required</th>
                <th>English Label</th>
                <th>Marathi Label</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialQuestions.length === 0 ? (
                <tr>
                  <td colSpan={6}>No questions configured. Add one above.</td>
                </tr>
              ) : (
                initialQuestions.map((q) => (
                  <tr key={q.id}>
                    <td><code>{q.id}</code></td>
                    <td>{q.type === "yes_no" ? "Yes/No Radio" : q.type === "textarea" ? "Textarea" : "Text Input"}</td>
                    <td>{q.required ? "⚠️ Yes" : "No"}</td>
                    <td>{q.labelEnglish}</td>
                    <td>{q.labelMarathi}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="admin-ghost-button"
                          onClick={() => handleEdit(q)}
                          type="button"
                          style={{ minHeight: "36px", padding: "6px 12px", fontSize: "13px" }}
                        >
                          Edit
                        </button>
                        <form action={deleteAction} style={{ display: "inline" }}>
                          <input name="id" type="hidden" value={q.id} />
                          <button
                            disabled={deletePending}
                            className="admin-ghost-button"
                            type="submit"
                            style={{
                              minHeight: "36px",
                              padding: "6px 12px",
                              fontSize: "13px",
                              borderColor: "var(--danger)",
                              color: "var(--danger)"
                            }}
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
