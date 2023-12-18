//import generales
import {ref} from 'vue'

//para funcion de getFullImageUrl
import api from "@/api/axios";

//para funcion descargarExcel
import exportFromJSON from "export-from-json";

//para funcion descargarPDF
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

//imprimir o descargar info en pdf
export const descargarPdf = (datos, tituloTabla,columnas,inicio) => {
  const columnasMostrar = Math.min(columnas, Object.keys(datos[0]).length);
  const ordenado = ref(0);
  
  ordenado.value = inicio

  if (columnasMostrar > 0) {
    try {
      const headers = Object.keys(datos[0]).slice(ordenado.value, columnasMostrar + ordenado.value);
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
 
}

//formatear fecha actual
export const obtenerFecha = () => {
  const opcionesFormato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFormato);
  return fechaFormateada;
}