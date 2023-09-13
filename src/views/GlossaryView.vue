<script setup>
import { computed } from "vue";
import { useGlossaryStore } from "../stores/glossary";
const glossary = useGlossaryStore();
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
/* const searchTerm = computed(() => glossary.searchTerm); */

const filteredGlossary = computed(() => glossary.getFilteredGlossary());

const searchTerm = computed({
  get: () => glossary.searchTerm,
  set: (value) => glossary.setSearchTerm(value),
});
</script>

<template>
  <div class="w-auto mx-auto">
    <h1 class="text-6xl mb-10 mt-20 text-center font-extrabold">Glosario</h1>
    <div class="flex justify-center my-5">
      <div class="mx-2">
        <button
          class="bg-customGreen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="() => glossary.setSelectedLetter(null)"
        >
          Todas
        </button>
      </div>
      <div class="mx-2" v-for="letter in alphabet" :key="letter">
        <button
          class="bg-customGreen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="() => glossary.setSelectedLetter(letter)"
        >
          {{ letter }}
        </button>
      </div>
      <div class="mx-2">
        <input
          type="text"
          class="border-2 border-gray-300 py-2 px-4 rounded-lg w-64"
          placeholder="Buscar..."
          :value="searchTerm"
          @input="($event) => (searchTerm = $event.target.value)"
        />
      </div>
    </div>
    <hr />
    <div
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-10 gap-10 my-10"
    >
      <div
        class="bg-customGreen rounded-lg p-4 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-20"
        v-for="g in glossary.displayedGlossary"
        :key="g.id"
      >
        <strong class="font-bold">{{ g.word }}:</strong>{{ g.definition }}
      </div>
    </div>
     <!-- paginador -->
     <div class="flex justify-center mt-5 mb-10">
      <button
        v-for="page in glossary.totalPages"
        :key="page"
        @click="glossary.changePage(page)"
        class="px-3 py-2 mx-1 rounded-lg bg-green-200 text-black hover:bg-green-600"
        :class="{ 'bg-green-600': page === glossary.currentPage }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>