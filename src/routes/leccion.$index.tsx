import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, ChevronRight, ChevronDown } from "lucide-react";
import { LESSONS, COURSE_META } from "@/course/content";

export const Route = createFileRoute("/leccion/$index")({
  component: LessonPage,
});

const SHIELD_MESSAGES: Record<string, string> = {
  "que-es":           "¡Bienvenido/a! Empecemos por lo más importante del sistema.",
  "conceptos":        "Estos conceptos son la base legal. ¡Préstales mucha atención!",
  "sanciones":        "Conocer las consecuencias nos ayuda a actuar con responsabilidad.",
  "regulacion":       "Saber quién nos regula nos da claridad sobre nuestras obligaciones.",
  "etapas":           "El sistema funciona como un ciclo continuo y permanente.",
  "documentacion":    "La documentación es la evidencia tangible de nuestro cumplimiento.",
  "herramientas":     "Estas herramientas son tu día a día en la prevención del riesgo.",
  "rol-trabajadores": "¡Tu rol es fundamental! Aquí te cuento exactamente cómo actuar.",
  "cierre":           "¡Lo lograste! Estás listo/a para la evaluación final. 🎉",
};

const LESSON_CONFIG: Record<string, { accent: string; geo: string }> = {
  "que-es":           { accent: "#1B5E20", geo: "triangle" },
  "conceptos":        { accent: "#1A237E", geo: "diamond"  },
  "sanciones":        { accent: "#4A148C", geo: "hexagon"  },
  "regulacion":       { accent: "#0D47A1", geo: "triangle" },
  "etapas":           { accent: "#1B5E20", geo: "circle"   },
  "documentacion":    { accent: "#004D40", geo: "diamond"  },
  "herramientas":     { accent: "#1B5E20", geo: "hexagon"  },
  "rol-trabajadores": { accent: "#0D47A1", geo: "triangle" },
  "cierre":           { accent: "#1B5E20", geo: "star"     },
};

// SVG backgrounds para el área de contenido (opacidad muy baja)
const CONTENT_BG: Record<string, JSX.Element> = {
  "que-es": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.045">
        <path d="M50 80 L110 100 L110 170 Q110 210 50 230 Q-10 210 -10 170 L-10 100 Z" fill="#2E7D32"/>
        <path d="M320 300 L400 326 L400 420 Q400 472 320 500 Q240 472 240 420 L240 326 Z" fill="#2E7D32"/>
        <path d="M160 550 L210 566 L210 625 Q210 655 160 670 Q110 655 110 625 L110 566 Z" fill="#4CAF50"/>
      </g>
      <g opacity="0.04">
        <circle cx="370" cy="120" r="60" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="6 4"/>
        <circle cx="30"  cy="450" r="45" fill="none" stroke="#4CAF50" strokeWidth="1"   strokeDasharray="4 5"/>
        <circle cx="350" cy="680" r="35" fill="none" stroke="#4CAF50" strokeWidth="1"   strokeDasharray="3 4"/>
      </g>
      <g opacity="0.035">
        <line x1="0"   y1="200" x2="400" y2="200" stroke="#4CAF50" strokeWidth="0.5"/>
        <line x1="0"   y1="500" x2="400" y2="500" stroke="#4CAF50" strokeWidth="0.5"/>
        <line x1="200" y1="0"   x2="200" y2="800" stroke="#4CAF50" strokeWidth="0.5"/>
      </g>
      <g opacity="0.04">
        <circle cx="80"  cy="160" r="5" fill="#4CAF50"/>
        <circle cx="320" cy="400" r="4" fill="#4CAF50"/>
        <circle cx="150" cy="620" r="6" fill="#4CAF50"/>
        <circle cx="360" cy="540" r="3" fill="#4CAF50"/>
      </g>
    </svg>
  ),
  "conceptos": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.04">
        <rect x="280" y="60"  width="80" height="105" rx="6" fill="#2E7D32"/>
        <path d="M280 60 L292 46 L360 46 L360 60" fill="#1B5E20"/>
        <rect x="248" y="90"  width="80" height="105" rx="6" fill="#2E7D32" opacity="0.7"/>
        <path d="M248 90 L260 76 L328 76 L328 90" fill="#1B5E20"/>
        <rect x="216" y="120" width="80" height="105" rx="6" fill="#2E7D32" opacity="0.5"/>
      </g>
      <g opacity="0.038">
        <rect x="20" y="360" width="55" height="70" rx="8" fill="#1B5E20"/>
        <path d="M28 360 Q28 342 47 342 Q66 342 66 360" fill="none" stroke="#2E7D32" strokeWidth="7" strokeLinecap="round"/>
        <circle cx="47" cy="392" r="8" fill="#4CAF50" opacity="0.4"/>
      </g>
      <g opacity="0.035">
        <polygon points="350,500 358,522 381,522 363,536 370,558 350,544 330,558 337,536 319,522 342,522" fill="#4CAF50"/>
      </g>
      <g opacity="0.03">
        <circle cx="200" cy="650" r="70" fill="none" stroke="#4CAF50" strokeWidth="1.2" strokeDasharray="6 4"/>
        <circle cx="200" cy="650" r="48" fill="none" stroke="#4CAF50" strokeWidth="0.8" strokeDasharray="4 5"/>
      </g>
      <g opacity="0.04">
        <circle cx="50"  cy="200" r="5" fill="#4CAF50"/>
        <circle cx="360" cy="300" r="4" fill="#4CAF50"/>
        <circle cx="80"  cy="700" r="5" fill="#4CAF50"/>
      </g>
    </svg>
  ),
  "sanciones": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.04">
        <rect x="30"  y="80"  width="4" height="220" rx="2" fill="#2E7D32"/>
        <rect x="48"  y="80"  width="4" height="220" rx="2" fill="#2E7D32"/>
        <rect x="66"  y="80"  width="4" height="220" rx="2" fill="#2E7D32"/>
        <rect x="0"   y="80"  width="4" height="220" rx="2" fill="#2E7D32"/>
      </g>
      <g opacity="0.042">
        <rect x="26"  y="100" width="4" height="100" rx="2" fill="#2E7D32"/>
        <rect x="44"  y="70"  width="4" height="130" rx="2" fill="#2E7D32"/>
        <rect x="62"  y="50"  width="4" height="150" rx="2" fill="#2E7D32"/>
        <rect x="80"  y="30"  width="4" height="170" rx="2" fill="#2E7D32"/>
        <rect x="98"  y="10"  width="4" height="190" rx="2" fill="#2E7D32"/>
      </g>
      <g opacity="0.038">
        <rect x="280" y="250" width="80" height="100" rx="10" fill="#1B5E20"/>
        <path d="M292 250 Q292 226 320 226 Q348 226 348 250" fill="none" stroke="#2E7D32" strokeWidth="9" strokeLinecap="round"/>
        <circle cx="320" cy="295" r="12" fill="#4CAF50" opacity="0.35"/>
      </g>
      <g opacity="0.035">
        <polygon points="200,500 208,524 233,524 213,539 221,563 200,548 179,563 187,539 167,524 192,524" fill="#4CAF50"/>
        <polygon points="60,620  66,638  87,638  70,650  76,668  60,656  44,668  50,650  33,638  54,638"  fill="#4CAF50"/>
      </g>
      <g opacity="0.03">
        <ellipse cx="330" cy="600" rx="55" ry="35" fill="none" stroke="#4CAF50" strokeWidth="1.2"/>
        <ellipse cx="330" cy="600" rx="42" ry="27" fill="none" stroke="#4CAF50" strokeWidth="0.7"/>
        <circle  cx="330" cy="600" r="14"           fill="#4CAF50" opacity="0.15"/>
      </g>
    </svg>
  ),
  "regulacion": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.042">
        <rect x="140" y="40"  width="170" height="200" rx="5" fill="#2E7D32"/>
        <rect x="162" y="20"  width="126" height="28"  rx="4" fill="#2E7D32"/>
        <rect x="160" y="100" width="28"  height="55"  rx="3" fill="#1B5E20"/>
        <rect x="206" y="100" width="28"  height="55"  rx="3" fill="#1B5E20"/>
        <rect x="252" y="100" width="28"  height="55"  rx="3" fill="#1B5E20"/>
        <rect x="145" y="20"  width="12"  height="220" rx="2" fill="#1B5E20"/>
        <rect x="293" y="20"  width="12"  height="220" rx="2" fill="#1B5E20"/>
        <rect x="157" y="13"  width="136" height="12"  rx="3" fill="#4CAF50"/>
      </g>
      <g opacity="0.038">
        <circle cx="55" cy="450" r="48" fill="none" stroke="#2E7D32" strokeWidth="2.5"/>
        <circle cx="55" cy="450" r="33" fill="none" stroke="#4CAF50" strokeWidth="1.5"/>
        <circle cx="55" cy="450" r="12" fill="#4CAF50" opacity="0.2"/>
        <line x1="55" y1="402" x2="55" y2="390" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round"/>
        <line x1="55" y1="498" x2="55" y2="510" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round"/>
        <line x1="7"  y1="450" x2="-5" y2="450" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round"/>
      </g>
      <g opacity="0.03">
        <circle cx="330" cy="650" r="65" fill="none" stroke="#4CAF50" strokeWidth="1.2" strokeDasharray="6 4"/>
        <circle cx="330" cy="650" r="45" fill="none" stroke="#4CAF50" strokeWidth="0.8" strokeDasharray="4 5"/>
      </g>
      <g opacity="0.04">
        <circle cx="20"  cy="280" r="5" fill="#4CAF50"/>
        <circle cx="380" cy="180" r="4" fill="#4CAF50"/>
        <circle cx="200" cy="720" r="5" fill="#4CAF50"/>
      </g>
    </svg>
  ),
  "etapas": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.04" style={{transformOrigin:"80px 200px",animation:"spin 30s linear infinite"}}>
        <circle cx="80" cy="200" r="70" fill="none" stroke="#2E7D32" strokeWidth="2"/>
        <circle cx="80" cy="200" r="50" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="80" cy="200" r="20" fill="#4CAF50" opacity="0.12"/>
        <rect x="77" y="122" width="7" height="15" rx="2" fill="#2E7D32"/>
        <rect x="77" y="263" width="7" height="15" rx="2" fill="#2E7D32"/>
        <rect x="2"  y="197" width="15" height="7" rx="2" fill="#2E7D32"/>
        <rect x="143" y="197" width="15" height="7" rx="2" fill="#2E7D32"/>
      </g>
      <g opacity="0.035" style={{transformOrigin:"320px 500px",animation:"spin 22s linear infinite reverse"}}>
        <circle cx="320" cy="500" r="55" fill="none" stroke="#4CAF50" strokeWidth="1.5"/>
        <circle cx="320" cy="500" r="38" fill="none" stroke="#66BB6A" strokeWidth="1" opacity="0.6"/>
        <circle cx="320" cy="500" r="14" fill="#4CAF50" opacity="0.1"/>
        <rect x="317" y="438" width="6" height="12" rx="2" fill="#4CAF50"/>
        <rect x="317" y="550" width="6" height="12" rx="2" fill="#4CAF50"/>
        <rect x="258" y="497" width="12" height="6" rx="2" fill="#4CAF50"/>
        <rect x="370" y="497" width="12" height="6" rx="2" fill="#4CAF50"/>
      </g>
      <g opacity="0.035">
        <path d="M200 680 Q200 630 240 630 Q280 630 280 680 Q280 730 240 730 Q204 730 201 710" fill="none" stroke="#2E7D32" strokeWidth="2" strokeDasharray="6 4"/>
        <polygon points="199 708 208 714 205 700" fill="#2E7D32"/>
      </g>
      <g opacity="0.04">
        <circle cx="20"  cy="380" r="5" fill="#4CAF50"/>
        <circle cx="380" cy="120" r="4" fill="#4CAF50"/>
        <circle cx="60"  cy="700" r="5" fill="#4CAF50"/>
      </g>
    </svg>
  ),
  "documentacion": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.042">
        <rect x="260" y="40"  width="105" height="135" rx="7" fill="#2E7D32"/>
        <rect x="268" y="58"  width="89"  height="7"   rx="2" fill="#E8F5E9"/>
        <rect x="268" y="74"  width="75"  height="7"   rx="2" fill="#E8F5E9"/>
        <rect x="268" y="90"  width="82"  height="7"   rx="2" fill="#E8F5E9"/>
        <rect x="268" y="106" width="60"  height="7"   rx="2" fill="#E8F5E9"/>
        <path d="M260 40 L272 26 L365 26 L365 40" fill="#1B5E20"/>
      </g>
      <g opacity="0.035">
        <rect x="228" y="70"  width="105" height="135" rx="7" fill="#2E7D32"/>
        <path d="M228 70 L240 56 L333 56 L333 70" fill="#1B5E20"/>
      </g>
      <g opacity="0.028">
        <rect x="196" y="100" width="105" height="135" rx="7" fill="#2E7D32"/>
        <path d="M196 100 L208 86 L301 86 L301 100" fill="#1B5E20"/>
      </g>
      <g opacity="0.04">
        <circle cx="60"  cy="420" r="42" fill="none" stroke="#2E7D32" strokeWidth="2.5"/>
        <path d="M44 420 L56 434 L78 408" fill="none" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g opacity="0.038">
        <rect x="240" y="560" width="140" height="90" rx="8" fill="#2E7D32"/>
        <rect x="252" y="576" width="116" height="6"  rx="2" fill="#E8F5E9"/>
        <rect x="252" y="592" width="90"  height="6"  rx="2" fill="#E8F5E9"/>
        <rect x="252" y="608" width="105" height="6"  rx="2" fill="#E8F5E9"/>
        <rect x="252" y="624" width="70"  height="6"  rx="2" fill="#E8F5E9"/>
      </g>
      <g opacity="0.035">
        <circle cx="30"  cy="650" r="35" fill="none" stroke="#4CAF50" strokeWidth="0.8" strokeDasharray="4 4"/>
        <circle cx="380" cy="350" r="28" fill="none" stroke="#4CAF50" strokeWidth="0.8" strokeDasharray="3 4"/>
      </g>
    </svg>
  ),
  "herramientas": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.04">
        <rect x="240" y="50"  width="150" height="110" rx="7" fill="#2E7D32"/>
        <rect x="252" y="68"  width="50"  height="5"   rx="2" fill="#E8F5E9"/>
        <rect x="252" y="82"  width="40"  height="5"   rx="2" fill="#E8F5E9"/>
        <rect x="312" y="68"  width="50"  height="5"   rx="2" fill="#E8F5E9"/>
        <rect x="312" y="82"  width="36"  height="5"   rx="2" fill="#E8F5E9"/>
        <line x1="302" y1="50" x2="302" y2="160" stroke="#1B5E20" strokeWidth="1.5"/>
      </g>
      <g opacity="0.042">
        <rect x="20"  y="280" width="20" height="110" rx="4" fill="#4CAF50"/>
        <rect x="48"  y="240" width="20" height="150" rx="4" fill="#4CAF50"/>
        <rect x="76"  y="200" width="20" height="190" rx="4" fill="#4CAF50"/>
        <rect x="104" y="160" width="20" height="230" rx="4" fill="#4CAF50"/>
      </g>
      <g opacity="0.038">
        <circle cx="60"  cy="580" r="50" fill="none" stroke="#2E7D32" strokeWidth="2"/>
        <circle cx="60"  cy="580" r="34" fill="none" stroke="#4CAF50" strokeWidth="1.5"/>
        <circle cx="60"  cy="580" r="12" fill="#4CAF50" opacity="0.18"/>
        <line x1="60" y1="530" x2="60" y2="518" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="630" x2="60" y2="642" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="10" y1="580" x2="-2" y2="580" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
      <g opacity="0.035">
        <circle cx="300" cy="500" r="55" fill="none" stroke="#4CAF50" strokeWidth="10"/>
        <line x1="336" y1="536" x2="358" y2="558" stroke="#4CAF50" strokeWidth="14" strokeLinecap="round"/>
      </g>
      <g opacity="0.04">
        <circle cx="380" cy="680" r="45" fill="none" stroke="#4CAF50" strokeWidth="0.8" strokeDasharray="5 4"/>
      </g>
    </svg>
  ),
  "rol-trabajadores": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.04">
        <ellipse cx="320" cy="160" rx="70" ry="44" fill="none" stroke="#2E7D32" strokeWidth="2"/>
        <ellipse cx="320" cy="160" rx="54" ry="34" fill="none" stroke="#4CAF50" strokeWidth="1.2" opacity="0.6"/>
        <circle  cx="320" cy="160" r="20"            fill="#4CAF50" opacity="0.15"/>
        <circle  cx="320" cy="160" r="10"            fill="#2E7D32" opacity="0.2"/>
        <line x1="284" y1="126" x2="281" y2="114" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="302" y1="118" x2="300" y2="106" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="320" y1="116" x2="320" y2="104" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="338" y1="118" x2="340" y2="106" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="356" y1="126" x2="359" y2="114" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <g opacity="0.042">
        <line x1="60" y1="320" x2="160" y2="430" stroke="#4CAF50" strokeWidth="1.2"/>
        <line x1="160" y1="430" x2="80"  y2="560" stroke="#4CAF50" strokeWidth="1.2"/>
        <line x1="160" y1="430" x2="260" y2="370" stroke="#4CAF50" strokeWidth="1.2"/>
        <line x1="60"  y1="320" x2="20"  y2="500" stroke="#4CAF50" strokeWidth="1"/>
        <circle cx="60"  cy="306" r="14" fill="#2E7D32"/>
        <path d="M40 336 Q40 314 60 318 Q80 314 80 336 L80 358 L40 358 Z" fill="#2E7D32"/>
        <circle cx="160" cy="412" r="18" fill="#1B5E20"/>
        <path d="M136 448 Q136 422 160 428 Q184 422 184 448 L184 474 L136 474 Z" fill="#1B5E20"/>
        <path d="M152 424 L168 424 L168 440 Q168 448 160 452 Q152 448 152 440 Z" fill="#E8F5E9" opacity="0.4"/>
        <circle cx="80"  cy="550" r="13" fill="#4CAF50" opacity="0.7"/>
        <circle cx="260" cy="360" r="13" fill="#4CAF50" opacity="0.7"/>
      </g>
      <g opacity="0.035">
        <path d="M-10 640 L-10 678 L8 678 L30 692 L30 626 L8 640 Z" fill="#2E7D32"/>
        <path d="M36 648 Q52 660 36 672" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M44 640 Q66 660 44 680" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
    </svg>
  ),
  "cierre": (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.04">
        <circle cx="200" cy="300" r="120" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="7 5"/>
        <circle cx="200" cy="300" r="88"  fill="none" stroke="#4CAF50" strokeWidth="1"   strokeDasharray="5 6" opacity="0.7"/>
        <circle cx="200" cy="300" r="55"  fill="#4CAF50" opacity="0.06"/>
      </g>
      <g opacity="0.05">
        <path d="M172 300 L192 326 L228 274" stroke="#2E7D32" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g opacity="0.042">
        <polygon points="50,80  58,104 83,104 63,119 70,143 50,128 30,143 37,119 17,104 42,104"  fill="#4CAF50"/>
        <polygon points="340,500 347,521 369,521 352,534 358,555 340,542 322,555 328,534 311,521 333,521" fill="#4CAF50"/>
        <polygon points="350,100 356,118 375,118 360,129 365,147 350,136 335,147 340,129 325,118 344,118" fill="#66BB6A"/>
        <polygon points="40,560  46,578  65,578  50,589  55,607  40,596  25,607  30,589  15,578  34,578"  fill="#4CAF50"/>
      </g>
      <g opacity="0.035">
        <path d="M160 120 L180 120 L180 148 Q180 162 160 170 Q140 162 140 148 L140 120 Z" fill="#2E7D32"/>
        <rect x="148" y="170" width="24" height="6" rx="2" fill="#2E7D32"/>
        <rect x="157" y="176" width="6"  height="30" rx="3" fill="#2E7D32"/>
      </g>
      <g opacity="0.03">
        <path d="M30  300 Q30  220 90  220 Q130 220 150 255" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="6 5"/>
        <path d="M370 500 Q370 580 310 580 Q270 580 250 545" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="6 5"/>
      </g>
    </svg>
  ),
};

function GeometricShapes({ geo }: { geo: string }) {
  if (geo === "triangle") return (<>
    <polygon points="130,10 230,170 30,170" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
    <polygon points="130,35 205,160 55,160" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
  </>);
  if (geo === "diamond") return (<>
    <polygon points="130,8 220,100 130,192 40,100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
    <polygon points="130,35 195,100 130,165 65,100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
  </>);
  if (geo === "hexagon") return (<>
    <polygon points="130,12 202,52 202,132 130,172 58,132 58,52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
    <polygon points="130,38 182,68 182,128 130,158 78,128 78,68" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
  </>);
  if (geo === "star") return (
    <polygon points="130,8 148,62 205,62 158,96 175,150 130,116 85,150 102,96 55,62 112,62" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
  );
  return (<>
    <circle cx="130" cy="95" r="85" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
    <circle cx="130" cy="95" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
  </>);
}

function Shield3D({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.15)} viewBox="0 0 160 184" fill="none">
      <ellipse cx="80" cy="178" rx="44" ry="7" fill="rgba(0,0,0,0.2)"/>
      <ellipse cx="80" cy="88" rx="72" ry="20" fill="none" stroke="rgba(76,175,80,0.45)" strokeWidth="1.2" strokeDasharray="6 4"
        style={{ transformOrigin:"80px 88px", animation:"spin 18s linear infinite" }}/>
      <ellipse cx="80" cy="88" rx="55" ry="14" fill="none" stroke="rgba(165,214,167,0.3)" strokeWidth="0.8" strokeDasharray="4 5"
        style={{ transformOrigin:"80px 88px", animation:"spin 12s linear infinite reverse" }}/>
      <path d="M130 34 L142 44 L142 104 Q142 146 82 166 L80 162 Q130 142 130 96 Z" fill="rgba(0,0,0,0.28)"/>
      <path d="M30 34 L18 44 L18 104 Q18 146 78 166 L80 162 Q30 142 30 96 Z" fill="rgba(255,255,255,0.06)"/>
      <path d="M80 12 L130 30 L130 96 Q130 140 80 160 Q30 140 30 96 L30 30 Z" fill="#2E7D32"/>
      <path d="M80 12 L130 30 L130 52 Q105 42 80 42 Q55 42 30 52 L30 30 Z" fill="rgba(255,255,255,0.18)"/>
      <path d="M80 14 L128 31 L128 96 Q128 138 80 158 Q32 138 32 96 L32 31 Z" fill="none" stroke="rgba(165,214,167,0.55)" strokeWidth="1.5"/>
      <line x1="80" y1="68" x2="80" y2="57" stroke="rgba(165,214,167,0.6)" strokeWidth="1"/>
      <circle cx="80" cy="67" r="3" fill="none" stroke="rgba(129,199,132,0.7)" strokeWidth="1"/>
      <line x1="68" y1="82" x2="55" y2="82" stroke="rgba(165,214,167,0.45)" strokeWidth="1"/>
      <circle cx="56" cy="82" r="2" fill="#4CAF50" opacity="0.5"/>
      <line x1="92" y1="82" x2="105" y2="82" stroke="rgba(165,214,167,0.45)" strokeWidth="1"/>
      <circle cx="104" cy="82" r="2" fill="#4CAF50" opacity="0.5"/>
      <text x="80" y="104" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="42" fontWeight="800" fontFamily="system-ui">S</text>
      <text x="80" y="104" textAnchor="middle" dominantBaseline="central" fill="#A5D6A7" fontSize="42" fontWeight="800" fontFamily="system-ui" opacity="0.18" dx="-1" dy="-1">S</text>
      <circle cx="46" cy="44" r="3" fill="white" opacity="0.45" style={{ animation:"pulse 2s ease-in-out infinite" }}/>
      <circle cx="116" cy="52" r="2" fill="#C8E6C9" opacity="0.5"/>
      <circle cx="36" cy="82" r="1.5" fill="white" opacity="0.3"/>
      <circle cx="124" cy="94" r="1.8" fill="#A5D6A7" opacity="0.4"/>
    </svg>
  );
}

function LessonPage() {
  const { index } = Route.useParams();
  const navigate = useNavigate();
  const i = Math.max(0, Math.min(LESSONS.length - 1, parseInt(index, 10) || 0));
  const lesson = LESSONS[i];
  const isLast = i === LESSONS.length - 1;
  const progress = Math.round(((i + 1) / (LESSONS.length + 1)) * 100);
  const cfg = LESSON_CONFIG[lesson.id] || LESSON_CONFIG["que-es"];

  const [shieldVisible, setShieldVisible] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [transDir, setTransDir] = useState<"left" | "right">("right");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShieldVisible(true);
    setShowScrollHint(true);
    setTransitioning(false);
  }, [i]);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 60) setShowScrollHint(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (dir: "left" | "right", action: () => void) => {
    setTransDir(dir);
    setTransitioning(true);
    setTimeout(() => action(), 200);
  };

  const next = () => goTo("right", () => {
    if (isLast) navigate({ to: "/evaluacion" });
    else navigate({ to: "/leccion/$index", params: { index: String(i + 1) } });
  });

  const prev = () => goTo("left", () => {
    if (i === 0) navigate({ to: "/" });
    else navigate({ to: "/leccion/$index", params: { index: String(i - 1) } });
  });

  return (
    <>
      <style>{`
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse   { 0%,100%{opacity:.45} 50%{opacity:1} }
        @keyframes bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideOutL { to{opacity:0;transform:translateX(-24px)} }
        @keyframes slideOutR { to{opacity:0;transform:translateX(24px)} }
        @keyframes slideInR  { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInL  { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
        .shield-float { animation: floatY 3.5s ease-in-out infinite; }
        .scroll-hint  { animation: bounce 1.4s ease-in-out infinite; }
        .slide-out-l  { animation: slideOutL .2s ease forwards; }
        .slide-out-r  { animation: slideOutR .2s ease forwards; }
        .slide-in-r   { animation: slideInR .28s ease forwards; }
        .slide-in-l   { animation: slideInL .28s ease forwards; }
        .btn-nav:active { transform: scale(0.95); transition: transform .12s; }
      `}</style>

      <main style={{ minHeight:"100vh", background:"#0a1f0a" }}>

        {/* ── HERO compacto ── */}
        <div style={{
          maxHeight:"42vh", minHeight:290,
          background:`linear-gradient(140deg, ${cfg.accent} 0%, #0D2010 60%, #071208 100%)`,
          position:"relative", overflow:"hidden", display:"flex", flexDirection:"column",
        }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(76,175,80,0.13) 1px,transparent 1px)", backgroundSize:"26px 26px" }}/>
          <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(76,175,80,0.07)", filter:"blur(55px)", pointerEvents:"none" }}/>

          <header style={{ position:"relative", zIndex:10, flexShrink:0 }}>
            <div style={{ maxWidth:680, margin:"0 auto", padding:"12px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <Link to="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
                <div style={{ width:32, height:32, borderRadius:9, background:"rgba(76,175,80,0.22)", border:"1px solid rgba(76,175,80,0.38)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ShieldCheck size={15} color="#A5D6A7"/>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)", maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {COURSE_META.title}
                </span>
              </Link>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:11, color:"#81C784", fontWeight:700 }}>{progress}%</span>
                <div style={{ width:60, height:4, borderRadius:99, background:"rgba(255,255,255,0.1)", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#66BB6A,#4CAF50)", borderRadius:99, transition:"width .4s ease" }}/>
                </div>
              </div>
            </div>
          </header>

          <div style={{ flex:1, maxWidth:680, margin:"0 auto", padding:"6px 20px 0", width:"100%", position:"relative", zIndex:5, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ flex:"0 0 62%" }}>
              {lesson.subtitle && (
                <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(76,175,80,0.18)", border:"1px solid rgba(76,175,80,0.32)", borderRadius:99, padding:"3px 10px", marginBottom:10 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#4CAF50" }}/>
                  <span style={{ fontSize:9, fontWeight:700, color:"#A5D6A7", letterSpacing:"0.16em", textTransform:"uppercase" }}>{lesson.subtitle}</span>
                </div>
              )}
              <h1 style={{ margin:"0 0 14px", fontSize:"clamp(18px,5vw,25px)", fontWeight:900, color:"white", lineHeight:1.18, letterSpacing:"-0.025em" }}>
                {lesson.title}
              </h1>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ display:"flex", gap:2, flex:1 }}>
                  {LESSONS.map((_, j) => (
                    <div key={j} style={{ height:3, borderRadius:99, background: j<=i ? "#4CAF50" : "rgba(255,255,255,0.14)", flex: j===i ? 2 : 1, transition:"all .3s" }}/>
                  ))}
                </div>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:600, whiteSpace:"nowrap" }}>{i+1}/{LESSONS.length}</span>
              </div>
            </div>
            <div style={{ flex:"0 0 38%", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", minHeight:130 }}>
              <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} viewBox="0 0 260 200">
                <GeometricShapes geo={cfg.geo}/>
                <polygon points="35,16 39,28 52,28 42,36 46,48 35,40 24,48 28,36 16,28 30,28" fill="rgba(255,215,0,0.28)" transform="scale(0.65)"/>
                <circle cx="218" cy="22" r="5" fill="rgba(76,175,80,0.38)"/>
              </svg>
              <div className="shield-float"><Shield3D size={86}/></div>
            </div>
          </div>

          <div style={{ position:"relative", zIndex:5, flexShrink:0 }}>
            {showScrollHint && (
              <div onClick={() => contentRef.current?.scrollIntoView({ behavior:"smooth" })}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:4, cursor:"pointer", opacity:0.65 }}>
                <span style={{ fontSize:9, color:"rgba(255,255,255,0.5)", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:1 }}>Desliza</span>
                <div className="scroll-hint"><ChevronDown size={15} color="rgba(255,255,255,0.5)"/></div>
              </div>
            )}
            <svg viewBox="0 0 380 28" preserveAspectRatio="none" style={{ width:"100%", height:28, display:"block" }}>
              <path d="M0 28 Q190 0 380 28 L380 28 L0 28 Z" fill="#fafffe"/>
            </svg>
          </div>
        </div>

        {/* ── CONTENIDO EDITORIAL con background ilustrado ── */}
        <div
          ref={contentRef}
          className={transitioning ? (transDir==="right" ? "slide-out-l" : "slide-out-r") : "slide-in-r"}
          style={{ background:"#fafffe", minHeight:"58vh", position:"relative", overflow:"hidden" }}
        >
          {/* Background SVG temático de fondo */}
          {CONTENT_BG[lesson.id]}

          <div style={{ maxWidth:620, margin:"0 auto", padding:"28px 22px 120px", position:"relative", zIndex:1 }}>

            {/* Burbuja escudo */}
            {shieldVisible && (
              <div style={{ display:"flex", alignItems:"flex-end", gap:10, marginBottom:28, animation:"fadeIn .35s ease" }}>
                <div className="shield-float" style={{ flexShrink:0 }}>
                  <Shield3D size={42}/>
                </div>
                <div style={{ flex:1, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(8px)", borderRadius:"16px 16px 16px 4px", padding:"11px 11px 11px 14px", boxShadow:"0 3px 14px rgba(46,125,50,0.1)", border:"1px solid rgba(76,175,80,0.13)", display:"flex", alignItems:"center", gap:10 }}>
                  <p style={{ margin:0, fontSize:13, color:"#2E7D32", fontWeight:600, lineHeight:1.55, flex:1 }}>
                    {SHIELD_MESSAGES[lesson.id]}
                  </p>
                  <button
                    onClick={() => setShieldVisible(false)}
                    aria-label="Cerrar mensaje"
                    style={{ minWidth:44, minHeight:38, background:"#E8F5E9", border:"none", borderRadius:9, cursor:"pointer", color:"#2E7D32", fontSize:11, fontWeight:800, flexShrink:0, padding:"0 10px" }}
                  >OK ✓</button>
                </div>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {lesson.blocks.map((b, idx) => {

                if (b.type === "p") return (
                  <p key={idx} style={{ margin:"0 0 20px", fontSize:16, lineHeight:1.85, color:"#1C2B1E", fontWeight:400, letterSpacing:"0.01em" }}>
                    {b.text}
                  </p>
                );

                if (b.type === "h") return (
                  <div key={idx} style={{ display:"flex", alignItems:"center", gap:10, margin:"28px 0 14px" }}>
                    <div style={{ width:3, height:22, borderRadius:99, background:"linear-gradient(180deg,#4CAF50,#2E7D32)", flexShrink:0 }}/>
                    <h2 style={{ margin:0, fontSize:18, fontWeight:800, color:"#1B5E20", letterSpacing:"-0.02em", lineHeight:1.2 }}>{b.text}</h2>
                  </div>
                );

                if (b.type === "list") return (
                  <div key={idx} style={{ background:"rgba(255,255,255,0.9)", backdropFilter:"blur(8px)", borderRadius:16, border:"1px solid rgba(76,175,80,0.12)", overflow:"hidden", margin:"0 0 20px", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
                    {b.items.map((it, j) => (
                      <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"13px 16px", borderBottom: j < b.items.length-1 ? "1px solid rgba(240,247,240,0.9)" : "none", background: j%2===0 ? "rgba(255,255,255,0.9)" : "rgba(250,255,254,0.9)" }}>
                        <div style={{ width:24, height:24, borderRadius:7, background:"linear-gradient(135deg,#E8F5E9,#C8E6C9)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                          <ChevronRight size={13} color="#2E7D32" strokeWidth={2.5}/>
                        </div>
                        <span style={{ fontSize:15, lineHeight:1.7, color:"#2C3E30" }}>{it}</span>
                      </div>
                    ))}
                  </div>
                );

                return (
                  <div key={idx} style={{ borderLeft:"3px solid #4CAF50", background:"rgba(241,248,233,0.88)", backdropFilter:"blur(8px)", borderRadius:"0 14px 14px 0", padding:"14px 18px", margin:"4px 0 24px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                      <span style={{ fontSize:10, fontWeight:800, color:"#1B5E20", textTransform:"uppercase", letterSpacing:"0.1em" }}>{b.title}</span>
                      <span style={{ fontSize:10, background:"rgba(200,230,201,0.9)", color:"#1B5E20", fontWeight:700, padding:"2px 8px", borderRadius:99, marginLeft:"auto" }}>Dato clave</span>
                    </div>
                    <p style={{ margin:0, fontSize:14, lineHeight:1.78, color:"#2E4A22", fontStyle:"italic" }}>{b.text}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop:32, paddingTop:24, borderTop:"1px solid rgba(232,245,233,0.8)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.8)", backdropFilter:"blur(8px)", border:"1px solid rgba(76,175,80,0.16)", borderRadius:99, padding:"7px 18px" }}>
                <ShieldCheck size={13} color="#2E7D32"/>
                <span style={{ fontSize:12, color:"#2E7D32", fontWeight:600 }}>Lección {i+1} de {LESSONS.length} · {progress}% completado</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM NAV ── */}
        <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"rgba(255,255,255,0.94)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderTop:"1px solid rgba(76,175,80,0.1)", padding:"8px 20px 18px", zIndex:20 }}>
          <div style={{ height:3, borderRadius:99, background:"rgba(76,175,80,0.1)", marginBottom:12, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#66BB6A,#2E7D32)", borderRadius:99, transition:"width .4s ease" }}/>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:680, margin:"0 auto" }}>
            <button onClick={prev} className="btn-nav" style={{ width:48, height:48, borderRadius:"50%", background:"#F1F8E9", border:"1px solid rgba(76,175,80,0.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <ArrowLeft size={19} color="#2E7D32"/>
            </button>
            <div style={{ display:"flex", gap:4, alignItems:"center" }}>
              {LESSONS.map((_,j) => (
                <div key={j} style={{ width: j===i ? 18 : 5, height:5, borderRadius:99, background: j<i ? "#A5D6A7" : j===i ? "#4CAF50" : "#E8F5E9", transition:"all .3s" }}/>
              ))}
            </div>
            <button onClick={next} className="btn-nav" style={{ height:48, borderRadius:24, background:"linear-gradient(135deg,#4CAF50,#1B5E20)", border:"none", display:"flex", alignItems:"center", gap:7, cursor:"pointer", padding:"0 20px", boxShadow:"0 4px 18px rgba(46,125,50,0.38)" }}>
              <span style={{ fontSize:14, fontWeight:800, color:"white" }}>{isLast ? "Ir a evaluación" : "Siguiente"}</span>
              <ArrowRight size={17} color="white"/>
            </button>
          </div>
        </div>

      </main>
    </>
  );
}

export default LessonPage;
