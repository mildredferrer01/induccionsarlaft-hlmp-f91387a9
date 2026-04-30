import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, CheckCircle2, XCircle, RotateCcw, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUESTIONS, COURSE_META } from "@/course/content";
import { getUser, type CourseUser } from "@/course/store";

export const Route = createFileRoute("/evaluacion")({
  head: () => ({
    meta: [{ title: "Evaluación final — SARLAFT" }],
  }),
  component: ExamPage,
});

function ExamPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<CourseUser | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) navigate({ to: "/" });
    else setUser(u);
  }, [navigate]);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const result = useMemo(() => {
    const correct = QUESTIONS.filter((q) => answers[q.id] === q.correctIndex).length;
    const score = Math.round((correct / QUESTIONS.length) * 100);
    return { correct, total: QUESTIONS.length, score, passed: score >= COURSE_META.passingScore };
  }, [answers]);

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return <ResultView user={user} result={result} onRetry={reset} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {COURSE_META.title}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 pt-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">
          Evaluación final
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
          Demuestra lo que aprendiste
        </h1>
        <p className="mt-3 text-muted-foreground">
          Responde las {QUESTIONS.length} preguntas. Necesitas {COURSE_META.passingScore}% o más para aprobar.
        </p>

        <div className="mt-6 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Respondidas: {answeredCount}/{QUESTIONS.length}
          </span>
        </div>
        <Progress value={(answeredCount / QUESTIONS.length) * 100} className="mt-2 h-1.5" />
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        {QUESTIONS.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-2xl border border-border bg-card p-6"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <p className="text-sm font-semibold text-primary-glow">
              Pregunta {idx + 1}
            </p>
            <p className="mt-1 text-lg font-semibold text-card-foreground">
              {q.prompt}
            </p>
            <div className="mt-4 space-y-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    className={[
                      "flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition",
                      selected
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:border-primary/40 hover:bg-secondary",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground",
                      ].join(" ")}
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="sticky bottom-4 flex justify-end">
          <Button
            size="lg"
            disabled={!allAnswered}
            onClick={() => {
              setSubmitted(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {allAnswered ? "Enviar evaluación" : `Responde las ${QUESTIONS.length - answeredCount} restantes`}
          </Button>
        </div>
      </div>
    </main>
  );
}

function ResultView({
  user,
  result,
  onRetry,
}: {
  user: CourseUser | null;
  result: { correct: number; total: number; score: number; passed: boolean };
  onRetry: () => void;
}) {
  const passed = result.passed;
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div
          className="overflow-hidden rounded-3xl border border-border bg-card"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div
            className="px-8 py-10 text-center text-primary-foreground"
            style={{
              background: passed ? "var(--gradient-hero)" : "linear-gradient(135deg, oklch(0.45 0.15 25), oklch(0.55 0.2 30))",
            }}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur">
              {passed ? <Award className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold">
              {passed ? "¡Evaluación aprobada!" : "No alcanzaste la nota mínima"}
            </h1>
            <p className="mt-2 text-primary-foreground/85">
              {passed
                ? "Has completado satisfactoriamente la inducción SARLAFT."
                : `Necesitas ${COURSE_META.passingScore}% para aprobar. ¡Inténtalo de nuevo!`}
            </p>
          </div>

          <div className="grid gap-6 px-8 py-8 sm:grid-cols-3">
            <Stat label="Puntaje" value={`${result.score}%`} highlight={passed} />
            <Stat label="Correctas" value={`${result.correct}/${result.total}`} />
            <Stat label="Mínimo" value={`${COURSE_META.passingScore}%`} />
          </div>

          {user && (
            <div className="border-t border-border bg-secondary/40 px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Participante
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">Documento: {user.idNumber}</p>
              <p className="text-sm text-muted-foreground">
                Fecha: {new Date().toLocaleDateString("es-CO", { dateStyle: "long" })}
              </p>
            </div>
          )}

          <div className="border-t border-border px-8 py-6">
            <h3 className="text-sm font-semibold text-foreground">Detalle de respuestas</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Revisa qué respondiste correctamente.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-border bg-card px-8 py-6 sm:flex-row sm:justify-end">
            {!passed && (
              <Button variant="outline" onClick={onRetry}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reintentar evaluación
              </Button>
            )}
            <Button asChild>
              <Link to="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={[
          "mt-1 text-2xl font-bold",
          highlight ? "text-success" : "text-foreground",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

