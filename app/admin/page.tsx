import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin RFQ Dashboard",
  description: "Password-protected local RFQ administration dashboard.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
