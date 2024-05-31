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
  console.log('datos: ', datos)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  let marginLeft1 = 10; // Margen izquierdo para la primera columna
  let marginLeft2 = 115; // Margen izquierdo para la segunda columna
  const columnWidth = 90;
  const marginTop = 40;
  const marginBottom = pageHeight - 20;
  const lineSpacing = 5; // Espacio entre líneas de texto
  const startY = 43;
  let y = startY;
  let currentColumn = 1;

  const addHeader = async () => {
    const headerImage = await getBase64ImageFromUrl(headSheet);
    doc.addImage(headerImage, 'JPEG', 0, 0, doc.internal.pageSize.width, 30); // Ajusta el tamaño y posición según necesidad
  }

  const addLine = async () => {
    // Línea de separación central
    doc.setDrawColor(130, 148, 130);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2, marginTop, pageWidth / 2, marginBottom - 2);
  }

  const addLineH = async () => {
    // Línea de separación central
    doc.setDrawColor(70, 70, 70);
    doc.setLineWidth(0.3);
    doc.line(0, marginBottom, pageWidth, marginBottom);
  }

  // Renderizar título
  const titulo = `${datos.nombre_cientifico_especie} ${datos.nombre_autor_especie}`;
  doc.setFont("helvetica", "bolditalic");
  const cientificoWidth = doc.getTextWidth(datos.nombre_cientifico_especie);
  doc.setFont("helvetica", "bold");
  const autorWidth = doc.getTextWidth(datos.nombre_autor_especie);

  const totalWidth = cientificoWidth + autorWidth;
  const startX = (pageWidth - totalWidth) / 2;

  doc.setFont("helvetica", "bolditalic");
  doc.text(datos.nombre_cientifico_especie, startX, 36);
  doc.setFont("helvetica", "bold");
  doc.text(datos.nombre_autor_especie, startX + cientificoWidth + 2, 36);

  // Función para añadir el pie de página
  const addFooter = () => {
    const footerY = pageHeight - 16;
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
    doc.text(data1, 10, pageHeight - 16);
    doc.text(data2, 10, pageHeight - 13);
    doc.text(data3, 10, pageHeight - 10);
    doc.text(data4, 10, pageHeight - 7);
    doc.text(data5, 10, pageHeight - 4);

    doc.text(contac1, 140, pageHeight - 16);
    doc.text(contac2, 140, pageHeight - 13);
    doc.text(contac3, 140, pageHeight - 10);
    doc.text(contac4, 140, pageHeight - 7);
  };

   // Función para añadir título y texto justificado a la columna
  const addTitleAndText = (title, text, x, y) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${title}:`, x, y);
    y += lineSpacing;

    doc.setFont("helvetica", "normal");
    if (title === 'SINONIMOS') {
      const bulletText = text.split(',').map(item => `• ${item.trim()}`);
      bulletText.forEach(line => {
        const splitBulletText = doc.splitTextToSize(line, columnWidth);
        splitBulletText.forEach(subLine => {
          if (y > marginBottom) {
            y = switchColumnOrPage(x, y);
            x = currentColumn === 1 ? marginLeft1 : marginLeft2; // Ajustar la columna
          }
          doc.text(subLine, x, y);
          y += lineSpacing;
        });
      });
    } else {
      const splitText = doc.splitTextToSize(text, columnWidth);
      splitText.forEach(line => {
        if (y > marginBottom) {
          y = switchColumnOrPage(x, y);
          x = currentColumn === 1 ? marginLeft1 : marginLeft2; // Ajustar la columna
        }
        doc.text(line, x, y, { align: "justify" });
        y += lineSpacing;
      });
    }
    return y;
  };

  // Función para cambiar de columna o añadir una nueva página
  const switchColumnOrPage = (x, y) => {
    if (currentColumn === 1) {
      // Cambiar a la segunda columna
      currentColumn = 2;
      return marginTop;
    } else {
      // Añadir una nueva página
      doc.addPage();
      addHeader();
      addLine();
      addLineH();
      addFooter(); // Añade el pie de página en cada nueva página
      currentColumn = 1;
      return marginTop;
    }
  };

  // Función para añadir imágenes
  const addImage = async (imagePath, x, y) => {
    const img = await getBase64ImageFromUrl(getFullImageUrl(imagePath));
    doc.addImage(img, 'JPEG', x, y, 100, 75);
    y += 85; // Espacio adicional después de la imagen
    return y;
  };

  await addHeader();
  addLine();
  addLineH();
  addFooter();

  // Añadir datos a la columna actual
  const propertiesToRender = [
    { title: 'FAMILIA', key: 'familia' },
    { title: 'CÓDIGO DE ESPECIE', key: 'cod_especie' },
    { title: 'NOMBRE COMÚN', key: 'nom_comunes' },
    { title: 'OTROS NOMBRES', key: 'otros_nombres' },
    { title: 'DESCRIPCIÓN GENERAL', key: 'descripcion_general' },
    { title: 'SINONIMOS', key: 'sinonimos' },
    { title: 'DISTRIBUCIÓN', key: 'distribucion' },
    { title: 'HOJAS', key: 'hojas' },
    { title: 'FLORES', key: 'flores' },
    { title: 'FRUTOS', key: 'frutos' },
    { title: 'SEMILLAS', key: 'semillas' },
    { title: 'USOS MADERABLES', key: 'usos_maderables' },
    { title: 'USOS NO MADERABLES', key: 'usos_no_maderables' }
  ];

  for (const { title, key } of propertiesToRender) {
    if (datos[key]) {
      y = addTitleAndText(title, datos[key], currentColumn === 1 ? marginLeft1 : marginLeft2, y);
    }

    // Añadir imágenes específicas en las posiciones adecuadas
    if (key === 'img_general' && datos.img_general) {
      y = await addImage(datos.img_general, currentColumn === 1 ? marginLeft1 : marginLeft2, y);
    } else if (key === 'img_leafs' && datos.img_leafs) {
      y = await addImage(datos.img_leafs, currentColumn === 1 ? marginLeft1 : marginLeft2, y);
    } else if (key === 'img_flowers' && datos.img_flowers) {
      y = await addImage(datos.img_flowers, currentColumn === 1 ? marginLeft1 : marginLeft2, y);
    } else if (key === 'img_fruits' && datos.img_fruits) {
      y = await addImage(datos.img_fruits, currentColumn === 1 ? marginLeft1 : marginLeft2, y);
    } else if (key === 'img_seeds' && datos.img_seeds) {
      y = await addImage(datos.img_seeds, currentColumn === 1 ? marginLeft1 : marginLeft2, y);
    }

    // Si se pasa del margen inferior, cambiar a la segunda columna o nueva página
    if (y > marginBottom) {
      if (currentColumn === 1) {
        currentColumn = 2;
        y = marginTop;
      } else {
        doc.addPage();
        currentColumn = 1;
        y = marginTop;
        /* addFooter(); // Añade el pie de página en cada nueva página */
      }
    }
  }
  // Imágenes adicionales si están disponibles
  /* if (datos.img_general) {
    const imgGeneral = await getBase64ImageFromUrl(getFullImageUrl(datos.img_general));
    doc.addImage(imgGeneral, 'JPEG', 10, y + 10, 100, 75);
  } */


  /* // START FOOTER
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
  doc.text(data1, 10, pageHeight - 16);
  doc.text(data2, 10, pageHeight - 13);
  doc.text(data3, 10, pageHeight - 10);
  doc.text(data4, 10, pageHeight - 7);
  doc.text(data5, 10, pageHeight - 4);

  doc.text(contac1, 140, pageHeight - 16);
  doc.text(contac2, 140, pageHeight - 13);
  doc.text(contac3, 140, pageHeight - 10);
  doc.text(contac4, 140, pageHeight - 7);
  // END FOOTER */

  doc.save(`${datos.cod_especie}_${datos.nombre_cientifico}_${tituloTabla}.pdf`);
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