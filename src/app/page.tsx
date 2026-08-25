import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Deteksi harus terjadi per-request berdasarkan Accept-Language browser
export const dynamic = "force-dynamic";

/**
 * Bahasa default adalah Indonesia, namun pengunjung dengan browser
 * berbahasa Inggris diarahkan otomatis ke /en.
 */
export default async function RootPage() {
  const headerList = await headers();
  const acceptLanguage = headerList.get("accept-language") ?? "";

  const preferences = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  let target = "id";
  for (const pref of preferences) {
    if (pref.startsWith("en")) {
      target = "en";
      break;
    }
    if (pref.startsWith("id")) {
      target = "id";
      break;
    }
  }

  redirect(`/${target}`);
}
