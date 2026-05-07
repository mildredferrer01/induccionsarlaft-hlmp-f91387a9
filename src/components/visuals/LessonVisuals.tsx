export function Visual1() {
  return (
    <svg width="100%" viewBox="0 0 680 320" role="img" className="my-6">
      <title>¿Qué protege el SARLAFT–FPADM?</title>
      <defs><marker id="av1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
      <rect x="270" y="120" width="140" height="110" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      <rect x="295" y="100" width="90" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      <rect x="320" y="152" width="40" height="50" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <rect x="333" y="108" width="14" height="4" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="338" y="104" width="4" height="12" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="283" y="135" width="20" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      <rect x="377" y="135" width="20" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      <rect x="283" y="165" width="20" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      <rect x="377" y="165" width="20" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      <line x1="230" y1="230" x2="450" y2="230" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <g opacity="0.9">
        <path d="M95 60 L140 60 L140 110 Q140 135 117 148 Q95 135 95 110 Z" fill="#1D9E75" fillOpacity="0.15" stroke="#1D9E75" strokeWidth="1.5"/>
        <text x="118" y="95" textAnchor="middle" dominantBaseline="central" fill="#0F6E56" fontWeight="500" fontSize="14">LA</text>
        <text x="118" y="115" textAnchor="middle" fontSize="11" fill="#0F6E56">Lavado de</text>
        <text x="118" y="129" textAnchor="middle" fontSize="11" fill="#0F6E56">activos</text>
        <text x="118" y="160" textAnchor="middle" fontSize="10" fill="#0F6E56" opacity="0.7">Art. 323</text>
      </g>
      <g opacity="0.9">
        <path d="M300 30 L380 30 L380 95 Q380 130 340 148 Q300 130 300 95 Z" fill="#BA7517" fillOpacity="0.15" stroke="#BA7517" strokeWidth="1.5"/>
        <text x="340" y="70" textAnchor="middle" dominantBaseline="central" fill="#633806" fontWeight="500" fontSize="14">FT</text>
        <text x="340" y="90" textAnchor="middle" fontSize="11" fill="#633806">Financiación del</text>
        <text x="340" y="104" textAnchor="middle" fontSize="11" fill="#633806">terrorismo</text>
      </g>
      <g opacity="0.9">
        <path d="M540 60 L585 60 L585 110 Q585 135 562 148 Q540 135 540 110 Z" fill="#D85A30" fillOpacity="0.15" stroke="#D85A30" strokeWidth="1.5"/>
        <text x="562" y="92" textAnchor="middle" fontSize="11" fill="#993C1D" fontWeight="500">FPADM</text>
        <text x="562" y="113" textAnchor="middle" fontSize="11" fill="#993C1D">Proliferación</text>
        <text x="562" y="127" textAnchor="middle" fontSize="11" fill="#993C1D">de armas</text>
      </g>
      <line x1="142" y1="105" x2="268" y2="175" stroke="currentColor" strokeWidth="0.8" opacity="0.25" strokeDasharray="4 3" markerEnd="url(#av1)"/>
      <line x1="340" y1="148" x2="340" y2="118" stroke="currentColor" strokeWidth="0.8" opacity="0.25" strokeDasharray="4 3" markerEnd="url(#av1)"/>
      <line x1="538" y1="105" x2="412" y2="175" stroke="currentColor" strokeWidth="0.8" opacity="0.25" strokeDasharray="4 3" markerEnd="url(#av1)"/>
      <text x="340" y="262" textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.5">El SARLAFT protege al hospital de estos tres riesgos</text>
    </svg>
  );
}

export function Visual2() {
  return (
    <div className="grid grid-cols-2 gap-4 my-6 text-sm">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Lavado de activos — Art. 323</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 rounded-lg bg-destructive/10 border border-destructive/20 p-2 text-center text-xs">Dinero ilícito</div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 rounded-lg bg-secondary border border-border p-2 text-center text-xs">Sistema aparente</div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 rounded-lg bg-success/10 border border-success/20 p-2 text-center text-xs">Legal ✓</div>
        </div>
        <p className="text-xs text-muted-foreground">Dar apariencia legal a bienes provenientes de actividades ilícitas</p>
        <div className="mt-3 rounded-lg bg-destructive/5 border border-destructive/20 p-2 text-xs text-center">Pena: 10–30 años · Multa: 650–50.000 SMMLV</div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Financiación del terrorismo — Art. 345</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 rounded-lg bg-secondary border border-border p-2 text-center text-xs">Recursos propios</div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 rounded-lg bg-destructive/10 border border-destructive/20 p-2 text-center text-xs">Grupos terroristas</div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 rounded-lg bg-destructive/5 border border-destructive/10 p-2 text-center text-xs">Daño social</div>
        </div>
        <p className="text-xs text-muted-foreground">Proveer o administrar recursos con destino a actividades o grupos terroristas</p>
        <div className="mt-3 rounded-lg bg-destructive/5 border border-destructive/20 p-2 text-xs text-center">Pena: 13–22 años · Multa: 1.300–15.000 SMMLV</div>
      </div>
    </div>
  );
}

export function Visual3() {
  return (
    <div className="my-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sanciones penales</p>
          <div className="space-y-3">
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
              <p className="text-sm font-semibold text-foreground">Lavado de activos</p>
              <p className="text-xs text-muted-foreground mt-1">Prisión: 10 a 30 años</p>
              <p className="text-xs text-muted-foreground">Multa: 650 a 50.000 SMMLV</p>
              <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-destructive/70" style={{width:'70%'}}/></div>
            </div>
            <div className="rounded-lg bg-destructive/15 border border-destructive/30 p-3">
              <p className="text-sm font-semibold text-foreground">Financiación del terrorismo</p>
              <p className="text-xs text-muted-foreground mt-1">Prisión: 13 a 22 años</p>
              <p className="text-xs text-muted-foreground">Multa: 1.300 a 15.000 SMMLV</p>
              <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-destructive" style={{width:'88%'}}/></div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sanciones administrativas — SuperSalud</p>
          <div className="rounded-lg bg-secondary border border-border p-3">
            <p className="text-sm font-semibold text-foreground">A la entidad</p>
            <p className="text-xs text-muted-foreground mt-1">Hasta 2.500 SMMLV</p>
            <div className="mt-2 h-1.5 rounded-full bg-background overflow-hidden"><div className="h-full rounded-full bg-primary/60" style={{width:'55%'}}/></div>
          </div>
          <div className="rounded-lg bg-secondary border border-border p-3">
            <p className="text-sm font-semibold text-foreground">A funcionarios</p>
            <p className="text-xs text-muted-foreground mt-1">Hasta 200 SMMLV</p>
            <div className="mt-2 h-1.5 rounded-full bg-background overflow-hidden"><div className="h-full rounded-full bg-primary/40" style={{width:'30%'}}/></div>
          </div>
          <div className="rounded-lg bg-secondary border border-border p-3">
            <p className="text-sm font-semibold text-foreground">Revocatoria de habilitación</p>
            <p className="text-xs text-muted-foreground mt-1">Medida extrema</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-secondary border border-border p-3 text-center text-xs text-muted-foreground">Fundamento: Ley 1438 de 2011 — Arts. 130 y 131</div>
    </div>
  );
}

export function Visual4() {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-6">
      <div className="flex items-stretch gap-3 flex-wrap">
        <div className="flex-1 min-w-32 rounded-xl bg-primary/10 border border-primary/20 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">SuperSalud</p>
          <p className="text-xs text-muted-foreground">Circular Externa 009 de 2016</p>
          <p className="text-xs text-muted-foreground">CE 20211700000005-5/2021</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground text-xs">
          <span>→ Instrucción</span>
          <span className="opacity-40">← Reporte</span>
        </div>
        <div className="flex-1 min-w-40 rounded-xl bg-primary/20 border border-primary/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Hospital Los Patios</p>
          <p className="text-xs text-muted-foreground">Oficial de Cumplimiento</p>
          <p className="text-xs text-muted-foreground">Manual SARLAFT</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground text-xs">
          <span>→ Info mensual</span>
          <span className="opacity-40">← Tipologías</span>
        </div>
        <div className="flex-1 min-w-32 rounded-xl bg-secondary border border-border p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">UIAF</p>
          <p className="text-xs text-muted-foreground">Convenio desde</p>
          <p className="text-xs text-muted-foreground">28 oct. 2014</p>
        </div>
      </div>
    </div>
  );
}

export function Visual5() {
  return (
    <div className="my-6 grid grid-cols-2 gap-3">
      {[
        { n: "1", title: "Identificación", desc: "Detectar amenazas de LA/FT/FPADM en procesos, productos y contrapartes.", q: "¿Dónde estamos expuestos?", color: "bg-primary/10 border-primary/20 text-primary" },
        { n: "2", title: "Medición", desc: "Evaluar probabilidad de ocurrencia e impacto económico y reputacional.", q: "¿Qué tan grave es?", color: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400" },
        { n: "3", title: "Control", desc: "Aplicar políticas, procedimientos y controles para reducir la exposición.", q: "¿Qué hacemos?", color: "bg-destructive/10 border-destructive/20 text-destructive" },
        { n: "4", title: "Monitoreo", desc: "Verificar continuamente que los controles funcionen y actualizar la matriz.", q: "¿Funciona el control?", color: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400" },
      ].map((e) => (
        <div key={e.n} className={`rounded-xl border p-4 ${e.color}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold opacity-40">{e.n}</span>
            <p className="text-sm font-semibold">{e.title}</p>
          </div>
          <p className="text-xs opacity-80">{e.desc}</p>
          <p className="text-xs font-medium mt-2 opacity-60">{e.q}</p>
        </div>
      ))}
      <div className="col-span-2 rounded-lg bg-secondary border border-border p-3 text-center text-xs text-muted-foreground">
        Proceso cíclico y permanente — no lineal · Enfoque exigido por SuperSalud
      </div>
    </div>
  );
}

export function Visual6() {
  const items = [
    { n: "01", title: "Estructura organizacional", desc: "Oficial de Cumplimiento coordinador" },
    { n: "02", title: "Oficial de Cumplimiento", desc: "Profesional idóneo designado" },
    { n: "03", title: "Manual SARLAFT", desc: "Políticas y procedimientos institucionales" },
    { n: "04", title: "Actas de aprobación", desc: "Junta Directiva + Oficial de Cumplimiento" },
    { n: "05", title: "Informes de auditoría", desc: "Revisión periódica del sistema" },
    { n: "06", title: "Informes de cumplimiento", desc: "Reportes al Oficial y la Junta" },
    { n: "07", title: "Capacitación al personal", desc: "Registros de inducción, reinducción y formación continua de todos los colaboradores", full: true },
  ];
  return (
    <div className="my-6 grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.n} className={`rounded-lg border border-border bg-card p-3 flex items-center gap-3 ${item.full ? "col-span-2" : ""}`}>
          <span className="text-xs font-mono text-muted-foreground shrink-0">{item.n}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
          <div className="ml-auto shrink-0 h-4 w-4 rounded-full border-2 border-primary/40"/>
        </div>
      ))}
    </div>
  );
}

export function Visual7() {
  return (
    <div className="my-6 grid grid-cols-3 gap-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Herramienta 1</p>
        <p className="text-sm font-semibold text-foreground mb-2">Matriz de riesgos</p>
        <div className="grid grid-cols-3 gap-0.5 mb-3 text-xs">
          {["Bajo","Bajo","Medio","Bajo","Medio","Alto","Medio","Alto","Muy alto"].map((v,i)=>(
            <div key={i} className={`p-1 text-center rounded text-xs ${v==="Muy alto"?"bg-destructive/20":v==="Alto"?"bg-orange-500/20":v==="Medio"?"bg-amber-400/20":"bg-success/20"}`}>{v}</div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Identifica, evalúa y controla riesgos por probabilidad e impacto</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Herramienta 2</p>
        <p className="text-sm font-semibold text-foreground mb-2">Debida diligencia (KYC)</p>
        <div className="space-y-1.5 mb-3">
          {["Usuarios / Pacientes","Proveedores","Trabajadores"].map((g)=>(
            <div key={g} className="rounded-lg bg-secondary border border-border p-2 text-xs text-center">{g}</div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Verificar identidad y origen de recursos de cada contraparte</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Herramienta 3</p>
        <p className="text-sm font-semibold text-foreground mb-2">Registro de operaciones</p>
        <div className="rounded-lg border border-border overflow-hidden mb-3 text-xs">
          <div className="bg-secondary p-1.5 text-center font-semibold">Mes en curso</div>
          {["Transacción 1","Transacción 2","Transacción 3"].map((t)=>(
            <div key={t} className="p-1.5 border-t border-border text-center text-muted-foreground">{t}</div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Control y consolidación mensual de transacciones</p>
      </div>
    </div>
  );
}

export function Visual8() {
  return (
    <div className="my-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { n: "1", title: "Identificar", sub: "contrapartes", items: ["Solicitar documentos","Verificar información","Registrar datos correctamente"], color: "border-primary/30 bg-primary/5" },
          { n: "2", title: "Detectar", sub: "señales de alerta", items: ["Transacciones inusuales","Pagos en efectivo no justificados","Información inconsistente"], color: "border-amber-500/30 bg-amber-500/5" },
          { n: "3", title: "Reportar", sub: "al Oficial", items: ["Informar de inmediato","Solo al Oficial de Cumplimiento","Sin demora ni filtros"], color: "border-success/30 bg-success/5" },
        ].map((step) => (
          <div key={step.n} className={`rounded-xl border p-4 ${step.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-muted-foreground/30">{step.n}</span>
              <div><p className="text-sm font-semibold text-foreground">{step.title}</p><p className="text-xs text-muted-foreground">{step.sub}</p></div>
            </div>
            <ul className="space-y-1">{step.items.map((it)=><li key={it} className="flex gap-2 text-xs text-foreground/80"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40"/>{it}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-center">
        <p className="text-sm font-semibold text-destructive">¡Importante! NO alertes al usuario o proveedor sospechoso</p>
        <p className="text-xs text-muted-foreground mt-1">El principio de confidencialidad protege la investigación — solo informa al Oficial de Cumplimiento</p>
      </div>
    </div>
  );
}

export function Visual9() {
  return (
    <div className="my-6 space-y-4">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-lg font-semibold text-primary">"Prevenir el riesgo es responsabilidad de todos"</p>
        <p className="text-xs text-muted-foreground mt-1">Hospital Local Municipio de Los Patios — Compromiso institucional SARLAFT–FPADM</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: "👁️", title: "Si ves algo sospechoso", desc: "Repórtalo de inmediato al Oficial de Cumplimiento" },
          { icon: "💬", title: "Si tienes dudas", desc: "Consulta al Oficial de Cumplimiento — está para apoyarte" },
          { icon: "🛡️", title: "Tu rol es clave", desc: "Eres parte esencial en la prevención del LA/FT/FPADM" },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl mb-2">{c.icon}</p>
            <p className="text-sm font-semibold text-foreground">{c.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-secondary border border-border p-3 text-center text-xs text-muted-foreground">
        Transparencia · Legalidad · Protección de los recursos en salud
      </div>
    </div>
  );
}
