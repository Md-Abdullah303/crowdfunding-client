import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAuth } from "@/lib/auth-client";

export const metadata = { title: "Dashboard" };

export default async function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {children}
    </div>
  );
}
