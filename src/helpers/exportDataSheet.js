//import generales
import { ref } from "vue";

//para funcion de getFullImageUrl
import api from "@/api/axios";

//Import log
import logSara from '@/assets/sara.png';
import headSheet from '@/assets/prefabs/head_sheet.jpg';

import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importar autoTable plugin
/*** funciones helpers ****/

async function getBase64ImageFromUrl(imageUrl) {
  const res = await fetch(imageUrl);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(blob);
  });
}

// Suponiendo que api.defaults.baseURL esté correctamente configurado
export const getFullImageUrl = (relativePath) => {
  if (relativePath) {
    return `${api.defaults.baseURL}/${relativePath.replace(/\\/g, "/")}`;
  }
  return "/img/sin_img.png"; // Ruta de imagen de respaldo
};

export const descargarPdfs = async (datos, tituloTabla) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const headerImage = await getBase64ImageFromUrl(headSheet);
  doc.addImage(headerImage, 'JPEG', 0, 0, doc.internal.pageSize.width, 30); // Ajusta el tamaño y posición según necesidad

  let y = 32; // Inicia el contenido debajo del encabezado
  const marginLeft = 10; // Margen izquierdo
  const marginRight = 10; // Margen derecho

  // TITLE DOCUMENT
  const titulo = `${datos.nombre_cientifico_especie} ${datos.nombre_autor_especie}`;
  // Establece la fuente para medir el ancho del texto
  doc.setFont("helvetica", "bolditalic"); // Negrita cursiva para el nombre científico
  const cientificoWidth = doc.getTextWidth(datos.nombre_cientifico_especie);
  doc.setFont("helvetica", "bold"); // Negrita para el autor
  const autorWidth = doc.getTextWidth(datos.nombre_autor_especie);

  // Calcula la posición central para el conjunto
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const totalWidth = cientificoWidth + autorWidth;
  const startX = (pageWidth - totalWidth) / 2;
  const midHeight = doc.internal.pageSize.getHeight() / 2;
  const midWidth = doc.internal.pageSize.getWidth() / 2;

  // Imprime primero el nombre científico
  doc.setFont("helvetica", "bolditalic");
  doc.text(datos.nombre_cientifico_especie, startX, 36);

  // Después el nombre del autor
  doc.setFont("helvetica", "bold");
  doc.text(datos.nombre_autor_especie, startX + cientificoWidth + 2, 36);

  // LINE MIDLE DOCUMENT 062A06
  doc.setDrawColor(130, 148, 130); // Establece el color de la línea, negro por defecto
  doc.setLineWidth(0.5); // Establece el grosor de la línea
  doc.line(midWidth, 40, midWidth, pageHeight - 20);

  // Imágenes adicionales si están disponibles
  if (datos.img_general) {
    const imgGeneral = await getBase64ImageFromUrl(getFullImageUrl(datos.img_general));
    doc.addImage(imgGeneral, 'JPEG', 10, 100, 100, 75);
  }

  // START FOOTER
  const textWidthFoot = pageWidth - 20; 
  const data1 = "SEDE PRINCIPAL: Tel. +57 608-4201535-4296642, Carrera 17 No. 14-85 Mocoa, Putumayo.";
  const contac1 = "CORREO: correspondencia@corpoamazonia.gov.co";
  const data2 = "AMAZONAS: Carrera 11 No. 12-45 Leticia- Amazonas";
  const contac2 = "CORREO: dta@corpoamazonia.gov.co";
  const data3 = "Carrera 11 No. 5-67 Km 3 vía aeropuerto -Florencia, Caquetá.";
  const contac3 = "CORREO: dtc@corpoamazonia.gov.co";
  const data4 = "PUTUMAYO: Carrera 17 No. 14-85 Mocoa, Putumayo.";
  const contac4 = "CORREO: dtp@corpoamazonia.gov.co";
  const data5 = "PAG. Web: www.corpoamazonia.gov.co"

  doc.setFontSize(8);
  doc.setTextColor(70, 70, 70);
  doc.setFont("helvetica", "normal");
  doc.text(data1, marginLeft, pageHeight - 16);
  doc.text(data2, marginLeft, pageHeight - 13);
  doc.text(data3, marginLeft, pageHeight - 10);
  doc.text(data4, marginLeft, pageHeight - 7);
  doc.text(data5, marginLeft, pageHeight - 4);

  doc.text(contac1, 140, pageHeight - 16);
  doc.text(contac2, 140, pageHeight - 13);
  doc.text(contac3, 140, pageHeight - 10);
  doc.text(contac4, 140, pageHeight - 7);
  // END FOOTER

  doc.save(`${tituloTabla}.pdf`);
};

/* export const descargarPdfs = (datos, tituloTabla, columnas, inicio) => {
    console.log('datos: ', datos)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: 'a4'
  });

  const columnasMostrar = Math.min(columnas, Object.keys(datos).length);
  console.log('columnas a mostrar: ', columnasMostrar)
  const headers = Object.keys(datos).slice(inicio, inicio + columnasMostrar);
  console.log('headers: ', headers)

  const customHeaders = [
    ["Código", "Nombre común", "Nombre científico", "Otros nombres", "Familia", "Distribución"]
  ];

    // Preparar los datos para la tabla
    const body = [];
    const row = [];
    for (let i = 0; i < headers.length; i++) {
        row.push(datos[headers[i]] || "");
    }
    body.push(row);

  // Añadir título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.addImage(logSara, 'PNG', 27, 10, 40, 30);
  doc.text(tituloTabla, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

  // Añadir tabla
  doc.autoTable({
    head: customHeaders,
    body: body,
    startY: 60,
    theme: 'grid',
    styles: {
      fillColor: [255, 255, 255], // Background table color
      lineColor: [16, 97, 62], // Color line
      lineWidth: 0.5, // 
    },
    headStyles: {
      fillColor: [16, 97, 62],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    }
  });

  // Guardar el PDF
  doc.save(`${tituloTabla}.pdf`);
}; */