<script setup>
import { useRoute, useRouter } from "vue-router"
import { useEspeciesStore } from "@/stores/species";
import { getFullImageUrl } from "@/helpers/";

const speciesStore = useEspeciesStore();
const defaultImageUrl = '/img/sin_img.png';
const router = useRouter()

const props = defineProps({
  specie: {
    type: Object,
    required: true
  }
});

const getBackgroundImageStyle = (images) => {
  if (images && images.length > 0 && images[0].img_general) {
    return {
      backgroundImage: `url(${getFullImageUrl(images[0].img_general)})`
    };
  }
  return {
    backgroundImage: `url(${defaultImageUrl})`
  };
};
</script>

<template>
  <div class="especie">
    <div class="card">
      <article
        class="card__contenido"
        :style="getBackgroundImageStyle(specie.images)"
      >
        <div class="card__data">
          <h2 class="card__titulo">{{ specie.vernacularName }}</h2>
          <span class="card__descripcion">
            <em class="scientific-name">{{ specie.scientificName }}</em>
            <strong class="authorship-name">{{ specie.scientificNameAuthorship }}</strong>
          </span>
          <span class="card__descripcion">familia: {{ specie.family }}</span>
          <button
            class="card__boton animacion"
            type="button"
            @click="router.push(`/busqueda/${specie.code_specie}`)">
          >
            <span> Ver Especie</span>
          </button>
        </div>
      </article>
    </div>
  </div>
</template>
<style scoped>
/* aritcle*/
.card__contenido {
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  height: 25rem;
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
  
}
.card__contenido:hover .card__data{
  bottom: 0.2rem;
}

.card__data {
  width: 70%;
  max-width: 20rem;
  height: 15rem;
  background-color: rgb(253, 253, 253);
  padding: .5rem;
  box-shadow: 0 8px 24px hsla(0, 0%, 0%, 0.15);
  border-radius: 1rem;
  position: absolute;
  bottom: -13rem;
  left: 0;
  right: 0;
  margin-inline: auto;
  transition: .6s ease-in-out all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card__data:hover {
  bottom: 0.2rem;
}

.card__titulo {
  margin: 0 0 1rem 0;
  padding: 0;
  text-align: center;
  font-size: 1.5rem;
}

.card__descripcion {
  padding: 0;
  text-align: center;
  font-size: 1rem;
  overflow: hidden;
}

.card__boton {
  display: inline-flex;
  width: 93%;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 2rem;
  background-color: var(--gris);
  color: var(--blanco);
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}
.card__boton span{
  position: relative;
  z-index: 2;
  transition: 0.3s ease all;
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
  transition: 0.4s ease-in-out all;
}
.animacion:hover::after {
  left: 0;
}

.scientific-name {
  font-style: italic; /* Cursiva */
  font-weight: bold;  /* Negrita */
  margin-right: 0.5rem; /* Añade un margen a la derecha */
}

.authorship-name {
  font-weight: bold;  /* Negrita */
}
</style>
