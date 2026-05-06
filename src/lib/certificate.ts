import { jsPDF } from "jspdf";

const LOGO_BASE64 = "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";

export interface CertificateData {
  nombre: string;
  cedula: string;
  puntaje: number;
  fecha: string;
}

export function generateCertificate(data: CertificateData) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const W = 297;
  const H = 210;

  // Fondo blanco
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");

  // Borde exterior verde oscuro
  doc.setDrawColor(27, 94, 32);
  doc.setLineWidth(4);
  doc.rect(6, 6, W - 12, H - 12, "S");

  // Borde interior verde claro
  doc.setDrawColor(76, 175, 80);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, W - 20, H - 20, "S");

  // Franja superior verde
  doc.setFillColor(27, 94, 32);
  doc.rect(6, 6, W - 12, 28, "F");

  // Franja inferior verde
  doc.setFillColor(27, 94, 32);
  doc.rect(6, H - 34, W - 12, 28, "F");

  // Logo hospital
  try {
    doc.addImage(
      "data:image/jpeg;base64," + LOGO_BASE64,
      "JPEG",
      14,
      8,
      80,
      22
    );
  } catch (e) {
    // Si falla el logo, continuar sin él
  }

  // Texto en franja superior
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("HOSPITAL LOCAL MUNICIPIO DE LOS PATIOS — EMPRESA SOCIAL DEL ESTADO", W / 2, 18, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Sistema de Administración del Riesgo de Lavado de Activos, Financiación del Terrorismo y FPADM", W / 2, 25, { align: "center" });

  // Título principal
  doc.setTextColor(27, 94, 32);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO DE INDUCCIÓN", W / 2, 58, { align: "center" });

  // Subtítulo
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.text("SARLAFT – FPADM", W / 2, 68, { align: "center" });

  // Línea decorativa
  doc.setDrawColor(76, 175, 80);
  doc.setLineWidth(0.8);
  doc.line(60, 72, W - 60, 72);

  // Texto "Se certifica que"
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "normal");
  doc.text("Se certifica que:", W / 2, 85, { align: "center" });

  // Nombre del participante
  doc.setFontSize(22);
  doc.setTextColor(27, 94, 32);
  doc.setFont("helvetica", "bold");
  doc.text(data.nombre.toUpperCase(), W / 2, 98, { align: "center" });

  // Línea bajo el nombre
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(70, 101, W - 70, 101);

  // Cédula
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text(`C.C. ${data.cedula}`, W / 2, 108, { align: "center" });

  // Texto del cuerpo
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const body = `Ha completado satisfactoriamente el programa de Inducción y Reinducción en el Sistema de`;
  const body2 = `Administración del Riesgo de Lavado de Activos, Financiación del Terrorismo y de la Proliferación`;
  const body3 = `de Armas de Destrucción Masiva (SARLAFT–FPADM), obteniendo un puntaje de ${data.puntaje}%.`;
  doc.text(body, W / 2, 118, { align: "center" });
  doc.text(body2, W / 2, 125, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.text(body3, W / 2, 132, { align: "center" });

  // Fecha
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Expedido el ${data.fecha}`, W / 2, 142, { align: "center" });

  // Línea de firma
  const firmaX = W / 2;
  doc.setDrawColor(27, 94, 32);
  doc.setLineWidth(0.6);
  doc.line(firmaX - 50, 158, firmaX + 50, 158);

  // Nombre del firmante
  doc.setFontSize(10);
  doc.setTextColor(27, 94, 32);
  doc.setFont("helvetica", "bold");
  doc.text("Martha Gómez", firmaX, 163, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text("Oficial de Cumplimiento SARLAFT", firmaX, 169, { align: "center" });
  doc.text("Hospital Local Municipio de Los Patios", firmaX, 174, { align: "center" });

  // Texto franja inferior
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Este certificado es válido como constancia de cumplimiento del programa de inducción SARLAFT–FPADM.",
    W / 2, H - 22, { align: "center" }
  );
  doc.text(
    `Puntaje obtenido: ${data.puntaje}% | Fecha: ${data.fecha}`,
    W / 2, H - 16, { align: "center" }
  );

  // Descargar
  doc.save(`Certificado_SARLAFT_${data.nombre.replace(/\s+/g, "_")}.pdf`);
}
