<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  scientificName: String,
  vernacularName: String
});
</script>

<template>
  <div class="relacionados">
    <h2 class="relacionados__titulo">Páginas de consultas relacionadas</h2>
    
    <div class="relacionados__flex">
      <a :href="'https://catalogoplantasdecolombia.unal.edu.co/es/'" target="_blank" class="relacionados__enlace">
        <img src="/logos/cat_plantas_liquines_col.png" title="Catálogo de plantas y liquenes de Colombia" />
      </a>
      <a :href="`https://tropicos.org/name/Search?name=${props.scientificName}`" target="_blank" class="relacionados__enlace">
        <img src="/logos/tropicos.png" title="Trópicos" />
      </a>
      <a :href="`https://catalogofloravalleaburra.eia.edu.co/search?key_search=${props.scientificName}`" target="_blank" class="relacionados__enlace">
        <img src="/logos/aburra.svg" title="Catálogo virtual de flora del Valle de Aburrá" />
      </a>
      <a :href="`https://powo.science.kew.org/results?q=${props.scientificName}`" target="_blank" class="relacionados__enlace">
        <img src="/logos/powo.png" title="Plants of the World Online" />
      </a>
      <a href="https://herbario.sinchi.org.co/herbario_v/dashboard/" target="_blank" class="relacionados__enlace">        
        <img src="/logos/sinchi.png" title="SINCHI" />
      </a>
      <a :href="`https://www.gbif.org/es/search?q=${props.scientificName}`" target="_blank" class="relacionados__enlace">
        <img src="/logos/gbif.png" title="GBIF" />
      </a>
      <a :href="`https://catalogo.biodiversidad.co/search/basic?q=${props.scientificName}`" target="_blank" class="relacionados__enlace">
        <img src="/logos/SIB.png" title="SIB Colombia" />
      </a>      
    </div>
  </div>
</template>

<style scoped>
.relacionados{
  margin: 3rem 0 2rem 0;
}
.relacionados__titulo{
  text-align: center;
  font-size: 1rem;
}
.relacionados__flex{
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 2rem;
}

.relacionados__enlace{
  width: 3rem;
  padding: 0;
  margin: 0;
  transition: transform .3s ease-in-out;
}
.relacionados__enlace:hover{
  transform: scale(1.2);
}
</style>
