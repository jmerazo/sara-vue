<script setup>
import { onBeforeRouteLeave } from "vue-router";
import ModalForestSpecieAdd from "../../components/dashboard/ModalForestSpecieAdd.vue";
import ModalForestSpecieUpdate from "../../components/dashboard/ModalForestSpecieUpdate.vue"
import { useEspeciesStore } from "../../stores/species";
import { useModalStore } from "@/stores/modal";
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx/dist/xlsx.full.min.js';
import ClipboardJS from 'clipboard';
import api from '../../api/axios';

const especies = useEspeciesStore();
const modal = useModalStore();

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  especies.quitarFiltroEspecie()
  next();
});

const getFullImageUrl = (relativePath) => {
  if (!relativePath || relativePath.trim() === '' || relativePath === null) {
    // Si el relativePath está vacío, null o es una cadena de espacios, retorna un valor por defecto o una cadena vacía
    return ''; // o puedes retornar una imagen de marcador de posición
  }
  // Si relativePath tiene una URL válida, devuelve la URL completa
  return `${api.defaults.baseURL}/${relativePath.replace(/\\/g, '/')}`;
};


async function delForestSpecie(id, nc) {
  console.log(id)
  const confirmDelete = window.confirm(`¿Estás seguro de que desea eliminar la especie ${nc}?`);
  if (!confirmDelete) {
    return;
  }
  especies.deleteForestSpecie(id)
};

defineProps({
  especie:{
      type:Object
  }
})

function exportToPDF() {
  const table = document.getElementById('forestSpecies'); // Corregir el selector utilizando getElementById
  const opt = {
    margin: 10,
    filename: 'especies_forestales.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(table).set(opt).save();
}

// Función para imprimir la tabla
function printTable() {
  window.print();
}

// Función para exportar a Excel
function exportToExcel() {
  const wb = XLSX.utils.table_to_book(document.getElementById('forestSpecies'));
  XLSX.writeFile(wb, 'especies_forestales.xlsx');
}

// Función para copiar al portapapeles
function copyToClipboard() {
  const table = document.getElementById('forestSpecies'); // Seleccionar la tabla por su ID
  const range = document.createRange();
  range.selectNode(table);
  window.getSelection().addRange(range);
  const textToCopy = document.execCommand('copy');
  window.getSelection().removeAllRanges();
  const message = textToCopy ? '¡Copiado!' : 'Error al copiar';
  if (textToCopy) {
    window.alert(message); // Muestra un mensaje de alerta si se copió correctamente
  } else {
    // Aquí puedes manejar el error o mostrar un mensaje diferente en caso de error al copiar
    console.error('Error al copiar');
  }
}

function limitTextLines(text, lines) {
    const textLines = text.split('\n');
    if (textLines.length > lines) {
      return textLines.slice(0, lines).join('\n');
    }
    return text;
}

function toggleShowMore(especie) {
  especie.showMore = !especie.showMore;
}

function toggleText(especie) {
  especie.showFullText = !especie.showFullText;
}

function toggleTextDistribucion(especie) {
  especie.showFullTextDistribucion = !especie.showFullTextDistribucion;
}

function toggleTextHojas(especie) {
  especie.showFullTextHojas = !especie.showFullTextHojas;
}

function toggleTextFlor(especie) {
  especie.showFullTextFlor = !especie.showFullTextFlor;
}

function toggleTextFrutos(especie) {
  especie.showFullTextFrutos = !especie.showFullTextFrutos;
}

function toggleTextSemillas(especie) {
  especie.showFullTextSemillas = !especie.showFullTextSemillas;
}

function toggleTextTallo(especie) {
  especie.showFullTextTallo = !especie.showFullTextTallo;
}

function toggleTextRaiz(especie) {
  especie.showFullTextRaiz = !especie.showFullTextRaiz;
}

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

function truncateTextWords(text, limit) {
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
}
</script>

<template>
  <h1 class="title__section__admSpecies">Especies Forestales<span class="text-customGreen"> SARA</span></h1>
  <div class="section__top">
    <div>
      <button @click="modal.handleClickModalForestSpecieAdd()" class="btn__forestSpecies__top" title="Agregar especie">
        <font-awesome-icon :icon="['fas', 'file-circle-plus']" />
        Agregar especie
      </button>
      <button class="btn__forestSpecies__top" @click="exportToPDF">
        <font-awesome-icon :icon="['fas', 'file-pdf']" /> 
        Exportar a PDF
      </button>
      <button class="btn__forestSpecies__top" @click="printTable">
        <font-awesome-icon :icon="['fas', 'print']" /> 
        Imprimir
      </button>
      <button class="btn__forestSpecies__top" @click="exportToExcel">
        <font-awesome-icon :icon="['fas', 'file-excel']" /> 
        Exportar a Excel
      </button>
      <button class="btn__forestSpecies__top" @click="copyToClipboard">
        <font-awesome-icon :icon="['fas', 'copy']" /> 
        Copiar
      </button>
    </div>
    <div class="flex items-center">
      <label class="p-3 text-lg font-bold mx-3">Buscar</label>
      <input
        class="p-3 rounded-lg border-2 border-gray-500 py-2 px-4"
        type="text"
        placeholder="Nombre, Email o rol"
        @input="usersStore.buscarTermino($event.target.value)"
      />
    </div>
  </div>

  <hr />
    <table class="table" id="forestSpecies">
      <thead class="tabla__encabezado">
        <tr class="title__table">
          <th>CÓDIGO</th>
          <th>ESPECIE FORESTAL</th>
          <th>OTROS NOMBRES</th>
          <th>DISTRIBUCIÓN</th>
          <th>HOJAS</th>
          <th>FLOR</th>
          <th>FRUTOS</th>
          <th>SEMILLAS</th>
          <th>TALLO</th>
          <th>RAÍZ</th>
        </tr>
      </thead>
      <tbody class="tabla__contenido">
        <tr v-for="especie in especies.displayedEspecies" v-bind:key="especie.ShorcutID" class="text__table tabla__fila">
          <td>{{ especie.cod_especie }}</td>
          <td class="td__dataSpecie">
            <img :src="getFullImageUrl(especie.img_general)" class="img__table__species" alt="">{{ especie.nom_comunes }} <br> 
            <b class="txt__nameScientific">{{ especie.nombre_cientifico }}</b> 
            {{ especie.familia }}<br><br>
            <div class="td_buttons">
              <button @click="especies.selectedForestSpecieUpdate(especie.ShortcutID)" class="btn__forestSpecies__top"><font-awesome-icon :icon="['fas', 'pen-to-square']" /> Editar</button><br>
              <button @click="delForestSpecie(especie.ShortcutID, especie.nom_comunes)" class="btn__forestSpecies__top"><font-awesome-icon :icon="['fas', 'trash']" /> Eliminar</button>
            </div>      
          </td>
          <td>
            <div v-if="!especie.showFullText" class="text-preview">{{ truncateText(especie.otros_nombres, 10) }}</div>
            <div v-else>{{ especie.otros_nombres }}</div>
            <button class="btn__showMoreText" v-if="especie.otros_nombres.length > 50" @click="toggleText(especie)">
              {{ especie.showFullText ? 'Ver menos...' : 'Ver más...' }}
            </button>
          </td>
          <td>
            <div v-if="!especie.showFullTextDistribucion" class="text-preview">{{ truncateText(especie.distribucion, 15) }}</div>
            <div v-else>{{ especie.distribucion }}</div>
            <button class="btn__showMoreText" v-if="especie.distribucion.length > 50" @click="toggleTextDistribucion(especie)">
              {{ especie.showFullTextDistribucion ? 'Ver menos...' : 'Ver más...' }}
            </button>
          </td>
          <td>
            <div v-if="!especie.showFullTextHojas" class="text-preview">{{ truncateText(especie.hojas, 15) }}</div>
            <div v-else>{{ especie.hojas }}</div>
            <button class="btn__showMoreText" v-if="especie.hojas.length > 100" @click="toggleTextHojas(especie)">
              {{ especie.showFullTextHojas ? 'Ver menos...' : 'Ver más...' }}
            </button>
          </td>
          <td>
            <div v-if="!especie.showFullTextFlor" class="text-preview">{{ truncateText(especie.flor, 15) }}</div>
            <div v-else>{{ especie.flor }}</div>
            <button class="btn__showMoreText" v-if="especie.flor.length > 100" @click="toggleTextFlor(especie)">
              {{ especie.showFullTextFlor ? 'Ver menos...' : 'Ver más...' }}
            </button>
          </td>
          <td>
            <div v-if="especie.frutos && !especie.showFullTextFrutos" class="text-preview">{{ truncateText(especie.frutos, 15) }}</div>
            <div v-else>{{ especie.frutos }}</div>
            <button class="btn__showMoreText" v-if="especie.frutos.length > 10" @click="toggleTextFrutos(especie)">
              {{ especie.showFullTextFrutos ? 'Ver menos...' : 'Ver más...' }}
            </button>
          </td>
          <td>
            <div v-if="especie.semillas !== null && especie.semillas !== undefined && !especie.showFullTextSemillas" class="text-preview">{{ truncateText(especie.semillas, 15) }}</div>
            <div v-else-if="especie.semillas !== null && especie.semillas !== undefined">{{ especie.semillas }}</div>
            <button class="btn__showMoreText" v-if="especie.semillas && especie.semillas.length > 10" @click="toggleTextSemillas(especie)">
              {{ especie.showFullTextSemillas ? 'Ver menos...' : 'Ver más...' }}
            </button>
          </td>
          <td>
            <div v-if="especie.tallo !== null && especie.tallo !== undefined && !especie.showFullTextTallo" class="text-preview">{{ truncateText(especie.tallo, 15) }}</div>
            <div v-else-if="especie.tallo !== null && especie.tallo !== undefined">{{ especie.tallo }}</div>
            <button class="btn__showMoreText" v-if="especie.tallo && especie.tallo.length > 15" @click="toggleTextTallo(especie)">
              {{ especie.showFullTextTallo ? 'Ver menos...' : 'Ver más...' }}
            </button>
          </td>
          <td>
            <div v-if="especie.raiz !== null && especie.raiz !== undefined && !especie.showFullTextRaiz" class="text-preview">{{ truncateText(especie.raiz, 15) }}</div>
            <div v-else-if="especie.raiz !== null && especie.raiz !== undefined">{{ especie.raiz }}</div>
            <button class="btn__showMoreText" v-if="especie.raiz && especie.raiz.length > 15" @click="toggleTextRaiz(especie)">
              {{ especie.showFullTextRaiz ? 'Ver menos...' : 'Ver más...' }}
            </button>
          </td>          
        </tr>
      </tbody>
    </table>
    <!-- paginador -->
  <!-- paginador -->
  <section class="paginador">
    <div class="paginador__botones">
      <button
        v-for="page in especies.totalPages"
        :key="page"
        @click="especies.changePage(page)"
        class="paginador__boton"
        :class="{ 'bg-green-600': page === especies.currentPage }"
      >
        {{ page }}
      </button>
    </div>
  </section>

  <h1 v-if="especies.noResultados" class="text-center font-bold text-2xl mt-5 mb-40">
    No hay resultados de búsqueda
  </h1>
  <ModalForestSpecieAdd/>
  <ModalForestSpecieUpdate/>
</template>

<style>
.table {
  background-color: #ffffff; /* Equivalente a bg-slate-50 */
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06); /* Equivalente a shadow-md */
  border-width: 1px; /* Equivalente a border */
  border-style: solid; /* Equivalente a border */
  border-color: #a1a1a1; /* Estilo del borde */
  border-radius: 0.375rem; /* Equivalente a rounded-lg */
  border-collapse: collapse;
  width: 100%;
}

.tabla__encabezado th,
.tabla__contenido td {
  border: 1px solid #bbbbbb; /* Define el borde de 1px sólido de color negro */
  padding: 1px; /* Ajusta el espacio interno de las celdas */
}

.text-preview {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.tabla__encabezado th {
  background-color: #f2f2f2; /* Color de fondo para el encabezado */
  font-weight: bold; /* Fuente en negrita para el encabezado */
}

.text-preview {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn__showMoreText {
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
}

.title__section__admSpecies{
  font-size: 2.25rem;
  margin-bottom: 2.5rem;
  margin: 2.5rem;
  text-align: center;
  font-weight: 800;
}

.tabla__fila,
.tabla__dato {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin-left: 4px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #262f21;
}

input:focus + .slider {
  box-shadow: 0 0 1px #262f21;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/*   flex items-center justify-between mt-5 mb-5 
*/  
.section__top {
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  margin-bottom: 0.85rem;
}

.img__table__species {
  max-height: 100px;
  width: auto;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
}

.img__table__td {
  text-align: center;
  vertical-align: middle;
}

.td__dataButton {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.txt__nameScientific{
  font-weight: bold;
  font-style: oblique;
}

.title__table{
  text-align: center;
}

.td__dataSpecie{
  text-align: center; 
}

.text__table {
  vertical-align: top;
  padding-left: 1rem; /* Equivalente a px-4 */
  padding-right: 1rem; /* Equivalente a px-4 */
  padding-top: 0.75rem; /* Equivalente a py-3 */
  padding-bottom: 0.75rem; /* Equivalente a py-3 */
  border-width: 1px; /* Equivalente a border */
  border-style: solid; /* Equivalente a border */
}

.td_buttons{
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* class="btn rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2 btn__forestSpecies__top" */
.btn__forestSpecies__top{
  font-weight: bold;
  padding: 0.5rem;
  color: white;
  background-color: #262f21;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
}

.btn__forestSpecies__top:hover{
  background-color: green;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);    
}
</style>