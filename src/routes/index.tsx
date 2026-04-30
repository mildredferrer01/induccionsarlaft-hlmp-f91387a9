import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, BookOpen, ClipboardCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COURSE_META, LESSONS } from "@/course/content";
import { saveUser } from "@/course/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inducción SARLAFT — Curso de cumplimiento" },
      {
        name: "description",
        content:
          "Curso de inducción SARLAFT con lecciones interactivas y evaluación final.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState("");

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3 || idNumber.trim().length < 4) {
      setError("Por favor ingresa tu nombre completo y un documento válido.");
      return;
    }
    saveUser({
      name: name.trim(),
      idNumber: idNumber.trim(),
      startedAt: new Date().toISOString(),
    });
    navigate({ to: "/leccion/$index", params: { index: "0" } });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative overflow-hidden text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary-glow blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            Curso de cumplimiento
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
            {COURSE_META.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/85">
            {COURSE_META.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              ¿Qué encontrarás en este curso?
            </h2>
            <ul className="mt-6 space-y-5">
              <Feature
                icon={<BookOpen className="h-5 w-5" />}
                title={`${LESSONS.length} lecciones`}
                desc="Conceptos clave de SARLAFT explicados de forma clara y aplicada."
              />
              <Feature
                icon={<ClipboardCheck className="h-5 w-5" />}
                title="Evaluación final"
                desc={`Examen de opción múltiple. Aprueba con ${COURSE_META.passingScore}% o más.`}
              />
              <Feature
                icon={<Award className="h-5 w-5" />}
                title="Constancia personal"
                desc="Al aprobar verás un resumen con tu nombre y resultado."
              />
            </ul>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl border border-border bg-card p-8 md:p-10"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <h3 className="text-xl font-semibold text-card-foreground">
              Comencemos
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingresa tus datos para iniciar la inducción.
            </p>
            <form onSubmit={start} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. María Pérez Gómez"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Documento de identidad</Label>
                <Input
                  id="id"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Número de cédula"
                  inputMode="numeric"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" size="lg" className="w-full">
                Iniciar curso
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        {icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </li>
  );
}