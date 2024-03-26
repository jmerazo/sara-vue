<script setup>
import { ref, watch } from "vue";
import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";
import AlertaVue from "../../../Alerta.vue";
const monitoring = useGeneralMonitoring();
const MAXSECTIONS = 5;

//section2
const formDataFlowers = ref({
  color_flor: "",
  color_flor_otro: "",
  fauna_flor: "",
  fauna_flor_otros: "",
  flor_abierta: "",
  //flor_boton: "",
  observaciones_flor: "",
  olor_flor: "",
  olor_flor_otro: "",
});

watch(
  () => formDataFlowers.value.flor_abierta,
  () => {
    if (formDataFlowers.value.flor_abierta === "0%") {
      formDataFlowers.value.color_flor = "";
      formDataFlowers.value.color_flor_otro = "";
      formDataFlowers.value.fauna_flor = "";
      formDataFlowers.value.fauna_flor_otros = "";
      //formDataFlowers.value.flor_boton = "";
      formDataFlowers.value.olor_flor = "";
      formDataFlowers.value.olor_flor_otro = "";
    }
  }
);

watch(
  () => monitoring.singleMonitoring,
  (newValue) => {
    formDataFlowers.value.color_flor = newValue.color_flor || "";
    formDataFlowers.value.color_flor_otro = newValue.color_flor_otro || "";
    formDataFlowers.value.fauna_flor = newValue.fauna_flor || "";
    formDataFlowers.value.fauna_flor_otros = newValue.fauna_flor_otros || "";
    formDataFlowers.value.flor_abierta = newValue.flor_abierta || "";
    //formDataFlowers.value.flor_boton = newValue.flor_boton || "";
    formDataFlowers.value.observaciones_flor =
      newValue.observaciones_flor || "";
    formDataFlowers.value.olor_flor = newValue.olor_flor || "";
    formDataFlowers.value.olor_flor_otro = newValue.olor_flor_otro || "";
  },
  { immediate: true }
);

const enviarDatos = (e) => {
  e.preventDefault();
  if(formDataFlowers.value.flor_abierta === ''){
    monitoring.error = 'Elegir el porcentaje de flor abierta'
    setTimeout(()=>{
      monitoring.error = ''
    },3000)

    return
  }
  monitoring.currentSection++;
  monitoring.singleMonitoring = {
    ...monitoring.singleMonitoring,
    ...formDataFlowers.value,
  };
};
</script>
<template>
  <div>
    <form>
      <h3>
        Información de las
        <span style="color: var(--primary); font-weight: 900">Flores</span>
      </h3>
      <!-- nombre campo -->
      <!-- porcentaje de la copa con flor -->
      <div class="formulario__campo">
        <label class="formulario__label">Flor Abierta</label>

        <div class="selectores">
          <!-- 0% -->
          <div class="selector">
            <input
              type="radio"
              id="p0"
              name="florabierta"
              class="selector__input"
              required
              value="0%"
              v-model="formDataFlowers.flor_abierta"
            />
            <label class="selector__label" for="p0">0 %</label>
          </div>
          <!-- 1 - 25% -->
          <div class="selector">
            <input
              type="radio"
              id="p1-25"
              name="florabierta"
              class="selector__input"
              required
              value="1 - 25%"
              v-model="formDataFlowers.flor_abierta"
            />
            <label class="selector__label" for="p1-25">1 - 25%</label>
          </div>
          <!-- 26 - 50% -->
          <div class="selector">
            <input
              type="radio"
              id="p26-50"
              name="florabierta"
              class="selector__input"
              required
              value="26 - 50%"
              v-model="formDataFlowers.flor_abierta"
            />
            <label class="selector__label" for="p26-50">26 - 50%</label>
          </div>
          <!-- 51 - 75% -->
          <div class="selector">
            <input
              type="radio"
              id="p51-75"
              name="florabierta"
              class="selector__input"
              required
              value="51 - 75%"
              v-model="formDataFlowers.flor_abierta"
            />
            <label class="selector__label" for="p51-75">51 - 75%</label>
          </div>
          <!-- 76 - 100% -->
          <div class="selector">
            <input
              type="radio"
              id="p76-100"
              name="florabierta"
              class="selector__input"
              required
              value="76 - 100%"
              v-model="formDataFlowers.flor_abierta"
            />
            <label class="selector__label" for="p76-100">76 - 100%</label>
          </div>
        </div>
      </div>
      <!-- color flor-->
      <div
        v-if="
          formDataFlowers.flor_abierta !== '0%' &&
          formDataFlowers.flor_abierta !== ''
        "
        class="formulario__campo"
      >
        <!-- nombre campo -->
        <label class="formulario__label">Color Flor</label>

        <div class="selectores selectores-amplio">
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="noAplicaC"
              name="colorflor"
              class="selector__input"
              :checked="
                formDataFlowers.color_flor === '' ||
                formDataFlowers.color_flor === 'No aplica'
              "
              required
              value="No aplica"
              v-model="formDataFlowers.color_flor"
            />
            <label class="selector__label" for="noAplicaC">No aplica</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              id="amarillas"
              name="colorflor"
              class="selector__input"
              required
              value="Amarillas"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Azules"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Rojo"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Naranja"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Blanco"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Rosado"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Crema"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Verde"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Morado"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Cafe"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="No determinado"
              v-model="formDataFlowers.color_flor"
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
              name="colorflor"
              class="selector__input"
              required
              value="Otro"
              v-model="formDataFlowers.color_flor"
            />
            <label class="selector__label" for="colorotro">Otro, ¿Cuál?</label>
          </div>
        </div>
      </div>
      <!-- color flor otro -->
      <div
        v-if="formDataFlowers.color_flor === 'Otro'"
        class="formulario__campo"
      >
        <label class="formulario__label">Color Flor Otro</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFlowers.color_flor_otro"
        />
      </div>
      <!-- olor de la flor -->
      <div
        v-if="
          formDataFlowers.flor_abierta !== '0%' &&
          formDataFlowers.flor_abierta !== ''
        "
        class="formulario__campo"
      >
        <label class="formulario__label">Olor Flor</label>
        <div class="selectores selectores-olor">
          <!-- selector -->
          <div class="selector">
            <input
              id="noAplicaO"
              name="olorFlor"
              type="radio"
              class="selector__input"
              :checked="
                formDataFlowers.olor_flor === '' ||
                formDataFlowers.olor_flor === 'No aplica'
              "
              value="No aplica"
              v-model="formDataFlowers.olor_flor"
            />
            <label for="noAplicaO" class="selector__label">No aplica</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="dulce"
              name="olorFlor"
              type="radio"
              class="selector__input"
              value="Dulce (carmelo, vainilla, chocolate)"
              v-model="formDataFlowers.olor_flor"
            />
            <label for="dulce" class="selector__label"
              >Dulce (carmelo, vainilla, chocolate)</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="citrico"
              name="olorFlor"
              type="radio"
              class="selector__input"
              value="Cítrico (limón, naranaja)"
              v-model="formDataFlowers.olor_flor"
            />
            <label for="citrico" class="selector__label"
              >Cítrico (limón, naranaja)</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="mentolado"
              name="olorFlor"
              type="radio"
              class="selector__input"
              value="Mentolado (eucalipto, pino)"
              v-model="formDataFlowers.olor_flor"
            />
            <label for="mentolado" class="selector__label"
              >Mentolado (eucalipto, pino)</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="Etereo"
              name="olorFlor"
              type="radio"
              class="selector__input"
              value="Etéreo (sustancia química, alchol)"
              v-model="formDataFlowers.olor_flor"
            />
            <label for="Etereo" class="selector__label"
              >Etéreo (sustancia química, alchol)</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="putrefacto"
              name="olorFlor"
              type="radio"
              class="selector__input"
              value="Putrefacto (sulfuro de carbono y carne en descomposición)"
              v-model="formDataFlowers.olor_flor"
            />
            <label for="putrefacto" class="selector__label"
              >Putrefacto (sulfuro de carbono y carne en descomposición)</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="Indeterminado"
              name="olorFlor"
              type="radio"
              class="selector__input"
              value="Indeterminado"
              v-model="formDataFlowers.olor_flor"
            />
            <label for="Indeterminado" class="selector__label"
              >Indeterminado</label
            >
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              id="Otro"
              name="olorFlor"
              type="radio"
              class="selector__input"
              value="Otro"
              v-model="formDataFlowers.olor_flor"
            />
            <label for="Otro" class="selector__label">Otro, ¿Cuál?</label>
          </div>
        </div>
      </div>
      <!-- olor flor otro -->
      <div
        v-if="formDataFlowers.olor_flor === 'Otro'"
        class="formulario__campo"
      >
        <label class="formulario__label">Olor Flor Otro</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFlowers.olor_flor_otro"
        />
      </div>
      <!-- Fauna flor -->
      <div
        v-if="
          formDataFlowers.flor_abierta !== '0%' &&
          formDataFlowers.flor_abierta !== ''
        "
        class="formulario__campo"
      >
        <label class="formulario__label">Fauna Flor</label>
        <div class="selectores">
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFlor"
              id="noAplicaF"
              class="selector__input"
              :checked="
                formDataFlowers.fauna_flor === '' ||
                formDataFlowers.fauna_flor === 'No aplica'
              "
              value="No aplica"
              v-model="formDataFlowers.fauna_flor"
            />
            <label for="noAplicaF" class="selector__label">No Aplica</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFlor"
              id="Insectos"
              class="selector__input"
              value="Insectos"
              v-model="formDataFlowers.fauna_flor"
            />
            <label for="Insectos" class="selector__label">Insectos</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFlor"
              id="Roedores"
              class="selector__input"
              value="Roedores"
              v-model="formDataFlowers.fauna_flor"
            />
            <label for="Roedores" class="selector__label">Roedores</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFlor"
              id="Mamiferos"
              class="selector__input"
              value="Mamiferos"
              v-model="formDataFlowers.fauna_flor"
            />
            <label for="Mamiferos" class="selector__label">Mamíferos</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFlor"
              id="Aves"
              class="selector__input"
              value="Aves"
              v-model="formDataFlowers.fauna_flor"
            />
            <label for="Aves" class="selector__label">Aves</label>
          </div>
          <!-- selector -->
          <div class="selector">
            <input
              type="radio"
              name="faunaFlor"
              id="otroF"
              class="selector__input"
              value="Otro"
              v-model="formDataFlowers.fauna_flor"
            />
            <label for="otroF" class="selector__label">Otro, ¿Cuál?</label>
          </div>
        </div>
      </div>
      <!-- Fauna flor otro -->
      <div
        v-if="formDataFlowers.fauna_flor === 'Otro'"
        class="formulario__campo"
      >
        <label class="formulario__label">Fauna Flor Otros</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFlowers.fauna_flor_otros"
        />
      </div>
      <!-- Flor boton -->
      <!-- <div
        v-if="
          formDataFlowers.flor_abierta !== '0%' &&
          formDataFlowers.flor_abierta !== ''
        "
        class="formulario__campo"
      >
        <label class="formulario__label">Flor Boton</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFlowers.flor_boton"
        />
      </div> -->
      <!-- flor observaciones -->
      <div class="formulario__campo">
        <label class="formulario__label">Flor observaciones</label>
        <input
          class="formulario__input"
          required
          v-model="formDataFlowers.observaciones_flor"
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
@media (min-width: 1660px) {
  .selectores {
    grid-template-columns: repeat(5, 1fr);
  }
  .selectores-olor {
    grid-template-columns: repeat(1, 1fr);
  }
}

.selectores-amplio{
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .selectores-amplio{
  grid-template-columns: repeat(4, 1fr);
}
}
</style>