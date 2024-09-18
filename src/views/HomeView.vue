<script setup>
import { onMounted, ref } from "vue";

import { useHomeStore } from "@/stores/home";
import { usePageContent } from "@/stores/page";


//components
import Header from '@/components/home/Header.vue';
import ButtonTop from '@/components/shared/ButtonTop.vue'
import FanPage from "../components/home/FanPage.vue";
import SliderGBIF from "../components/home/SliderGBIF.vue"
import TopSpecies from '../components/home/TopSpecies.vue'
import Financiers from '../components/home/Financiers.vue'



const pageStore = usePageContent();
const homeStore = useHomeStore();


const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scroll effect
    });
};


const mostrarTodo = ref(false);

onMounted(async () => {
  scrollToTop()
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

    <TopSpecies/>
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


    <SliderGBIF />

    <FanPage />

    <Financiers/>
    
  </div>
  <ButtonTop />
</template>

<style scoped>


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