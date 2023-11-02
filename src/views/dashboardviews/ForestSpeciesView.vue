<script setup>
import { onBeforeRouteLeave } from "vue-router";
import ModalForestSpecieUpdate from "../../components/dashboard/ModalForestSpecieUpdate.vue";
import { useEspeciesStore } from "../../stores/species";
import { useModalStore } from "@/stores/modal";

const especies = useEspeciesStore();
const modal = useModalStore();
//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  especies.quitarFiltroEspecie()
  next();
});

async function delForestSpecie(id, nc) {
  console.log(id)
  const confirmDelete = window.confirm(`¿Estás seguro de que desea eliminar la especie ${nc}?`);
  if (!confirmDelete) {
    return;
  }
  especies.deleteForestSpecie(id)
};

function changeUserState(id, state) {
  const confirmState = window.confirm(`¿Estás seguro de que deseas ${state === 0 ? 'activar' : 'desactivar'} a este usuario?`);
  if (!confirmState) {
    return
  }
  if (state === 1) {
    especies.changeStateUser(id, 0);
  } else {
    especies.changeStateUser(id, 1);
  }
}

defineProps({
    especie:{
        type:Object
    }
 })

function modalClick() {
  modal.handleClickModalForestSpecieAdd()
}
</script>

<template>
    <h1 class="text-4xl mb-10 mt-10 text-center font-extrabold">Especies Forestales<span class="text-customGreen"> SARA</span></h1>
    <div class="flex justify-end mt-5 mb-5">
      <div>          
        <button @click="modal.handleClickModalForestSpecieAdd()" class="btn  rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2"><font-awesome-icon :icon="['fas', 'file-circle-plus']" /> </button>
      </div>
      <label class="p-3 text-lg font-bold rounded-lg mx-3">Buscar</label>
      <input
        class="p-3 rounded-lg lg:w-1/4 sm:w-full border-2 border-gray-500 py-2 px-4"
        type="text"
        placeholder="Nombre, Email o rol"
        @input="usersStore.buscarTermino($event.target.value)"
      />
    </div>
    <hr />
  <div class="w-auto mt-5 mb-10 mx-20">
  <table class="bg-slate-50 shadow-md border rounded-lg">
    <thead>
      <tr>
        <th class="px-4 py-2 text-gray-600">Código</th>
        <th class="px-4 py-2 text-gray-600">Nombre común</th>
        <th class="px-4 py-2 text-gray-600">Nombre cientifico</th>
        <th class="px-4 py-2 text-gray-600">Familia</th>
        <th class="px-4 py-2 text-gray-600">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="especie in especies.displayedEspecies" v-bind:key="especie.ShorcutID">
        <td class="px-4 py-3 border">{{ especie.cod_especie }}</td>
        <td class="px-4 py-3 border">{{ especie.nom_comunes }}</td>
        <td class="px-4 py-3 border">{{ especie.nombre_cientifico }}</td>
        <td class="px-4 py-3 border">{{ especie.familia }}</td>
        <td class="px-4 py-3 border">{{ especie.ShortcutID }}</td>
        <td class="px-4 py-3 border">
          <button @click="especies.selectedForestSpecieUpdate(especie.ShortcutID)" class="btn  rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2"><font-awesome-icon :icon="['fas', 'pen-to-square']" /> </button>
          <button @click="delForestSpecie(especie.ShortcutID, especie.nom_comunes)" class="btn  rounded-lg font-bold p-1 text-white bg-customGreen hover:bg-green-500 hover:shadow-lg ml-2"><font-awesome-icon :icon="['fas', 'trash']" /> </button>
        </td>
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
</style>