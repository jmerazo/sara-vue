//import generales
import { ref } from "vue";

//para funcion de getFullImageUrl
import api from "@/api/axios";

//Import log
import logSara from '@/assets/sara.png';

import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importar autoTable plugin
/*** funciones helpers ****/

//funcion para obtener la ruta de una imagen formateada
export const getFullImageUrl = (relativePath) => {
  if (relativePath) {
    return `${api.defaults.baseURL}/${relativePath.replace(/\\/g, "/")}`;
  } else {
    return "/img/sin_img.png";
  }
};
export const descargarPdfs = (datos, tituloTabla) => {
    console.log('datos: ', datos);
  
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    });
  
    // Añadir título y logo
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.addImage(logSara, 'PNG', 27, 10, 40, 30);
    doc.text(tituloTabla, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
  
    // Añadir una imagen
    if (datos.img_general) {
      const imgGeneral = getFullImageUrl(datos.img_general);
      doc.addImage(imgGeneral, 'JPEG', 40, 70, 150, 100);
    }
  
    // Añadir texto en secciones específicas
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const secciones = [
      { titulo: "Nombre Común", contenido: datos.nom_comunes },
      { titulo: "Nombre Científico", contenido: datos.nombre_cientifico },
      { titulo: "Familia", contenido: datos.familia },
      { titulo: "Distribución", contenido: datos.distribucion },
      { titulo: "Flores", contenido: datos.flor },
      { titulo: "Frutos", contenido: datos.frutos },
      { titulo: "Hojas", contenido: datos.hojas },
      { titulo: "Semillas", contenido: datos.semillas },
      { titulo: "Tallo", contenido: datos.tallo },
      { titulo: "Raíz", contenido: datos.raiz },
      { titulo: "Otros Nombres", contenido: datos.otros_nombres },
      { titulo: "Sinónimos", contenido: datos.sinonimos }
    ];
  
    let y = 180; // Posición Y inicial para el texto
  
    secciones.forEach(seccion => {
      if (y > doc.internal.pageSize.getHeight() - 50) { // Si se acerca al final de la página, añade una nueva página
        doc.addPage();
        y = 40; // Reiniciar la posición Y para la nueva página
      }
      doc.setFont('helvetica', 'bold');
      doc.text(seccion.titulo, 40, y);
      y += 20;
      doc.setFont('helvetica', 'normal');
      doc.text(seccion.contenido, 40, y, { maxWidth: doc.internal.pageSize.getWidth() - 80 });
      y += 40; // Ajustar el espaciado entre secciones según sea necesario
    });
  
    // Añadir imágenes adicionales
    const imagenes = [
      { path: datos.img_flowers, x: 40, y: y, width: 100, height: 100 },
      { path: datos.img_fruits, x: 150, y: y, width: 100, height: 100 },
      { path: datos.img_leafs, x: 260, y: y, width: 100, height: 100 }
    ];
  
    imagenes.forEach(imagen => {
      if (imagen.path) {
        const imgPath = getFullImageUrl(imagen.path);
        doc.addImage(imgPath, 'JPEG', imagen.x, imagen.y, imagen.width, imagen.height);
        y += imagen.height + 20; // Ajustar la posición Y después de cada imagen
      }
    });
  
    // Guardar el PDF
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