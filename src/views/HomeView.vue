<script setup>
import { onMounted } from "vue";
//Stores
import { useHomeStore } from "@/stores/home";
import { usePageContent } from "@/stores/page";
//components
import Header from '@/components/home/Header.vue';
import ButtonTop from '@/components/shared/ButtonTop.vue'
import TopSpecies from '../components/home/TopSpecies.vue'

const pageStore = usePageContent();
const homeStore = useHomeStore();

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth scroll effect
  });
};

onMounted(async () => {
  scrollToTop()
  await pageStore.fetchData();
  await homeStore.fetchData();
});
</script>

<template>
  <div>
    <Header/>
    <!-- misión, visión y valores -->
    <section class="contenedor">
      <div class="planning">
        <div v-for="(seccion, index) in pageStore.informacionUsuario" :key="index">
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

          <div class="card" v-else-if="seccion.titulo === 'Visión'">
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

          <div class="card" v-else-if="seccion.titulo === 'Valores'">
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

          <div class="card" v-else-if="seccion.titulo === 'Objetivo'">
            <div class="front" :style="{
              backgroundImage:
                'url(/img/backgroundCard/background-objetivo.jpeg)',
            }">
              <div vel class="front__content">
                <p class="card__label">{{ seccion.titulo }}</p>
              </div>
            </div>
            <div class="back">
              <p class="card__text card__text--large">
                {{ seccion.descripcion }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <TopSpecies class="top__species" />

  </div>
  <ButtonTop />
</template>

<style scoped>
.top__species {
  margin-bottom: 5rem;
}

/* mision vision y valores */
.planning {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  row-gap: 1rem;
  margin-top: 3rem;
}

@media (min-width: 768px) {
  .planning {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 10rem;
  }
}
@media (min-width: 1340px) {
  .planning {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

.card {
  width: 300px;
  height: 200px;
  margin: 0 auto;
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
  padding: 1.7rem;
  box-sizing: border-box;
  transition: transform 0.9s;
  border-radius: 1rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1920px) {
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
  margin: 0;
  padding: 0;
}

.card__text--large {
  font-size: .5rem;
}

@media (min-width: 1440px) {
  .card__text {
    font-size: 1rem;
    text-align: center;
  }

  .card__text--large {
    font-size: .8rem;
  }
}

.front__content {
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--blanco);
  z-index: 100;
}
</style>