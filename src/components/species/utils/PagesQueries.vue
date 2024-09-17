<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  scientificName: {
    type: String,
    required: true,
  },
  vernacularName: {
    type: String,
    required: true,
  },
});

const relatedLinks = [
  {
    url: `https://tropicos.org/name/Search?name=${props.scientificName}`,
    img: '/logos/tropicos.png',
    title: 'Trópicos'
  },
  {
    url: `https://powo.science.kew.org/results?q=${props.scientificName}`,
    img: '/logos/powo.png',
    title: 'Plants of the World Online'
  },
  {
    url: `https://www.sinchi.org.co`,
    img: '/logos/sinchi.png',
    title: 'SINCHI'
  },
  {
    url: `https://www.gbif.org/es/search?q=${props.scientificName}`,
    img: '/logos/gbif.png',
    title: 'GBIF'
  },
  {
    url: `https://catalogo.biodiversidad.co/search/basic?q=${props.scientificName}`,
    img: '/logos/SIB.png',
    title: 'SIB Colombia'
  }
];
</script>

<template>
  <div class="related__page">

    <h2>Consultar la especie <span style="border-bottom: 3px solid var(--primary);">{{ props.vernacularName }}</span> en:</h2>
    <div class="related__page-content">

      <div v-for="(link, index) in relatedLinks" :key="index" class="related__page-link">
        <a :href="link.url" target="_blank">
          <img :src="link.img" :title="link.title" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.related__page {
  margin-top: 10rem;
  padding-bottom: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top, var(--primary-backgound), var(--blanco));
}

.related__page h2 {
  color: var(--gris);
  margin-bottom: 3rem;
  text-align: center;
}

.related__page .related__page-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .related__page .related__page-content {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }
}

.related__page-content .related__page-link a {
  display: block;
  transition: all .2s ease-in-out;

}

.related__page-content .related__page-link:hover a {
  transform: scale(1.2);
}



.related__page-content .related__page-link img {
  width: 5rem;
}
</style>
