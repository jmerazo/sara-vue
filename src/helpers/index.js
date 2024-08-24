//import generales
import { ref } from "vue";

//para funcion de getFullImageUrl
import api from "@/api/axios";

//para funcion descargarExcel
import exportFromJSON from "export-from-json";

//Import log
/* import logSara from '/public/icons/sara.png'; */

//para funcion descargarPDF
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
/* pdfMake.vfs = pdfFonts.pdfMake.vfs; */

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

//descargar reportes en excel
export const descargarExcel = (datos, excelName) => {
  const data = datos;
  const fileName = excelName;
  // const exportType= exportFromJSON.types.xls
  const exportType = exportFromJSON.types.xls;
  return exportFromJSON({ data, fileName, exportType });
};

export const descargarPdfs = (datos, tituloTabla, columnas, inicio) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: 'a4'
  });

  const columnasMostrar = Math.min(columnas, Object.keys(datos[0]).length);
  const headers = Object.keys(datos[0]).slice(inicio, inicio + columnasMostrar);

  const customHeaders = [
    ["Código", "Nombre común", "Nombre científico", "Evaluados", "Monitoreados", "Muestras"]
  ];

  // Preparar los datos para la tabla
  const body = datos.map(objeto =>
    headers.map(header => objeto[header])
  );

  // Añadir título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  /* doc.addImage(logSara, 'PNG', 27, 10, 40, 30); */
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
};

//imprimir o descargar info en pdf
export const descargarPdf = (datos, tituloTabla, columnas, inicio) => {
  const columnasMostrar = Math.min(columnas, Object.keys(datos[0]).length);
  const ordenado = ref(0);

  ordenado.value = inicio;

  if (columnasMostrar > 0) {
    try {
      const headers = Object.keys(datos[0]).slice(
        ordenado.value,
        columnasMostrar + ordenado.value
      );
      //ojo esta varible no se puede cambiar la solicita la liberia
      const documentDefinition = {
        pageOrientation: "landscape", //para vertical seria: portrait
        content: [
          { text: tituloTabla, style: "header" },
          {
            table: {
              widths: Array(columnasMostrar).fill("auto"),
              headerRows: 1,
              body: [
                headers.map((header) => ({
                  text: header,
                  fillColor: "#10613e",
                  color: "#ffffff",
                })), // Color primario
                ...datos.map((objeto) =>
                  headers
                    .map((header) => objeto[header])
                    .slice(0, columnasMostrar)
                ),
              ],
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return rowIndex === 0 ? "#10613e" : null; // Fila de encabezados con color de fondo
              },
            },
          },
        ],
        margin: [10, 10, 10, 10], // Márgenes: [izquierda, arriba, derecha, abajo]
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 15], // Márgenes para el título (15 puntos en la parte inferior)
          },
        },
      };

      const pdfDoc = pdfMake.createPdf(documentDefinition);
      return pdfDoc.open();
    } catch {
      alert("hubo un error al descargar la tabla");
    }
  } else {
    console.error("No hay suficientes columnas en los datos para mostrar.");
  }
};

//formatear fecha actual
export const obtenerFecha = () => {
  const opcionesFormato = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString(
    "es-ES",
    opcionesFormato
  );
  return fechaFormateada;
};

//ordena arrays por fecha mas reciente
export const ordenarPorFechas = (dataArray, campoFecha) => {

  try {
    return dataArray.sort((a, b) => {
      const fechaA = new Date(a[campoFecha]);
      const fechaB = new Date(b[campoFecha]);
      return fechaB - fechaA;
    });
  } catch {
    console.log("los parametros recibidos no son válidos");
  }
}


//create styles to text

/* export function formatSubtitle(text) {
  try {
    return text.replace(/<([^>]+)>/g, (match, p1) => {
        return `<br><br><strong class="subtitle" >${p1}:</strong><br>`;     
    });
  } catch (error) {
    return text
  }
} */
  /* export function formatSubtitle(text, applyItalic = true) {
    try {
      return text.replace(/<([^>]+)>/g, (match, p1) => {
        // Verificar si el subtítulo contiene la palabra clave
        const keyword = "Hábitats y Ecosistemas";
        const hasKeyword = p1.includes(keyword);
        
        // Estilo condicional: si contiene la palabra clave y applyItalic es true, se aplica negrita y cursiva
        const style = applyItalic && hasKeyword 
          ? 'font-weight: bold; font-style: italic;' 
          : 'font-weight: bold;';
        
        return `<br><br><strong style="${style}">${p1}</strong><br>`;
      });
    } catch (error) {
      return text;
    }
  } */   

export function formatSubtitle(text, applyItalic = true) {
  try {
    // Paso 1: Reemplazo para palabras entre <_palabra_> con estilo específico y eliminación de decoradores
    let formattedText = text.replace(/<_([^>]+)_>/g, (match, p1) => {
      // Eliminar los decoradores "_" y aplicar el estilo de cursiva y negrita
      return `<br><br><strong>${p1}</strong><br>`;
    });

    // Paso 2: Reemplazo para subtítulos y manejo de estilo para texto entre <>
    formattedText = formattedText.replace(/<([^_>]+)>/g, (match, p1) => {
      return `<br><br><strong>${p1}</strong><br>`;
    });

    // Paso 3: Reemplazo para agregar salto de línea después de dos puntos solo si no hay una viñeta después
    formattedText = formattedText.replace(/:\s(?!•)/g, ':<br>');

    // Paso 4: Reemplazo para manejar viñetas que terminan con "..", eliminando un punto y aplicando un doble salto de línea
    formattedText = formattedText.replace(/•\s(.*?)\.\.\s*/g, '• $1.<br><br>');

    // Paso 5: Reemplazo para separar viñetas (•) y otros textos
    formattedText = formattedText.replace(/•\s/g, '<br>• ')
                                  .replace(/(\.\))\s([A-Z])/g, '$1<br>$2')
                                  .replace(/(<\/strong><br>)\s*\n*(<br>)/g, '</strong><br>');

    // Paso 6: Aplicar el estilo condicional al último <strong>
    const keyword = "Hábitats y Ecosistemas";
    if (applyItalic && formattedText.includes(keyword)) {
      formattedText = formattedText.replace(
        new RegExp(`(<strong>)([^<]*${keyword}[^<]*)(</strong>)`),
        (match, p1, p2, p3) => `<strong style="font-weight: bold; font-style: italic;">${p2}</strong>`
      );
    } else {
      formattedText = formattedText.replace(
        /(<strong>)([^<]*)(<\/strong>)/g,
        '<strong style="font-weight: bold;">$2</strong>'
      );
    }

    return formattedText;
  } catch (error) {
    return text;
  }
}
    
      
export function formatList(text) {
  try {
    text = text.replace(/([^,]+),?/g, (match, p1) => {
      return `
        <svg style="width: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L5.24077 18.9999C5.0786 19.912 4.99805 20.907 4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3ZM12.998 5C8.57977 5 4.99805 8.58172 4.99805 13C4.99805 13.3624 5.00125 13.7111 5.00759 14.0459C6.26198 12.0684 8.09902 10.5048 10.5019 9.13176L11.4942 10.8682C8.6393 12.4996 6.74554 14.3535 5.77329 16.9998L8.99805 17C15.0132 17 18.8692 13.0269 18.9949 5.38766C17.6229 5.52113 16.3481 5.436 14.7754 5.20009C13.6243 5.02742 13.3988 5 12.998 5Z"></path></svg>
       ${p1.trim()}\n<br>`;
    });

    return text;
  } catch (error) {
    return text;
  }
}

export function formatListB(text) {
  try {
    text = text.replace(/([^;]+);?/g, (match, p1) => {
      // Verificar si hay citas en el formato [número] y dejarlas sin formato
      if (/\[\d+\]/.test(p1)) {
        // Extraer la cita y el texto restante por separado
        const citationMatch = p1.match(/\[\d+\]/);
        const citationText = citationMatch ? citationMatch[0] : '';
        const textWithoutCitation = p1.replace(/\[\d+\]/, '').trim();

        // Aplicar el formato adecuado al texto sin cita
        let formattedText = formatTextWithoutCitation(textWithoutCitation);

        // Devolver el texto formateado junto con la cita sin formatear
        return `
          <svg style="width: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.99805 3C9.48787 3 12.3812 5.55379 12.9112 8.8945C14.0863 7.72389 15.7076 7 17.498 7H21.998V9.5C21.998 13.0899 19.0879 16 15.498 16H12.998V21H10.998V13H8.99805C5.13205 13 1.99805 9.86599 1.99805 6V3H5.99805ZM19.998 9H17.498C15.0128 9 12.998 11.0147 12.998 13.5V14H15.498C17.9833 14 19.998 11.9853 19.998 9.5V9ZM5.99805 5H3.99805V6C3.99805 8.76142 6.23662 11 8.99805 11H10.998V10C10.998 7.23858 8.75947 5 5.99805 5Z"></path></svg>
          ${formattedText.trim()} ${citationText}\n<br>`;
      }

      // Si no hay cita, aplicar el formato normal
      return `
        <svg style="width: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.99805 3C9.48787 3 12.3812 5.55379 12.9112 8.8945C14.0863 7.72389 15.7076 7 17.498 7H21.998V9.5C21.998 13.0899 19.0879 16 15.498 16H12.998V21H10.998V13H8.99805C5.13205 13 1.99805 9.86599 1.99805 6V3H5.99805ZM19.998 9H17.498C15.0128 9 12.998 11.0147 12.998 13.5V14H15.498C17.9833 14 19.998 11.9853 19.998 9.5V9ZM5.99805 5H3.99805V6C3.99805 8.76142 6.23662 11 8.99805 11H10.998V10C10.998 7.23858 8.75947 5 5.99805 5Z"></path></svg>
        ${formatTextWithoutCitation(p1).trim()}\n<br>`;
    });

    return text;
  } catch (error) {
    return text;
  }
}

// Función auxiliar para formatear el texto sin las citas
function formatTextWithoutCitation(text) {
  // Formato del texto fuera y dentro de los paréntesis
  let outsideText = '';
  let insideText = '';

  // Dividir el texto en partes fuera y dentro de los paréntesis
  const parts = text.split(/\s*\(([^)]+)\)\s*/);

  // El primer elemento es el texto fuera de los paréntesis
  outsideText = parts[0].trim();

  // Si existe texto dentro de los paréntesis
  if (parts.length > 1) {
    insideText = parts[1].trim();
  }

  // Formatear el texto fuera de los paréntesis en cursiva y negrita
  let formattedText = `<strong style="font-weight: bold; font-style: italic;">${outsideText}</strong>`;

  // Si hay texto dentro de los paréntesis, formatearlo en solo negrita
  if (insideText) {
    formattedText += ` <strong>${insideText}</strong>`;
  }

  return formattedText;
}

