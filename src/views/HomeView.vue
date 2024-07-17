<script setup>
import { onMounted, ref, computed } from "vue";
import { getFullImageUrl } from "@/helpers/";
import { useGeoCandidateTrees } from "@/stores/candidate";
import { useAverageSpecie } from "@/stores/average";
import { useHomeStore } from "@/stores/home";
import { usePageContent } from "../stores/page";
import { useConsultaStore } from "../stores/consulta";
import {useCalendarStore} from "../stores/calendarMonitoring"

const pageStore = usePageContent();
const geoStore = useGeoCandidateTrees();
const averageStore = useAverageSpecie();
const homeStore = useHomeStore();
const consulta = useConsultaStore();
const calendarStore = useCalendarStore()

const consultar = (nombre_comun) => {
  consulta.consulta.categoria = "Nombre Común";
  consulta.consulta.vrBuscar = nombre_comun;
  consulta.mostrarConsulta();
};

const mostrarTodo = ref(false);

onMounted(async () => {
  /*   await geoStore.fetchData(); */
  await averageStore.fetchData();
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
    <section
      v-if="pageStore.contenidoNosotros.length > 0"
      class="contenedor proyecto"
    >
      <div class="proyecto__contenido">
        <h2 class="proyecto__heading">
          {{ pageStore.contenidoNosotros[0].title }}
        </h2>
        <p class="proyecto__texto" v-if="!mostrarTodo">
          {{ contenidoResumido() }}
          <a><RouterLink :to="{ name: 'aboutus' }">Ver más...</RouterLink></a>
        </p>
      </div>
    </section>

    <section class="contenedor topEspecies">
      <h3 class="topEspecies__heading">Top especies más buscadas</h3>
      <div class="topEspecies__grid">
        <!-- especie -->
        <div
          class="topEspecie__contenido"
          v-for="specie in homeStore.topSpecies"
          :key="specie.cod_especie"
        >
          <div
            class="topEspecie__contenido-imagen"
            :style="{
              backgroundImage:
                'url(' + getFullImageUrl(specie.img_general) + ')',
            }"
          >
            <a
              class="topEspeice__enlace animacion"
              @click="consultar(specie.cod_especie)"
              ><span class="animacion__text">{{ specie.nom_comunes.split(' ')[0] }}</span></a
            >
          </div>
        </div>
        <!--fin especie -->
      </div>
    </section>

    <section class="colaboradores">
      <div class="colaboradores__contenido">
        <div class="colaboradores__grid">
          <!-- colaborador -->
          <div
            class="colaborador"
            v-for="(colaborador, index) in homeStore.colaboradores"
            :key="index"
          >
            <a target="_blank" :href="colaborador.enlace"
              ><img
                :src="colaborador.img"
                class="colaborador__imagen"
                alt="imagen colaborador"
            /></a>
          </div>
          <!-- fin colaborador -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* información proyecto */

.proyecto {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  background-image: url("/img/pi2.jpg");
  background-repeat: no-repeat;
  background-position: bottom center;
  margin-top: 3rem;
  border-radius: 10px;
}

@media (min-width: 920px) {
  .proyecto {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 5rem;
    max-width: 60%;
  }
}

.proyecto__contenido {
  background-color: var(--blanco);
  padding: 1rem;
}

@media (min-width: 920px) {
  .proyecto__contenido {
    grid-column: 2/4;
  }
}

.proyecto__heading {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1rem;
  margin-top: 0;
}

@media (min-width: 768px) {
  .proyecto__heading {
    font-size: 1.1rem;
  }
}
.proyecto__texto {
  font-size: 0.7rem;
}

@media (min-width: 920px) {
  .proyecto__heading {
    text-align: left;
    font-size: 1.2rem;
  }

  .proyecto__texto {
    margin-bottom: 1rem;
    font-size: 1rem;
  }
}

/* top especies **********************************/
.topEspecies {
  margin-top: 8rem;
}
.topEspecies__heading {
  font-size: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .topEspecies__heading {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
}
@media (min-width: 992px) {
  .topEspecies__heading {
    font-size: 1.2rem;
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
  font-size: 1rem;
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
.topEspeice__enlace:hover{
  color: var(--blanco);
}
.animacion__text{
  position: relative;
  z-index: 2;
}
.topEspeice__enlace span{
  text-align: left;
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
  align-items: flex-start; /* Alinea el encabezado a la izquierda */
  padding: 1rem;
}

.colaboradores__heading {
  font-size: 1rem;
  line-height: 1.2;
  width: 100%; /* Asegúrate de que el encabezado ocupe todo el ancho */
  text-align: left; /* Alinea el texto a la izquierda */
  margin-bottom: 2rem; /* Espacio entre el encabezado y los logos */
}

.colaboradores__grid {
  display: flex;
  flex-wrap: wrap; /* Permite múltiples líneas si hay muchos logos */
  gap: 2rem;
  justify-content: center; /* Centra los logos horizontalmente */
  width: 100%; /* Ocupa todo el ancho disponible */
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
</style>




