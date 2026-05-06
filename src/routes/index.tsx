import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ShieldCheck, BookOpen, ClipboardCheck, Award, Sparkles, ArrowRight, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSE_META, LESSONS } from "@/course/content";
import { clearUser } from "@/course/store";

export const Route = createFileRoute("/")({
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();

  const start = () => {
    clearUser();
    navigate({ to: "/leccion/$index", params: { index: "0" } });
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "var(--gradient-mesh)" }} />
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary-glow/40 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Plataforma de cumplimiento
          </div>
          <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">{COURSE_META.title}</h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-primary-foreground/85 leading-relaxed">{COURSE_META.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={start} className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-xl px-7">
              Iniciar inducción
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <Lock className="h-4 w-4" />
              Tus datos se solicitan al final, en la evaluación
            </div>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-3 max-w-xl">
            <Stat n={LESSONS.length} l="Lecciones" />
            <Stat n={10} l="Preguntas" />
            <Stat n={`${COURSE_META.passingScore}%`} l="Mínimo" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          <Feature icon={<BookOpen className="h-5 w-5" />} title="Contenido modular" desc="Lecciones cortas, claras y aplicadas al sector salud." badge="01" />
          <Feature icon={<Zap className="h-5 w-5" />} title="Avance lineal" desc="Recorrido guiado con barra de progreso en tiempo real." badge="02" />
          <Feature icon={<ClipboardCheck className="h-5 w-5" />} title="Evaluación interactiva" desc={`Una pregunta por pantalla. Aprueba con ${COURSE_META.passingScore}% o más.`} badge="03" />
        </div>
        <div className="mt-12 flex flex-col items-center text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--gradient-accent)" }}>
            <Award className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">Al aprobar verás un resumen con tu nombre, documento y resultado final.</p>
          <Button size="lg" className="mt-6" onClick={start}>Comenzar ahora <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Hospital Local del Municipio de Los Patios
          </div>
          <Link to="/" className="hover:text-foreground">SARLAFT–FPADM</Link>
        </div>
      </footer>
    </main>
  );
}

function Stat({ n, l }: { n: number | string; l: string }) {
  return (
    <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 backdrop-blur">
      <p className="text-2xl font-bold tabular-nums">{n}</p>
      <p className="text-[11px] font-medium uppercase tracking-wider text-primary-foreground/70">{l}</p>
    </div>
  );
}

function Feature({ icon, title, desc, badge }: { icon: React.ReactNode; title: string; desc: string; badge: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="absolute right-4 top-4 text-xs font-mono text-muted-foreground/40">{badge}</div>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">{icon}</div>
      <p className="mt-4 font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
