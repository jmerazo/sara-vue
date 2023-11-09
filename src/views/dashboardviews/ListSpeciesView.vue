<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useEspeciesStore } from "@/stores/species";
import { useConsultaStore } from "@/stores/consulta";

const especies = useEspeciesStore();
const consulta = useConsultaStore();

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  especies.quitarFiltroEspecie();
  next();
});
</script>
<template>
  <h1 class="text-4xl mb-10 mt-10 text-center font-extrabold">
    Reporte de Especies Forestales
  </h1>
  <div class="flex justify-end mt-5 mb-5">
    <label class="p-3 text-lg font-bold rounded-lg mx-3">Buscar </label>
    <input
      class="p-3 rounded-lg lg:w-1/4 sm:w-full border-2 border-gray-500 py-2 px-4"
      type="text"
      placeholder="Escríbe un término de búsqueda "
      @input="especies.buscarTermino($event.target.value)"
    />
  </div>
  <hr />

  <div
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-10 gap-4 my-10"
  >
    <div
      v-for="especie in especies.displayedEspecies"
      v-bind:key="especie.cod_especie"
    >
      <div v-if="especie.cod_especie" class="card">
        <div class="md:flex">
          <div class="md:w-1/3 p-3 justify-content-center flex">
            <!-- Contenido de la sección 1 -->
            <img class="rounded-lg" src="@/assets/media/gualanday.jpg" alt="foto de la especie" />
          </div>

          <div class="md:w-1/2">
            <div class="mb-6">
              <h2 class="text-2xl font-bold mb-1 text-center">
                {{ especie.nom_comunes }}
              </h2>
              <p class="mb-3 text-center">{{ especie.nombre_cientifico }}</p>
              <p class="text-justify">
                Familia: <span class="font-bold">{{ especie.familia }}</span>
              </p>
              <p class="text-justify">
                Código de especie:
                <span class="font-bold text-lg">{{ especie.cod_especie }}</span>
              </p>
            </div>
            <div class="space-y-2" >
              <button
                class="w-full btn rounded-lg font-bold p-1 bg-green-800 hover:bg-green-900 text-white hover:shadow-lg"
                @click="consulta.verCandidatosEspecie(especie.nom_comunes)"
              >
                <font-awesome-icon :icon="['fas', 'leaf']" /> Ver candidatos
              </button>
              <button
                @click="
                  consulta.verMonitoreosEspecie(
                    especie.cod_especie,
                    especie.nom_comunes
                  )
                "
                class="w-full btn rounded-lg font-bold p-1 bg-gray-700 hover:bg-gray-800 text-white hover:shadow-lg"
              >
                <font-awesome-icon :icon="['fas', 'eye']" /> Ver Monitoreos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

  <h1
    v-if="especies.noResultados"
    class="text-center font-bold text-2xl mt-5 mb-40"
  >
    No hay resultados de búsqueda
  </h1>
</template>

<style scope>
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0px 10px 4px -3px rgba(0, 0, 0, 0.1);
}

</style>