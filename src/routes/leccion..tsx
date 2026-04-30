import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LESSONS, COURSE_META } from "@/course/content";

export const Route = createFileRoute("/leccion/")({
  component: LessonPage,
});

function LessonPage() {
  const { index } = Route.useParams();
  const navigate = useNavigate();
  const i = Math.max(0, Math.min(LESSONS.length - 1, parseInt(index, 10) || 0));
  const lesson = LESSONS[i];
  const isLast = i === LESSONS.length - 1;
  const progress = ((i + 1) / (LESSONS.length + 1)) * 100;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [i]);

  const next = () => {
    if (isLast) navigate({ to: "/evaluacion" });
    else navigate({ to: "/leccion/$index", params: { index: String(i + 1) } });
  };

  const prev = () => {
    if (i === 0) navigate({ to: "/" });
    else navigate({ to: "/leccion/$index", params: { index: String(i - 1) } });
  };

  return (
    <main className="min-h-screen bg-background">
      <Header current={i + 1} total={LESSONS.length} progress={progress} />

      <article className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        {/* Lesson card header */}
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-7 md:p-10 text-primary-foreground"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "var(--gradient-mesh)" }} />
          <div className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">
            <Sparkles className="h-3.5 w-3.5" />
            Lección {String(i + 1).padStart(2, "0")} / {String(LESSONS.length).padStart(2, "0")}
          </div>
          {lesson.subtitle && (
            <p className="relative mt-4 text-sm text-primary-foreground/75">{lesson.subtitle}</p>
          )}
          <h1 className="relative mt-1 text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            {lesson.title}
          </h1>
        </div>

        {/* Content blocks */}
        <div className="mt-8 space-y-5">
          {lesson.blocks.map((b, idx) => {
            if (b.type === "p")
              return (
                <p key={idx} className="text-base leading-relaxed text-foreground/90">
                  {b.text}
                </p>
              );
            if (b.type === "h")
              return (
                <h2
                  key={idx}
                  className="flex items-center gap-2 pt-3 text-lg font-semibold text-foreground"
                >
                  <span className="h-5 w-1 rounded-full bg-primary" />
                  {b.text}
                </h2>
              );
            if (b.type === "list")
              return (
                <ul key={idx} className="space-y-2.5 rounded-xl border border-border bg-card p-5">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-3 text-sm text-foreground/90">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                        {j + 1}
                      </span>
                      <span className="leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              );
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl border border-accent/40 bg-accent/10 p-5"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                <div className="flex items-center gap-2 text-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold uppercase tracking-wider">{b.title}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{b.text}</p>
              </div>
            );
          })}
        </div>

        {/* Nav */}
        <div className="mt-12 flex items-center justify-between gap-3 border-t border-border pt-6">
          <Button variant="ghost" onClick={prev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {i === 0 ? "Inicio" : "Anterior"}
          </Button>
          <div className="hidden md:flex items-center gap-1.5">
            {LESSONS.map((_, j) => (
              <button
                key={j}
                aria-label={`Ir a lección ${j + 1}`}
                onClick={() => navigate({ to: "/leccion/$index", params: { index: String(j) } })}
                className={[
                  "h-1.5 rounded-full transition-all",
                  j === i ? "w-6 bg-primary" : j < i ? "w-1.5 bg-primary/60" : "w-1.5 bg-border",
                ].join(" ")}
              />
            ))}
          </div>
          <Button onClick={next} size="lg">
            {isLast ? "Ir a evaluación" : "Siguiente"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </article>
    </main>
  );
}

function Header({ current, total, progress }: { current: number; total: number; progress: number }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto max-w-3xl px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--gradient-hero)" }}>
              <ShieldCheck className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">{COURSE_META.title}</span>
            <span className="sm:hidden">SARLAFT</span>
          </Link>
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <Progress value={progress} className="mt-2 h-1" />
      </div>
    </header>
  );
}
