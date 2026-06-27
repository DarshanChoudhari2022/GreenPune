"use client";

import { FormEvent, useState } from "react";
import type { RegistrationInput } from "@/lib/registration";
import type { content, Language } from "@/lib/site-content";

type RegisterState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof RegistrationInput, string>>;
};

function localizeErrors(
  errors: RegisterState["errors"],
  copy: FormCopy
): RegisterState["errors"] {
  if (!errors) return undefined;
  return {
    name: errors.name ? copy.nameError : undefined,
    phone: errors.phone ? copy.phoneError : undefined,
    address: errors.address ? copy.addressError : undefined,
    canBringTree: errors.canBringTree ? copy.canBringTreeError : undefined
  };
}

type FormCopy = (typeof content)[Language]["form"];

export function RegisterForm({
  eventId,
  copy
}: {
  eventId: string;
  copy: FormCopy;
}) {
  const [state, setState] = useState<RegisterState>({});
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setState({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      eventId,
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      canBringTree: String(formData.get("canBringTree") || "")
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
        message: result.message || copy.error,
        errors: localizeErrors(result.errors, copy)
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
        <input
          inputMode="numeric"
          maxLength={10}
          name="phone"
          placeholder={copy.phonePlaceholder}
        />
        {state.errors?.phone ? <small>{state.errors.phone}</small> : null}
      </label>

      <label>
        <span>{copy.address}</span>
        <textarea name="address" placeholder={copy.addressPlaceholder} rows={3} />
        {state.errors?.address ? <small>{state.errors.address}</small> : null}
      </label>

      <fieldset>
        <legend>{copy.canBringTree}</legend>
        <label className="choice">
          <input name="canBringTree" type="radio" value="yes" />
          <span>{copy.yes}</span>
        </label>
        <label className="choice">
          <input name="canBringTree" type="radio" value="no" />
          <span>{copy.no}</span>
        </label>
        {state.errors?.canBringTree ? (
          <small>{state.errors.canBringTree}</small>
        ) : null}
      </fieldset>

      <button disabled={pending} type="submit">
        {pending ? copy.pending : copy.submit}
      </button>

      {state.message ? (
        <p className={state.ok ? "form-status success" : "form-status"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
