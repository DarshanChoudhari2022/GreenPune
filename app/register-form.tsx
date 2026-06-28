"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [regCount, setRegCount] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Fetch live registration count on mount and after each successful registration
  const fetchCount = async () => {
    try {
      const res = await fetch("/api/register");
      const data = await res.json();
      if (data.ok) setRegCount(data.count);
    } catch {
      // silently ignore
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setState({});
    setShowSuccess(false);

    // Capture the form element immediately before any await
    const form = formRef.current;

    try {
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

      // Add a 15-second timeout to prevent hanging forever
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeout);

      const result = (await response.json()) as RegisterState;

      if (!response.ok) {
        setState({
          ok: false,
          message: result.message || (lang === "mr" ? "कृपया त्रुटी दुरुस्त करा." : "Please correct the errors."),
          errors: result.errors
        });
      } else {
        // Reset form using the ref (safe after await)
        if (form) form.reset();
        setState({ ok: true, message: copy.success });
        setShowSuccess(true);
        // Fire-and-forget: don't block success UI for count refresh
        fetchCount();
      }
    } catch (err: any) {
      // Handle network errors, timeouts, JSON parse failures
      const isTimeout = err?.name === "AbortError";
      setState({
        ok: false,
        message: isTimeout
          ? (lang === "mr" ? "सर्व्हर प्रतिसाद देत नाही. कृपया पुन्हा प्रयत्न करा." : "Server not responding. Please try again.")
          : (lang === "mr" ? "नोंदणी जतन करता आली नाही. कृपया पुन्हा प्रयत्न करा." : "Could not save registration. Please try again.")
      });
    } finally {
      // ALWAYS re-enable the button, no matter what
      setPending(false);
    }
  }

  const successTitle = lang === "mr" ? "🎉 नोंदणी यशस्वी!" : "🎉 Registration Successful!";
  const successBody = lang === "mr"
    ? "तुमची वृक्षारोपण मोहिमेसाठी नोंदणी यशस्वीरीत्या झाली आहे. कार्यक्रमाच्या दिवशी कृपया उपस्थित राहा."
    : "You have been successfully registered for the tree plantation drive. Please attend on the event day.";
  const successClose = lang === "mr" ? "ठीक आहे" : "OK, Got it";
  const countLabel = lang === "mr" ? "एकूण नोंदणी" : "Registrations so far";

  return (
    <>
      {/* Live Registration Count Badge */}
      {regCount !== null && regCount > 0 && (
        <div className="reg-count-badge">
          <span className="reg-count-number">{regCount}</span>
          <span className="reg-count-label">{countLabel}</span>
        </div>
      )}

      <form className="registration-form" id="register" ref={formRef} onSubmit={handleSubmit}>
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

        {state.message && !state.ok ? (
          <p className="form-status">
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

      {/* Success Dialog Overlay */}
      {showSuccess && (
        <div className="success-overlay" onClick={() => setShowSuccess(false)}>
          <div className="success-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">✅</div>
            <h3>{successTitle}</h3>
            <p>{successBody}</p>
            {regCount !== null && (
              <div className="success-count">
                <strong>{regCount}</strong>
                <span>{countLabel}</span>
              </div>
            )}
            <button className="success-btn" onClick={() => setShowSuccess(false)}>
              {successClose}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
