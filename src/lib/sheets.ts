const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzKqcNEIj5eCr28vcmfoJsTK84iSlIf_00OF_rU6GncddZFpFFoFtTyfujoA1Jbkfa-Kw/exec";

export interface EvaluacionData {
  nombre: string;
  cedula: string;
  puntaje: number;
  correctas: number;
  total: number;
  aprobado: boolean;
  respuestas: string;
  fecha: string;
}

export async function guardarEnSheets(data: EvaluacionData): Promise<void> {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error guardando en Sheets:", error);
  }
}
