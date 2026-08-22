import { NotFoundContent } from "@/components/not-found-content";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function LangNotFound() {
  return (
    <NotFoundContent
      fallback={{
        title: getDictionary("id").notFound.title,
        description: getDictionary("id").notFound.description,
        backHome: getDictionary("id").notFound.backHome,
      }}
    />
  );
}
