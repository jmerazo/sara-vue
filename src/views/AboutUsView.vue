<script setup>
import { onMounted, ref, computed } from "vue";
import { usePageContent } from '../stores/page'

const pageStore = usePageContent();
const dataIsLoaded = ref(false);

// Filtrar los datos basados en la propiedad "router"
const filteredData = computed(() => {
    return pageStore.pageContentData.filter(item => item.router === 'aboutus');
});

onMounted(async () => {
    await pageStore.fetchData();
    dataIsLoaded.value = true;
});
</script>

<template>
    <div>
        <h1 class="font-bold mx-auto text-xl mb-10 text-center">ACERCA DE NOSOTROS</h1>
        <ul v-if="dataIsLoaded">
            <li v-for="(item, key) in filteredData" :key="key">
                <h2 class="font-bold text-lg">{{ item.title }}</h2>
                <p>{{ item.content }}</p>
                <br>
            </li>
        </ul>
        <div v-else>
            <p>Cargando datos...</p>
        </div>
    </div>
</template>
  
<style scoped>
</style>