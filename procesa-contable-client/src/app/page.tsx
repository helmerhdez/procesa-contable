import { DASHBOARD_ROUTE } from "@/lib/constants";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(DASHBOARD_ROUTE);
}
