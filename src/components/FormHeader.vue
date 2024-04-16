<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useFamiliasStore } from "../stores/families";
import { useEspeciesStore } from "../stores/species";
import { useConsultaStore } from "../stores/consulta";

//componentes
import Alerta from "./Alerta.vue";
import LoadingData from "./LoadingData.vue";

const route = useRoute();
const paginaInicio = computed(() => route.name === "home");

const familias = useFamiliasStore();
const especies = useEspeciesStore();
const consulta = useConsultaStore();

const error = ref("");

const validarcampos = () => {
  if (consulta.consulta.categoria && consulta.consulta.vrBuscar) {
    consulta.mostrarConsulta();
    return;
  } else {
    error.value = "Todos los campos son obligatorios";
    setTimeout(() => {
      error.value = "";
    }, 3000);
  }
};

//carrusel de imagenes header
const images = ["/img/P001.jpg", "/img/pi1.jpg", "/img/pi2.jpg"];

//carusel de imagenes header
const currentImage = ref(images[0]);
onMounted(() => {
  setInterval(() => {
    changeBackgroundImage();
  }, 5000);
});

function changeBackgroundImage() {
  const currentIndex = images.indexOf(currentImage.value);
  const nextIndex = (currentIndex + 1) % images.length;
  currentImage.value = images[nextIndex];
}

</script>
<template>
  <div>
    <form
      v-if="paginaInicio"
      class="formulario"
      :style="{ display: navMovil ? 'none' : 'block' }"
      @submit.prevent="handleSubmit"
    >
      <Alerta v-if="error">
        {{ error }}
      </Alerta>

      <LoadingData color="#fff" v-if="consulta.cargando" />

      <div v-else>
        <div class="formulario__categoria">
          <label class="formulario__label" for="formulario__categoria"
            >Seleccione una categoria</label
          >
          <select
            id="categoria"
            class="formulario__select"
            v-model="consulta.consulta.categoria"
            @change="consulta.consulta.vrBuscar = ''"
          >
            <option value="">-- Seleccione --</option>
            <option>Familia</option>
            <option>Nombre Común</option>
            <option>Nombre científico</option>
          </select>
        </div>

        <!-- Familia -->
        <div
          v-if="consulta.consulta.categoria === 'Familia'"
          class="formulario__criterio"
        >
          <label class="formulario__label" for="familia">Familia</label>
          <select
            class="formulario__select"
            id="familia"
            v-model="consulta.consulta.vrBuscar"
          >
            <option value="">-- Seleccione --</option>
            <option v-for="familia in familias.familias" :key="familia.familia">
              {{ familia.familia }}
            </option>
          </select>
        </div>
        <!-- Especie -->

        <div
          v-if="consulta.consulta.categoria === 'Nombre Común'"
          class="formulario__criterio"
        >
          <label class="formulario__label" for="especie">Nombre común</label>
          <select
            class="formulario__select"
            id="especie"
            v-model="consulta.consulta.vrBuscar"
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="especie in especies.especies"
              :key="especie.nom_comunes"
              :value="especie.cod_especie"
            >
              {{ especie.nom_comunes }}
            </option>
          </select>
        </div>

        <!-- nombre científico -->
        <div
          v-if="consulta.consulta.categoria === 'Nombre científico'"
          class="formulario__criterio"
        >
          <label class="formulario__label" for="cientifico"
            >Nombre científico</label
          >
          <select
            class="formulario__select"
            id="cientifico"
            v-model="consulta.consulta.vrBuscar"
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="especie in especies.especies"
              :key="especie.nombre_cientifico"
            >
              {{ especie.nombre_cientifico }}
            </option>
          </select>
        </div>
        <!-- disabled -->
        <div v-if="!consulta.consulta.categoria" class="formulario__criterio">
          <label class="formulario__label" for="categoria_inicial"
            >Valor a buscar</label
          >

          <select class="formulario__select" disabled id="categoria_inicial">
            <option value="">-- Seleccione --</option>
          </select>
        </div>
        <div class="fomulario__botones ">
          <button
            class="formulario__boton animacion"
            type="submit"
            
            @click="validarcampos()"
          ><span class="animacion__text">Buscar</span> </button>
        </div>
      </div>
    </form>
  </div>
</template>



<style scoped>

/* formulario */
.formulario {
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  backdrop-filter: blur(10px);
  opacity: 1;
  margin: 30rem  0 0 6rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem 2.8rem 2rem 2rem;
  border-radius: 10px;
  
}

@media (min-width: 993px) and (max-width: 1700px) {
  .formulario {
    margin: 15rem 0 0 6rem;
    max-width: 17rem;
  }
}

@media (max-width: 992px) {
  .formulario {
    margin: 12rem auto;
  }
}

@media (max-width: 640px) {
  .formulario {
    text-align: center;
    margin: 12rem auto;
    width: 90%;
    padding: 1rem;
    gap: 1rem;
  }
}

.formulario__label {
  display: block;
  font-weight: 700;
  font-size: 1rem;
}
@media (max-width: 1820px) {
  .formulario__label {
    font-size: 0.7rem;
  }
}
.formulario__label:last-of-type {
  margin-top: 0.5rem;
}

.formulario__select {
  color: var(--negro);
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border-radius: 5px;
  padding: 0.4rem;
}


@media (max-width: 1820px) {
  .formulario__select {
    font-size: 0.7rem;
  }
}

@media (max-width: 1013px) {
  .formulario__select {
    color: var(--negro);
    font-weight: 700;
    width: 98%;
    border-radius: 5px;
    padding: 0.2rem;
    margin-top: 0.8rem;
  }
}
@media (max-width: 640px) {
  .formulario__select {
    text-align: center;
  }
}

.fomulario__botones {
  width: 100%;
}
.formulario__boton {
  display: inline-flex;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 2rem;
  background-color: var(--gris);
  border: none;
  color: var(--blanco);
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  margin: 1.5rem 0 0 0;
}

@media (max-width: 768px) {
  .formulario__boton {
    width: 98%;
    margin: 1rem auto;
    height: 1.5rem;
  }
}
@media (max-width: 640px) {
  .formulario__boton {
    width: 98%;
    margin: 1rem auto;
    height: 1.5rem;
  }
}

.formulario__boton:hover{
  color: var(--blanco);
}
.animacion__text{
  position: relative;
  z-index: 2;
  transition: 0.3s ease all;
}


.animacion::after {
  content: "";
  width: 100%;
  position: absolute;
  z-index: 1;
  transition: 0.3s ease-in-out all;
  top: 0;
  left: calc(-100% - 75px); /* calc elemnt widht with border-right */
  border-right: 80px solid transparent;
  border-bottom: 40px solid var(--primary);
  transition: 0.4s ease-in-out all;
}
.animacion:hover::after {
  left: 0;
}
</style>