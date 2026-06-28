"use client";

import { useActionState } from "react";
import { loginAdmin } from "../actions";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, {});

  return (
    <form action={formAction} className="admin-login-form">
      <label>
        <span>Password</span>
        <input
          autoComplete="current-password"
          name="password"
          placeholder="Enter admin password"
          type="password"
        />
      </label>
      {state.error ? <p className="admin-error">{state.error}</p> : null}
      <button disabled={pending} type="submit">
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
