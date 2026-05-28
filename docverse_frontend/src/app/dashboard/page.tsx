import { redirect } from "next/navigation";

// TODO: Redirect based on actual user role
export default function DashboardPage() {
  redirect("/dashboard/user/library");
}
