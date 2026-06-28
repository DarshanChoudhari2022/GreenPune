"use client";

import { FormEvent, useState } from "react";
import type { RegistrationInput } from "@/lib/registration";
import type { content, Language } from "@/lib/site-content";
import { type QuestionItem } from "@/lib/questions-store";

type RegisterState = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

type FormCopy = (typeof content)[Language]["form"];

export function RegisterForm({
  eventId,
  copy,
  questions,
  lang
}: {
  eventId: string;
  copy: FormCopy;
  questions: QuestionItem[];
  lang: Language;
}) {
  const [state, setState] = useState<RegisterState>({});
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setState({});

    const formData = new FormData(event.currentTarget);
    const answers: Record<string, string> = {};

    questions.forEach((q) => {
      answers[q.id] = String(formData.get(`answers_${q.id}`) || "");
    });

    const payload = {
      eventId,
      lang,
      name: String(formData.get("name") || ""),
      phoneCountryCode: String(formData.get("phoneCountryCode") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      answers
    };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = (await response.json()) as RegisterState;

    if (!response.ok) {
      setState({
        ok: false,
        message: result.message || (lang === "mr" ? "कृपया त्रुटी दुरुस्त करा." : "Please correct the errors."),
        errors: result.errors
      });
    } else {
      event.currentTarget.reset();
      setState({
        ok: true,
        message: copy.success
      });
    }

    setPending(false);
  }

  return (
    <form className="registration-form" id="register" onSubmit={handleSubmit}>
      <input name="eventId" type="hidden" value={eventId} />

      <label>
        <span>{copy.name}</span>
        <input name="name" placeholder={copy.namePlaceholder} />
        {state.errors?.name ? <small>{state.errors.name}</small> : null}
      </label>

      <label>
        <span>{copy.phone}</span>
        <div className="phone-input-group" style={{ display: "flex", gap: "8px" }}>
          <input
            name="phoneCountryCode"
            type="text"
            value="+91"
            readOnly
            className="country-code-input"
            style={{
              width: "70px",
              textAlign: "center",
              background: "var(--line-light)",
              cursor: "not-allowed",
              fontWeight: "700"
            }}
          />
          <input
            inputMode="numeric"
            maxLength={10}
            name="phone"
            placeholder={copy.phonePlaceholder}
            className="phone-input"
            style={{ flex: 1 }}
          />
        </div>
        {state.errors?.phoneCountryCode ? <small>{state.errors.phoneCountryCode}</small> : null}
        {state.errors?.phone ? <small>{state.errors.phone}</small> : null}
      </label>

      <label>
        <span>{copy.address}</span>
        <textarea name="address" placeholder={copy.addressPlaceholder} rows={3} />
        {state.errors?.address ? <small>{state.errors.address}</small> : null}
      </label>

      {/* Render Dynamic Questions */}
      {questions.map((question) => {
        const questionLabel = lang === "mr" ? question.labelMarathi : question.labelEnglish;
        const questionPlaceholder = lang === "mr" ? question.placeholderMarathi : question.placeholderEnglish;
        const errorKey = `answers_${question.id}`;
        const hasError = state.errors?.[errorKey];

        if (question.type === "yes_no") {
          return (
            <fieldset key={question.id}>
              <legend>{questionLabel}</legend>
              <label className="choice">
                <input name={`answers_${question.id}`} type="radio" value="yes" />
                <span>{copy.yes}</span>
              </label>
              <label className="choice">
                <input name={`answers_${question.id}`} type="radio" value="no" />
                <span>{copy.no}</span>
              </label>
              {hasError ? <small>{hasError}</small> : null}
            </fieldset>
          );
        }

        if (question.type === "textarea") {
          return (
            <label key={question.id}>
              <span>{questionLabel}</span>
              <textarea name={`answers_${question.id}`} placeholder={questionPlaceholder} rows={3} />
              {hasError ? <small>{hasError}</small> : null}
            </label>
          );
        }

        return (
          <label key={question.id}>
            <span>{questionLabel}</span>
            <input name={`answers_${question.id}`} placeholder={questionPlaceholder} />
            {hasError ? <small>{hasError}</small> : null}
          </label>
        );
      })}


      <button disabled={pending} type="submit">
        {pending ? copy.pending : copy.submit}
      </button>

      {state.message ? (
        <p className={state.ok ? "form-status success" : "form-status"}>
          {state.message}
        </p>
      ) : null}

      <p className="form-powered-by">
        Powered by{" "}
        <a href="https://bracketdex.com" target="_blank" rel="noopener noreferrer">
          BracketDex Technologies
        </a>
      </p>
    </form>
  );
}

