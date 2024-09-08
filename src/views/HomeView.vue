<script setup>
import { onMounted, ref } from "vue";

import { getFullImageUrl } from "@/helpers/";

import { useHomeStore } from "@/stores/home";
import { usePageContent } from "@/stores/page";
import { useConsultaStore } from "@/stores/consulta";

import Header from '@/components/home/Header.vue';
import ButtonTop from '@/components/shared/ButtonTop.vue'
import FanPage from "../components/home/FanPage.vue";
import SliderGBIF from "../components/home/SliderGBIF.vue"

const pageStore = usePageContent();
const homeStore = useHomeStore();
const consulta = useConsultaStore();




const mostrarTodo = ref(false);

onMounted(async () => {
  /*   await geoStore.fetchData(); */
  await pageStore.fetchData();
  await homeStore.fetchData();
});

//top de especies

function contenidoResumido() {
  // Divide el texto en el primer punto aparte
  const splitText = pageStore.contenidoNosotros[0].content.split(".");
  return splitText[0] + ".";
}
</script>

<template>
  <div>
    <Header />
    <!-- misión, visión y valores -->
    <section class="contenedor planificacion">
      <div class="planificacion__grid">
        <div v-for="seccion in pageStore.informacionUsuario" :key="seccion.title">
          <div class="card" v-if="seccion.titulo === 'Misión'">
            <div class="front" :style="{
              backgroundImage:
                'url(/img/backgroundCard/background-mision.jpeg)',
            }">
              <div class="front__content">
                <p class="card__label">{{ seccion.titulo }}</p>
              </div>
            </div>
            <div class="back">
              <p class="card__text">
                {{ seccion.descripcion }}
              </p>
            </div>
          </div>

          <div class="card" v-if="seccion.titulo === 'Visión'">
            <div class="front" :style="{
              backgroundImage:
                'url(/img/backgroundCard/background-vision.webp)',
            }">
              <div class="front__content">
                <p class="card__label">{{ seccion.titulo }}</p>
              </div>
            </div>
            <div class="back">
              <p class="card__text">
                {{ seccion.descripcion }}
              </p>
            </div>
          </div>
          <div class="card" v-if="seccion.titulo === 'Valores'">
            <div class="front" :style="{
              backgroundImage:
                'url(/img/backgroundCard/background-valores.jpeg)',
            }">
              <div class="front__content">
                <p class="card__label">{{ seccion.titulo }}</p>
              </div>
            </div>
            <div class="back">
              <p class="card__text">
                {{ seccion.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <SliderGBIF />
    </section>


    <FanPage />

    <!-- top especies -->
    <section class="contenedor topEspecies">
      <h3 class="topEspecies__heading">Top especies más buscadas</h3>
      <div class="topEspecies__grid">
        <!-- especie -->
        <div class="topEspecie__contenido" v-for="specie in homeStore.topSpecies" :key="specie.cod_especie">
          <div class="topEspecie__contenido-imagen" :style="{
            backgroundImage:
              'url(' + getFullImageUrl(specie.images[0].img_general) + ')',
          }">
            <a class="topEspeice__enlace animacion" @click="consulta.consultSpecie(specie.code_specie)"><span
                class="animacion__text">{{ specie.vernacularName.split(' ')[0] }}</span></a>
          </div>
        </div>
        <!--fin especie -->
      </div>
    </section>

    <section class="colaboradores">
      <div class="colaboradores__contenido">
        <div class="colaboradores__grid">
          <!-- colaborador -->
          <div class="colaborador" v-for="(colaborador, index) in homeStore.colaboradores" :key="index">
            <a target="_blank" :href="colaborador.enlace"><img :src="colaborador.img" class="colaborador__imagen"
                alt="imagen colaborador" /></a>
          </div>
          <!-- fin colaborador -->
        </div>
      </div>
    </section>
  </div>
  <ButtonTop />
</template>

<style scoped>
/* top especies **********************************/
.topEspecies {
  margin-top: 3rem;
}

.topEspecies__heading {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .topEspecies {
    margin-top: 10rem;
  }

  .topEspecies__heading {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}

@media (min-width: 992px) {
  .topEspecies__heading {
    margin-bottom: 3rem;
  }
}

@media (min-width: 1080px) {
  .topEspecies {
    width: 60%;
  }
}

.topEspecies__grid {
  display: grid;
  gap: 0rem;
}

@media (min-width: 768px) {
  .topEspecies__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .topEspecies__grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

.topEspecie__contenido {
  display: flex;
  flex-direction: column;
  transition-property: scale(1);
  transition-duration: 0.5s;
  height: 22rem;
}

.topEspecie__contenido:hover {
  transform: scale(1.05);
}

.topEspecie__contenido-imagen {
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 90%;
  margin: 0 auto;
  border-radius: .5rem;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
}

@media (min-width: 992px) {
  .topEspecie__contenido-imagen {
    height: 85%;
  }
}

.topEspeice__enlace {
  display: inline-flex;
  width: 50%;
  align-items: center;
  height: 2.5rem;
  padding: 0 0 0 .5rem;
  background-color: var(--blanco);
  color: var(--gris);
  font-weight: 700;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 0 .5rem .5rem 0;
  position: relative;
  overflow: hidden;
  margin-top: 15rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.topEspeice__enlace:hover {
  color: var(--blanco);
}

.animacion__text {
  position: relative;
  z-index: 2;
}

.topEspeice__enlace span {
  text-align: left;
}

.animacion::after {
  content: "";
  width: 100%;
  position: absolute;
  z-index: 1;
  transition: 0.3s ease-in-out all;
  top: 0;
  left: calc(-100% - 75px);
  /* calc elemnt widht with border-right */
  border-right: 80px solid transparent;
  border-bottom: 40px solid var(--primary);
  transition: 0.3s ease-in-out all;
}

.animacion:hover::after {
  left: 0;
}


/* colaboradores ****************************** */

.colaboradores {
  margin: 4rem 0;
  width: 100%;
}

.colaboradores__contenido {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Alinea el encabezado a la izquierda */
  padding: 1rem;
}

.colaboradores__heading {
  font-size: 1rem;
  line-height: 1.2;
  width: 100%;
  /* Asegúrate de que el encabezado ocupe todo el ancho */
  text-align: left;
  /* Alinea el texto a la izquierda */
  margin-bottom: 2rem;
  /* Espacio entre el encabezado y los logos */
}

.colaboradores__grid {
  display: flex;
  flex-wrap: wrap;
  /* Permite múltiples líneas si hay muchos logos */
  gap: 2rem;
  justify-content: center;
  /* Centra los logos horizontalmente */
  width: 100%;
  /* Ocupa todo el ancho disponible */
  align-items: center;
}

.colaborador {
  width: 4rem;
  transition: transform 0.3s;
}

.colaborador:hover {
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .colaborador {
    width: 5rem;
  }
}

/* MISION Y VISION */
/* mision vision y valores */
.planificacion__grid {
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

@media (min-width: 1440px) {
  .planificacion {
    margin: 0 auto;
    margin-top: 10rem;
  }

  .planificacion__grid {
    flex-direction: row;
  }
}

.card {
  width: 300px;
  height: 200px;
  position: relative;
  perspective: 1000px;
}

.front,
.back {
  position: absolute;
  width: 300px;
  height: 200px;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  transition: transform 0.9s;
  border-radius: 1rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .card {
    width: 400px;
    height: 300px;
  }

  .front,
  .back {
    position: absolute;
    width: 400px;
    height: 300px;
  }
}

.front {
  background-position: center;
  background-size: cover;
}

.front::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  border-radius: 1rem;
}

.back {
  background-color: rgb(255, 255, 255);
  transform: rotateY(180deg);
}

.card:hover .front {
  transform: rotateY(-180deg);
}

.card:hover .back {
  transform: rotateY(0deg);
}

.card .front {
  transform: rotateY(0deg);
}

.card .back {
  transform: rotateY(180deg);
}

.card__label {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
  z-index: 100;
}

.card__text {
  font-size: 0.8rem;
  font-weight: 600;
}

@media (min-width: 768px) {
  .card__text {
    font-size: 1rem;
    text-align: center;
  }
}

.front__content {
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--blanco);
  z-index: 100;
}
</style>