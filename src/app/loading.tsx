import { LogoMark } from "@/components/logo";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
      <LogoMark className="size-12 animate-pulse" />
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="size-2 animate-bounce rounded-full bg-brand-500 [animation-delay:-0.3s]" />
        <span className="size-2 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.15s]" />
        <span className="size-2 animate-bounce rounded-full bg-cyan-500" />
      </div>
    </div>
  );
}
