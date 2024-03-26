<script setup>
import { computed, ref, watch } from "vue";
import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";

const monitoring = useGeneralMonitoring();
const MAXSECTIONS = 5;
const frutosRamas = ref(0);
const ramas = ref(0);
const fraccionevaluada = ref(0);
//section3
const formDataFruits = ref({
  color_fruto: "",
  color_fruto_otro: "",
  //creado para vaidacion
  cantFrutosVerdes: "",
  cantfrutosMaduros: "",
  cantfrutosPintones: "",

  estado_madurez: 0,
  fauna_frutos: "",
  fauna_frutos_otro: "",
  frutos_verdes: "",
  medida_peso_frutos: "",
  peso_frutos: "",
  observacion_frutos: "",
});

// resetear valores elegidos si se vuelve a establecer 0%
watch(()=> formDataFruits.value.frutos_verdes,()=>{
  if(formDataFruits.value.frutos_verdes === "0%"){
    formDataFruits.value.color_fruto = "No aplica";
    formDataFruits.value.color_fruto_otro = "";
    formDataFruits.value.estado_madurez = 0;
    formDataFruits.value.fauna_frutos = "No aplica";
    formDataFruits.value.fauna_frutos_otro = "";
    formDataFruits.value.medida_peso_frutos = "";
    formDataFruits.value.peso_frutos = "0";
    fraccionevaluada.value = 0
  }
})

//cargar data si es editar
watch(
  () => monitoring.singleMonitoring,
  (newValue) => {
    formDataFruits.value.color_fruto = newValue.color_fruto || "";
    formDataFruits.value.color_fruto_otro = newValue.color_fruto_otro || "";
    formDataFruits.value.estado_madurez = newValue.estado_madurez || 0;
    formDataFruits.value.fauna_frutos = newValue.fauna_frutos || "";
    formDataFruits.value.fauna_frutos_otro = newValue.fauna_frutos_otro || "";
    formDataFruits.value.frutos_verdes = newValue.frutos_verdes || "";
    formDataFruits.value.medida_peso_frutos = newValue.medida_peso_frutos || "";
    formDataFruits.value.observacion_frutos = newValue.observacion_frutos || "";
    formDataFruits.value.peso_frutos = newValue.peso_frutos || "";

    //creado para la validacion
  },
  { immediate: true }
);

const enviarDatos = (e) => {
  if(formDataFruits.value.frutos_verdes === ''){
    monitoring.error = 'Debe elegir el pocentaje de frutos'
    setTimeout(()=>{
      monitoring.error = ''
    },3000)
    return
  }
  if(formDataFruits.value.estado_madurez > 0 && formDataFruits.value.estado_madurez < 100 ){
    monitoring.error = 'El estado de madurez debe estar en 0% o 100% '
    setTimeout(()=>{
      monitoring.error = ''
    },3000)
    return
  }
  e.preventDefault();
  monitoring.currentSection++;
  
  monitoring.singleMonitoring = {
    ...monitoring.singleMonitoring,
    ...formDataFruits.value,
  };
};

const sumarFrutos = computed(() => {
  return (formDataFruits.value.estado_madurez =
    Number(formDataFruits.value.cantFrutosVerdes) +
    Number(formDataFruits.value.cantfrutosMaduros) +
    Number(formDataFruits.value.cantfrutosPintones));
});

const valorFraccion = computed(() => {
  return (
    Number(frutosRamas.value) *
    Number(ramas.value) *
    Number(fraccionevaluada.value)
  );
});
</script>
<template>
  <div>
    <form>
      <h3>
        Información de los
        <span style="color: var(--primary); font-weight: 900">Frutos</span>
      </h3>
      <!-- Frutos verdes -->
      <div class="formulario__campo">
        <label class="formulario__label">Frutos verdes </label>

        <div class="selectores">
          <!-- 0% -->
          <div class="selector">
            <input
              type="radio"
              id="p0"
              name="frutosVerdes"
              class="selector__input"
              required
              value="0%"
              v-model="formDataFruits.frutos_verdes"
            />
            <label class="selector__label" for="p0">0 %</label>
          </div>
          <!-- 1 - 25% -->
          <div class="selector">
            <input
              type="radio"
              id="p1-25"
              name="frutosVerdes"
              class="selector__input"
              required
              value="1 - 25%"
              v-model="formDataFruits.frutos_verdes"
            />
            <label class="selector__label" for="p1-25">1 - 25%</label>
          </div>
          <!-- 26 - 50% -->
          <div class="selector">
            <input
              type="radio"
              id="p26-50"
              name="frutosVerdes"
              class="selector__input"
              required
              value="26 - 50%"
              v-model="formDataFruits.frutos_verdes"
            />
            <label class="selector__label" for="p26-50">26 - 50%</label>
          </div>
          <!-- 51 - 75% -->
          <div class="selector">
            <input
              type="radio"
              id="p51-75"
              name="frutosVerdes"
              class="selector__input"
              required
              value="51 - 75%"
              v-model="formDataFruits.frutos_verdes"
            />
            <label class="selector__label" for="p51-75">51 - 75%</label>
          </div>
          <!-- 76 - 100% -->
          <div class="selector">
            <input
              type="radio"
              id="p76-100"
              name="frutosVerdes"
              class="selector__input"
              required
              value="76 - 100%"
              v-model="formDataFruits.frutos_verdes"
            />
            <label class="selector__label" for="p76-100">76 - 100%</label>
          </div>
        </div>
      </div>
      <!-- color fruto-->
      <div
        v-if="
          formDataFruits.frutos_verdes !== '0%' &&
          formDataFruits.frutos_verdes !== ''
        "
        class="formulario__campo"
      >
        <!-- nombre campo -->
        <label class="formulario__label">Color Fruto (Maduro)</label>

        <div class="selectores">
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="noAplicaC"
              name="frutoColor"
              class="selector__input"
              :checked="
                formDataFruits.color_fruto === '' ||
                formDataFruits.color_fruto === 'No aplica'
              "
              required
              value="No aplica"
              v-model="formDataFruits.color_fruto"
            />
            <label class="selector__label" for="noAplicaC">No aplica</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="amarillas"
              name="frutoColor"
              class="selector__input"
              required
              value="Amarillas"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="amarillas"
              style="color: yellow"
              >Amarillas</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="azules"
              name="frutoColor"
              class="selector__input"
              required
              value="Azules"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="azules"
              style="color: #00b1ff"
              >Azules</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="rojo"
              name="frutoColor"
              class="selector__input"
              required
              value="Rojo"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="rojo"
              style="color: #ff5252"
              >Rojo</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="naranja"
              name="frutoColor"
              class="selector__input"
              required
              value="Naranja"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="naranja"
              style="color: #ff7922"
              >Naranja</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="blanco"
              name="frutoColor"
              class="selector__input"
              required
              value="Blanco"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="blanco"
              style="color: #fafafa"
              >Blanco</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="Rosado"
              name="frutoColor"
              class="selector__input"
              required
              value="Rosado"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="Rosado"
              style="color: #ff82c2"
              >Rosado</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="Crema"
              name="frutoColor"
              class="selector__input"
              required
              value="Crema"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="Crema"
              style="color: #fcd8cf"
              >Crema</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="Verde"
              name="frutoColor"
              class="selector__input"
              required
              value="Verde"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="Verde"
              style="color: #12de5c"
              >Verde</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="Morado"
              name="frutoColor"
              class="selector__input"
              required
              value="Morado"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="Morado"
              style="color: #c46efe"
              >Morado</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="Cafe"
              name="frutoColor"
              class="selector__input"
              required
              value="Cafe"
              v-model="formDataFruits.color_fruto"
            />
            <label
              class="selector__label selector__label-color"
              for="Cafe"
              style="color: #b79982"
              >Café</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="noDeterminado"
              name="frutoColor"
              class="selector__input"
              required
              value="No determinado"
              v-model="formDataFruits.color_fruto"
            />
            <label class="selector__label" for="noDeterminado"
              >No Determinado</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="colorotro"
              name="frutoColor"
              class="selector__input"
              required
              value="Otro"
              v-model="formDataFruits.color_fruto"
            />
            <label class="selector__label" for="colorotro">Otro, ¿Cuál?</label>
          </div>
        </div>
      </div>
      <!-- color fruto otro -->
      <div
        v-if="formDataFruits.color_fruto === 'Otro'"
        class="formulario__campo"
      >
        <label class="formulario__label">Color Fruto Otro</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFruits.color_fruto_otro"
        />
      </div>
      <!-- porcentaje frutos -->
      <fieldset
        v-if="
          formDataFruits.frutos_verdes !== '0%' &&
          formDataFruits.frutos_verdes !== ''
        "
        class="fomulario__campo-calculos"
      >
        <legend>Porcnetaje de frutos (1% - 100%)</legend>
        <div class="formulario__campo-valor">
          <label class="formulario__label">% - Verdes</label>
          <input
            type="number"
            class="formulario__input"
            required
            v-model="formDataFruits.cantFrutosVerdes"
          />
        </div>
        <!-- cantidad frutos maduros -->
        <div class="formulario__campo-valor">
          <label class="formulario__label">% - Maduros</label>
          <input
            type="number"
            class="formulario__input"
            required
            v-model="formDataFruits.cantfrutosMaduros"
          />
        </div>
        <!-- cantidad frutos maduros -->
        <div class="formulario__campo-valor">
          <label class="formulario__label">% - Pintones</label>
          <input
            type="number"
            class="formulario__input"
            required
            v-model="formDataFruits.cantfrutosPintones"
          />
        </div>
        <!-- Estado madurez -->
        <div class="formulario__campo-valor">
          <label class="formulario__label">Estado Madurez </label>
          <input
            class="formulario__input"
            disabled
            required
            v-model="formDataFruits.estado_madurez"
          />
        </div>
      </fieldset>
      <label
        v-if="sumarFrutos !== 100 && formDataFruits.estado_madurez"
        class="formulario__notificacion"
        >La suma de los frutos debe dar 100%</label
      >
      <!-- cantidad frutos -->
      <fieldset
        v-if="
          formDataFruits.frutos_verdes !== '0%' &&
          formDataFruits.frutos_verdes !== ''
        "
        class="fomulario__campo"
      >
        <legend>Fracción de la copa evaluada</legend>
        <div class="formulario__campo-valor">
          <label class="formulario__label"
            >Cant. Frutos por rama o inidad de muestreo</label
          >
          <input
            type="number"
            class="formulario__input"
            required
            v-model="frutosRamas"
          />
        </div>
        <!-- cantidad frutos maduros -->
        <div class="formulario__campo-valor">
          <label class="formulario__label"
            >Cant. Ramas o unidad muestreo por copa</label
          >
          <input
            type="number"
            class="formulario__input"
            required
            v-model="ramas"
          />
        </div>
        <!-- cantidad frutos maduros -->
        <div class="formulario__campo">
          <label class="formulario__label">Fracción copa Evaluada</label>
          <div class="selectores">
            <!-- selector -->
            <div class="selector">
              <input
                name="evalfrutos"
                id="cant1"
                type="radio"
                class="selector__input"
                value="1"
                v-model="fraccionevaluada"
              />
              <label class="selector__label" for="cant1">1/1</label>
            </div>
            <!-- selector -->
            <div class="selector">
              <input
                name="evalfrutos"
                id="cant2"
                type="radio"
                class="selector__input"
                value="2"
                v-model="fraccionevaluada"
              />
              <label class="selector__label" for="cant2">1/2</label>
            </div>
            <!-- selector -->
            <div class="selector">
              <input
                name="evalfrutos"
                id="cant3"
                type="radio"
                class="selector__input"
                value="4"
                v-model="fraccionevaluada"
              />
              <label class="selector__label" for="cant3">1/4</label>
            </div>
            <!-- selector -->
            <div class="selector">
              <input
                name="evalfrutos"
                id="cant4"
                type="radio"
                class="selector__input"
                value="8"
                v-model="fraccionevaluada"
              />
              <label class="selector__label" for="cant4">1/8</label>
            </div>
            <!-- selector -->
            <div class="selector">
              <input
                name="evalfrutos"
                id="cant5"
                type="radio"
                class="selector__input"
                value="16"
                v-model="fraccionevaluada"
              />
              <label class="selector__label" for="cant5">1/16</label>
            </div>
            <!-- selector -->
            <div class="selector">
              <input
                name="evalfrutos"
                id="cant0"
                type="radio"
                class="selector__input"
                value="0"
                v-model="fraccionevaluada"
              />
              <label class="selector__label" for="cant0">No aplica</label>
            </div>
          </div>
        </div>
        <!-- Estado madurez -->
        <div class="formulario__campo-valor">
          <label class="formulario__label">Total frutos por árbol</label>
          <input
            class="formulario__input"
            disabled
            required
            :value="valorFraccion"
          />
        </div>
      </fieldset>
      <label
        v-if="sumarFrutos !== 100 && formDataFruits.estado_madurez"
        class="formulario__notificacion"
        >La suma de los frutos debe dar 100%</label
      >
      <!-- Fauna Frutos -->
      <div
        v-if="
          formDataFruits.frutos_verdes !== '0%' &&
          formDataFruits.frutos_verdes !== ''
        "
        class="formulario__campo"
      >
        <label class="formulario__label">Fauna Frutos</label>
        <div class="selectores selectores-amplio">
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFrutos"
              id="noAplicaF"
              class="selector__input"
              :checked="
                formDataFruits.fauna_frutos === '' ||
                formDataFruits.fauna_frutos === 'No aplica'
              "
              value="No aplica"
              v-model="formDataFruits.fauna_frutos"
            />
            <label for="noAplicaF" class="selector__label">No Aplica</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFrutos"
              id="Insectos"
              class="selector__input"
              value="Insectos"
              v-model="formDataFruits.fauna_frutos"
            />
            <label for="Insectos" class="selector__label">Insectos</label>
          </div>

          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFrutos"
              id="Mamiferos"
              class="selector__input"
              value="Mamiferos"
              v-model="formDataFruits.fauna_frutos"
            />
            <label for="Mamiferos" class="selector__label">Mamíferos</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFrutos"
              id="Aves"
              class="selector__input"
              value="Aves"
              v-model="formDataFruits.fauna_frutos"
            />
            <label for="Aves" class="selector__label">Aves</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFrutos"
              id="anfibiosReptiles"
              class="selector__input"
              value="Anfibios y reptiles"
              v-model="formDataFruits.fauna_frutos"
            />
            <label for="Aves" class="selector__label"
              >Anfibios y reptiles</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFrutos"
              id="otroF"
              class="selector__input"
              value="Otro"
              v-model="formDataFruits.fauna_frutos"
            />
            <label for="otroF" class="selector__label">Otro, ¿Cuál?</label>
          </div>
        </div>
      </div>
      <!-- fauna frutos otro -->
      <div
        v-if="formDataFruits.fauna_frutos === 'Otro'"
        class="formulario__campo"
      >
        <label class="formulario__label">Fauna Frutos otros</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFruits.fauna_frutos_otro"
        />
      </div>

      <!-- medida de peso -->
      <!-- <div class="formulario__campo">
        <label class="formulario__label">Medida/Peso Frutos</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFruits.medida_peso_frutos"
        />
      </div> -->
      <!-- peso fruto -->
      <div
        v-if="
          formDataFruits.frutos_verdes !== '0%' &&
          formDataFruits.frutos_verdes !== ''
        "
        class="formulario__campo"
      >
        <label class="formulario__label">Peso Frutos en gramos</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFruits.peso_frutos"
        />
      </div>
      <!-- nombre campo -->
      <div class="formulario__campo">
        <label class="formulario__label">Observaciones Frutos</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFruits.observacion_frutos"
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
.selectores {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  padding: 0.5rem;
  background-color: var(--blanco);
  border-radius: 1rem;
}
.selectores-olor {
  grid-template-columns: repeat(1, 1fr);
}
.selector {
  display: flex;
  gap: 0.3rem;
}
.selector__label {
  color: var(--secondary);
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}
.selector__label-color {
  background-color: var(--secondary-hover);
  padding: 0 0.4rem;
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
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
  .selectores-olor {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 920px) {
  .selectores {
    grid-template-columns: repeat(3, 1fr);
  }
  .selectores-olor {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 1660px) {
  .selectores {
    grid-template-columns: repeat(4, 1fr);
  }
  .selectores-olor {
    grid-template-columns: repeat(1, 1fr);
  }
}
/* estilos propios del componente */

.formulario__notificacion {
  color: red;
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
  display: block;
}
.fomulario__campo-calculos {
  display: grid;
}
@media (min-width: 768px) {
  .fomulario__campo-calculos {
    grid-template-columns: repeat(4, 1fr);
  }
}

legend {
  background-color: var(--primary);
  font-size: 0.8rem;
  width: 100%;
  text-align: center;
  color: var(--blanco);
  font-weight: 500;
  border-radius: 0.5rem;
}
fieldset {
  margin: 1rem 0 0 0;
  border: 1px solid var(--gris);
  border-radius: 0.5rem;
}
.selectores-amplio{
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .selectores-amplio{
  grid-template-columns: repeat(3, 1fr);
}
}
</style>