<script setup>
import { ref, watch } from "vue";
import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";

const monitoring = useGeneralMonitoring();
const MAXSECTIONS = 5;

//section5
const formDataState = ref({
  afectacion: [],
  fitosanitario: "",
  follaje_porcentaje: "",
  observaciones_follaje: "",
  observaciones: "",
  observaciones_afec: "",
});

watch(
  () => monitoring.singleMonitoring,
  (newValue) => {
    formDataState.value.fitosanitario = newValue.fitosanitario || "";
    formDataState.value.afectacion = newValue.afectacion
      ? newValue.afectacion.split(",").map((option) => option.trim())
      : ["No tiene afectaciones"];
    formDataState.value.follaje_porcentaje = newValue.follaje_porcentaje || "";
    formDataState.value.observaciones = newValue.observaciones || "";
    formDataState.value.observaciones_afec = newValue.observaciones_afec || "";
    formDataState.value.observaciones_follaje =
      newValue.observaciones_follaje || "";
  },
  { immediate: true }
);

const actualizarAfectacion = (afectacion) => {
  if(afectacion === "No tiene afectaciones"){ return formDataState.value.afectacion = ["No tiene afectaciones"]}

  formDataState.value.afectacion = formDataState.value.afectacion.filter(value => value !== 'No tiene afectaciones');

  if(formDataState.value.afectacion.includes(afectacion)){
    formDataState.value.afectacion = formDataState.value.afectacion.filter(
      (value) => value !== afectacion
    );
    return;
  } else {
    formDataState.value.afectacion.push(afectacion);
  }
};

const enviarDatos = (e) => {
  e.preventDefault();
  monitoring.currentSection--;

  formDataState.value.afectacion = formDataState.value.afectacion.join(",");
  monitoring.singleMonitoring = {
    ...monitoring.singleMonitoring,
    ...formDataState.value,
  };
};
</script>
<template>
  <div>
    <form>
      <h3>
        Información de
        <span style="color: var(--primary); font-weight: 900">Crecimiento</span>
      </h3>
      <!-- fitosanitario -->
      <div class="formulario__campo-selectores">
        <label class="formulario__label">Fitosanitario</label>
        <div class="selectores selctores-centrado">
          <!-- selector -->
          <div class="selector">
            <input
              name="fitosanitario"
              id="Bueno"
              type="radio"
              class="selector__input"
              value="Bueno"
              v-model="formDataState.fitosanitario"
            />
            <label for="Bueno">Bueno</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              name="fitosanitario"
              id="Regular"
              type="radio"
              class="selector__input"
              value="Regular"
              v-model="formDataState.fitosanitario"
            />
            <label for="Regular">Regular</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              name="fitosanitario"
              id="Malo"
              type="radio"
              class="selector__input"
              value="Malo"
              v-model="formDataState.fitosanitario"
            />
            <label for="Malo">Malo</label>
          </div>
        </div>
      </div>
      <!-- Afectación -->
      <div class="formulario__campo-selectores">
        <label class="formulario__label">Afectación</label>
        <div class="selectores selectores-amplios">
          <!-- selector -->
          <div class="selector">
            <input
              id="noAfectaciones"
              type="checkbox"
              class="selector__input"
              :checked="
                formDataState.afectacion.includes('No tiene afectaciones')
              "
              value="No tiene afectaciones"
              @change="actualizarAfectacion('No tiene afectaciones')"
            />
            <label for="noAfectaciones">No tiene afectaciones</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="mecanicos"
              type="checkbox"
              class="selector__input"
              :checked="formDataState.afectacion.includes('Daños mecánicos')"
              value="Daños mecánicos"
              @change="actualizarAfectacion('Daños mecánicos')"
            />
            <label for="mecanicos">Daños mecánicos</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="insectos"
              type="checkbox"
              class="selector__input"
              :checked="formDataState.afectacion.includes('Insectos')"
              value="Insectos"
              @change="actualizarAfectacion('Insectos')"
            />
            <label for="insectos">Insectos</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="epifitasParasitas"
              type="checkbox"
              class="selector__input"
              :checked="
                formDataState.afectacion.includes(
                  'Presencia de epifitas y parásitas'
                )
              "
              value="Presencia de epifitas y parásitas"
              @change="
                actualizarAfectacion('Presencia de epifitas y parásitas')
              "
            />
            <label for="epifitasParasitas"
              >Presencia de epifitas y parásitas</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="OtrosD"
              type="checkbox"
              class="selector__input"
              :checked="formDataState.afectacion.includes('Otros')"
              value="Otros"
              @change="actualizarAfectacion('Otros')"
            />
            <label for="OtrosD">Otros</label>
          </div>
        </div>
      </div>
      <!-- Observación Afectación -->
      <div class="formulario__campo" v-if="formDataState.afectacion.includes('Otros')">
        <label class="formulario__label">Observación Afectación</label>
        <input
          class="formulario__input"
          required
          v-model="formDataState.observaciones_afec"
        />
      </div>
      <!-- Porcentaje Follaje -->
      <div class="formulario__campo">
        <label class="formulario__label">Porcentaje Follaje</label>
        <div class="selectores selectores-amplios">
          <!-- selector -->
          <div class="selector">
            <input
              id="f0"
              type="radio"
              name="follaje"
              class="selector__input"
              value="No hay. 0%"
              v-model="formDataState.follaje_porcentaje"
            />
            <label for="f0">No hay. 0%</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="f1-25"
              type="radio"
              name="follaje"
              class="selector__input"
              value="Poco. 1-25%"
              v-model="formDataState.follaje_porcentaje"
            />
            <label for="f1-25">Poco. 1-25%</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="f26-25"
              type="radio"
              name="follaje"
              class="selector__input"
              value="Regular. 26-50%"
              v-model="formDataState.follaje_porcentaje"
            />
            <label for="f26-25">Regular. 26-50%</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="fm51"
              type="radio"
              name="follaje"
              class="selector__input"
              value="Abundante. > 51%"
              v-model="formDataState.follaje_porcentaje"
            />
            <label for="fm51">Abundante. > 51%</label>
          </div>
        </div>
      </div>
      <!-- Observación Follaje -->
      <div class="formulario__campo">
        <label class="formulario__label">Observación Follaje</label>
        <input
          class="formulario__input"
          required
          v-model="formDataState.observaciones_follaje"
        />
      </div>
      
      <!-- Observación general -->
      <div class="formulario__campo">
        <label class="formulario__label">Observación general</label>
        <input
          class="formulario__input"
          required
          v-model="formDataState.observaciones"
        />
      </div>
      <!-- formulario paginacion -->
      <div class="formulario__paginacion">
        <div>
          <button
            v-if="monitoring.currentSection > 0"
            type="button"
            class="formulario__paginacion-anterior"
            @click="enviarDatos"
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
.selectores {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  padding: 0.5rem;
  background-color: var(--blanco);
  border-radius: 1rem;
  margin: 0 0.3rem;
}

.selector {
  display: flex;
  gap: 0.3rem;
}
.selector-centrado {
  justify-content: center;
}
.selector__label {
  color: var(--secondary);
  font-weight: 700;
  font-size: 0.8rem;
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
  }
}
@media (min-width: 1660px) {
  .selectores {
    grid-template-columns: repeat(5, 1fr);
  }
}

.selctores-centrado {
  grid-template-columns: 1fr;
}
.selectores-amplios {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .selctores-centrado {
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
  .selectores-amplios {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 992px) {
  .selectores-amplios {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>