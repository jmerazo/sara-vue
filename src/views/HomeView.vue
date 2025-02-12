<script setup>
import { onMounted } from "vue";
// Stores
import { useHomeStore } from "@/stores/home";
// Components
import Header from "@/components/home/Header.vue";
import ButtonTop from "@/components/shared/ButtonTop.vue";
import TopSpecies from "@/components/home/TopSpecies.vue";

const homeStore = useHomeStore();

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll effect
  });
};

onMounted(async () => {
  scrollToTop();
  await homeStore.fetchData();
});

const vals = [
  {
    title: "Misión",
    content:
      "Promover la conservación y protección de los árboles, así como concientizar a la sociedad sobre su importancia vital para el medio ambiente y el bienestar humano.",
    backgroundImage: "url(/img/backgroundCard/background-mision.jpeg)",
  },
  {
    title: "Visión",
    content:
      "Aspiramos a un mundo donde los árboles sean apreciados y respetados, y donde las comunidades se unan para garantizar un entorno sostenible y saludable.",
    backgroundImage: "url(/img/backgroundCard/background-vision.webp)",
  },
  {
    title: "Valores",
    content:
      "Compromiso con la naturaleza, Responsabilidad ambiental, Colaboración comunitaria, Educación ambiental, Innovación sostenible",
    backgroundImage: "url(/img/backgroundCard/background-valores.jpeg)",
  },
  {
    title: "Objetivo",
    content:
      "Incrementar el conocimiento sobre la morfología, ecología, fenología, distribución geográfica, usos, cosecha, y establecer criterios y lineamientos técnicos para el manejo sostenible de las especies forestales del sur de la Amazonía colombiana, salvaguardando el equilibrio de los ecosistemas y sus funciones, orientados a mejorar la producción de bienes y servicios para la sociedad sin amenazar la existencia de las mismas y los ecosistemas asociados, en los departamentos de Amazonas, Caquetá y Putumayo.",
    backgroundImage: "url(/img/backgroundCard/background-objetivo.jpeg)",
  },
];
</script>

<template>
  <div>
    <Header/>
    <section class="contenedor">
      <div class="planning">
        <div v-for="(seccion, index) in vals" :key="index" class="card">
          <div
            class="front"
            :style="{ backgroundImage: seccion.backgroundImage }"
          >
            <div class="front__content">
              <p class="card__label">{{ seccion.title }}</p>
            </div>
          </div>
          <div class="back">
            <p
              class="card__text"
              :class="{ 'card__text--large': seccion.title === 'Objetivo' }"
            >
              {{ seccion.content }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <TopSpecies class="top__species" />
    <ButtonTop />
  </div>
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