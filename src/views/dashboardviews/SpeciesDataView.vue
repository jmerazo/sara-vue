<script setup>
import { useEspeciesData } from "@/stores/dashboard/speciesData";

const especies = useEspeciesData();

</script>

<template>
  <div>
    <h1 class="text-4xl mb-10 mt-20 text-center font-extrabold">
      Reporte datos generales de especies
    </h1>

    <div class="flex justify-end mt-5 mb-5">
      <label class="p-3 text-lg font-bold rounded-lg mx-3">Buscar </label>
      <input
        class="p-3 rounded-lg lg:w-1/4 sm:w-full border-2 border-gray-500 py-2 px-4"
        type="text"
        placeholder="Escríbe un término de búsqueda"
        @input="especies.buscarTermino($event.target.value)"
      />
    </div>
    <hr />
    <div
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-10 gap-3 my-2"
    >
      <!-- aqui el for para recorer la data del store -->

      <div v-for="especie in especies.displayedEspeciesData" :key="especie.cod_especie">
        <div class="p-4">
          <div class="bg-white rounded-lg shadow-lg">
            <div class="p-4">
              <h5 class="text-lg font-extrabold text-center">{{ especie.nom_comunes }}</h5>
              <h6 class="text-sm text-gray-500 text-center">
                {{ especie.nombre_cientifico }}
              </h6>
            </div>
            <hr />
            <div class="px-4 py-2">
              <div class="flex justify-between">
                <p class="text-sm font-semibold">
                  <font-awesome-icon :icon="['fas', 'hashtag']" /> Código
                  especie:
                </p>
                <p class="text-sm font-extrabold">{{especie.cod_especie}}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-sm font-semibold">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass-location']" /> Monitoreos:
                </p>
                <p class="text-sm font-extrabold">{{especie.monitoreos}}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-sm font-semibold">
                  <font-awesome-icon :icon="['fas', 'vial']" /> Muestras:
                </p>
                <p class="text-sm font-extrabold">{{ especie.muestras }}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-sm font-semibold">
                  <font-awesome-icon :icon="['fas', 'dna']" /> Evaluados:
                </p>
                <p class="text-sm font-extrabold">{{especie.evaluados}}</p>
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
    v-if="especies.especiesData.length == 0"
      class="text-center font-bold text-2xl mt-5 mb-40"
    >
      No hay resultados de búsqueda
    </h1>
  </div>
</template>

<style scoped>
</style>