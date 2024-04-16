<script setup>
import { ref, watch } from "vue";
import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";

const monitoring = useGeneralMonitoring();
const MAXSECTIONS = 5;

//section 0
const formDataBase = ref({
  fecha_monitoreo: "",
  hora: "",
  cod_especie: "",
  nom_comunes: "",
  nombre_cientifico: "",
  numero_placa: "",
});

watch(
  () => formDataBase.value.numero_placa,
  (newPlaca) => {
    const placaExists = monitoring.placas.hasOwnProperty(newPlaca);
    if (placaExists) {
      const placaData = monitoring.placas[newPlaca];
      formDataBase.value.cod_especie = placaData.cod_especie;
      formDataBase.value.nom_comunes = placaData.nom_comunes;
      formDataBase.value.nombre_cientifico = placaData.nombre_cientifico;
    } else {
      formDataBase.value.cod_especie = "";
      formDataBase.value.nom_comunes = "";
      formDataBase.value.nombre_cientifico = "";
    }
  }
);

watch(
  () => monitoring.singleMonitoring,
  (newValue) => {
    formDataBase.value.cod_especie = newValue.cod_especie || "";
    formDataBase.value.fecha_monitoreo = newValue.fecha_monitoreo || "";
    formDataBase.value.hora = newValue.hora || "";
    formDataBase.value.nom_comunes = newValue.nom_comunes || "";
    formDataBase.value.nombre_cientifico = newValue.nombre_cientifico || "";
    formDataBase.value.numero_placa = newValue.numero_placa || "";
  },
  { immediate: true }
);

const enviarDatos = (e) => {
  e.preventDefault();
  if (formDataBase.value.numero_placa === "") {
    monitoring.error = "Debe ingresar un número de placa"
    setTimeout(()=>{
      monitoring.error = ""
    },3000)
    return 
  }
  monitoring.singleMonitoring = {
    ...monitoring.singleMonitoring,
    ...formDataBase.value,
  };
  monitoring.currentSection++;
};
</script>
<template>
  <div>
    <!-- section 0 info base -->
    <form>
      <h3>
        Información del
        <span style="color: var(--primary); font-weight: 900">Individuo</span>
      </h3>
      <div class="formulario__campo">
        <!-- nombre campo -->
        <label class="formulario__label" for="placa">Ingresa placa:</label>
        <input
          class="formulario__input"
          id="placa"
          placeholder="Selecciona una placa"
          v-model="formDataBase.numero_placa"
        />
      </div>
      <!-- nombre campo -->
      <div class="formulario__campo">
        <label class="formulario__label">Código de especie</label>
        <input
          class="formulario__input"
          required
          disabled
          v-model="formDataBase.cod_especie"
        />
      </div>
      <!-- nombre campo -->
      <div class="formulario__campo">
        <label class="formulario__label">Nombre común</label>
        <input
          class="formulario__input"
          required
          disabled
          v-model="formDataBase.nom_comunes"
        />
      </div>
      <!-- nombre campo -->
      <div class="formulario__campo">
        <label class="formulario__label">Nombre Científico</label>
        <input
          class="formulario__input"
          required
          disabled
          v-model="formDataBase.nombre_cientifico"
        />
      </div>
      <!-- formulario paginacion -->
      <div class="formulario__paginacion">
        <div>
          <button
            v-if="monitoring.currentSection > 0"
            type="button"
            class="formulario__paginacion-anterior"
            @click="monitoring.currentSection--"
          >
            Anterior
          </button>
        </div>
        <div>
          <button
            v-if="monitoring.currentSection < MAXSECTIONS"
            type="button"
            class="formulario__paginacion-siguiente"
            @click="enviarDatos"
          >
            Siguiente
          </button>
        </div>
      </div>
      <!-- fin formulario paginacion -->
    </form>
  </div>
</template>



<style  scoped>
</style>
