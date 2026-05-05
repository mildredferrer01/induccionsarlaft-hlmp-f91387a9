import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LESSONS, COURSE_META } from "@/course/content";

export const Route = createFileRoute("/leccion/$index")({
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
      <Header />
      <div className="mx-auto max-w-3xl px-6 pt-6">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Lección {i + 1} de {LESSONS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="mt-2 h-1.5" />
      </div>

      <article className="mx-auto max-w-3xl px-6 py-10">
        {lesson.subtitle && (
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">
            {lesson.subtitle}
          </p>
        )}
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {lesson.title}
        </h1>

        <div className="mt-8 space-y-6">
          {lesson.blocks.map((b, idx) => {
            if (b.type === "p")
              return (
                <p key={idx} className="text-base leading-relaxed text-foreground/90">
                  {b.text}
                </p>
              );
            if (b.type === "h")
              return (
                <h2 key={idx} className="pt-2 text-xl font-semibold text-foreground">
                  {b.text}
                </h2>
              );
            if (b.type === "list")
              return (
                <ul key={idx} className="space-y-2 pl-1">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-3 text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            return (
              <div
                key={idx}
                className="rounded-xl border-l-4 border-accent bg-secondary p-5"
              >
                <div className="flex items-center gap-2 text-secondary-foreground">
                  <Info className="h-4 w-4" />
                  <p className="text-sm font-semibold">{b.title}</p>
                </div>
                <p className="mt-2 text-sm text-foreground/85">{b.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <Button variant="ghost" onClick={prev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {i === 0 ? "Inicio" : "Anterior"}
          </Button>
          <Button onClick={next} size="lg">
            {isLast ? "Ir a evaluación" : "Siguiente"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </article>
    </main>
  );
}

function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ShieldCheck className="h-5 w-5 text-primary" />
          {COURSE_META.title}
        </Link>
      </div>
    </header>
  );
}