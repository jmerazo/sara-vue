//import generales
import { ref } from "vue";

//para funcion de getFullImageUrl
import api from "@/api/axios";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importar autoTable plugin
/*** funciones helpers ****/

//funcion para obtener la ruta de una imagen formateada
export const getFullImageUrl = (relativePath, allowDefault = true) => {
  try {
    if (relativePath) {
      return `${api.defaults.baseURL}/${relativePath.replace(/\\/g, "/")}`;
    } else {
      return allowDefault ? "/img/sin_img.png" : null;
    }
  } catch (error) {
    return allowDefault ? "/img/sin_img.png" : null;
  }
};

// función para obtener la url para documentos
export const getFullDocumentUrl = (relativePath) => {
  try {
    if (relativePath) {
      return `${api.defaults.baseURL}/${relativePath.replace(/\\/g, "/")}`;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

//validate formatted url
export const validateUrl = async (array) => {
  const validURLs = [];

  await Promise.all(array.map(async (item) => {
    if (item) {
      const url = `${item.replace(/\\/g, "/")}`
      try {
        const { ok } = await fetch(url);
        if (ok) validURLs.push(url);
      } catch (error) {
        console.log('Error al obtener imagen:', error);
      }
    }
  }));
  return validURLs;
};

//validate formatted url
export const validateUrlImages = async (array) => {
  const validURLs = [];

  await Promise.all(array.map(async (item) => {
    if (item) {
      const url = `${api.defaults.baseURL}/${item.replace(/\\/g, "/")}`
      try {
        const { ok } = await fetch(url);
        if (ok) validURLs.push(url);
      } catch (error) {
        console.log('Error al obtener imagen:', error);
      }
    }
  }));
  return validURLs;
};

export const getFullImageNurseryUrl = (relativePath) => {

  try {
    if (relativePath) {
      return `${api.defaults.baseURL}/${relativePath.replace(/\\/g, "/")}`;
    } else {
      return "/img/no_img_nurseries.png";
    }
  } catch (error) {
    return "/img/no_img_nurseries.png";
  }

};


// FUNCIONES ACTUALIZADAS Y FINALES
export const descargarExcels = async (datos, excelName) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    console.error('No hay datos para generar el Excel');
    return;
  }

  // Crear un nuevo workbook y agregar una hoja
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos');

  // Extraer los encabezados de la primera fila de datos
  const headers = datos[0];

  // Extraer los datos del resto de las filas
  const bodyData = datos.slice(1);

  // Añadir la primera fila (encabezados)
  worksheet.addRow(headers);

  // Añadir las filas de datos
  bodyData.forEach(row => {
    worksheet.addRow(row);
  });

  // Obtener el número total de columnas y filas para asegurar que todo esté dentro del margen
  const totalColumns = headers.length;
  const totalRows = worksheet.rowCount;

  // Establecer el estilo de los encabezados
  headers.forEach((header, index) => {
    const cell = worksheet.getRow(1).getCell(index + 1); // Fila 1, columna correspondiente
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF10953E' }, // Verde oscuro
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' }, // Texto blanco
      bold: true,
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Aplicar bordes a todas las celdas, incluyendo vacías, dentro del rango de la tabla
  for (let rowIndex = 1; rowIndex <= totalRows; rowIndex++) {
    const row = worksheet.getRow(rowIndex);
    for (let colIndex = 1; colIndex <= totalColumns; colIndex++) {
      const cell = row.getCell(colIndex);
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }
  }

  // Ajustar el ancho de las columnas automáticamente
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength + 2; // Ajustar un poco más de espacio
  });

  // Generar el archivo Excel
  const buffer = await workbook.xlsx.writeBuffer();

  // Guardar el archivo usando file-saver
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${excelName}.xlsx`);
};

// FUNCIONES ACTUALIZADAS Y FINALES
export const descargarPdfs = (datos, tituloTabla, columnas, inicio, customHeaders) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    console.error('No hay datos para generar el PDF');
    return;
  }

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const availableWidth = pageWidth - 2 * margin;

  // Extraer la primera fila como headers
  const dataHeaders = Object.keys(datos[0]);
  const columnasMostrar = Math.min(columnas, dataHeaders.length);

  // Usar la primera fila de 'datos' como los headers
  const extractedHeaders = datos[0]; // Primera fila para los headers

  // Usar customHeaders si se proporciona, de lo contrario usar los headers extraídos
  const headersToUse = Array.isArray(customHeaders) ? customHeaders : Object.values(extractedHeaders).slice(inicio, inicio + columnasMostrar);

  // Eliminar la primera fila de los datos para no incluirla en el cuerpo
  const bodyData = datos.slice(1); // Datos sin la primera fila (que contiene los headers)

  // Preparar los datos para la tabla
  const body = bodyData.map(objeto =>
    headersToUse.map((header, index) => {
      const value = objeto[dataHeaders[inicio + index]];
      return value !== undefined && value !== null ? String(value) : '';
    })
  );

  // Añadir título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.addImage('/public/icons/sara.png', 'PNG', margin, margin, 40, 30);
  doc.text(tituloTabla, pageWidth / 2, margin + 40, { align: 'center' });

  // Calcular el ancho de cada columna
  const columnWidth = availableWidth / headersToUse.length;

  // Añadir tabla
  doc.autoTable({
    head: [headersToUse],
    body: body,
    startY: margin + 60,
    margin: { top: margin, right: margin, bottom: margin, left: margin },
    styles: {
      overflow: 'linebreak',
      cellWidth: 'wrap',
      fontSize: 8,
      cellPadding: 3,
      fillColor: [255, 255, 255],
      lineColor: [16, 97, 62],
      lineWidth: 0.5,
    },
    headStyles: {
      fillColor: [16, 97, 62],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      fontSize: 9
    },
    columnStyles: headersToUse.reduce((styles, _, index) => {
      styles[index] = {
        cellWidth: columnWidth,
        halign: 'left',
        valign: 'top'
      };
      return styles;
    }, {}),
    didParseCell: function (data) {
      if (data.section === 'body') {
        data.cell.styles.fillColor = data.row.index % 2 === 0 ? [255, 255, 255] : [245, 245, 245];
      }
    },
    didDrawPage: function (data) {
      // Agregar número de página
      doc.setFontSize(10);
      doc.text('Página ' + doc.internal.getNumberOfPages(), data.settings.margin.left, pageHeight - 10);
    },
  });

  // Guardar el PDF
  doc.save(`${tituloTabla}.pdf`);
};

export const downloadPdf = (headers, dataRow, title) =>{
  console.log('creando pdf....', headers, dataRow,title);
}
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

//generate id white 10 characters
export function generateAlphanumericId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}





