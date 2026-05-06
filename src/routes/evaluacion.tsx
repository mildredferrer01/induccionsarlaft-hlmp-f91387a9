import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShieldCheck, CheckCircle2, XCircle, RotateCcw, Award, ArrowLeft, ArrowRight, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { QUESTIONS, COURSE_META } from "@/course/content";
import { saveUser, saveResponse, type CourseUser } from "@/course/store";
import { guardarEnSheets } from "@/lib/sheets";

export const Route = createFileRoute("/evaluacion")({
  head: () => ({ meta: [{ title: "Evaluación final — SARLAFT" }] }),
  component: ExamPage,
});

type Stage = "register" | "exam" | "result";

function ExamPage() {
  const [stage, setStage] = useState<Stage>("register");
  const [user, setUser] = useState<CourseUser | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);

  const result = useMemo(() => {
    const correct = QUESTIONS.filter((q) => answers[q.id] === q.correctIndex).length;
    const score = Math.round((correct / QUESTIONS.length) * 100);
    return { correct, total: QUESTIONS.length, score, passed: score >= COURSE_META.passingScore };
  }, [answers]);

  const handleStart = (u: CourseUser) => {
    setUser(u);
    saveUser(u);
    setStage("exam");
  };

  const handleSubmit = () => {
  if (!user) return;
  saveResponse({
    user,
    answers,
    score: result.score,
    passed: result.passed,
    submittedAt: new Date().toISOString(),
  });

  // Guardar en Google Sheets
  guardarEnSheets({
    nombre: user.name,
    cedula: user.idNumber,
    puntaje: result.score,
    correctas: result.correct,
    total: result.total,
    aprobado: result.passed,
    respuestas: QUESTIONS.map((q, i) =>
      `P${i + 1}: ${q.options[answers[q.id]] ?? "Sin respuesta"}`
    ).join(" | "),
    fecha: new Date().toLocaleString("es-CO"),
  });

  setStage("result");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setStage("exam");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (stage === "register") return <RegisterStage onStart={handleStart} />;
  if (stage === "result")
    return <ResultView user={user} result={result} answers={answers} onRetry={reset} />;

  return (
    <ExamSlide
      current={current}
      setCurrent={setCurrent}
      answers={answers}
      setAnswers={setAnswers}
      onSubmit={handleSubmit}
    />
  );
}

/* ---------- Register stage ---------- */
function RegisterStage({ onStart }: { onStart: (u: CourseUser) => void }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3 || idNumber.trim().length < 4) {
      setError("Ingresa tu nombre completo y un documento válido.");
      return;
    }
    onStart({ name: name.trim(), idNumber: idNumber.trim(), startedAt: new Date().toISOString() });
  };

  return (
    <main className="min-h-screen bg-background">
      <ShellHeader />
      <section className="mx-auto max-w-xl px-6 py-12 md:py-16">
        <div
          className="relative overflow-hidden rounded-3xl border border-border bg-card"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div
            className="relative overflow-hidden px-8 py-10 text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "var(--gradient-mesh)" }} />
            <div className="relative inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Evaluación final
            </div>
            <h1 className="relative mt-4 text-2xl md:text-3xl font-bold leading-tight">
              Antes de comenzar, identifícate
            </h1>
            <p className="relative mt-2 text-sm text-primary-foreground/80">
              Tus datos se registran junto con tus respuestas para emitir la constancia.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5 px-8 py-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <User className="h-3.5 w-3.5" /> Nombre completo
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. María Pérez Gómez"
                className="h-11"
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Documento de identidad
              </Label>
              <Input
                id="id"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Número de cédula"
                inputMode="numeric"
                className="h-11"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => navigate({ to: "/" })}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Volver
              </Button>
              <Button type="submit" size="lg" className="flex-1">
                Comenzar evaluación
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

/* ---------- Exam (one question per slide) ---------- */
function ExamSlide({
  current,
  setCurrent,
  answers,
  setAnswers,
  onSubmit,
}: {
  current: number;
  setCurrent: (n: number) => void;
  answers: Record<string, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  onSubmit: () => void;
}) {
  const q = QUESTIONS[current];
  const total = QUESTIONS.length;
  const isLast = current === total - 1;
  const isFirst = current === 0;
  const selected = answers[q.id];
  const hasAnswer = selected !== undefined;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;
  const progress = ((current + 1) / total) * 100;

  const next = () => {
    if (isLast) return;
    setCurrent(current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => {
    if (isFirst) return;
    setCurrent(current - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      <ShellHeader />

      <div className="mx-auto max-w-2xl px-6 pt-6">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground tabular-nums">
          <span>Pregunta {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <span>{answeredCount}/{total} respondidas</span>
        </div>
        <Progress value={progress} className="mt-2 h-1.5" />
      </div>

      <section className="mx-auto max-w-2xl px-6 py-8 md:py-10">
        <div
          key={q.id}
          className="relative overflow-hidden rounded-3xl border border-border bg-card animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div
            className="px-7 py-6 text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
              Pregunta {current + 1} de {total}
            </p>
            <h2 className="mt-2 text-xl md:text-2xl font-semibold leading-snug">{q.prompt}</h2>
          </div>

          <div className="space-y-3 px-7 py-7">
            {q.options.map((opt, oi) => {
              const isSel = selected === oi;
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                  className={[
                    "group flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                    isSel
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-secondary/60",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition",
                      isSel
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground group-hover:bg-primary/10 group-hover:text-primary",
                    ].join(" ")}
                  >
                    {String.fromCharCode(65 + oi)}
                  </span>
                  <span className="text-sm md:text-base text-foreground/90">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
          {QUESTIONS.map((qq, j) => {
            const answered = answers[qq.id] !== undefined;
            const isCurrent = j === current;
            return (
              <button
                key={qq.id}
                aria-label={`Pregunta ${j + 1}`}
                onClick={() => setCurrent(j)}
                className={[
                  "h-2 rounded-full transition-all",
                  isCurrent ? "w-7 bg-primary" : answered ? "w-2 bg-primary/60" : "w-2 bg-border",
                ].join(" ")}
              />
            );
          })}
        </div>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={prev} disabled={isFirst}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          {isLast ? (
            <Button size="lg" disabled={!allAnswered} onClick={onSubmit}>
              {allAnswered ? "Enviar evaluación" : `Faltan ${total - answeredCount}`}
            </Button>
          ) : (
            <Button size="lg" onClick={next} disabled={!hasAnswer}>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}

/* ---------- Result ---------- */
function ResultView({
  user,
  result,
  answers,
  onRetry,
}: {
  user: CourseUser | null;
  result: { correct: number; total: number; score: number; passed: boolean };
  answers: Record<string, number>;
  onRetry: () => void;
}) {
  const passed = result.passed;
  return (
    <main className="min-h-screen bg-background">
      <ShellHeader />
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div
          className="overflow-hidden rounded-3xl border border-border bg-card"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div
            className="relative overflow-hidden px-8 py-12 text-center text-primary-foreground"
            style={{
              background: passed
                ? "var(--gradient-hero)"
                : "linear-gradient(135deg, oklch(0.40 0.18 25), oklch(0.55 0.22 30))",
            }}
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "var(--gradient-mesh)" }} />
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur">
              {passed ? <Award className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
            </div>
            <h1 className="relative mt-5 text-3xl md:text-4xl font-bold">
              {passed ? "¡Evaluación aprobada!" : "No alcanzaste la nota mínima"}
            </h1>
            <p className="relative mt-2 text-primary-foreground/85">
              {passed
                ? "Has completado satisfactoriamente la inducción SARLAFT."
                : `Necesitas ${COURSE_META.passingScore}% para aprobar. ¡Inténtalo de nuevo!`}
            </p>
          </div>

          <div className="grid gap-4 px-8 py-8 sm:grid-cols-3">
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
            <ul className="mt-4 space-y-3">
              {QUESTIONS.map((q, idx) => {
                const userAns = answers[q.id];
                const ok = userAns === q.correctIndex;
                return (
                  <li key={q.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-start gap-2">
                      {ok ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      )}
                      <div className="text-sm">
                        <p className="font-medium text-foreground">
                          {idx + 1}. {q.prompt}
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          Tu respuesta: {q.options[userAns]}
                        </p>
                        {!ok && (
                          <p className="mt-0.5 text-success">
                            Correcta: {q.options[q.correctIndex]}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-t border-border bg-card px-8 py-6 sm:flex-row sm:justify-end">
            {!passed && (
              <Button variant="outline" onClick={onRetry}>
                <RotateCcw className="mr-2 h-4 w-4" /> Reintentar evaluación
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
    <div className="rounded-2xl border border-border bg-card p-5 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={[
          "mt-1 text-3xl font-bold tabular-nums",
          highlight ? "text-success" : "text-foreground",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

function ShellHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--gradient-hero)" }}>
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">{COURSE_META.title}</span>
          <span className="sm:hidden">SARLAFT</span>
        </Link>
      </div>
    </header>
  );
}
