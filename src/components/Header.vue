<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useFamiliasStore } from "../stores/families";
import { useEspeciesStore } from "../stores/species";
import { useConsultaStore } from "../stores/consulta";

//componentes
import Alerta from "./Alerta.vue";

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

//mostrar barra lateral

const navMovil = ref(false);
const mostrarNavMovil = () => {
  navMovil.value = !navMovil.value;
};
</script>

<template>
  <header
    class="header"
    :style="
      !paginaInicio
        ? {
            'background-color': '#eaf2ed',
            height: '100px',
            color: '#ffffff',
            backgroundImage: 'none',
          }
        : { backgroundImage: 'url(' + currentImage + ')' }
    "
  >
    <div class="header__contenedor">
      <!-- header movil -->
      <div class="Header__movil">
        <div class="navegacion__logo navegacion__logo--movil">
          <RouterLink :to="{ name: 'home' }">
            <img
              src="../assets/sara.png"
              alt="Logotipo"
              :style="{ display: navMovil ? 'none' : 'block' }"
            />
          </RouterLink>
        </div>
        <!-- boton movil  -->
        <button
          @click="mostrarNavMovil"
          id="menu__movil"
          :class="{
            pagina__inicio: paginaInicio,
            pagina__otro: !paginaInicio,
          }"
          class="menu__movil"
        >
          <font-awesome-icon v-if="!navMovil" :icon="['fas', 'bars']" />
          <font-awesome-icon v-else :icon="['fas', 'x']" />
        </button>
        <!-- fin boton movil -->
      </div>
      <!--fin header movil -->

      <div class="navegacion" :class="{ navegacion__show: navMovil }">
        <div class="navegacion__logo">
          <RouterLink :to="{ name: 'home' }">
            <img src="../assets/sara.png" alt="Logotipo" />
          </RouterLink>
        </div>

        <nav class="navegacion__barra">
          <RouterLink
            :to="{ name: 'home' }"
            class="navegacion__link"
            :class="{
              pagina__inicio: paginaInicio,
              pagina__otro: !paginaInicio,
            }"
            active-class="navegacion__link-seleccion"
          >
            Inicio
          </RouterLink>

          <RouterLink
            :to="{ name: 'especies' }"
            class="navegacion__link"
            active-class="navegacion__link-seleccion"
            :class="{
              pagina__inicio: paginaInicio,
              pagina__otro: !paginaInicio,
            }"
          >
            Especies
          </RouterLink>
          <RouterLink
            :to="{ name: 'familias' }"
            class="navegacion__link"
            :class="{
              pagina__inicio: paginaInicio,
              pagina__otro: !paginaInicio,
            }"
            active-class="navegacion__link-seleccion"
          >
            Familias
          </RouterLink>

          <RouterLink
            :to="{ name: 'glossary' }"
            class="navegacion__link"
            active-class="navegacion__link-seleccion "
            :class="{
              pagina__inicio: paginaInicio,
              pagina__otro: !paginaInicio,
            }"
          >
            Glosario
          </RouterLink>
          <RouterLink
            :to="{ name: 'aboutus' }"
            class="navegacion__link"
            :class="{
              pagina__inicio: paginaInicio,
              pagina__otro: !paginaInicio,
            }"
            active-class="navegacion__link-seleccion"
          >
            Acerca de
          </RouterLink>
          <RouterLink
            :to="{ name: 'auth' }"
            class="navegacion__link navegacion__link--loging"
          >
            <font-awesome-icon :icon="['far', 'circle-user']" />
            <span>Ingresar</span>
          </RouterLink>
        </nav>
      </div>

      <form
        v-if="paginaInicio"
        class="formulario"
        :style="{ display: navMovil ? 'none' : 'block' }"
        @submit.prevent="handleSubmit"
      >
        <Alerta v-if="error">
          {{ error }}
        </Alerta>

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
        <div class="fomulario__botones">
          <input
            class="formulario__boton"
            type="submit"
            value="Buscar"
            @click="validarcampos()"
          />
        </div>
      </form>
    </div>
  </header>
</template>

<style scoped>
/* header */
.pagina__inicio {
  color: var(--blanco);
}

.pagina__otro {
  color: var(--negro);
}

.header {
  height: 600px;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  transition: background-image 1.5s ease-out;
}

@media (min-width: 1900px) {
  .header {
    height: 850px;
  }
}

/* navegacion */
.navegacion {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

@media (min-width: 1820px) {
  .navegacion {
    padding-top: 1rem;
  }
}

@media (max-width: 992px) {
  .navegacion {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 1rem;
  }
}
.navegacion__barra {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 992px) {
  .navegacion__barra {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }
}
@media (max-width: 992px) {
  .navegacion__barra {
    gap: 0.3rem;
  }
  .navegacion {
    margin: 0;
    background: #2f3640;
    height:2rem;
    position: absolute;
    top: 0;
    left: 0;
    background: #2f3640;
    height: 100%;
    transform: translateX(-200px);
    padding: 35px;
    opacity: 0.9;
    justify-content: start;
    font-size: 1rem;
    transition: transform 0.6s ease-in-out;
    z-index: 1;
  }

  .navegacion__show {
    transform: translateX(-20px);
  }

  .item__show {
    display: block;
  }

  .navegacion__link {
    color: var(--blanco);
  }

  .navegacion__link:hover {
    border-bottom: 0.1px solid #fff;
  }

  .navegacion__link:first-of-type,
  .navegacion__link:last-of-type {
    margin-top: 2rem;
  }
}

.navegacion__link {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

.navegacion__link:hover {
  backdrop-filter: blur(
    5px
  ); /* Cambia el valor según el nivel de desenfoque que desees */
  opacity: 1;
  background-color: rgba(38, 47, 33, 0.3);
  border-radius: 5px;
}
.navegacion__link--loging {
  background-color: var(--primary);
  border-radius: 5px;
  color: var(--blanco);
}
.navegacion__link--loging:hover {
  background-color: var(--primary-hover);
}
.navegacion__link-seleccion {
  color: var(--primary);
}
.navegacion__logo {
  max-width: 3.5rem;
  margin-top: 1rem;
}
@media (min-width: 1820px) {
  .navegacion__link {
    font-size: 1rem;
  }
  .navegacion__logo {
    max-width: 5rem;
    margin-top: 0.5rem;
  }
}

/* formulario */
.formulario {
  display: flex;
  flex-direction: column;
  margin: 20rem 0;
  max-width: 20rem;
  backdrop-filter: blur(10px);
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem 2.8rem 2rem 2rem;
  border-radius: 10px;
}


@media (min-width: 993px) and (max-width: 1700px) {
  .formulario {
    margin: 15rem 0;
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
@media (max-width: 1820px){
  .formulario__label{
    font-size: .7rem;
  }
}
.formulario__label:last-of-type {
  margin-top: 0.5rem;
}
.formulario__select {
  color: var(--negro);
  font-size: 1rem;
  font-weight: 700;
  max-width: 100%;
  width: 100%;
  border-radius: 5px;
  padding: 0.4rem;
  margin: 0.1rem auto;
}

@media (max-width: 1820px){
  .formulario__select{
    font-size: .7rem;
  }
}

@media (max-width: 1013px) {
  .formulario__select {
    color: var(--negro);
    font-weight: 700;
    max-width: 100%;
    width: 100%;
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

.fomulario__botones{
  width: 100%;
}
.formulario__boton {
  background-color: var(--primary);
  padding: .3rem 0;
  color: var(--blanco);
  font-weight: 700;
  border-radius: 5px;
  margin-top: 1rem;
  width: 105%;
  transition: background-color 0.3s;
}

@media (max-width: 768px) {
  .formulario__boton {
    max-width: 100%;
    width: 100%;
    margin: 1rem auto;
  }
}
@media (max-width: 640px) {
  .formulario__boton {
    max-width: 102%;
    width: 102%;
    margin: 1rem auto;
  }
}
.formulario__boton:hover {
  background-color: var(--primary-hover);
}

/* movil responsive */

.Header__movil {
  padding: 0.4rem;
  display: none;
}

@media (max-width: 992px) {
  .Header__movil {
    display: block;
  }
}
.navegacion__logo--movil {
  max-width: 3.5rem;
  margin: 0.8rem 0;
}

.menu__movil {
  position: absolute;
  cursor: pointer;
  top: 1.5rem;
  right: 1rem;
  font-size: 1.8rem;
  border: none;
  background: transparent;
  transition-property: color;
  transition-duration: 0.3s;
}

.menu__movil:hover {
  color: var(--primary-hover);
}
</style>