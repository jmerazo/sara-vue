<script setup>
import { onMounted, ref, computed } from "vue";
import { getFullImageUrl} from '@/helpers/'
import { useGeoCandidateTrees } from "@/stores/candidate";
import { useAverageSpecie } from "@/stores/average";
import { useHomeStore } from "@/stores/home";
import { usePageContent } from "../stores/page";
import { useConsultaStore } from "../stores/consulta";

const pageStore = usePageContent();
const geoStore = useGeoCandidateTrees();
const averageStore = useAverageSpecie();
const homeStore = useHomeStore();
const consulta = useConsultaStore();

const consultar = (nombre_comun) => {
  consulta.consulta.categoria = "Nombre Común";
  consulta.consulta.vrBuscar = nombre_comun;
  consulta.mostrarConsulta();
};

const mostrarTodo = ref(false)

onMounted(async () => {
/*   await geoStore.fetchData(); */
  await averageStore.fetchData();
  await pageStore.fetchData();
  await homeStore.fetchData();
});

//top de especies

function contenidoResumido() {
  // Divide el texto en el primer punto aparte
  const splitText = pageStore.contenidoNosotros[0].content.split('.');
  return splitText[0] + '.';
}
</script>

<template>
  <section v-if="pageStore.contenidoNosotros.length > 0" class="contenedor proyecto">
    <div class="proyecto__contenido">
      <h2 class="proyecto__heading">{{ pageStore.contenidoNosotros[0].title }}</h2>
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
          :style="{ backgroundImage: 'url(' + getFullImageUrl(specie.img_general) + ')' }"
        ></div>
        <a class="topEspeice__enlace" @click="consultar(specie.cod_especie)">{{ specie.nom_comunes }}</a>
      </div>
      <!--fin especie -->
    </div>
  </section>

  <section class="colaboradores">
    <div class="colaboradores__contenido">
      <div class="colaboradores__descripcion">
        <h2 class="colaboradores__heading">Nuestros Colaboradores</h2>
        <p class="colaboradores__texto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          at est qui! Cupiditate harum non quia, fuga aliquid porro saepe omnis
          libero tenetur veritatis atque, officia minus? Accusamus, vero illum?
        </p>
      </div>

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
</template>

<style scoped>
/* inromacion proyecto */

.proyecto {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  background-image: url("/img/P001.jpg");
  background-repeat: no-repeat;
  background-position: bottom center;
  margin-top: 3rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

@media (min-width: 920px) {
  .proyecto {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 5rem;
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
    font-size: .7rem;
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

/* top especies */
.topEspecies {
  margin-top: 4rem;
  max-width: 90%;
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
.topEspecies__grid {
  display: grid;
  gap: 1rem;
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
  transition-property: scale(1.0);
  transition-duration: .5s;
  height: 25rem;
}

.topEspecie__contenido:hover {
  transform: scale(1.05);
}
.topEspecie__contenido-imagen {
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 25rem;
  margin: 0 auto;
}
@media (min-width: 992px) {
  .topEspecie__contenido-imagen {
    height: 85%;
  }
}

.topEspeice__enlace {
  backdrop-filter: blur(
    10px
  );
  opacity: 1;
  background-color: rgba(38, 47, 33, 0.3);
  color: var(--gris);
  text-align: center;
  padding: .8rem;
  display: block;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition-property: background-color color;
  transition-duration: .5s;
}
.topEspeice__enlace:hover {
  background-color: var(--primary-hover);
  color: var(--blanco);
}
/* colaboradores */
.colaboradores {
  /* background-color: #eaf2ed; */
  margin: 4rem auto;
  max-width: 95%;

}
.colaboradores__heading {
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}
.colaboradores__contenido {
  display: grid;
  padding: 1rem;
}
@media (min-width: 992px) {
  .colaboradores__contenido {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .colaboradores__grid {
    grid-column: 1/2;
    grid-row: 1/2;
  }
  .colaboradores__descripcion {
    grid-column: 2/3;
    grid-row: 1/2;
  }
}

.colaboradores__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 2rem auto 0 auto;
}

.colaborador {
  width: 4rem;
  transition-property: scale(1.1);
  transition-duration: .3s;
}

.colaborador:hover{
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .colaborador {
    width: 5rem;
  }
}
@media (min-width: 992px) {

  .colaboradores__grid {
    display: flex;
    gap: 2rem;
    margin: 2rem auto;
    align-items: center;
  }
  .colaborador {
    width: 5rem;
  }
}
</style>




