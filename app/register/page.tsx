import type { Metadata } from "next";
import { RegisterClient } from "./register-client";

export const metadata: Metadata = {
  title: "Register | GreenPune Events",
  description: "Register for the GreenPune tree plantation event."
};

export default function RegisterPage() {
  return <RegisterClient />;
}
