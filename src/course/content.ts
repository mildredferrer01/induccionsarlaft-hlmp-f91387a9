export type Lesson = {
  id: string;
  title: string;
  subtitle?: string;
  blocks: Array<
    | { type: "p"; text: string }
    | { type: "h"; text: string }
    | { type: "list"; items: string[] }
    | { type: "callout"; title: string; text: string }
  >;
};

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const COURSE_META = {
  title: "Inducción SARLAFT",
  subtitle: "Sistema de Administración del Riesgo de Lavado de Activos y Financiación del Terrorismo",
  passingScore: 80, // %
};

// ⬇️ Contenido de ejemplo. Reemplázalo con tus módulos reales.
export const LESSONS: Lesson[] = [
  {
    id: "intro",
    title: "1. ¿Qué es SARLAFT?",
    subtitle: "Conceptos fundamentales",
    blocks: [
      {
        type: "p",
        text: "SARLAFT es el Sistema de Administración del Riesgo de Lavado de Activos y de la Financiación del Terrorismo. Su objetivo es prevenir que la organización sea utilizada como instrumento para dar apariencia de legalidad a recursos provenientes de actividades ilícitas o para canalizar recursos hacia actividades terroristas.",
      },
      { type: "h", text: "Pilares del sistema" },
      {
        type: "list",
        items: [
          "Identificación del riesgo",
          "Medición o evaluación",
          "Control",
          "Monitoreo",
        ],
      },
      {
        type: "callout",
        title: "Importante",
        text: "Todos los colaboradores somos responsables de aplicar SARLAFT en nuestras actividades diarias.",
      },
    ],
  },
  {
    id: "definiciones",
    title: "2. Lavado de activos y financiación del terrorismo",
    blocks: [
      {
        type: "p",
        text: "El lavado de activos es el proceso mediante el cual se busca dar apariencia de legalidad a recursos de origen ilícito. La financiación del terrorismo consiste en proveer fondos —legales o ilegales— para apoyar actos terroristas.",
      },
      { type: "h", text: "Etapas del lavado de activos" },
      {
        type: "list",
        items: [
          "Colocación: introducción del dinero ilícito al sistema financiero.",
          "Estratificación: operaciones para ocultar el origen.",
          "Integración: los recursos retornan a la economía con apariencia legal.",
        ],
      },
    ],
  },
  {
    id: "senales",
    title: "3. Señales de alerta y reporte",
    blocks: [
      {
        type: "p",
        text: "Una señal de alerta es un comportamiento, hecho o situación inusual que puede indicar una operación sospechosa. Identificarlas a tiempo es clave para prevenir el riesgo.",
      },
      { type: "h", text: "Ejemplos comunes" },
      {
        type: "list",
        items: [
          "Clientes que se niegan a entregar información o entregan datos inconsistentes.",
          "Operaciones que no corresponden al perfil del cliente.",
          "Fraccionamiento de operaciones para evitar controles.",
          "Uso de terceros sin justificación clara.",
        ],
      },
      {
        type: "callout",
        title: "Tu rol",
        text: "Si detectas una señal de alerta, repórtala al Oficial de Cumplimiento. Nunca informes al cliente que está siendo reportado (tipping off).",
      },
    ],
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "¿Qué significa la sigla SARLAFT?",
    options: [
      "Sistema de Auditoría y Riesgo Laboral",
      "Sistema de Administración del Riesgo de Lavado de Activos y Financiación del Terrorismo",
      "Sistema Automático de Reportes Legales",
      "Servicio de Análisis de Riesgo Financiero",
    ],
    correctIndex: 1,
  },
  {
    id: "q2",
    prompt: "¿Cuáles son las etapas del lavado de activos?",
    options: [
      "Inicio, desarrollo y cierre",
      "Captación, inversión y retiro",
      "Colocación, estratificación e integración",
      "Ingreso, transferencia y consumo",
    ],
    correctIndex: 2,
  },
  {
    id: "q3",
    prompt: "¿Qué es una señal de alerta?",
    options: [
      "Una notificación legal obligatoria al cliente",
      "Un comportamiento o situación inusual que puede indicar una operación sospechosa",
      "Un mensaje publicitario sobre fraudes",
      "Una alarma del sistema informático",
    ],
    correctIndex: 1,
  },
  {
    id: "q4",
    prompt: "Si identificas una operación sospechosa, debes:",
    options: [
      "Avisar al cliente para que aclare la situación",
      "Ignorarla si el monto es bajo",
      "Reportarla al Oficial de Cumplimiento sin informar al cliente",
      "Publicarla en el chat del equipo",
    ],
    correctIndex: 2,
  },
  {
    id: "q5",
    prompt: "La responsabilidad de aplicar SARLAFT recae en:",
    options: [
      "Solo el Oficial de Cumplimiento",
      "Solo la alta dirección",
      "Solo el área financiera",
      "Todos los colaboradores de la organización",
    ],
    correctIndex: 3,
  },
];
