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
        :src="especies.getFullImageUrl(especie.img_general)"
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
        @click="especies.seleccionarEspecie(especie.cod_especie)"
      >
        Ver Especie
      </button>
    </div>
  </div>
</template>
<style scoped>
.especie__img img{
  height: 15rem;
  width: 100%;
  margin: 0 auto;
}
.especie {
  position: relative;
  overflow: hidden;
  background-color: #f3f1f1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.especie:hover .especie__img {
  transform: scale(1.08);
}

.especie__img {
  transition: transform 0.6s ease;
}

.especie__informacion {
  display: flex;
  gap: .7rem;
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
  font-size: 1.1rem;
  color: var(--gris);
}

.especie__nombre-cientifico {
  white-space: nowrap; /* Evita saltos de línea automáticos */
  overflow: hidden; /* Oculta el contenido que desborda */
  text-overflow: ellipsis; /* Agrega puntos suspensivos (...) para indicar que hay más contenido */
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  padding: 0 10px;
  margin: 0;
}
.especie__familia {
  text-align: center;
  font-size: 1rem;
  margin: 0;
}
span {
  font-weight: 600;
  color: var(--gris);
}

.especie__boton {
  background-color: var(--primary);
  padding: .8rem;
  color: var(--blanco);
  font-weight: 700;
  transition: background-color .4s ease-in-out;
  font-size: 1rem;
}
.especie__boton:hover {
  background-color: var(--primary-hover);
}

</style>
