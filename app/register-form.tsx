"use client";

import { FormEvent, useState } from "react";
import type { RegistrationInput } from "@/lib/registration";

type RegisterState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof RegistrationInput, string>>;
};

export function RegisterForm({ eventId }: { eventId: string }) {
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
        message: result.message || "कृपया आवश्यक माहिती तपासा.",
        errors: result.errors
      });
    } else {
      event.currentTarget.reset();
      setState({
        ok: true,
        message: "धन्यवाद! तुमची नोंदणी यशस्वी झाली."
      });
    }

    setPending(false);
  }

  return (
    <form className="registration-form" id="register" onSubmit={handleSubmit}>
      <input name="eventId" type="hidden" value={eventId} />

      <label>
        <span>नाव</span>
        <input name="name" placeholder="आपले पूर्ण नाव" />
        {state.errors?.name ? <small>{state.errors.name}</small> : null}
      </label>

      <label>
        <span>संपर्क क्रमांक</span>
        <input
          inputMode="numeric"
          maxLength={10}
          name="phone"
          placeholder="१० अंकी मोबाइल क्रमांक"
        />
        {state.errors?.phone ? <small>{state.errors.phone}</small> : null}
      </label>

      <label>
        <span>पत्ता</span>
        <textarea name="address" placeholder="घर / सोसायटी / परिसर" rows={3} />
        {state.errors?.address ? <small>{state.errors.address}</small> : null}
      </label>

      <fieldset>
        <legend>आपण आपले वृक्ष स्वतः आणू शकता का?</legend>
        <label className="choice">
          <input name="canBringTree" type="radio" value="yes" />
          <span>हो</span>
        </label>
        <label className="choice">
          <input name="canBringTree" type="radio" value="no" />
          <span>नाही</span>
        </label>
        {state.errors?.canBringTree ? (
          <small>{state.errors.canBringTree}</small>
        ) : null}
      </fieldset>

      <button disabled={pending} type="submit">
        {pending ? "नोंदणी होत आहे..." : "नोंदणी करा"}
      </button>

      {state.message ? (
        <p className={state.ok ? "form-status success" : "form-status"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
