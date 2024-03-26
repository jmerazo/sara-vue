<script setup>
import { ref, watch } from "vue";
import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";

const monitoring = useGeneralMonitoring();
const MAXSECTIONS = 5;
//section1
const formDataWeather = ref({
  factor_climatico: "",
  humedad: 25,
  precipitacion: "",
  temperatura: "",
  observaciones_temp: "Sin obervaciones",
});

watch(
  () => monitoring.singleMonitoring,
  (newValue) => {
    formDataWeather.value.factor_climatico = newValue.factor_climatico || "";
    formDataWeather.value.humedad = newValue.humedad || "";
    formDataWeather.value.observaciones_temp =
      newValue.observaciones_temp || "";
    formDataWeather.value.precipitacion = newValue.precipitacion || "";
    formDataWeather.value.temperatura = newValue.temperatura || "";
  },
  { immediate: true }
);

const enviarDatos = (e)=>{
  e.preventDefault();
  const {observaciones_temp, ...data} = formDataWeather.value
  if(Object.values(data).some(value => value ==='')){
    monitoring.error = 'Todos los campos son obligatorios'
    setTimeout(()=>{
      monitoring.error = ''
    },3000)

    return
  }
  monitoring.currentSection++
  monitoring.singleMonitoring = {...monitoring.singleMonitoring, ...formDataWeather.value}
}
</script>
<template>
  <div>
    <form>
      <h3>
        Información
        <span style="color: var(--primary); font-weight: 900">Climática</span>
      </h3>
      <!-- precipitacion -->
      <div class="formulario__campo">
        <label class="formulario__label">Precipitación día monitoreo</label>
        <div class="selectores">
          <div class="selector">
            <input
              id="sinlluvia"
              class="selector__input"
              type="radio"
              name="clima"
              :value="'Sin lluvia' || 'No aplica'"
              v-model="formDataWeather.precipitacion"
            />
            <label for="sinlluvia" class="selector__label"> Sin Lluvia</label>
          </div>

          <div class="selector">
            <input
              id="llovizna"
              class="selector__input"
              type="radio"
              name="clima"
              value="Llovizna"
              v-model="formDataWeather.precipitacion"
            />
            <label for="llovizna" class="selector__label"> Llovizna</label>
          </div>

          <div class="selector">
            <input
              id="lluviafuerte"
              class="selector__input"
              type="radio"
              name="clima"
              value="Lluvia Fuerte"
              v-model="formDataWeather.precipitacion"
            />
            <label for="lluviafuerte" class="selector__label"> Lluvia Fuerte</label>
          </div>

          <div class="selector">
            <input
              id="tempestad"
              class="selector__input"
              type="radio"
              name="clima"
              value="Tempestad"
              v-model="formDataWeather.precipitacion"
            />
            <label for="tempestad" class="selector__label"> Tempestad</label>
          </div>
        </div>
      </div>
      <!-- clima previo -->
      <div class="formulario__campo">
        <label class="formulario__label">
          Factor climático días previos al monitoreo</label
        >
        <div class="selectores">
          <!-- selector -->
          <div class="selector">
            <input id="sinlluvias" type="radio" name="factorClimatico" class="selector__input" value="Dias sin lluvia" v-model="formDataWeather.factor_climatico">
            <label for="sinlluvias" class="selector__label">Dias sin lluvia</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input id="Lluviasmoderadas" type="radio" name="factorClimatico" class="selector__input" value="Lluvias moderadas" v-model="formDataWeather.factor_climatico">
            <label for="Lluviasmoderadas" class="selector__label">Lluvias moderadas</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input id="Lluviasconstantes" type="radio" name="factorClimatico" class="selector__input" value="Lluvias constantes" v-model="formDataWeather.factor_climatico">
            <label for="Lluviasconstantes" class="selector__label">Lluvias constantes</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input id="otras" type="radio" name="factorClimatico" class="selector__input" value="Otras" v-model="formDataWeather.factor_climatico">
            <label for="otras" class="selector__label">Otras</label>
          </div>
        </div>
        
      </div>
      <!-- Humedad -->
      <div class="formulario__campo">
        <label class="formulario__label">Humedad (%)</label>
        <input
          type="number"
          class="formulario__input formulario__input-number"
          required
          v-model="formDataWeather.humedad"
        />
      </div>

      <!-- Temperatura -->
      <div class="formulario__campo">
        <label class="formulario__label">Temperatura (°C)</label>
        <input
          class="formulario__input formulario__input-number"
          required
          type="number"
          v-model="formDataWeather.temperatura"
        />
      </div>
      <!-- observaciones -->
      <div class="formulario__campo">
        <label class="formulario__label">Observaciones Temperatura</label>
        <input
          class="formulario__input"
          required
          v-model="formDataWeather.observaciones_temp"
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
            type=""
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
.selectores {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.4rem;
  padding: 0.5rem;
  background-color: var(--blanco);
  border-radius: 1rem;
}
.selector {
  display: flex;
  gap: 0.3rem;
}
.selector__label {
  color: var(--secondary);
  font-weight: 700;
  font-size: .8rem;
  cursor: pointer;
}
.selector__input {
  cursor: pointer;
}
.selector__input:checked {
  background-color: var(--primary);
  border-color: var(--primary-secondary);
}
@media (min-width: 768px) {
  .selectores {
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-items: center;
  }
}
.formulario__input-number{
  width: 97%;
  margin: auto;
  padding: .3rem;
}
</style>