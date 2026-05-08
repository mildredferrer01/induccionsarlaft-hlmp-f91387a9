import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { LESSONS, COURSE_META } from "@/course/content";

export const Route = createFileRoute("/leccion/$index")({
  component: LessonPage,
});

const SHIELD_MESSAGES: Record<string, string> = {
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
      <ellipse cx="50" cy="56" rx="46" ry="13" fill="none" stroke="#4CAF50" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.3" style={{transformOrigin:"50px 56px",animation:"spin 20s linear infinite"}}/>
      <ellipse cx="50" cy="56" rx="40" ry="9" fill="none" stroke="#81C784" strokeWidth="0.6" strokeDasharray="3 5" opacity="0.2" style={{transformOrigin:"50px 56px",animation:"spin 14s linear infinite reverse"}}/>
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

const BG_ILLUSTRATIONS: Record<string, string> = {
  "que-es": `
    <g opacity="0.07">
      <rect x="60" y="120" width="110" height="130" rx="6" fill="#2E7D32"/>
      <rect x="80" y="96" width="70" height="32" rx="4" fill="#2E7D32"/>
      <rect x="95" y="158" width="30" height="50" rx="3" fill="#1B5E20"/>
      <rect x="138" y="158" width="22" height="40" rx="3" fill="#1B5E20"/>
      <rect x="103" y="140" width="18" height="5" rx="1" fill="#E8F5E9"/>
      <rect x="109" y="132" width="5" height="18" rx="1" fill="#E8F5E9"/>
      <rect x="100" y="104" width="18" height="6" rx="1" fill="#E8F5E9"/>
      <rect x="106" y="98" width="6" height="16" rx="1" fill="#E8F5E9"/>
    </g>
    <g opacity="0.06">
      <circle cx="290" cy="180" r="14" fill="#2E7D32"/>
      <path d="M272 210 Q272 188 290 193 Q308 188 308 210 L308 235 L272 235 Z" fill="#2E7D32"/>
      <circle cx="330" cy="175" r="11" fill="#4CAF50"/>
      <path d="M315 200 Q315 182 330 186 Q345 182 345 200 L345 220 L315 220 Z" fill="#4CAF50"/>
      <circle cx="250" cy="185" r="11" fill="#4CAF50"/>
      <path d="M235 210 Q235 192 250 196 Q265 192 265 210 L265 230 L235 230 Z" fill="#4CAF50"/>
    </g>
    <g opacity="0.05">
      <path d="M-20 300 L60 330 L60 430 Q60 500 -20 540 Q-100 500 -100 430 L-100 330 Z" fill="#4CAF50"/>
    </g>
    <g opacity="0.06">
      <path d="M310 50 L370 70 L370 140 Q370 185 310 210 Q250 185 250 140 L250 70 Z" fill="none" stroke="#4CAF50" strokeWidth="2"/>
      <text x="310" y="148" textAnchor="middle" fill="#2E7D32" fontSize="36" fontWeight="800" fontFamily="system-ui">S</text>
    </g>
    <line x1="0" y1="80" x2="380" y2="80" stroke="#4CAF50" strokeWidth="0.5" opacity="0.05"/>
    <line x1="0" y1="300" x2="380" y2="300" stroke="#4CAF50" strokeWidth="0.5" opacity="0.05"/>
    <circle cx="360" cy="400" r="50" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.05" strokeDasharray="6 4"/>
    <circle cx="20" cy="500" r="35" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.05" strokeDasharray="4 5"/>
  `,
  "conceptos": `
    <g opacity="0.07">
      <rect x="20" y="80" width="4" height="120" rx="2" fill="#2E7D32"/>
      <rect x=-10 y="100" width="80" height="3" rx="1.5" fill="#2E7D32"/>
      <line x1="-10" y1="103" x2="-10" y2="140" stroke="#2E7D32" strokeWidth="2"/>
      <path d="M-25 140 Q-10 152 5 140" fill="none" stroke="#2E7D32" strokeWidth="2"/>
      <line x1="70" y1="103" x2="70" y2="148" stroke="#2E7D32" strokeWidth="2"/>
      <path d="M55 148 Q70 160 85 148" fill="none" stroke="#2E7D32" strokeWidth="2"/>
      <path d="M12 172 L32 172 L37 185 L7 185 Z" fill="#2E7D32"/>
      <rect x="2" y="183" width="42" height="6" rx="2" fill="#2E7D32"/>
    </g>
    <g opacity="0.06">
      <rect x="280" y="300" width="80" height="100" rx="12" fill="#1B5E20"/>
      <path d="M290 300 Q290 275 320 275 Q350 275 350 300" fill="none" stroke="#2E7D32" strokeWidth="10" strokeLinecap="round"/>
      <circle cx="320" cy="345" r="14" fill="#4CAF50" opacity="0.4"/>
      <rect x="314" y="345" width="12" height="18" rx="5" fill="#E8F5E9" opacity="0.6"/>
    </g>
    <g opacity="0.05">
      <rect x="260" y="100" width="100" height="130" rx="6" fill="#2E7D32"/>
      <rect x="265" y="115" width="90" height="5" rx="2" fill="#E8F5E9"/>
      <rect x="265" y="128" width="75" height="5" rx="2" fill="#E8F5E9"/>
      <rect x="265" y="141" width="82" height="5" rx="2" fill="#E8F5E9"/>
      <rect x="265" y="154" width="60" height="5" rx="2" fill="#E8F5E9"/>
      <path d="M260 100 L274 84 L360 84 L360 100" fill="#1B5E20"/>
    </g>
    <circle cx="190" cy="480" r="55" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.06" strokeDasharray="6 4"/>
    <circle cx="190" cy="480" r="35" fill="none" stroke="#4CAF50" strokeWidth="0.7" opacity="0.05" strokeDasharray="4 5"/>
    <polygon points="50,480 58,504 83,504 63,519 70,543 50,528 30,543 37,519 17,504 42,504" fill="#4CAF50" opacity="0.05"/>
  `,
  "sanciones": `
    <g opacity="0.06">
      <rect x="20" y="100" width="4" height="150" rx="2" fill="#2E7D32"/>
      <rect x="-15" y="125" width="85" height="4" rx="2" fill="#2E7D32"/>
      <line x1="-15" y1="129" x2="-15" y2="172" stroke="#2E7D32" strokeWidth="2"/>
      <path d="M-32 172 Q-15 186 2 172" fill="none" stroke="#2E7D32" strokeWidth="2"/>
      <line x1="70" y1="129" x2="70" y2="180" stroke="#2E7D32" strokeWidth="2"/>
      <path d="M53 180 Q70 194 87 180" fill="none" stroke="#2E7D32" strokeWidth="2"/>
      <path d="M7 220 L27 220 L33 235 L1 235 Z" fill="#2E7D32"/>
      <rect x="-5" y="233" width="45" height="6" rx="2" fill="#2E7D32"/>
    </g>
    <g opacity="0.06">
      <rect x="270" y="60" width="80" height="100" rx="12" fill="#1B5E20"/>
      <path d="M282 60 Q282 34 310 34 Q338 34 338 60" fill="none" stroke="#2E7D32" strokeWidth="10" strokeLinecap="round"/>
      <circle cx="310" cy="108" r="14" fill="#4CAF50" opacity="0.4"/>
      <rect x="304" y="108" width="12" height="18" rx="5" fill="#E8F5E9" opacity="0.6"/>
    </g>
    <g opacity="0.04">
      <rect x="0" y="0" width="5" height="700" rx="2" fill="#2E7D32"/>
      <rect x="18" y="0" width="5" height="700" rx="2" fill="#2E7D32"/>
      <rect x="36" y="0" width="5" height="700" rx="2" fill="#2E7D32"/>
    </g>
    <g opacity="0.07">
      <rect x="200" y="350" width="14" height="90" rx="4" fill="#4CAF50"/>
      <rect x="222" y="310" width="14" height="130" rx="4" fill="#4CAF50"/>
      <rect x="244" y="270" width="14" height="170" rx="4" fill="#4CAF50"/>
      <rect x="266" y="230" width="14" height="210" rx="4" fill="#4CAF50"/>
    </g>
    <polygon points="340,380 346,400 368,400 351,413 357,434 340,421 323,434 329,413 312,400 334,400" fill="#4CAF50" opacity="0.06"/>
    <polygon points="60,550 65,566 82,566 68,576 73,592 60,582 47,592 52,576 38,566 55,566" fill="#4CAF50" opacity="0.07"/>
  `,
  "regulacion": `
    <g opacity="0.07">
      <rect x="120" y="200" width="160" height="200" rx="5" fill="#2E7D32"/>
      <rect x="145" y="170" width="110" height="40" rx="4" fill="#2E7D32"/>
      <rect x="160" y="240" width="25" height="45" rx="3" fill="#1B5E20"/>
      <rect x="197" y="240" width="25" height="45" rx="3" fill="#1B5E20"/>
      <rect x="234" y="240" width="25" height="45" rx="3" fill="#1B5E20"/>
      <rect x="125" y="170" width="12" height="230" rx="3" fill="#1B5E20"/>
      <rect x="263" y="170" width="12" height="230" rx="3" fill="#1B5E20"/>
      <rect x="137" y="163" width="126" height="12" rx="3" fill="#4CAF50"/>
      <rect x="188" y="178" width="24" height="5" rx="1" fill="#E8F5E9"/>
      <rect x="197" y="168" width="6" height="19" rx="1" fill="#E8F5E9"/>
    </g>
    <g opacity="0.06">
      <circle cx="50" cy="120" r="45" fill="none" stroke="#2E7D32" strokeWidth="2.5"/>
      <circle cx="50" cy="120" r="32" fill="none" stroke="#4CAF50" strokeWidth="1.5"/>
      <circle cx="50" cy="120" r="12" fill="#4CAF50" opacity="0.25"/>
      <line x1="50" y1="75" x2="50" y2="62" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="50" y1="165" x2="50" y2="178" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="5" y1="120" x2="-8" y2="120" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="95" y1="120" x2="108" y2="120" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
    <g opacity="0.05">
      <circle cx="320" cy="480" r="55" fill="none" stroke="#2E7D32" strokeWidth="2"/>
      <circle cx="320" cy="480" r="38" fill="none" stroke="#4CAF50" strokeWidth="1.2"/>
      <circle cx="320" cy="480" r="14" fill="#4CAF50" opacity="0.2"/>
    </g>
    <line x1="108" y1="120" x2="120" y2="200" stroke="#4CAF50" strokeWidth="1.5" opacity="0.06" strokeDasharray="6 4"/>
    <line x1="290" y1="300" x2="320" y2="480" stroke="#4CAF50" strokeWidth="1" opacity="0.05" strokeDasharray="4 5"/>
  `,
  "etapas": `
    <g opacity="0.07" style="transform-origin:80px 250px;animation:spin 25s linear infinite">
      <circle cx="80" cy="250" r="70" fill="none" stroke="#2E7D32" strokeWidth="2"/>
      <circle cx="80" cy="250" r="50" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="80" cy="250" r="20" fill="#4CAF50" opacity="0.15"/>
      <rect x="76" y="170" width="8" height="18" rx="3" fill="#2E7D32"/>
      <rect x="76" y="312" width="8" height="18" rx="3" fill="#2E7D32"/>
      <rect x="0" y="246" width="18" height="8" rx="3" fill="#2E7D32"/>
      <rect x="142" y="246" width="18" height="8" rx="3" fill="#2E7D32"/>
      <rect x="22" y="196" width="12" height="12" rx="2" fill="#2E7D32" style={{transform:"rotate(45deg)",transformOrigin:"28px 202px"}}/>
      <rect x="130" y="196" width="12" height="12" rx="2" fill="#2E7D32" style={{transform:"rotate(45deg)",transformOrigin:"136px 202px"}}/>
      <rect x="22" y="290" width="12" height="12" rx="2" fill="#2E7D32" style={{transform:"rotate(45deg)",transformOrigin:"28px 296px"}}/>
      <rect x="130" y="290" width="12" height="12" rx="2" fill="#2E7D32" style={{transform:"rotate(45deg)",transformOrigin:"136px 296px"}}/>
    </g>
    <g opacity="0.06" style="transform-origin:290px 150px;animation:spin 18s linear infinite reverse">
      <circle cx="290" cy="150" r="50" fill="none" stroke="#4CAF50" strokeWidth="1.5"/>
      <circle cx="290" cy="150" r="34" fill="none" stroke="#66BB6A" strokeWidth="1" opacity="0.6"/>
      <circle cx="290" cy="150" r="12" fill="#4CAF50" opacity="0.15"/>
      <rect x="286" y="92" width="8" height="14" rx="3" fill="#4CAF50"/>
      <rect x="286" y="194" width="8" height="14" rx="3" fill="#4CAF50"/>
      <rect x="232" y="146" width="14" height="8" rx="3" fill="#4CAF50"/>
      <rect x="334" y="146" width="14" height="8" rx="3" fill="#4CAF50"/>
    </g>
    <g opacity="0.06">
      <path d="M240 430 Q240 360 290 360 Q340 360 340 430 Q340 500 290 500 Q248 500 242 470" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeDasharray="7 5"/>
      <polygon points="240 468 252 476 248 460" fill="#2E7D32"/>
    </g>
    <circle cx="290" cy="355" r="12" fill="#4CAF50" opacity="0.08"/>
    <circle cx="345" cy="430" r="12" fill="#4CAF50" opacity="0.08"/>
    <circle cx="290" cy="505" r="12" fill="#4CAF50" opacity="0.08"/>
    <circle cx="235" cy="430" r="12" fill="#4CAF50" opacity="0.08"/>
  `,
  "documentacion": `
    <g opacity="0.07">
      <rect x="210" y="60" width="90" height="115" rx="7" fill="#2E7D32"/>
      <rect x="218" y="80" width="74" height="6" rx="2" fill="#E8F5E9"/>
      <rect x="218" y="96" width="60" height="6" rx="2" fill="#E8F5E9"/>
      <rect x="218" y="112" width="68" height="6" rx="2" fill="#E8F5E9"/>
      <rect x="218" y="128" width="50" height="6" rx="2" fill="#E8F5E9"/>
      <rect x="218" y="144" width="40" height="6" rx="2" fill="#E8F5E9"/>
      <path d="M210 60 L224 44 L300 44 L300 60" fill="#1B5E20"/>
    </g>
    <g opacity="0.055">
      <rect x="178" y="90" width="90" height="115" rx="7" fill="#2E7D32"/>
      <path d="M178 90 L192 74 L268 74 L268 90" fill="#1B5E20"/>
    </g>
    <g opacity="0.04">
      <rect x="146" y="120" width="90" height="115" rx="7" fill="#2E7D32"/>
      <path d="M146 120 L160 104 L236 104 L236 120" fill="#1B5E20"/>
    </g>
    <g opacity="0.07">
      <circle cx="55" cy="400" r="42" fill="none" stroke="#2E7D32" strokeWidth="2.5"/>
      <path d="M38 400 L50 414 L73 388" fill="none" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g opacity="0.06">
      <rect x="220" y="380" width="145" height="100" rx="10" fill="#2E7D32"/>
      <rect x="232" y="398" width="121" height="7" rx="3" fill="#E8F5E9"/>
      <rect x="232" y="415" width="95" height="7" rx="3" fill="#E8F5E9"/>
      <rect x="232" y="432" width="110" height="7" rx="3" fill="#E8F5E9"/>
      <rect x="232" y="449" width="75" height="7" rx="3" fill="#E8F5E9"/>
    </g>
    <circle cx="350" cy="250" r="40" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.05" strokeDasharray="5 4"/>
    <circle cx="30" cy="200" r="28" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.05" strokeDasharray="4 5"/>
  `,
  "herramientas": `
    <g opacity="0.07">
      <rect x="200" y="80" width="155" height="105" rx="7" fill="#2E7D32"/>
      <rect x="212" y="98" width="40" height="5" rx="2" fill="#E8F5E9"/>
      <rect x="212" y="112" width="32" height="5" rx="2" fill="#E8F5E9"/>
      <rect x="262" y="98" width="40" height="5" rx="2" fill="#E8F5E9"/>
      <rect x="262" y="112" width="30" height="5" rx="2" fill="#E8F5E9"/>
      <line x1="252" y1="80" x2="252" y2="185" stroke="#1B5E20" strokeWidth="1.5"/>
      <rect x="212" y="126" width="28" height="5" rx="2" fill="#E8F5E9"/>
      <rect x="262" y="126" width="36" height="5" rx="2" fill="#E8F5E9"/>
    </g>
    <g opacity="0.08">
      <rect x="30" y="280" width="22" height="90" rx="4" fill="#4CAF50"/>
      <rect x="60" y="240" width="22" height="130" rx="4" fill="#4CAF50"/>
      <rect x="90" y="200" width="22" height="170" rx="4" fill="#4CAF50"/>
      <rect x="120" y="160" width="22" height="210" rx="4" fill="#4CAF50"/>
    </g>
    <g opacity="0.06">
      <circle cx="60" cy="130" r="42" fill="none" stroke="#2E7D32" strokeWidth="2"/>
      <circle cx="60" cy="130" r="28" fill="none" stroke="#4CAF50" strokeWidth="1.5"/>
      <circle cx="60" cy="130" r="10" fill="#4CAF50" opacity="0.2"/>
      <line x1="60" y1="88" x2="60" y2="76" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="60" y1="172" x2="60" y2="184" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="18" y1="130" x2="6" y2="130" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="102" y1="130" x2="114" y2="130" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
    <g opacity="0.06">
      <circle cx="260" cy="440" r="55" fill="none" stroke="#4CAF50" strokeWidth="10"/>
      <line x1="296" y1="476" x2="322" y2="502" stroke="#4CAF50" strokeWidth="14" strokeLinecap="round"/>
    </g>
    <circle cx="350" cy="550" r="55" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.05" strokeDasharray="6 4"/>
  `,
  "rol-trabajadores": `
    <g opacity="0.08">
      <ellipse cx="300" cy="130" rx="70" ry="44" fill="none" stroke="#2E7D32" strokeWidth="2"/>
      <ellipse cx="300" cy="130" rx="54" ry="34" fill="none" stroke="#4CAF50" strokeWidth="1.2" opacity="0.6"/>
      <circle cx="300" cy="130" r="20" fill="#4CAF50" opacity="0.18"/>
      <circle cx="300" cy="130" r="10" fill="#2E7D32" opacity="0.25"/>
      <circle cx="292" cy="122" r="5" fill="white" opacity="0.5"/>
      <line x1="264" y1="96" x2="261" y2="83" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="282" y1="88" x2="280" y2="75" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="300" y1="86" x2="300" y2="73" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="318" y1="88" x2="320" y2="75" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="336" y1="96" x2="339" y2="83" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round"/>
    </g>
    <g opacity="0.09">
      <line x1="60" y1="200" x2="150" y2="310" stroke="#4CAF50" strokeWidth="1.2"/>
      <line x1="150" y1="310" x2="80" y2="440" stroke="#4CAF50" strokeWidth="1.2"/>
      <line x1="150" y1="310" x2="240" y2="250" stroke="#4CAF50" strokeWidth="1.2"/>
      <line x1="60" y1="200" x2="20" y2="370" stroke="#4CAF50" strokeWidth="1"/>
      <line x1="240" y1="250" x2="310" y2="360" stroke="#4CAF50" strokeWidth="1" strokeDasharray="4 3"/>
      <circle cx="60" cy="180" r="14" fill="#2E7D32"/>
      <path d="M40 210 Q40 188 60 193 Q80 188 80 210 L80 238 L40 238 Z" fill="#2E7D32"/>
      <circle cx="150" cy="286" r="18" fill="#1B5E20"/>
      <path d="M126 322 Q126 296 150 302 Q174 296 174 322 L174 352 L126 352 Z" fill="#1B5E20"/>
      <path d="M142 298 L158 298 L158 314 Q158 322 150 326 Q142 322 142 314 Z" fill="#E8F5E9" opacity="0.45"/>
      <circle cx="80" cy="430" r="13" fill="#4CAF50" opacity="0.7"/>
      <path d="M62 454 Q62 434 80 438 Q98 434 98 454 L98 472 L62 472 Z" fill="#4CAF50" opacity="0.7"/>
      <circle cx="240" cy="236" r="13" fill="#4CAF50" opacity="0.7"/>
      <path d="M222 260 Q222 240 240 244 Q258 240 258 260 L258 278 L222 278 Z" fill="#4CAF50" opacity="0.7"/>
    </g>
    <g opacity="0.06">
      <path d="M-10 380 L-10 418 L8 418 L30 432 L30 366 L8 380 Z" fill="#2E7D32"/>
      <path d="M36 388 Q52 400 36 412" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M42 380 Q64 400 42 420" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
  `,
  "cierre": `
    <g opacity="0.08">
      <circle cx="190" cy="300" r="110" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="7 5"/>
      <circle cx="190" cy="300" r="80" fill="none" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5 6" opacity="0.7"/>
      <circle cx="190" cy="300" r="50" fill="#4CAF50" opacity="0.07"/>
    </g>
    <g opacity="0.1">
      <path d="M148 300 L178 336 L232 260" stroke="#2E7D32" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g opacity="0.08">
      <polygon points="50,80 60,110 92,110 67,129 76,160 50,141 24,160 33,129 8,110 40,110" fill="#4CAF50"/>
      <polygon points="320,420 328,445 355,445 334,461 341,486 320,470 299,486 306,461 285,445 312,445" fill="#4CAF50"/>
      <polygon points="330,80 337,102 360,102 341,116 348,138 330,124 312,138 319,116 300,102 323,102" fill="#66BB6A"/>
      <polygon points="40,450 46,468 65,468 50,479 55,497 40,486 25,497 30,479 15,468 34,468" fill="#4CAF50"/>
    </g>
    <g opacity="0.06">
      <path d="M30 200 Q30 120 100 120 Q140 120 160 155" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="6 5"/>
      <path d="M350 400 Q350 480 280 480 Q240 480 220 445" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="6 5"/>
    </g>
    <g opacity="0.07">
      <path d="M155 100 L175 100 L175 120 Q175 132 165 138 Q155 132 155 120 Z" fill="#2E7D32"/>
      <rect x="145" y="138" width="40" height="6" rx="2" fill="#2E7D32"/>
      <rect x="158" y="144" width="14" height="30" rx="3" fill="#2E7D32"/>
    </g>
    <circle cx="55" cy="580" r="45" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.06" strokeDasharray="5 4"/>
    <circle cx="330" cy="160" r="30" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.06" strokeDasharray="4 5"/>
  `,
};

function FullPageBackground({ lessonId }: { lessonId: string }) {
  const svgContent = BG_ILLUSTRATIONS[lessonId] || BG_ILLUSTRATIONS["que-es"];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 380 700"
        preserveAspectRatio="xMidYMid slice"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
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
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .shield-float { animation: floatY 3s ease-in-out infinite; }
        .lesson-card:hover { transform: translateX(3px); transition: transform 0.2s; }
      `}</style>

      <FullPageBackground lessonId={lesson.id}/>

      <main style={{ minHeight: "100vh", background: "linear-gradient(160deg,rgba(241,248,233,0.92) 0%,rgba(250,255,246,0.9) 60%,rgba(249,251,249,0.92) 100%)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <header style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(76,175,80,0.15)", position: "sticky", top: 0, zIndex: 10 }}>
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

          {/* Hero card */}
          <div style={{ margin: "18px 16px 0", borderRadius: 28, background: "linear-gradient(135deg,rgba(46,125,50,0.95) 0%,rgba(27,94,32,0.97) 100%)", padding: "26px 22px 22px", position: "relative", overflow: "hidden", minHeight: 150, backdropFilter: "blur(4px)" }}>
            <div style={{ position: "absolute", top: -25, right: -25, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }}/>
            <div style={{ position: "absolute", bottom: -18, left: -18, width: 75, height: 75, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }}/>
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

          {/* Escudo guía */}
          {shieldVisible && (
            <div style={{ margin: "14px 16px 0", display: "flex", alignItems: "flex-end", gap: 10 }}>
              <div className="shield-float" style={{ flexShrink: 0 }}>
                <ShieldCharacter size={52}/>
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", borderRadius: "18px 18px 18px 4px", padding: "12px 36px 12px 14px", boxShadow: "0 2px 12px rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.15)", position: "relative" }}>
                <p style={{ margin: 0, fontSize: 13, color: "#2E7D32", fontWeight: 600, lineHeight: 1.5 }}>
                  {SHIELD_MESSAGES[lesson.id] || "¡Presta atención a este contenido!"}
                </p>
                <button onClick={() => setShieldVisible(false)} style={{ position: "absolute", top: 8, right: 10, background: "none", border: "none", cursor: "pointer", color: "#A5D6A7", fontSize: 18, padding: 0, lineHeight: 1 }}>×</button>
              </div>
            </div>
          )}

          {/* Contenido */}
          <div style={{ margin: "14px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
            {lesson.blocks.map((b, idx) => {
              if (b.type === "p") return (
                <div key={idx} className="lesson-card" style={{ background: "rgba(255,255,255,0.86)", backdropFilter: "blur(10px)", borderRadius: 20, padding: "16px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid rgba(76,175,80,0.1)" }}>
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
                <div key={idx} style={{ background: "rgba(255,255,255,0.86)", backdropFilter: "blur(10px)", borderRadius: 20, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid rgba(76,175,80,0.1)" }}>
                  {b.items.map((it, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "9px 0", borderBottom: j < b.items.length - 1 ? "1px solid rgba(241,248,233,0.9)" : "none" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 8, background: "linear-gradient(135deg,#E8F5E9,#C8E6C9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                      <span style={{ fontSize: 14, lineHeight: 1.7, color: "#37474F" }}>{it}</span>
                    </div>
                  ))}
                </div>
              );

              return (
                <div key={idx} style={{ background: "rgba(232,245,233,0.9)", backdropFilter: "blur(10px)", borderRadius: 20, padding: "16px 18px", border: "1px solid rgba(76,175,80,0.22)", display: "flex", gap: 14, alignItems: "flex-start" }}>
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
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", border: "1px solid rgba(76,175,80,0.18)", borderRadius: 99, padding: "6px 16px" }}>
              <ShieldCheck size={13} color="#2E7D32"/>
              <span style={{ fontSize: 12, color: "#2E7D32", fontWeight: 600 }}>Lección {i + 1} de {LESSONS.length} — {Math.round(progress)}% completado</span>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(18px)", borderTop: "1px solid rgba(76,175,80,0.12)", padding: "12px 24px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 20 }}>
          <button onClick={prev} style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(241,248,233,0.9)", border: "1px solid rgba(76,175,80,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
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
