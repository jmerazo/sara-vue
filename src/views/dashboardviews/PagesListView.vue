<script setup>
import { computed, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";
import { usePageContent } from "../../stores/page";
import { useModalStore } from "@/stores/modal";
//componentes
import LoadingData from "@/components/shared/LoadingData.vue";
import ModalPageAdd from "@/components/dashboard/ModalPageAdd.vue";

const page = usePageContent();
const modal = useModalStore();
console.log('pages sc: ', page)

onMounted(() => {
  page.pagesData();
});

</script>

<template>
  <div class="contenedor">
    <!-- encabezado vista -->
    <h1 class="reporte__heading">Páginas</h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input class="buscador__input" type="text" placeholder="Escríbe un término de búsqueda"
          @input="especies.buscarTermino($event.target.value)" />
      </div>
      <div class="botones__descarga"></div>
    </div>
    <!-- fin encabezado vista -->
    <hr />

    <div>
      <!-- listado de cards -->
      <main class="reporte__grid">
        <div class="card" v-for="p in page.pageData" v-bind:key="p.id">
          <div class="card__grid" v-if="p.id">
            <div class="card__contenido">

              <div>
                <p class="card__subtitulo">
                  Título: <span class="card__dato">{{ p.title }}</span>
                </p>
                <p class="card__subtitulo">
                  Router:
                  <span style="font-weight: 600;" class="card__dato">{{ p.router }}</span>
                </p>
              </div>

              <div class="card__botones">
                <button class="boton__editar">
                  <svg style="width: 2rem;"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>
                </button>
                <button class="boton__eliminar">
                  <svg style="width: 2rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div @click="modal.handleClickModalPageAdd()" class="agregar"></div>
    <ModalPageAdd />
  </div>
</template>

<style scoped>
/* encabezado de la vista */
.reporte__heading {
  font-size: 1.1rem;
  margin: 2rem;
}

@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.3rem;
    margin: 0 0 3rem 0;
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
    grid-template-columns: repeat(3, 1fr);
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

/* cards */
.card {
  background-color: white;
  /* o cualquier otro color de fondo */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  /* sombra sutil */
  border-radius: 10px;
  /* bordes redondeados */
  overflow: hidden;
  /* para mantener todo dentro de los bordes redondeados */
  transition: transform 0.2s;
  /* para efecto al hacer hover */
  padding: 1rem;
}

.card:hover {
  transform: scale(1.02);
  /* un ligero crecimiento al hacer hover */
}

.card__titulo {
  font-size: 1.2rem;
  font-weight: bold;
}

.card__subtitulo {
  color: rgb(70, 69, 69);
  font-size: 1rem;
}
.card__contenido{
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}

.card__botones{
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
.card__botones button{
  background: none;
  border: none;
}

.card__botones .boton__editar:hover{
  color: var(--primary);
}
.card__botones .boton__eliminar:hover{
  color: var(--rojo);
}

/* boton agregar */
.agregar {
  background-image: url("/icons/icon-add.svg");
  padding: 0;
  margin: 0;
  height: 3rem;
  background-position: center;
  background-size: cover;
  position: fixed;
  bottom: 10%;
  right: -1px;
  z-index: 2;
  width: 3rem;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.agregar:hover {
  transform: scale(1.08);
}

@media (min-width: 768px) {
  .agregar {
    right: 1%;
    height: 3rem;
    overflow: hidden;
    border-radius: 50%;
  }

  .agregar::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-image: url("/icons/icon-add.svg");
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