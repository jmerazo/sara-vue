<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useNurseriesStore } from "../stores/nurseries";
import { computed, ref, onMounted } from "vue";
import { descargarExcel, descargarPdf, obtenerFecha, descargarPdfs } from "@/helpers";

const nurseries = useNurseriesStore();
const valueSerached = ref("");
const isSearching = computed(() => valueSerached.value !== "");
//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  especies.quitarFiltroEspecie();
  next();
});


</script>

<template>
    
</template>