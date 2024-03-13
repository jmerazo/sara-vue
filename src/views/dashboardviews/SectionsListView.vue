<script setup>
import { computed, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";
import { usePageContent } from "../../stores/page";
import { useModalStore } from "@/stores/modal";
//componentes
import LoadingData from "@/components/LoadingData.vue";
import ModalSectionAdd from "@/components/dashboard/ModalSectionAdd.vue";

const section = usePageContent();
const modal = useModalStore();

onMounted(() => {
    section.sectionsData();
});

</script>

<template>
    <div class="contenedor">
    <!-- encabezado vista -->
    <h1 class="reporte__heading">Secciones</h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
          class="buscador__input"
          type="text"
          placeholder="Escríbe un término de búsqueda"
          @input="especies.buscarTermino($event.target.value)"
        />
      </div>
      <div class="botones__descarga"></div>
    </div>
    <!-- fin encabezado vista -->
    <hr />
    
    <div>
      <!-- listado de cards -->
      <main class="reporte__grid">
        <div
          class="card"
          v-for="s in section.sectionData"
          v-bind:key="s.id"
        >
          <div class="card__grid" v-if="s.id">
            <div class="card__contenido">

              <p class="card__subtitulo">
                Título sección: <span class="card__dato">{{ s.section_title }}</span>
              </p>
              <p class="card__subtitulo">
                Contenido:
                <span class="card__dato">{{ s.content }}</span>
              </p>
              <div class="card__botones">
                <button
                  class="boton__primario"
                >
                  <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                </button>
                <button
                  class="boton__primario"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div
      @click="modal.handleClickModalSectionAdd()"
      class="agregar"
    ></div>
    <ModalSectionAdd/>
  </div>
</template>

<style scoped>
/* encabezado de la vista */
.reporte__heading {
  font-size: 1.3rem;
  margin: 2rem;
}
@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.8rem;
    margin: 3rem;
  }
}
.contenido__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.6rem;
}
@media (min-width: 768px) {
  .contenido__header {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 0 1rem 2rem 1rem;
  }
}

.reporte__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
@media (min-width: 768px) {
  .reporte__grid {
    grid-template-columns: repeat(2fr, 1fr);
  }
}
@media (min-width: 992px) {
  .reporte__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* buscador */
.buscador__label {
  display: none;
}
@media (min-width: 768px) {
  .buscador__label {
    display: inline;
    margin-right: 1rem;
  }
}
.buscador__input {
  width: 300px;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid var(--primary);
  text-align: center;
}
@media (min-width: 768px) {
  .buscador__input {
    padding: 0.5rem;
    text-align: left;
  }
}
/* descargas */
.botones__descarga {
  display: flex;
  gap: 1rem;
}
.boton {
  font-size: 1.5rem;
}
@media (min-width: 768px) {
  .boton {
    font-size: 1.8rem;
  }
}
.boton__excel {
  color: rgb(6, 114, 6);
}
.boton__pdf {
  color: rgb(184, 50, 50);
}

.card {
  background-color: white; /* o cualquier otro color de fondo */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* sombra sutil */
  border-radius: 10px; /* bordes redondeados */
  overflow: hidden; /* para mantener todo dentro de los bordes redondeados */
  transition: transform 0.2s; /* para efecto al hacer hover */
  padding: 2rem;
}

.card:hover {
  transform: scale(1.05); /* un ligero crecimiento al hacer hover */
}

.card__titulo {
  font-size: 1.2rem;
  font-weight: bold;
}

.card__subtitulo {
  color: gray;
  font-size: 1rem;
}

/* boton agregar */
.agregar {
  background-image: url("/icons/icon-add.png");
  padding: 0;
  margin: 0;
  height: 3rem;
  background-position: center;
  background-size: cover;
  position: fixed;
  bottom: 10%;
  right: -1px;
  z-index: 2;
  width: 4rem;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}
.agregar:hover {
  transform: scale(1.08);
}

@media (min-width: 768px) {
  .agregar {
    right: 1%;
    height: 4rem;
    overflow: hidden;
    border-radius: 50%;
  }
  .agregar::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-image: url("/icons/icon-add.png");
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    transition: transform 0.3s ease-out;
  }
  .agregar:hover::before {
    transform: scale(1.08);
  }
  .agregar:hover {
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
</style>