<script setup>
import { onMounted } from "vue";
import { usePageContent } from "@/stores/page";

import ButtonTop from '@/components/shared/ButtonTop.vue';

const pageStore = usePageContent();

onMounted(async () => {
  await pageStore.fetchData();
});


function parseData(text) {
  const textFormatted = text.split(';')
  const ArrayFinanciers = []
  textFormatted.forEach(item => {
    const newArray = item.split(':');
    ArrayFinanciers.push(newArray);
  });

  return ArrayFinanciers;
  ;
}

function formatText(text) {
  return text
    .split('.')
    .map((sentence) => {
      // Busca subtítulos entre dos puntos y los pone en negrita
      return sentence.replace(/([^.]*?:)/g, '<strong>$1</strong><br/><br/>');
    })
    .join('.<br/><br/>'); // Une las frases y agrega un salto de línea después de cada punto
}
</script>

<template>
  <div>
    <!-- banner acerca -->
    <section class="banner">
      <div class="banner__info">
       

        <p class="banner__text">
          ACERCA DEL PROYECTO
        </p>
      </div>
    </section>
    <!-- Fin banner acerca  -->

    <!-- mision vision y valores -->
    <!-- <main class="planificacion">
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
    </main> -->
    <!-- Fin mision vision y valores -->

    <!-- info proyecto -->
    <section class="proyecto">
      <div class="proyecto__contenido" v-if="pageStore.contenidoNosotros.length > 0">
        <img class="proyecto__img" src="/img/backgroundCard/about_project.png" alt="hojas" />
        <h1 class="proyecto__titulo">
          {{ pageStore.contenidoNosotros[0].title }}
        </h1>
        <div v-html="formatText(pageStore.contenidoNosotros[0].content) "></div>
      
      </div>
    </section>
    <!-- Fin info proyecto -->

    <!-- financiadores -->
    <section class="financiadores">
      <div class="financiadores__contenido" v-if="pageStore.contenidoNosotros.length > 0">
        <h1 class="financiadores__titulo">
          {{ pageStore.contenidoNosotros[7].title }}
        </h1>


        <table class="table__financiers">
          <thead>
            <tr>
              <th>Entidad</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in parseData(pageStore.contenidoNosotros[7].content)" :key="index">
              <td>{{ item[0] }}</td>
              <td>{{ item[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <!-- Fin financiadores -->
  </div>
  <ButtonTop/>
</template>

<style scoped>
/* inicio - banner */
.banner {
  margin-top: 4rem;
  margin-bottom: 0rem;
  position: relative;
  background-image: url('/img/bannersViews/banner-about.jpeg');
  height: 18rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
}

.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 35rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.banner__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
}

.banner__logo {
  width: 5rem;
  z-index: 100;
}

.banner__text {
  color: var(--blanco);
  font-size: 1.2rem;
  text-align: center;
  font-weight: 900;
  z-index: 100;
  width: 80%;
  margin: 2rem;
}

@media (min-width: 992px) {
  .banner {
    margin-top: 0rem;
    height: 30rem;
    margin-bottom: 5rem;
  }

  .banner__logo {
    width: 8rem;
  }

  .banner__text {
    font-size: 2.5rem;
    width: 60%;
  }
}

/* mision vision y valores */
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



.planificacion__grid {
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 1440px) {
  .planificacion {
    margin: 0 auto;
  }

  .planificacion__grid {
    flex-direction: row;
  }
}

/* proyecto */
.proyecto {
  margin-top: -2rem;
}

.proyecto__contenido {
  text-align: center;
  margin: 0 auto;
  position: relative;
  padding: 2rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.proyecto__img {
  position: absolute;
  right: 0;
  opacity: 0.1;
  border-radius: 1rem;
}

.proyecto__titulo {
  position: relative;
  font-size: 1.7rem;
  z-index: 100;
}

.proyecto__informacion {
  position: relative;
  z-index: 100;
  font-weight: 500;
}

@media (min-width: 768px) {
  .proyecto {
    margin-top: 5rem;
  }

  .proyecto__contenido {
    text-align: justify;
    width: 60%;
  }
}

/* financiadores */
.financiadores {
  margin: 1rem 0 2rem 0;
}

.financiadores__contenido {
  text-align: center;
  margin: 0 auto;
  position: relative;
  padding: 2rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.financiadores__img {
  position: absolute;
  right: 0;
  opacity: 0.1;
  border-radius: 1rem;
}

.financiadores__titulo {
  position: relative;
  font-size: 1.7rem;
  z-index: 100;
}

.financiadores__informacion {
  position: relative;
  z-index: 100;
  font-weight: 500;
}

@media (min-width: 768px) {
  .financiadores {
    margin-top: 2rem;
  }

  .financiadores__contenido {
    text-align: justify;
    width: 60%;
  }
}

/* styles to financiers table  */
.table__financiers {
  width: 100%;
  border-collapse: collapse;
  font-size: .6rem;
}

@media (min-width: 768px) {
  .table__financiers{
    font-size: 1.2rem;
  }
}

.table__financiers thead tr {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 1rem;
  border: 1px solid var(--primary);
}

.table__financiers thead th {
  padding: 1rem;
}

.table__financiers thead th:first-child{
  border-right: 1px solid var(--primary);
}

.table__financiers tbody tr {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--primary);
}

.table__financiers tbody td {
  padding: 1rem;
}

.table__financiers tbody td:first-child {
  border-right: 1px solid var(--primary);
}

.table__financiers tbody td:last-child {
  font-weight: 500;
}

</style>