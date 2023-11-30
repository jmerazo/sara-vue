<script setup>
import {ref} from 'vue'
import { useChartLocateStore } from "@/stores/dashboard/chartLocate";

const chartStore = useChartLocateStore();
const colores = ref([
  "#6e9167",
  "#ffdd8c",
  "#ff8030",
  "#f2a297",
  "#f4436f",
  "#4180ab",
  "#8ab3cf",
  "#23998e",
  "#3bcb38",
  "#f0a912",
  "#efab45",
  "#67ef89",
  "#cd23ab",
  "#12ffc0",
  "#6e9167",
  "#ffdd8c",
  "#ff8030",
  "#f2a297",
  "#f4436f",
  "#4180ab",
  "#8ab3cf",
  "#23998e",
  "#3bcb38",
  "#f0a912",
  "#efab45",
  "#67ef89",
  "#cd23ab",
  "#12ffc0",
]);
const porcentaje = (cantidad,total) => {
  return Math.ceil((cantidad / total) * 100);
};
</script>
<template>
  <div class="contenedor">
    <div class="tarjetas__grid" >
      <div class="card" :style="{'--color':colores[index]}" v-for="(municipio,index) in chartStore.chartMunicipios" :key="municipio" >
        <h1 class="card__nombre">
          {{ municipio }}: <span class="card__total">{{ chartStore.chartTotales[index] }}</span>
        </h1>
        <div class="card__contenido">
          <div class="card__decripcion">
            <p class="card__texto">
              Realizadas: <span class="card__valores">{{ chartStore.chartRealizados[index] }}</span>
            </p>
            <p class="card__texto">
              Prendientes: <span class="card__valores">{{ chartStore.chartPendientes[index] }}</span>
            </p>
          </div>
          <div class="card__porcentaje">
            <span class="porcentaje">{{ porcentaje(chartStore.chartRealizados[index],chartStore.chartTotales[index]) }} %</span>
          </div>
        </div>
      </div>

    </div>
  </div>
  
</template>
<style scoped>

.contenedor {
  padding: 1rem;
  background-color: var(--blanco);
}
.tarjetas__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .tarjetas__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .tarjetas__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background-color: var(--color);
  width: 100%;
  color: var(--gris);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.card__nombre {
  width: 100%;
  font-size: 1.1rem;
  margin: 0;
}
.card__total {
  font-weight: 900;
}
.card__contenido {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card__texto {
  color: var(--gris);
  line-height: 1.4;
}
.card__valores {
  font-size: 1.1rem;
  font-weight: 900;
}
.porcentaje {
  font-weight: 900;
  font-size: 1.5rem;
  margin: 1rem;
  color: var(--gris);
  text-align: center;
  opacity: .8;
  
}
</style>