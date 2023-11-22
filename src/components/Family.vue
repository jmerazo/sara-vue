<script setup>
import { useConsultaStore } from "../stores/consulta";

const consulta = useConsultaStore();

const mostrarIndividuos = (nom_familia) => {
  consulta.consulta.categoria = "Familia";
  consulta.consulta.vrBuscar = nom_familia;
  consulta.mostrarConsulta();
};

defineProps({
  familia: {
    type: Object,
  },
});
</script>
<template>
  <div class="familia">
    <div class="familia__titulo">
      <div class="familia__img">
        <!-- Contenido de la sección 1 -->
        <img src="../assets/gifFamlia.gif" alt="GIF familia" />
      </div>
      <p class="familia__nombre">{{ familia.familia }}</p>
    </div>

    <div class="familia__informacion">
      <p class="familia__caracteristicas">
        <span>Caraterísticas similares:</span>
        Flores vistosas y grandes, hojas palmeadas o lobuladas, frutos en
        cápsulas, distribución global en climas cálidos, importancia ornamental
        y en productos (algodón, okra), polinización por insectos.
      </p>
      <button
        class="familia__boton"
        @click="mostrarIndividuos(familia.familia)"
      >
        Ver individuos
      </button>
    </div>
  </div>
</template>

<style scoped>
/* familia componente general */
.familia {
  position: relative;
  overflow: hidden;
  background-color: #f3f1f1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: transform 0.9s ease;
}
.familia:hover {
  transform: scale(1.05);
}

/* familia grif */
.familia__img {
  width: 2rem;
}

/* familia imagen-nombre */
.familia__titulo{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
}
/* informacion familia */
.familia__informacion {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-between;
  color: var(--gris);
}

.familia__nombre {
  white-space: nowrap; /* Evita saltos de línea automáticos */
  overflow: hidden; /* Oculta el contenido que desborda */
  text-overflow: ellipsis; /* Agrega puntos suspensivos (...) para indicar que hay más contenido */
  margin-top: 1rem;
  margin-bottom: 0;
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  color: var(--gris);
}
.familia__caracteristicas{
  text-align: justify;
  margin: 0;
  padding: 10px;
}
span {
  font-weight: 600;
}

/* boton */
.familia__boton {
  background-color: var(--primary);
  padding: 1rem;
  color: var(--blanco);
  font-weight: 700;
  transition: background-color 0.4s ease-in-out;
}
.familia__boton:hover {
  background-color: var(--primary-hover);
}
</style>