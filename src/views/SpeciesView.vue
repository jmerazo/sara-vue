<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useEspeciesStore } from "../stores/species";

import { computed } from 'vue'
import Species from "@/components/Species.vue";


const especies = useEspeciesStore();



//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  especies.quitarFiltroEspecie()
  next();
});
</script>
<template>
  <div>
    <h1 class="text-4xl mb-10 mt-20 text-center font-extrabold">
      Listado de especies
    </h1>

    <div class="flex justify-end mt-5 mb-5">
      <label class="p-3 text-lg font-bold rounded-lg mx-3">Buscar</label>
      <input
        class="p-3 rounded-lg lg:w-1/4 sm:w-full border-2 border-gray-500 py-2 px-4"
        type="text"
        placeholder="Escríbe un término de búsqueda"
        @input="especies.buscarTermino($event.target.value)"
      />
    </div>
    <hr />
    <div
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-10 gap-10 my-10"
    >
      <Species
        v-for="especie in especies.displayedEspecies"
        :key="especie.ShortcutID"
        :especie="especie"
        class="rounded-lg"
      >
      </Species>
    </div>

     <!-- paginador -->
    <div class="flex justify-center mt-5 mb-10">
      <button
        v-for="page in especies.totalPages"
        :key="page"
        @click="especies.changePage(page)"
        class="px-3 py-2 mx-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
        :class="{ 'bg-blue-700': page === especies.currentPage }"
      >
        {{ page }}
      </button>
    </div>

    <h1 v-if="especies.noResultados" class="text-center font-bold text-2xl mt-5 mb-40">
      No hay resultados de búsqueda
    </h1>

  </div>
</template>
