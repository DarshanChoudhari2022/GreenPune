import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminLoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login | GreenPune"
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="admin-page admin-login-page">
      <section className="admin-login-card">
        <p className="admin-kicker">GreenPune Admin</p>
        <h1>Sign in</h1>
        <p>View registrations and publish community plantation events.</p>
        <AdminLoginForm />
        <small>
          Set <code>ADMIN_PASSWORD</code> in your environment. Local fallback:
          <code> greenpune-admin</code>.
        </small>
      </section>
    </main>
  );
}
