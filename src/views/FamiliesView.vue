<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useFamiliasStore } from "@/stores/families";

import Family from "@/components/Family.vue";

const familias = useFamiliasStore();
onBeforeRouteLeave((to, from, next) => {
  familias.quitarFiltroFamilia()
  next();
});
</script>
<template>
  <div>
    <h1 class="text-4xl mb-10 mt-20 text-center font-extrabold">
      Listado de familias
    </h1>
    <div class="flex justify-end mt-5 mb-5">
      <label class="p-3 text-lg font-bold rounded-lg mx-3">Buscar</label>
      <input
        class="p-3 rounded-lg lg:w-1/4 sm:w-full border-2 border-gray-500 py-2 px-4"
        type="text"
        placeholder="Escríbe un término de búsqueda"
        @input="familias.buscarTermino($event.target.value)"
      />
    </div>
    <hr />

    <h3 class="text-justify text-2xl my-10">
      En el contexto de las especies forestales y la taxonomía biológica, una
      "familia" es una categoría de clasificación que agrupa a un conjunto de
      plantas que comparten ciertas características similares y están
      relacionadas evolutivamente.
    </h3>
    <div
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 mt-10 gap-10 my-10"
    >
      <Family
        v-for="familia in familias.familias"
        :key="familia.familia"
        :familia="familia"
      >
      </Family>
    </div>
  </div>
</template>