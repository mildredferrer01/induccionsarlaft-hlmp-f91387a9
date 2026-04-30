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
};

export const COURSE_META = {
  title: "Inducción y Reinducción SARLAFT–FPADM",
  subtitle:
    "Hospital Local del Municipio de Los Patios — Sistema de Administración del Riesgo de Lavado de Activos, Financiación del Terrorismo y de la Proliferación de Armas de Destrucción Masiva",
  passingScore: 80,
};

export const LESSONS: Lesson[] = [
  {
    id: "que-es",
    title: "1. ¿Qué es el SARLAFT–FPADM?",
    subtitle: "Introducción",
    blocks: [
      {
        type: "p",
        text: "El SARLAFT–FPADM es el sistema adoptado por el Hospital para prevenir, detectar y controlar los riesgos asociados al Lavado de Activos (LA), la Financiación del Terrorismo (FT) y la Financiación de la Proliferación de Armas de Destrucción Masiva (FPADM).",
      },
      {
        type: "p",
        text: "Su implementación es obligatoria en el sector salud y permite proteger los recursos públicos, la reputación institucional y la legalidad de las operaciones.",
      },
      { type: "h", text: "Por sus siglas" },
      {
        type: "list",
        items: [
          "SARLAFT: Sistema de Administración del Riesgo de Lavado de Activos y Financiación del Terrorismo.",
          "FPADM: Financiación de la Proliferación de Armas de Destrucción Masiva.",
        ],
      },
    ],
  },
  {
    id: "conceptos",
    title: "2. Conceptos clave",
    subtitle: "Definiciones legales",
    blocks: [
      {
        type: "callout",
        title: "Lavado de Activos — Art. 323 Código Penal",
        text: "Proceso mediante el cual se busca dar apariencia de legalidad a bienes provenientes de actividades ilícitas.",
      },
      {
        type: "callout",
        title: "Financiación del Terrorismo — Art. 345 Código Penal",
        text: "Consiste en proveer o administrar recursos con destino a actividades o grupos terroristas.",
      },
    ],
  },
  {
    id: "sanciones",
    title: "3. Sanciones por incumplimiento",
    subtitle: "Consecuencias legales y administrativas",
    blocks: [
      { type: "p", text: "El incumplimiento del SARLAFT–FPADM puede generar sanciones tanto penales como administrativas." },
      { type: "h", text: "Sanciones penales" },
      {
        type: "list",
        items: [
          "Lavado de Activos: 10 a 30 años de prisión + multas de 650 a 50.000 SMMLV.",
          "Financiación del Terrorismo: 13 a 22 años de prisión + multas de 1.300 a 15.000 SMMLV.",
        ],
      },
      { type: "h", text: "Sanciones administrativas (SuperSalud)" },
      {
        type: "list",
        items: [
          "Hasta 2.500 SMMLV a la entidad.",
          "Hasta 200 SMMLV a funcionarios responsables.",
          "Posible revocatoria de la habilitación.",
        ],
      },
      {
        type: "callout",
        title: "Fundamento normativo",
        text: "Estas sanciones se fundamentan en la Ley 1438 de 2011 (Arts. 130 y 131).",
      },
    ],
  },
  {
    id: "regulacion",
    title: "4. ¿Quién regula este sistema?",
    subtitle: "Marco normativo aplicable",
    blocks: [
      {
        type: "p",
        text: "En el caso del Hospital Local del Municipio de Los Patios, la superintendencia que regula es la SuperSalud, que mediante la Circular Externa 009 de 2016 imparte las instrucciones relativas al diseño, implementación y funcionamiento del SARLAFT (modificada por la CE 20211700000005-5 de 2021).",
      },
      { type: "h", text: "Convenio con la UIAF" },
      {
        type: "p",
        text: "Firmado desde el 28 de octubre de 2014 con el fin de aunar esfuerzos para la implementación de un Sistema de Administración de Riesgo contra el Lavado de Activos y la Financiación del Terrorismo (SARLAFT) en el sector salud.",
      },
      {
        type: "p",
        text: "Introduce el intercambio mensual de información recibida por los vigilados de la SNS hacia la UIAF (medios magnéticos) para prevenir y detectar tipologías de LA/FT.",
      },
    ],
  },
  {
    id: "etapas",
    title: "5. Etapas del SARLAFT",
    subtitle: "Ciclo de gestión del riesgo",
    blocks: [
      { type: "p", text: "El sistema se desarrolla en 4 etapas:" },
      {
        type: "list",
        items: [
          "Identificación del riesgo.",
          "Medición o evaluación (probabilidad e impacto).",
          "Control del riesgo.",
          "Monitoreo y seguimiento.",
        ],
      },
      {
        type: "callout",
        title: "Enfoque",
        text: "Estas etapas siguen el enfoque de gestión del riesgo exigido por la SuperSalud.",
      },
    ],
  },
  {
    id: "documentacion",
    title: "6. Documentación y cumplimiento",
    subtitle: "Cómo se demuestra el cumplimiento",
    blocks: [
      { type: "p", text: "La entidad demuestra su cumplimiento a través de:" },
      {
        type: "list",
        items: [
          "Estructura organizacional que asegura la adopción del SARLAFT y que se coordina a través del Oficial de Cumplimiento.",
          "Oficial de Cumplimiento idóneo.",
          "Definición de manual y políticas: Manual del SARLAFT.",
          "Registros controlados: actas de aprobación por la Junta Directiva y el Oficial de Cumplimiento.",
          "Informes de auditoría interna, informes de cumplimiento y capacitación al personal.",
        ],
      },
    ],
  },
  {
    id: "herramientas",
    title: "7. Herramientas clave",
    subtitle: "Instrumentos para implementar el sistema",
    blocks: [
      { type: "h", text: "1. Matriz de riesgos" },
      { type: "p", text: "Identifica riesgos, evalúa impacto y define controles." },
      { type: "h", text: "2. Debida diligencia" },
      { type: "p", text: "Conocimiento de:" },
      {
        type: "list",
        items: ["Usuarios / pacientes.", "Proveedores.", "Trabajadores."],
      },
      { type: "h", text: "3. Registro de operaciones" },
      { type: "p", text: "Control y consolidación mensual de transacciones." },
      {
        type: "callout",
        title: "Principio clave",
        text: "“Conozca a su contraparte” (KYC – Know Your Customer).",
      },
    ],
  },
  {
    id: "rol-trabajadores",
    title: "8. Rol de los trabajadores",
    subtitle: "Tu responsabilidad en la prevención",
    blocks: [
      { type: "p", text: "Todos los colaboradores son responsables de prevenir riesgos a través de tres acciones fundamentales:" },
      { type: "h", text: "Identificación de contrapartes" },
      {
        type: "list",
        items: ["Solicitar documentos.", "Verificar información.", "Registrar datos correctamente."],
      },
      { type: "h", text: "Detección de señales de alerta" },
      {
        type: "list",
        items: [
          "Transacciones inusuales.",
          "Pagos en efectivo no justificados.",
          "Información inconsistente.",
        ],
      },
      { type: "h", text: "Reporte obligatorio" },
      {
        type: "list",
        items: [
          "Informar inmediatamente al Oficial de Cumplimiento.",
          "No alertar al usuario (principio de confidencialidad).",
        ],
      },
      {
        type: "callout",
        title: "Importante",
        text: "El incumplimiento individual también genera sanciones.",
      },
    ],
  },
  {
    id: "cierre",
    title: "9. Cierre de la inducción",
    subtitle: "Mensaje final",
    blocks: [
      {
        type: "p",
        text: "El SARLAFT–FPADM no es solo una obligación legal, es un compromiso con la transparencia, la legalidad y la protección de los recursos en salud.",
      },
      { type: "h", text: "Recuerda" },
      {
        type: "list",
        items: [
          "Si ves algo sospechoso, repórtalo.",
          "Si tienes dudas, consulta al Oficial de Cumplimiento.",
          "Tu rol es clave en la prevención.",
        ],
      },
      {
        type: "callout",
        title: "Compromiso institucional",
        text: "“Prevenir el riesgo es responsabilidad de todos.”",
      },
    ],
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "¿Qué significa la sigla FPADM en el contexto del SARLAFT–FPADM?",
    options: [
      "Fondo de Protección Administrativa",
      "Financiación de la Proliferación de Armas de Destrucción Masiva",
      "Formato de Prevención Administrativa Mensual",
      "Financiación Pública para Acciones del Ministerio",
    ],
    correctIndex: 1,
  },
  {
    id: "q2",
    prompt: "Según el Código Penal, ¿qué artículo tipifica el Lavado de Activos?",
    options: ["Art. 323", "Art. 345", "Art. 130", "Art. 009"],
    correctIndex: 0,
  },
  {
    id: "q3",
    prompt: "La Financiación del Terrorismo está tipificada en el:",
    options: ["Art. 323 del Código Penal", "Art. 345 del Código Penal", "Art. 131 de la Ley 1438", "Circular Externa 009 de 2016"],
    correctIndex: 1,
  },
  {
    id: "q4",
    prompt: "¿Qué entidad regula la implementación del SARLAFT en el Hospital Local del Municipio de Los Patios?",
    options: ["La DIAN", "La Superintendencia Financiera", "La Superintendencia Nacional de Salud (SuperSalud)", "El Ministerio de Hacienda"],
    correctIndex: 2,
  },
  {
    id: "q5",
    prompt: "¿Cuál es la circular que imparte las instrucciones para el diseño e implementación del SARLAFT en el sector salud?",
    options: [
      "Circular Externa 009 de 2016 (modificada por CE 20211700000005-5 de 2021)",
      "Circular 100 de 2014",
      "Resolución 1438 de 2011",
      "Decreto 323 de 2016",
    ],
    correctIndex: 0,
  },
  {
    id: "q6",
    prompt: "¿Cuáles son las 4 etapas del SARLAFT?",
    options: [
      "Planeación, ejecución, control y cierre",
      "Identificación, medición, control y monitoreo del riesgo",
      "Diagnóstico, capacitación, reporte y sanción",
      "Conocimiento, registro, auditoría y mejora",
    ],
    correctIndex: 1,
  },
  {
    id: "q7",
    prompt: "Las sanciones penales por Lavado de Activos pueden alcanzar:",
    options: [
      "De 5 a 10 años de prisión",
      "De 10 a 30 años de prisión y multas de 650 a 50.000 SMMLV",
      "De 13 a 22 años de prisión y multas de 1.300 a 15.000 SMMLV",
      "Solo sanciones administrativas",
    ],
    correctIndex: 1,
  },
  {
    id: "q8",
    prompt: "¿Qué significa el principio KYC (“Conozca a su contraparte”)?",
    options: [
      "Realizar auditorías internas mensuales",
      "Reportar todas las transacciones a la DIAN",
      "Conocer e identificar adecuadamente a usuarios, proveedores y trabajadores",
      "Capacitar al Oficial de Cumplimiento",
    ],
    correctIndex: 2,
  },
  {
    id: "q9",
    prompt: "Si detectas una operación sospechosa en tu trabajo, debes:",
    options: [
      "Avisar al usuario para confirmar la situación",
      "Registrarla y esperar a fin de mes",
      "Informar inmediatamente al Oficial de Cumplimiento sin alertar al usuario",
      "Reportarla en redes sociales del Hospital",
    ],
    correctIndex: 2,
  },
  {
    id: "q10",
    prompt: "¿Sobre quién recae la responsabilidad de prevenir los riesgos de LA/FT/FPADM en el Hospital?",
    options: [
      "Solo sobre el Oficial de Cumplimiento",
      "Solo sobre la Junta Directiva",
      "Solo sobre el área administrativa",
      "Sobre todos los colaboradores de la institución",
    ],
    correctIndex: 3,
  },
];
