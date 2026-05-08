import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Info, ChevronRight } from "lucide-react";
import { LESSONS, COURSE_META } from "@/course/content";

export const Route = createFileRoute("/leccion/$index")({
  component: LessonPage,
});

const SHIELD_MESSAGES: Record<string, string> = {
  "que-es": "¡Bienvenido/a! Empecemos por lo más importante del sistema.",
  "conceptos": "Estos conceptos son la base legal. ¡Préstales mucha atención!",
  "sanciones": "Conocer las consecuencias nos ayuda a actuar con responsabilidad.",
  "regulacion": "Saber quién nos regula nos da claridad sobre nuestras obligaciones.",
  "etapas": "El sistema funciona como un ciclo continuo y permanente.",
  "documentacion": "La documentación es la evidencia tangible de nuestro cumplimiento.",
  "herramientas": "Estas herramientas son tu día a día en la prevención del riesgo.",
  "rol-trabajadores": "¡Tu rol es fundamental! Aquí te cuento exactamente cómo actuar.",
  "cierre": "¡Lo lograste! Estás listo/a para la evaluación final. 🎉",
};

const LESSON_CONFIG: Record<string, { emoji: string; color: string; geo: string }> = {
  "que-es":         { emoji: "🛡️", color: "#1B5E20", geo: "triangle" },
  "conceptos":      { emoji: "⚖️", color: "#1A237E", geo: "diamond"  },
  "sanciones":      { emoji: "🔒", color: "#4A148C", geo: "hexagon"  },
  "regulacion":     { emoji: "🏛️", color: "#0D47A1", geo: "triangle" },
  "etapas":         { emoji: "🔄", color: "#1B5E20", geo: "circle"   },
  "documentacion":  { emoji: "📋", color: "#004D40", geo: "diamond"  },
  "herramientas":   { emoji: "🔧", color: "#1B5E20", geo: "hexagon"  },
  "rol-trabajadores":{ emoji: "👥", color: "#0D47A1", geo: "triangle" },
  "cierre":         { emoji: "🎯", color: "#1B5E20", geo: "star"     },
};

function GeometricShapes({ geo }: { geo: string }) {
  if (geo === "triangle") return (
    <>
      <polygon points="200,20 320,200 80,200" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
      <polygon points="160,60 260,200 60,200"  fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <polygon points="230,10 370,220 90,220"  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
    </>
  );
  if (geo === "diamond") return (
    <>
      <polygon points="200,10 340,120 200,230 60,120" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
      <polygon points="200,40 300,120 200,200 100,120" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
    </>
  );
  if (geo === "hexagon") return (
    <>
      <polygon points="200,15 310,75 310,195 200,255 90,195 90,75" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
      <polygon points="200,45 280,90 280,180 200,225 120,180 120,90"  fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
    </>
  );
  if (geo === "star") return (
    <>
      <polygon points="200,10 225,80 300,80 240,125 265,195 200,150 135,195 160,125 100,80 175,80" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
    </>
  );
  return (
    <>
      <circle cx="200" cy="130" r="110" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
      <circle cx="200" cy="130" r="80"  fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
    </>
  );
}

function Shield3D({ size = 160 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 160 184" fill="none">
      <ellipse cx="80" cy="178" rx="44" ry="8" fill="rgba(0,0,0,0.25)"/>
      {/* Anillo orbital exterior */}
      <ellipse cx="80" cy="88" rx="72" ry="20" fill="none" stroke="rgba(76,175,80,0.5)" strokeWidth="1.2" strokeDasharray="6 4"
        style={{transformOrigin:"80px 88px", animation:"spin 18s linear infinite"}}/>
      {/* Anillo orbital interior */}
      <ellipse cx="80" cy="88" rx="55" ry="14" fill="none" stroke="rgba(165,214,167,0.35)" strokeWidth="0.8" strokeDasharray="4 5"
        style={{transformOrigin:"80px 88px", animation:"spin 12s linear infinite reverse"}}/>
      {/* Sombra lateral escudo */}
      <path d="M130 34 L142 44 L142 104 Q142 146 82 166 L80 162 Q130 142 130 96 Z" fill="rgba(0,0,0,0.3)"/>
      <path d="M30 34 L18 44 L18 104 Q18 146 78 166 L80 162 Q30 142 30 96 Z" fill="rgba(255,255,255,0.06)"/>
      {/* Cuerpo principal escudo */}
      <path d="M80 12 L130 30 L130 96 Q130 140 80 160 Q30 140 30 96 L30 30 Z" fill="url(#shieldGrad)"/>
      {/* Highlight superior */}
      <path d="M80 12 L130 30 L130 52 Q105 42 80 42 Q55 42 30 52 L30 30 Z" fill="rgba(255,255,255,0.18)"/>
      {/* Borde brillante */}
      <path d="M80 14 L128 31 L128 96 Q128 138 80 158 Q32 138 32 96 L32 31 Z" fill="none" stroke="rgba(165,214,167,0.6)" strokeWidth="1.5"/>
      {/* Gradiente interior */}
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E7D32"/>
          <stop offset="100%" stopColor="#1B5E20"/>
        </linearGradient>
      </defs>
      {/* Líneas de circuito */}
      <line x1="80" y1="68" x2="80" y2="56" stroke="rgba(165,214,167,0.6)" strokeWidth="1"/>
      <circle cx="80" cy="66" r="3.5" fill="none" stroke="rgba(129,199,132,0.7)" strokeWidth="1"/>
      <line x1="68" y1="82" x2="54" y2="82" stroke="rgba(165,214,167,0.5)" strokeWidth="1"/>
      <circle cx="55" cy="82" r="2.5" fill="#4CAF50" opacity="0.5"/>
      <line x1="92" y1="82" x2="106" y2="82" stroke="rgba(165,214,167,0.5)" strokeWidth="1"/>
      <circle cx="105" cy="82" r="2.5" fill="#4CAF50" opacity="0.5"/>
      <line x1="66" y1="108" x2="58" y2="116" stroke="rgba(165,214,167,0.4)" strokeWidth="0.8"/>
      <line x1="94" y1="108" x2="102" y2="116" stroke="rgba(165,214,167,0.4)" strokeWidth="0.8"/>
      {/* Letra S */}
      <text x="80" y="104" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="42" fontWeight="800" fontFamily="system-ui" opacity="0.95">S</text>
      <text x="80" y="104" textAnchor="middle" dominantBaseline="central" fill="#A5D6A7" fontSize="42" fontWeight="800" fontFamily="system-ui" opacity="0.18" dx="-1.5" dy="-1.5">S</text>
      {/* Partículas de luz */}
      <circle cx="46" cy="44" r="3.5" fill="white" opacity="0.5" style={{animation:"pulse 2s ease-in-out infinite"}}/>
      <circle cx="116" cy="52" r="2.5" fill="#C8E6C9" opacity="0.55"/>
      <circle cx="36" cy="82"  r="1.8" fill="white" opacity="0.35"/>
      <circle cx="124" cy="94" r="2"   fill="#A5D6A7" opacity="0.45"/>
      <circle cx="50"  cy="128" r="1.5" fill="white" opacity="0.25"/>
      <circle cx="112" cy="122" r="1.8" fill="#81C784" opacity="0.35"/>
    </svg>
  );
}

function LessonPage() {
  const { index } = Route.useParams();
  const navigate = useNavigate();
  const i = Math.max(0, Math.min(LESSONS.length - 1, parseInt(index, 10) || 0));
  const lesson = LESSONS[i];
  const isLast = i === LESSONS.length - 1;
  const progress = ((i + 1) / (LESSONS.length + 1)) * 100;
  const [shieldVisible, setShieldVisible] = useState(true);
  const cfg = LESSON_CONFIG[lesson.id] || LESSON_CONFIG["que-es"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShieldVisible(true);
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
    <>
      <style>{`
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse   { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .shield-anim { animation: floatY 3.5s ease-in-out infinite; }
        .card-anim   { animation: fadeUp .4s ease forwards; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; transition: all .2s ease; }
      `}</style>

      <main style={{ minHeight:"100vh", background:"#0a1f0a" }}>

        {/* ── HERO SECTION ── */}
        <div style={{
          minHeight: 420,
          background: `linear-gradient(135deg, ${cfg.color} 0%, #0D2010 55%, #0a1508 100%)`,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Malla de puntos de fondo */}
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:`radial-gradient(rgba(76,175,80,0.15) 1px, transparent 1px)`,
            backgroundSize:"28px 28px",
          }}/>
          {/* Glow radial */}
          <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"rgba(76,175,80,0.08)", filter:"blur(60px)" }}/>
          <div style={{ position:"absolute", bottom:-60, left:-60, width:300, height:300, borderRadius:"50%", background:"rgba(46,125,50,0.1)", filter:"blur(50px)" }}/>

          {/* Header dentro del hero */}
          <header style={{ position:"relative", zIndex:10 }}>
            <div style={{ maxWidth:680, margin:"0 auto", padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <Link to="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"rgba(76,175,80,0.25)", border:"1px solid rgba(76,175,80,0.4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ShieldCheck size={17} color="#A5D6A7"/>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.7)", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{COURSE_META.title}</span>
              </Link>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:12, color:"#81C784", fontWeight:700 }}>{i+1}/{LESSONS.length}</span>
                <div style={{ width:80, height:4, borderRadius:99, background:"rgba(255,255,255,0.1)", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#66BB6A,#4CAF50)", borderRadius:99, transition:"width .4s ease" }}/>
                </div>
              </div>
            </div>
          </header>

          {/* Contenido hero */}
          <div style={{ maxWidth:680, margin:"0 auto", padding:"20px 24px 0", position:"relative", zIndex:5 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>

              {/* Texto lado izquierdo */}
              <div style={{ flex:1 }}>
                {lesson.subtitle && (
                  <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(76,175,80,0.2)", border:"1px solid rgba(76,175,80,0.35)", borderRadius:99, padding:"4px 12px", marginBottom:14 }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:"#4CAF50" }}/>
                    <span style={{ fontSize:10, fontWeight:700, color:"#A5D6A7", letterSpacing:"0.18em", textTransform:"uppercase" }}>
                      {lesson.subtitle}
                    </span>
                  </div>
                )}
                <h1 style={{ margin:"0 0 12px", fontSize:28, fontWeight:900, color:"white", lineHeight:1.15, letterSpacing:"-0.03em" }}>
                  {lesson.title}
                </h1>
                {/* Barra de progreso de lecciones */}
                <div style={{ display:"flex", gap:3, marginBottom:16 }}>
                  {LESSONS.map((_,j) => (
                    <div key={j} style={{ height:3, borderRadius:99, background: j<=i ? "#4CAF50" : "rgba(255,255,255,0.15)", flex: j===i ? 2 : 1, transition:"all .3s" }}/>
                  ))}
                </div>
                {/* Badge lección */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.08)", borderRadius:10, padding:"6px 12px" }}>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>Lección</span>
                  <span style={{ fontSize:14, fontWeight:800, color:"white" }}>{String(i+1).padStart(2,"0")}</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>/ {String(LESSONS.length).padStart(2,"0")}</span>
                </div>
              </div>

              {/* Ilustración 3D lado derecho */}
              <div style={{ position:"relative", flexShrink:0, width:180, height:220 }}>
                {/* Formas geométricas detrás */}
                <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} viewBox="0 0 360 440">
                  <GeometricShapes geo={cfg.geo}/>
                  {/* Estrellas decorativas */}
                  <polygon points="60,40 64,52 76,52 67,60 70,72 60,64 50,72 53,60 44,52 56,52" fill="rgba(255,215,0,0.35)" transform="scale(0.7) translate(20,20)"/>
                  <polygon points="300,80 303,89 312,89 305,94 308,103 300,98 292,103 295,94 288,89 297,89" fill="rgba(255,215,0,0.25)" transform="scale(0.5) translate(200,80)"/>
                  <circle cx="320" cy="30" r="5" fill="rgba(76,175,80,0.4)"/>
                  <circle cx="40"  cy="200" r="4" fill="rgba(76,175,80,0.3)"/>
                  <circle cx="340" cy="220" r="3" fill="rgba(255,255,255,0.2)"/>
                </svg>
                {/* Escudo 3D flotante */}
                <div className="shield-anim" style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
                  <Shield3D size={150}/>
                </div>
              </div>
            </div>
          </div>

          {/* Curva de transición hero → contenido */}
          <div style={{ position:"absolute", bottom:-1, left:0, right:0 }}>
            <svg viewBox="0 0 380 40" preserveAspectRatio="none" style={{ width:"100%", height:40, display:"block" }}>
              <path d="M0 40 Q190 0 380 40 L380 40 L0 40 Z" fill="#f1f8e9"/>
            </svg>
          </div>
        </div>

        {/* ── CONTENIDO ── */}
        <div style={{ background:"linear-gradient(180deg,#f1f8e9 0%,#fafff6 100%)", minHeight:"60vh" }}>
          <div style={{ maxWidth:680, margin:"0 auto", padding:"24px 16px 120px" }}>

            {/* Burbuja del escudo guía */}
            {shieldVisible && (
              <div style={{ display:"flex", alignItems:"flex-end", gap:10, marginBottom:16 }} className="card-anim">
                <div className="shield-anim" style={{ flexShrink:0 }}>
                  <Shield3D size={46}/>
                </div>
                <div style={{ flex:1, background:"white", borderRadius:"18px 18px 18px 4px", padding:"12px 36px 12px 14px", boxShadow:"0 4px 16px rgba(46,125,50,0.12)", border:"1px solid rgba(76,175,80,0.15)", position:"relative" }}>
                  <p style={{ margin:0, fontSize:13, color:"#2E7D32", fontWeight:600, lineHeight:1.55 }}>
                    {SHIELD_MESSAGES[lesson.id] || "¡Presta atención a este contenido!"}
                  </p>
                  <button onClick={() => setShieldVisible(false)} style={{ position:"absolute", top:8, right:10, background:"none", border:"none", cursor:"pointer", color:"#A5D6A7", fontSize:18, padding:0, lineHeight:1 }}>×</button>
                </div>
              </div>
            )}

            {/* Bloques de contenido */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {lesson.blocks.map((b, idx) => {
                if (b.type === "p") return (
                  <div key={idx} className="card-hover" style={{ background:"white", borderRadius:20, padding:"18px 20px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", border:"1px solid rgba(76,175,80,0.1)", animationDelay:`${idx*0.05}s` }}>
                    <p style={{ margin:0, fontSize:15, lineHeight:1.82, color:"#263238" }}>{b.text}</p>
                  </div>
                );

                if (b.type === "h") return (
                  <div key={idx} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 4px 2px" }}>
                    <div style={{ width:4, height:24, borderRadius:99, background:"linear-gradient(180deg,#4CAF50,#2E7D32)", flexShrink:0 }}/>
                    <h2 style={{ margin:0, fontSize:18, fontWeight:800, color:"#1B5E20", letterSpacing:"-0.01em" }}>{b.text}</h2>
                  </div>
                );

                if (b.type === "list") return (
                  <div key={idx} className="card-hover" style={{ background:"white", borderRadius:20, padding:"14px 18px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", border:"1px solid rgba(76,175,80,0.1)" }}>
                    {b.items.map((it, j) => (
                      <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"9px 0", borderBottom: j < b.items.length-1 ? "1px solid #f1f8e9" : "none" }}>
                        <div style={{ width:26, height:26, borderRadius:8, background:"linear-gradient(135deg,#E8F5E9,#C8E6C9)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                          <ChevronRight size={13} color="#2E7D32" strokeWidth={2.5}/>
                        </div>
                        <span style={{ fontSize:14, lineHeight:1.75, color:"#37474F" }}>{it}</span>
                      </div>
                    ))}
                  </div>
                );

                return (
                  <div key={idx} style={{ background:"linear-gradient(135deg,#1B5E20,#2E7D32)", borderRadius:20, padding:"18px 20px", display:"flex", gap:14, alignItems:"flex-start" }}>
                    <div style={{ width:42, height:42, borderRadius:13, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Info size={19} color="white"/>
                    </div>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:800, color:"#A5D6A7", textTransform:"uppercase", letterSpacing:"0.1em" }}>{b.title}</p>
                      <p style={{ margin:0, fontSize:14, lineHeight:1.78, color:"rgba(255,255,255,0.9)" }}>{b.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chip completado */}
            <div style={{ display:"flex", justifyContent:"center", marginTop:24 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(76,175,80,0.1)", border:"1px solid rgba(76,175,80,0.2)", borderRadius:99, padding:"6px 18px" }}>
                <ShieldCheck size={13} color="#2E7D32"/>
                <span style={{ fontSize:12, color:"#2E7D32", fontWeight:600 }}>Lección {i+1} de {LESSONS.length} — {Math.round(progress)}% completado</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM NAV ── */}
        <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(18px)", borderTop:"1px solid rgba(76,175,80,0.12)", padding:"12px 24px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:20 }}>
          <button onClick={prev} style={{ width:48, height:48, borderRadius:"50%", background:"#F1F8E9", border:"1px solid rgba(76,175,80,0.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <ArrowLeft size={20} color="#2E7D32"/>
          </button>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            {LESSONS.map((_,j) => (
              <div key={j} style={{ width: j===i ? 20 : 6, height:6, borderRadius:99, background: j<=i ? "#4CAF50" : "#E8F5E9", transition:"all .3s ease" }}/>
            ))}
          </div>
          <button onClick={next} style={{ height:48, borderRadius:24, background:"linear-gradient(135deg,#4CAF50,#2E7D32)", border:"none", display:"flex", alignItems:"center", gap:8, cursor:"pointer", padding:"0 22px", boxShadow:"0 4px 18px rgba(46,125,50,0.4)" }}>
            <span style={{ fontSize:14, fontWeight:800, color:"white" }}>{isLast ? "Ir a evaluación" : "Siguiente"}</span>
            <ArrowRight size={18} color="white"/>
          </button>
        </div>

      </main>
    </>
  );
}

export default LessonPage;
