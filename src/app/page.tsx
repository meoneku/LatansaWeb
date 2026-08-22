import { redirect } from "next/navigation";

// Bahasa default situs adalah Bahasa Indonesia
export default function RootPage() {
  redirect("/id");
}
