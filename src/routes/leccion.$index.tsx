import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { LESSONS, COURSE_META } from "@/course/content";

export const Route = createFileRoute("/leccion/$index")({
  component: LessonPage,
});

const SARA_MESSAGES: Record<string, string> = {
  "que-es": "¡Bienvenido/a! Soy el Escudo SARLAFT, tu guía en este curso. Empecemos por lo más importante.",
  "conceptos": "Estos conceptos son la base legal del sistema. ¡Préstales mucha atención!",
  "sanciones": "Conocer las consecuencias nos ayuda a actuar con responsabilidad.",
  "regulacion": "Saber quién nos regula nos da claridad sobre nuestras obligaciones.",
  "etapas": "El sistema funciona como un ciclo continuo y permanente. ¡Te lo explico!",
  "documentacion": "La documentación es la evidencia tangible de nuestro cumplimiento.",
  "herramientas": "Estas herramientas son tu día a día en la prevención del riesgo.",
  "rol-trabajadores": "¡Tu rol es fundamental! Aquí te cuento exactamente cómo actuar.",
  "cierre": "¡Lo lograste! Has completado todas las lecciones. Estás listo/a para la evaluación. 🎉",
};

const LESSON_EMOJIS: Record<string, string> = {
  "que-es": "🛡️",
  "conceptos": "⚖️",
  "sanciones": "🔒",
  "regulacion": "🏛️",
  "etapas": "🔄",
  "documentacion": "📋",
  "herramientas": "🔧",
  "rol-trabajadores": "👥",
  "cierre": "🎯",
};

function ShieldCharacter({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <ellipse cx="50" cy="114" rx="28" ry="6" fill="#1B5E20" opacity="0.15"/>
      <g style={{ transformOrigin: "50px 56px", animation: "spin 20s linear infinite" }}>
        <ellipse cx="50" cy="56" rx="46" ry="13" fill="none" stroke="#4CAF50" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.3"/>
      </g>
      <g style={{ transformOrigin: "50px 56px", animation: "spin 14s linear infinite reverse" }}>
        <ellipse cx="50" cy="56" rx="40" ry="9" fill="none" stroke="#81C784" strokeWidth="0.6" strokeDasharray="3 5" opacity="0.2"/>
      </g>
      <path d="M50 8 L82 22 L82 60 Q82 88 50 102 Q18 88 18 60 L18 22 Z" fill="#1B5E20"/>
      <path d="M82 22 L88 29 L88 64 Q88 90 52 105 L50 102 Q82 88 82 60 Z" fill="#0A3D0A"/>
      <path d="M18 22 L12 29 L12 64 Q12 90 48 105 L50 102 Q18 88 18 60 Z" fill="#2E7D32"/>
      <path d="M50 14 L78 26 L78 60 Q78 84 50 97 Q22 84 22 60 L22 26 Z" fill="#2E7D32"/>
      <path d="M50 14 L78 26 L78 43 Q64 37 50 37 Q36 37 22 43 L22 26 Z" fill="#43A047" opacity="0.9"/>
      <path d="M50 10 L80 23 L80 60 Q80 86 50 100 Q20 86 20 60 L20 23 Z" fill="none" stroke="#66BB6A" strokeWidth="1.5" opacity="0.5"/>
      <path d="M50 10 L80 23 L80 31 Q65 25 50 25 Q35 25 20 31 L20 23 Z" fill="#B9F6CA" opacity="0.25"/>
      <line x1="50" y1="44" x2="50" y2="36" stroke="#A5D6A7" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="50" cy="43" r="2.5" fill="none" stroke="#81C784" strokeWidth="0.8" opacity="0.5"/>
      <line x1="42" y1="54" x2="34" y2="54" stroke="#A5D6A7" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="34" cy="54" r="1.5" fill="#4CAF50" opacity="0.4"/>
      <line x1="58" y1="54" x2="66" y2="54" stroke="#A5D6A7" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="66" cy="54" r="1.5" fill="#4CAF50" opacity="0.4"/>
      <text x="50" y="64" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="26" fontWeight="800" fontFamily="system-ui">S</text>
      <text x="50" y="64" textAnchor="middle" dominantBaseline="central" fill="#A5D6A7" fontSize="26" fontWeight="800" fontFamily="system-ui" opacity="0.2" dx="-1" dy="-1">S</text>
      <circle cx="30" cy="28" r="2.5" fill="white" opacity="0.4"/>
      <circle cx="72" cy="33" r="2" fill="#C8E6C9" opacity="0.45"/>
      <circle cx="24" cy="52" r="1.2" fill="white" opacity="0.3"/>
      <circle cx="76" cy="58" r="1.5" fill="#A5D6A7" opacity="0.35"/>
    </svg>
  );
}

function LessonBackground({ lessonId }: { lessonId: string }) {
  const backgrounds: Record<string, JSX.Element> = {
    "que-es": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.12">
          <rect x="260" y="40" width="90" height="80" rx="4" fill="#2E7D32"/>
          <rect x="275" y="25" width="60" height="25" rx="3" fill="#2E7D32"/>
          <rect x="290" y="72" width="25" height="30" rx="2" fill="#1B5E20"/>
          <rect x="328" y="72" width="18" height="20" rx="2" fill="#1B5E20"/>
          <rect x="300" y="60" width="15" height="4" rx="1" fill="#E8F5E9"/>
          <rect x="305" y="53" width="4" height="15" rx="1" fill="#E8F5E9"/>
          <rect x="303" y="34" width="14" height="5" rx="1" fill="#E8F5E9"/>
          <rect x="307" y="30" width="5" height="12" rx="1" fill="#E8F5E9"/>
        </g>
        <g opacity="0.08">
          <path d="M30 10 L90 30 L90 90 Q90 130 30 150 Q-30 130 -30 90 L-30 30 Z" fill="#4CAF50"/>
        </g>
        <g opacity="0.1">
          <circle cx="60" cy="90" r="10" fill="#2E7D32"/>
          <path d="M44 110 Q44 93 60 97 Q76 93 76 110 L76 130 L44 130 Z" fill="#2E7D32"/>
          <circle cx="100" cy="85" r="8" fill="#4CAF50"/>
          <path d="M87 102 Q87 88 100 91 Q113 88 113 102 L113 118 L87 118 Z" fill="#4CAF50"/>
          <circle cx="140" cy="90" r="8" fill="#4CAF50"/>
          <path d="M127 107 Q127 93 140 96 Q153 93 153 107 L153 123 L127 123 Z" fill="#4CAF50"/>
        </g>
        <line x1="200" y1="100" x2="10" y2="20" stroke="#4CAF50" strokeWidth="0.5" opacity="0.06"/>
        <line x1="200" y1="100" x2="10" y2="180" stroke="#4CAF50" strokeWidth="0.5" opacity="0.06"/>
        <circle cx="350" cy="180" r="30" fill="none" stroke="#4CAF50" strokeWidth="0.7" opacity="0.08" strokeDasharray="4 4"/>
      </svg>
    ),
    "conceptos": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.12">
          <rect x="49" y="20" width="3" height="100" rx="1.5" fill="#2E7D32"/>
          <rect x="10" y="40" width="80" height="3" rx="1.5" fill="#2E7D32"/>
          <line x1="10" y1="43" x2="10" y2="80" stroke="#2E7D32" strokeWidth="1.5"/>
          <path d="M-5 80 Q10 90 25 80" fill="none" stroke="#2E7D32" strokeWidth="1.5"/>
          <line x1="90" y1="43" x2="90" y2="88" stroke="#2E7D32" strokeWidth="1.5"/>
          <path d="M75 88 Q90 98 105 88" fill="none" stroke="#2E7D32" strokeWidth="1.5"/>
          <path d="M40 118 L60 118 L65 128 L35 128 Z" fill="#2E7D32"/>
          <rect x="30" y="126" width="42" height="5" rx="2" fill="#2E7D32"/>
        </g>
        <g opacity="0.1">
          <rect x="240" y="30" width="65" height="80" rx="10" fill="#1B5E20"/>
          <path d="M248 30 Q248 10 265 10 Q282 10 282 30" fill="none" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="272" cy="68" r="10" fill="#4CAF50" opacity="0.4"/>
          <rect x="268" y="68" width="9" height="14" rx="4" fill="#E8F5E9" opacity="0.6"/>
        </g>
        <g opacity="0.08">
          <rect x="280" y="130" width="50" height="60" rx="4" fill="#2E7D32"/>
          <rect x="285" y="120" width="40" height="15" rx="2" fill="#2E7D32"/>
          <rect x="295" y="148" width="12" height="20" rx="2" fill="#1B5E20"/>
          <rect x="310" y="148" width="12" height="15" rx="2" fill="#1B5E20"/>
        </g>
        <circle cx="180" cy="160" r="35" fill="none" stroke="#4CAF50" strokeWidth="0.7" opacity="0.1" strokeDasharray="5 4"/>
        <circle cx="180" cy="160" r="22" fill="none" stroke="#4CAF50" strokeWidth="0.5" opacity="0.08" strokeDasharray="3 5"/>
      </svg>
    ),
    "sanciones": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.13">
          <rect x="49" y="10" width="3" height="100" rx="1.5" fill="#2E7D32"/>
          <rect x="10" y="30" width="80" height="3" rx="1.5" fill="#2E7D32"/>
          <line x1="10" y1="33" x2="10" y2="68" stroke="#2E7D32" strokeWidth="1.5"/>
          <path d="M-5 68 Q10 78 25 68" fill="none" stroke="#2E7D32" strokeWidth="1.5"/>
          <line x1="90" y1="33" x2="90" y2="75" stroke="#2E7D32" strokeWidth="1.5"/>
          <path d="M75 75 Q90 85 105 75" fill="none" stroke="#2E7D32" strokeWidth="1.5"/>
          <path d="M40 110 L60 110 L65 120 L35 120 Z" fill="#2E7D32"/>
          <rect x="30" y="118" width="42" height="5" rx="2" fill="#2E7D32"/>
        </g>
        <g opacity="0.11">
          <rect x="250" y="20" width="65" height="80" rx="10" fill="#1B5E20"/>
          <path d="M258 20 Q258 0 282 0 Q307 0 307 20" fill="none" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="282" cy="58" r="10" fill="#4CAF50" opacity="0.4"/>
          <rect x="278" y="58" width="9" height="14" rx="4" fill="#E8F5E9" opacity="0.6"/>
        </g>
        <g opacity="0.06">
          <rect x="0" y="0" width="4" height="200" rx="2" fill="#2E7D32"/>
          <rect x="14" y="0" width="4" height="200" rx="2" fill="#2E7D32"/>
          <rect x="28" y="0" width="4" height="200" rx="2" fill="#2E7D32"/>
        </g>
        <g opacity="0.1">
          <rect x="160" y="100" width="10" height="60" rx="3" fill="#4CAF50"/>
          <rect x="180" y="80" width="10" height="80" rx="3" fill="#4CAF50"/>
          <rect x="200" y="60" width="10" height="100" rx="3" fill="#4CAF50"/>
          <rect x="220" y="40" width="10" height="120" rx="3" fill="#4CAF50"/>
        </g>
        <polygon points="350,20 355,35 370,35 358,44 362,59 350,50 338,59 342,44 330,35 345,35" fill="#4CAF50" opacity="0.1"/>
      </svg>
    ),
    "regulacion": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.1">
          <rect x="220" y="80" width="140" height="110" rx="4" fill="#2E7D32"/>
          <rect x="240" y="60" width="100" height="30" rx="3" fill="#2E7D32"/>
          <rect x="255" y="100" width="20" height="35" rx="2" fill="#1B5E20"/>
          <rect x="285" y="100" width="20" height="35" rx="2" fill="#1B5E20"/>
          <rect x="315" y="100" width="20" height="35" rx="2" fill="#1B5E20"/>
          <rect x="225" y="60" width="10" height="130" rx="2" fill="#1B5E20"/>
          <rect x="345" y="60" width="10" height="130" rx="2" fill="#1B5E20"/>
          <rect x="235" y="55" width="110" height="10" rx="2" fill="#4CAF50"/>
          <rect x="280" y="70" width="20" height="4" rx="1" fill="#E8F5E9"/>
          <rect x="287" y="63" width="5" height="15" rx="1" fill="#E8F5E9"/>
        </g>
        <g opacity="0.1">
          <circle cx="60" cy="60" r="35" fill="none" stroke="#2E7D32" strokeWidth="2"/>
          <circle cx="60" cy="60" r="25" fill="none" stroke="#4CAF50" strokeWidth="1.5"/>
          <circle cx="60" cy="60" r="8" fill="#4CAF50" opacity="0.3"/>
          <line x1="60" y1="25" x2="60" y2="15" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
          <line x1="60" y1="95" x2="60" y2="105" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
          <line x1="25" y1="60" x2="15" y2="60" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
          <line x1="95" y1="60" x2="105" y2="60" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <g opacity="0.08">
          <line x1="95" y1="60" x2="220" y2="100" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="5 4"/>
          <circle cx="157" cy="80" r="5" fill="#4CAF50"/>
        </g>
        <g opacity="0.08">
          <rect x="10" y="130" width="100" height="60" rx="6" fill="#2E7D32"/>
          <circle cx="60" cy="155" r="15" fill="#4CAF50" opacity="0.3"/>
        </g>
      </svg>
    ),
    "etapas": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.13" style={{ transformOrigin: "80px 100px", animation: "spin 20s linear infinite" }}>
          <circle cx="80" cy="100" r="55" fill="none" stroke="#2E7D32" strokeWidth="2"/>
          <circle cx="80" cy="100" r="38" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="80" cy="100" r="15" fill="#4CAF50" opacity="0.2"/>
          <rect x="76" y="36" width="8" height="16" rx="3" fill="#2E7D32"/>
          <rect x="76" y="148" width="8" height="16" rx="3" fill="#2E7D32"/>
          <rect x="16" y="96" width="16" height="8" rx="3" fill="#2E7D32"/>
          <rect x="148" y="96" width="16" height="8" rx="3" fill="#2E7D32"/>
          <rect x="34" y="52" width="11" height="11" rx="2" fill="#2E7D32" style={{ transform: "rotate(45deg)", transformOrigin: "39px 57px" }}/>
          <rect x="126" y="52" width="11" height="11" rx="2" fill="#2E7D32" style={{ transform: "rotate(45deg)", transformOrigin: "131px 57px" }}/>
          <rect x="34" y="137" width="11" height="11" rx="2" fill="#2E7D32" style={{ transform: "rotate(45deg)", transformOrigin: "39px 142px" }}/>
          <rect x="126" y="137" width="11" height="11" rx="2" fill="#2E7D32" style={{ transform: "rotate(45deg)", transformOrigin: "131px 142px" }}/>
        </g>
        <g opacity="0.11" style={{ transformOrigin: "200px 60px", animation: "spin 14s linear infinite reverse" }}>
          <circle cx="200" cy="60" r="35" fill="none" stroke="#4CAF50" strokeWidth="1.5"/>
          <circle cx="200" cy="60" r="23" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1" opacity="0.5"/>
          <circle cx="200" cy="60" r="8" fill="#4CAF50" opacity="0.2"/>
          <rect x="197" y="18" width="6" height="12" rx="2" fill="#4CAF50"/>
          <rect x="197" y="90" width="6" height="12" rx="2" fill="#4CAF50"/>
          <rect x="158" y="57" width="12" height="6" rx="2" fill="#4CAF50"/>
          <rect x="230" y="57" width="12" height="6" rx="2" fill="#4CAF50"/>
        </g>
        <g opacity="0.1">
          <path d="M280 100 Q280 50 320 50 Q360 50 360 100 Q360 150 320 150 Q285 150 281 120" fill="none" stroke="#2E7D32" strokeWidth="2" strokeDasharray="6 4"/>
          <polygon points="279 118 289 124 285 110" fill="#2E7D32"/>
        </g>
        <circle cx="320" cy="45" r="9" fill="#4CAF50" opacity="0.12"/>
        <circle cx="365" cy="100" r="9" fill="#4CAF50" opacity="0.12"/>
        <circle cx="320" cy="155" r="9" fill="#4CAF50" opacity="0.12"/>
        <circle cx="275" cy="100" r="9" fill="#4CAF50" opacity="0.12"/>
      </svg>
    ),
    "documentacion": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.1">
          <rect x="260" y="20" width="70" height="90" rx="6" fill="#2E7D32"/>
          <rect x="266" y="36" width="58" height="4" rx="2" fill="#E8F5E9"/>
          <rect x="266" y="48" width="50" height="4" rx="2" fill="#E8F5E9"/>
          <rect x="266" y="60" width="54" height="4" rx="2" fill="#E8F5E9"/>
          <rect x="266" y="72" width="44" height="4" rx="2" fill="#E8F5E9"/>
          <rect x="266" y="84" width="30" height="4" rx="2" fill="#E8F5E9"/>
          <path d="M260 20 L270 10 L330 10 L330 20" fill="#1B5E20"/>
        </g>
        <g opacity="0.08">
          <rect x="230" y="50" width="70" height="90" rx="6" fill="#2E7D32"/>
          <path d="M230 50 L240 40 L300 40 L300 50" fill="#1B5E20"/>
        </g>
        <g opacity="0.06">
          <rect x="200" y="80" width="70" height="90" rx="6" fill="#2E7D32"/>
          <path d="M200 80 L210 70 L270 70 L270 80" fill="#1B5E20"/>
        </g>
        <g opacity="0.12">
          <circle cx="60" cy="60" r="30" fill="none" stroke="#2E7D32" strokeWidth="2"/>
          <path d="M46 60 L56 70 L74 50" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <g opacity="0.1">
          <rect x="10" y="100" width="120" height="80" rx="8" fill="#2E7D32"/>
          <rect x="20" y="114" width="100" height="6" rx="3" fill="#E8F5E9"/>
          <rect x="20" y="128" width="80" height="6" rx="3" fill="#E8F5E9"/>
          <rect x="20" y="142" width="90" height="6" rx="3" fill="#E8F5E9"/>
          <rect x="20" y="156" width="60" height="6" rx="3" fill="#E8F5E9"/>
        </g>
      </svg>
    ),
    "herramientas": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.1">
          <rect x="240" y="20" width="120" height="80" rx="6" fill="#2E7D32"/>
          <rect x="250" y="35" width="30" height="4" rx="2" fill="#E8F5E9"/>
          <rect x="250" y="47" width="25" height="4" rx="2" fill="#E8F5E9"/>
          <rect x="290" y="35" width="30" height="4" rx="2" fill="#E8F5E9"/>
          <rect x="290" y="47" width="22" height="4" rx="2" fill="#E8F5E9"/>
          <line x1="280" y1="20" x2="280" y2="100" stroke="#1B5E20" strokeWidth="1"/>
          <rect x="250" y="62" width="20" height="4" rx="2" fill="#E8F5E9"/>
          <rect x="290" y="62" width="28" height="4" rx="2" fill="#E8F5E9"/>
        </g>
        <g opacity="0.12">
          <rect x="60" y="50" width="18" height="60" rx="4" fill="#2E7D32"/>
          <rect x="86" y="30" width="18" height="80" rx="4" fill="#2E7D32"/>
          <rect x="112" y="10" width="18" height="100" rx="4" fill="#2E7D32"/>
        </g>
        <g opacity="0.1">
          <circle cx="50" cy="150" r="30" fill="none" stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="4 3"/>
          <circle cx="50" cy="150" r="20" fill="none" stroke="#4CAF50" strokeWidth="1"/>
          <circle cx="50" cy="150" r="8" fill="#4CAF50" opacity="0.25"/>
          <line x1="50" y1="120" x2="50" y2="112" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
          <line x1="50" y1="180" x2="50" y2="188" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
          <line x1="20" y1="150" x2="12" y2="150" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
          <line x1="80" y1="150" x2="88" y2="150" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <g opacity="0.08">
          <circle cx="200" cy="120" r="40" fill="none" stroke="#4CAF50" strokeWidth="8"/>
          <line x1="228" y1="148" x2="250" y2="170" stroke="#4CAF50" strokeWidth="10" strokeLinecap="round"/>
        </g>
      </svg>
    ),
    "rol-trabajadores": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.1">
          <ellipse cx="300" cy="80" rx="55" ry="35" fill="none" stroke="#2E7D32" strokeWidth="2"/>
          <ellipse cx="300" cy="80" rx="42" ry="27" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.5"/>
          <circle cx="300" cy="80" r="16" fill="#4CAF50" opacity="0.2"/>
          <circle cx="300" cy="80" r="8" fill="#2E7D32" opacity="0.3"/>
          <circle cx="292" cy="73" r="4" fill="white" opacity="0.5"/>
          <line x1="268" y1="54" x2="266" y2="44" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="284" y1="48" x2="283" y2="37" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="300" y1="46" x2="300" y2="35" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="316" y1="48" x2="317" y2="37" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="332" y1="54" x2="334" y2="44" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        <g opacity="0.13">
          <line x1="60" y1="60" x2="130" y2="100" stroke="#4CAF50" strokeWidth="1"/>
          <line x1="130" y1="100" x2="80" y2="160" stroke="#4CAF50" strokeWidth="1"/>
          <line x1="130" y1="100" x2="200" y2="70" stroke="#4CAF50" strokeWidth="1"/>
          <line x1="60" y1="60" x2="30" y2="140" stroke="#4CAF50" strokeWidth="0.8"/>
          <circle cx="60" cy="44" r="10" fill="#2E7D32"/>
          <path d="M44 64 Q44 47 60 51 Q76 47 76 64 L76 82 L44 82 Z" fill="#2E7D32"/>
          <circle cx="130" cy="82" r="13" fill="#1B5E20"/>
          <path d="M110 106 Q110 85 130 90 Q150 85 150 106 L150 128 L110 128 Z" fill="#1B5E20"/>
          <path d="M123 92 L137 92 L137 104 Q137 111 130 114 Q123 111 123 104 Z" fill="#E8F5E9" opacity="0.5"/>
          <circle cx="80" cy="150" r="9" fill="#4CAF50" opacity="0.7"/>
          <path d="M66 168 Q66 153 80 156 Q94 153 94 168 L94 180 L66 180 Z" fill="#4CAF50" opacity="0.7"/>
          <circle cx="200" cy="56" r="9" fill="#4CAF50" opacity="0.7"/>
          <path d="M186 74 Q186 59 200 62 Q214 59 214 74 L214 88 L186 88 Z" fill="#4CAF50" opacity="0.7"/>
        </g>
        <g opacity="0.09">
          <path d="M5 120 L5 148 L18 148 L35 160 L35 108 L18 120 Z" fill="#2E7D32"/>
          <path d="M40 126 Q52 134 40 142" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
          <path d="M44 120 Q62 134 44 148" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
        </g>
      </svg>
    ),
    "cierre": (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.12">
          <circle cx="200" cy="100" r="80" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="6 4"/>
          <circle cx="200" cy="100" r="60" fill="none" stroke="#4CAF50" strokeWidth="1" strokeDasharray="4 5" opacity="0.7"/>
          <circle cx="200" cy="100" r="40" fill="#4CAF50" opacity="0.08"/>
        </g>
        <g opacity="0.14">
          <path d="M160 100 L186 126 L240 72" stroke="#2E7D32" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <g opacity="0.1">
          <polygon points="50,20 58,42 82,42 63,56 70,78 50,64 30,78 37,56 18,42 42,42" fill="#4CAF50"/>
          <polygon points="330,140 336,158 355,158 340,169 345,187 330,176 315,187 320,169 305,158 324,158" fill="#4CAF50"/>
          <polygon points="340,20 344,32 357,32 347,40 350,52 340,44 330,52 333,40 323,32 336,32" fill="#66BB6A"/>
        </g>
        <g opacity="0.09">
          <path d="M50 100 Q50 40 110 40 Q140 40 155 70" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="5 4"/>
          <path d="M350 100 Q350 160 290 160 Q260 160 245 130" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="5 4"/>
        </g>
        <circle cx="60" cy="160" r="20" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.1"/>
        <circle cx="320" cy="40" r="15" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.1"/>
      </svg>
    ),
  };

  return backgrounds[lessonId] || backgrounds["que-es"];
}

function LessonPage() {
  const { index } = Route.useParams();
  const navigate = useNavigate();
  const i = Math.max(0, Math.min(LESSONS.length - 1, parseInt(index, 10) || 0));
  const lesson = LESSONS[i];
  const isLast = i === LESSONS.length - 1;
  const progress = ((i + 1) / (LESSONS.length + 1)) * 100;
  const [shieldVisible, setShieldVisible] = useState(true);

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
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .shield-float { animation: floatY 3s ease-in-out infinite; }
        .lesson-card-p { transition: transform 0.2s; }
        .lesson-card-p:hover { transform: translateX(3px); }
      `}</style>
      <main style={{ minHeight: "100vh", background: "linear-gradient(160deg,#F1F8E9 0%,#FAFFF6 60%,#F9FBF9 100%)" }}>

        {/* Header */}
        <header style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(76,175,80,0.15)", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#2E7D32,#1B5E20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldCheck size={17} color="white"/>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1B5E20" }}>{COURSE_META.title}</span>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#4CAF50", fontWeight: 700 }}>{i + 1}/{LESSONS.length}</span>
              <div style={{ width: 72, height: 5, borderRadius: 99, background: "#E8F5E9", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#4CAF50,#2E7D32)", borderRadius: 99, transition: "width 0.4s ease" }}/>
              </div>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 0 120px" }}>

          {/* Hero Card con background ilustrado */}
          <div style={{ margin: "18px 16px 0", borderRadius: 28, background: "linear-gradient(135deg,#2E7D32 0%,#1B5E20 100%)", padding: "26px 22px 22px", position: "relative", overflow: "hidden", minHeight: 160 }}>
            <LessonBackground lessonId={lesson.id}/>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                  {lesson.subtitle && (
                    <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "#A5D6A7", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 99, marginBottom: 10 }}>
                      {lesson.subtitle}
                    </span>
                  )}
                  <h1 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: "white", lineHeight: 1.22, letterSpacing: "-0.02em" }}>
                    {lesson.title}
                  </h1>
                </div>
                <div style={{ fontSize: 46, marginLeft: 14, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))", flexShrink: 0 }}>
                  {LESSON_EMOJIS[lesson.id] || "📖"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 3, marginTop: 18 }}>
                {LESSONS.map((_, j) => (
                  <div key={j} style={{ height: 3, borderRadius: 99, background: j <= i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)", flex: j === i ? 2 : 1, transition: "all 0.3s ease" }}/>
                ))}
              </div>
            </div>
          </div>

          {/* Escudo guía con mensaje */}
          {shieldVisible && (
            <div style={{ margin: "14px 16px 0", display: "flex", alignItems: "flex-end", gap: 10 }}>
              <div className="shield-float" style={{ flexShrink: 0 }}>
                <ShieldCharacter size={52}/>
              </div>
              <div style={{ flex: 1, background: "white", borderRadius: "18px 18px 18px 4px", padding: "12px 36px 12px 14px", boxShadow: "0 2px 12px rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.15)", position: "relative" }}>
                <p style={{ margin: 0, fontSize: 13, color: "#2E7D32", fontWeight: 600, lineHeight: 1.5 }}>
                  {SARA_MESSAGES[lesson.id] || "¡Presta atención a este contenido!"}
                </p>
                <button onClick={() => setShieldVisible(false)} style={{ position: "absolute", top: 8, right: 10, background: "none", border: "none", cursor: "pointer", color: "#A5D6A7", fontSize: 18, padding: 0, lineHeight: 1, fontWeight: 300 }}>×</button>
              </div>
            </div>
          )}

          {/* Contenido de la lección */}
          <div style={{ margin: "14px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
            {lesson.blocks.map((b, idx) => {
              if (b.type === "p") return (
                <div key={idx} className="lesson-card-p" style={{ background: "white", borderRadius: 20, padding: "16px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid rgba(76,175,80,0.1)" }}>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "#263238" }}>{b.text}</p>
                </div>
              );

              if (b.type === "h") return (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px 0" }}>
                  <div style={{ width: 4, height: 22, borderRadius: 99, background: "linear-gradient(180deg,#4CAF50,#2E7D32)", flexShrink: 0 }}/>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1B5E20", letterSpacing: "-0.01em" }}>{b.text}</h2>
                </div>
              );

              if (b.type === "list") return (
                <div key={idx} style={{ background: "white", borderRadius: 20, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid rgba(76,175,80,0.1)", display: "flex", flexDirection: "column", gap: 0 }}>
                  {b.items.map((it, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "9px 0", borderBottom: j < b.items.length - 1 ? "1px solid #F1F8E9" : "none" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 8, background: "linear-gradient(135deg,#E8F5E9,#C8E6C9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                      <span style={{ fontSize: 14, lineHeight: 1.7, color: "#37474F" }}>{it}</span>
                    </div>
                  ))}
                </div>
              );

              return (
                <div key={idx} style={{ background: "linear-gradient(135deg,#E8F5E9 0%,#F1F8E9 100%)", borderRadius: 20, padding: "16px 18px", border: "1px solid rgba(76,175,80,0.22)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#2E7D32,#1B5E20)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Info size={18} color="white"/>
                  </div>
                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 800, color: "#1B5E20", textTransform: "uppercase", letterSpacing: "0.08em" }}>{b.title}</p>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#2E7D32" }}>{b.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chip progreso */}
          <div style={{ margin: "20px 16px 0", display: "flex", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.18)", borderRadius: 99, padding: "6px 16px" }}>
              <ShieldCheck size={13} color="#2E7D32"/>
              <span style={{ fontSize: 12, color: "#2E7D32", fontWeight: 600 }}>Lección {i + 1} de {LESSONS.length} — {Math.round(progress)}% completado</span>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(76,175,80,0.12)", padding: "12px 24px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 20 }}>
          <button onClick={prev} style={{ width: 48, height: 48, borderRadius: "50%", background: "#F1F8E9", border: "1px solid rgba(76,175,80,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ArrowLeft size={20} color="#2E7D32"/>
          </button>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {LESSONS.map((_, j) => (
              <div key={j} style={{ width: j === i ? 20 : 6, height: 6, borderRadius: 99, background: j <= i ? "#4CAF50" : "#E8F5E9", transition: "all 0.3s ease" }}/>
            ))}
          </div>
          <button onClick={next} style={{ height: 48, borderRadius: 24, background: "linear-gradient(135deg,#4CAF50,#2E7D32)", border: "none", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "0 20px", boxShadow: "0 4px 16px rgba(46,125,50,0.35)" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{isLast ? "Ir a evaluación" : "Siguiente"}</span>
            <ArrowRight size={18} color="white"/>
          </button>
        </div>
      </main>
    </>
  );
}

export default LessonPage;
