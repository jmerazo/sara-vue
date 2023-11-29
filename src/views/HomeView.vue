<script setup>
import { onMounted } from "vue";
import { useGeoCandidateTrees } from "@/stores/candidate";
import { useAverageSpecie } from "@/stores/average";
import { useHomeStore } from "@/stores/home";

const geoStore = useGeoCandidateTrees();
const averageStore = useAverageSpecie();
const homeStore = useHomeStore();

onMounted(async () => {
  await geoStore.fetchData();
  await averageStore.fetchData();
});

//top de especies
</script>

<template>
  <section class="contenedor proyecto">
    <div class="proyecto__contenido">
      <h2 class="proyecto__heading">PROYECTO SEMILLAS CTEI</h2>
      <p class="proyecto__texto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fugiat
        adipisci facere quis! Provident molestiae non minus inventore ex
        perspiciatis in saepe impedit quae facilis, molestias quas praesentium
        consectetur quibusdam!
      </p>
    </div>
  </section>

  <section class="contenedor topEspecies">
    <h3 class="topEspecies__heading">Top especies más buscadas</h3>
    <div class="topEspecies__grid">
      <!-- especie -->
      <div
        class="topEspecie__contenido"
        v-for="(item, index) in homeStore.urlImagenesHome"
        :key="index"
      >
        <div
          class="topEspecie__contenido-imagen"
          :style="{ backgroundImage: 'url(' + item.url + ')' }"
        ></div>
        <a class="topEspeice__enlace">{{ item.nombreEspecie }}</a>
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
  margin-top: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

@media (min-width: 920px) {
  .proyecto {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 8rem;
    max-width: 90rem;
  }
}

.proyecto__contenido {
  background-color: var(--blanco);
  padding: 2rem;
}

@media (min-width: 920px) {
  .proyecto__contenido {
    grid-column: 2/4;
  }
}

.proyecto__heading {
  margin-bottom: 1rem;
  text-align: center;
}

.proyecto__heading {
  text-align: center;
  font-size: 2rem;
  margin-top: 0;
}

@media (min-width: 768px) {
  .proyecto__heading {
    font-size: 3rem;
  }
}

@media (min-width: 920px) {
  .proyecto__heading {
    text-align: left;
    font-size: 3rem;
  }

  .proyecto__texto {
    margin-bottom: 1rem;
  }
}

/* top especies */
.topEspecies {
  margin-top: 5rem;
  max-width: 90rem;
}
.topEspecies__heading {
  font-size: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .topEspecies__heading {
    font-size: 3rem;
    margin-bottom: 3rem;
  }
}
@media (min-width: 992px) {
  .topEspecies__heading {
    font-size: 4rem;
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
  transition-property: scale(1.2);
  transition-duration: .5s;
  height: 32rem;
}

.topEspecie__contenido:hover {
  transform: scale(1.05);
}
.topEspecie__contenido-imagen {
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 30rem;
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
  padding: 1rem;
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
  margin: 5rem auto;
  max-width: 90rem;

}
.colaboradores__heading {
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}
.colaboradores__contenido {
  display: grid;
  padding: 1.5rem;
}
@media (min-width: 992px) {
  .colaboradores__contenido {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
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
  margin: 2rem auto;
}

.colaborador {
  width: 5rem;
  transition-property: scale(1.4);
  transition-duration: .3s;
}

.colaborador:hover{
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .colaborador {
    width: 10rem;
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
    width: 10rem;
  }
}
</style>




