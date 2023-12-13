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
</script>

<template>
    <h1 class="text-4xl mb-10 mt-10 text-center font-extrabold">Especies Forestales<span class="text-customGreen"> SARA</span></h1>
    <div class="flex items-center justify-between mt-5 mb-5">
      <div class="flex mt-5 justify-end">
        <button @click="modal.handleClickModalForestSpecieAdd()" class="btn rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2" title="Agregar especie">
          <font-awesome-icon :icon="['fas', 'file-circle-plus']" />
          Agregar especie
        </button>
        <button class="btn rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2" @click="exportToPDF"><font-awesome-icon :icon="['fas', 'file-pdf']" /> Exportar a PDF</button>
        <button class="btn rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2" @click="printTable"><font-awesome-icon :icon="['fas', 'print']" /> Imprimir</button>
        <button class="btn rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2" @click="exportToExcel"><font-awesome-icon :icon="['fas', 'file-excel']" /> Exportar a Excel</button>
        <button class="btn rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2" @click="copyToClipboard"><font-awesome-icon :icon="['fas', 'copy']" /> Copiar</button>
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
  <div class="w-auto mt-5 mb-10 mx-20">
  <table class="bg-slate-50 shadow-md border rounded-lg" id="forestSpecies">
    <thead>
      <tr class="title__table">
        <th class="px-4 py-2 text-gray-600">CÓDIGO</th>
        <th class="px-4 py-2 text-gray-600">ESPECIE FORESTAL</th>
        <th class="px-4 py-2 text-gray-600">OTROS NOMBRES</th>
        <th class="px-4 py-2 text-gray-600">DISTRIBUCIÓN</th>
        <th class="px-4 py-2 text-gray-600">HOJAS</th>
        <!-- <th class="px-4 py-2 text-gray-600">Img. Hojas</th>
        <th class="px-4 py-2 text-gray-600">Img. Frutos</th>
        <th class="px-4 py-2 text-gray-600">Img. Flores</th> -->
        <!-- <th class="px-4 py-2 text-gray-600">Acciones</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="especie in especies.displayedEspecies" v-bind:key="especie.ShorcutID">
        <td class="px-4 py-3 border">{{ especie.cod_especie }}</td>
        <td class="px-4 py-3 border td__data"><img :src="getFullImageUrl(especie.img_general)" class="img__table__species" alt="">{{ especie.nom_comunes }} <br> <b class="txt__nameScientific">{{ especie.nombre_cientifico }}</b> {{ especie.familia }}</td>
        <td class="px-4 py-3 border td__data">
          <button @click="especies.selectedForestSpecieUpdate(especie.ShortcutID)" class="btn  rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg mb-2"><font-awesome-icon :icon="['fas', 'pen-to-square']" /> Editar</button>
          <button @click="delForestSpecie(especie.ShortcutID, especie.nom_comunes)" class="btn  rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg m-2"><font-awesome-icon :icon="['fas', 'trash']" /> Eliminar</button>
        </td>
        <td class="px-4 py-3 border">{{ especie.otros_nombres }}</td>
        <td class="px-4 py-3 border">{{ especie.distribucion }}</td>
        <td class="px-4 py-3 border img__table__td">{{ especie.hojas }}</td>
        <!-- <td class="px-4 py-3 border"><img :src="getFullImageUrl(especie.img_leafs)" class="img__table__species" alt=""></td>
        <td class="px-4 py-3 border"><img :src="getFullImageUrl(especie.img_fruits)" class="img__table__species" alt=""></td>
        <td class="px-4 py-3 border"><img :src="getFullImageUrl(especie.img_flowers)" class="img__table__species" alt=""></td> -->
        
      </tr>
    </tbody>
  </table>
    <!-- paginador -->
  <!-- paginador -->
  <div class="flex justify-center mt-5 mb-10">
      <button
        v-for="page in especies.totalPages"
        :key="page"
        @click="especies.changePage(page)"
        class="px-3 py-2 mx-1 rounded-lg bg-green-200 text-black hover:bg-green-600"
        :class="{ 'bg-green-600': page === especies.currentPage }"
      >
        {{ page }}
      </button>
    </div>

    <h1 v-if="especies.noResultados" class="text-center font-bold text-2xl mt-5 mb-40">
      No hay resultados de búsqueda
    </h1>
    <ModalForestSpecieAdd/>
    <ModalForestSpecieUpdate/>
    
</div>

</template>

<style>
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

  .img__table__species {
    max-height: 100px;
    width: auto;
    border-radius: 10px;
  }

  .img__table__td {
    text-align: center;
    vertical-align: middle;
  }

  .td__data{
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
</style>