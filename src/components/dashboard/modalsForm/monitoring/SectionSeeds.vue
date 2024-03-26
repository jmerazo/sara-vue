<script setup>
import { ref, watch } from "vue";
import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";

const monitoring = useGeneralMonitoring();
const MAXSECTIONS = 5;

//section4
const formDataSeeds = ref({
  cant_semillas: 0,
  //medida_peso_sem: "",
  peso_semillas: 0,
  observacion_semilla: "",
});

watch(
  () => monitoring.singleMonitoring,
  (newValue) => {
    formDataSeeds.value.cant_semillas = newValue.cant_semillas || 0;
    //formDataSeeds.value.medida_peso_sem = newValue.medida_peso_sem || "";
    formDataSeeds.value.observacion_semilla =
      newValue.observacion_semilla || "";
    formDataSeeds.value.peso_semillas = newValue.peso_semillas || 0;
  },
  { immediate: true }
);

const enviarDatos = (e)=>{
  if(formDataSeeds.value.cant_semillas > 0 && formDataSeeds.value.peso_semillas === 0){
    monitoring.error = `Debe indicar el peso de las ${formDataSeeds.value.cant_semillas} semillas`
    setTimeout(()=>{
      monitoring.error = ''
    },3000)
    return
  }
  e.preventDefault();
  monitoring.currentSection++
  monitoring.singleMonitoring = {...monitoring.singleMonitoring, ...formDataSeeds.value}
}
</script>
<template>
  <div>
    <form>
      <h3>
        Información de los
        <span style="color: var(--primary); font-weight: 900">Semillas</span>
      </h3>
      <!-- nombre campo -->
      <div class="formulario__campo">
        <label class="formulario__label">Cantidad Semillas</label>
        <input
          class="formulario__input"
          required
          v-model="formDataSeeds.cant_semillas"
        />
      </div>
      <!-- nombre campo -->
      <!-- <div class="formulario__campo">
        <label class="formulario__label">Medida/Peso Semillas</label>
        <input
          class="formulario__input"
          required
          v-model="formDataSeeds.medida_peso_sem"
        />
      </div> -->
      <!-- nombre campo -->
      <div class="formulario__campo" v-if="formDataSeeds.cant_semillas > 0">
        <label class="formulario__label">Peso Semillas en gramos</label>
        <input
          class="formulario__input"
          required
          v-model="formDataSeeds.peso_semillas"
        />
      </div>
      <!-- nombre campo -->
      <div class="formulario__campo">
        <label class="formulario__label">Observación Semillas</label>
        <input
          class="formulario__input"
          required
          v-model="formDataSeeds.observacion_semilla"
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



<style scoped>
</style>