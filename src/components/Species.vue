<script setup>
import { useEspeciesStore } from "@/stores/species";

const especies = useEspeciesStore();

defineProps({
  especie: {
    type: Object,
  },
});
</script>
<template>
  <div class="especie">
    <div class="especie__img">
      <img
        alt="imagen especie"
        src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg"
      />
    </div>

    <div class="especie__informacion">
      <p class="especie__nombre-comun">{{ especie.nom_comunes }}</p>
      <p class="especie__nombre-cientifico">{{ especie.nombre_cientifico }}</p>
      <p class="especie__familia">
        <span>Familia: </span>{{ especie.familia }}
      </p>
      <button
        class="especie__boton"
        type="button"
        @click="especies.seleccionarEspecie(especie.nom_comunes)"
      >
        Ver Especie
      </button>
    </div>
  </div>
</template>
<style scoped>
.especie {
  position: relative;
  overflow: hidden;
  background-color: #f3f1f1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.especie:hover .especie__img {
  transform: scale(1.1);
}

.especie__img {
  transition: transform 0.9s ease;
}

.especie__informacion {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-between;
  
}

.especie__nombre-comun {
  white-space: nowrap; /* Evita saltos de línea automáticos */
  overflow: hidden; /* Oculta el contenido que desborda */
  text-overflow: ellipsis; /* Agrega puntos suspensivos (...) para indicar que hay más contenido */
  margin-top: 1rem;
  margin-bottom: 0;
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
}

.especie__nombre-cientifico {
  white-space: nowrap; /* Evita saltos de línea automáticos */
  overflow: hidden; /* Oculta el contenido que desborda */
  text-overflow: ellipsis; /* Agrega puntos suspensivos (...) para indicar que hay más contenido */
  text-align: center;
  font-weight: 500;
  line-height: 1;
  padding: 0 10px;
  margin: 0;
  
}
.especie__familia {
  text-align: center;
  margin: 0;
}
span {
  font-weight: 600;
}

.especie__boton {
  background-color: var(--primary);
  padding: 1rem;
  color: var(--blanco);
  font-weight: 700;
  transition: background-color .4s ease-in-out;
}
.especie__boton:hover {
  background-color: var(--primary-hover);

}

</style>
