<script setup>
import { ref } from "vue";
import { useChartsStore } from "@/stores/dashboard/charts";

const chartStore = useChartsStore();

const porcentaje = (cantidad) => {
  const valor = cantidad;
  const total = chartStore.totalDepartamentos;
  return Math.ceil((valor / total) * 100);
};

const colores = ref([
  "#eb0000",
  "#008000",
  "#eb0000",
  "#008000",
  "#eb0000",
  "#008000",
]);
</script>
<template>
  <div class="contenedor">
    <h1 class="titulo__graficos">
      Monitoreos:
      <span class="grafico__cantidad">{{ chartStore.separarMiles(chartStore.totalDepartamentos) }}</span>
    </h1>
    <div class="graficos">
      <div
        v-for="(departamento, index) in chartStore.departamentos"
        :key="departamento"
      >
        <div
          :class="{
            grafico: true,
            menor: porcentaje(chartStore.CantidadDepartamento[index]) < 50,
          }"
          :style="{
            '--i': porcentaje(chartStore.CantidadDepartamento[index]),
            '--clr': colores[index],
          }"
        >
          <h3 class="grafico__porcentaje">
            {{ porcentaje(chartStore.CantidadDepartamento[index]) }} %
          </h3>
          <h4 class="grafico__departamento">
            {{ departamento }}
            <span class="grafico__cantidad" id="grafico__cantidad">
              {{
                chartStore.separarMiles(chartStore.CantidadDepartamento[index])
              }}
            </span>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.contenedor {
  background-color: var(--blanco);
  padding: 2rem;
  border-radius: 10px;
}
.titulo__graficos {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 0;
  
}
.graficos {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

@media (min-width: 768px) {
  .graficos {
    flex-direction: row;
    gap: 2rem;
  }
}

.graficos .grafico {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
  background: gray linear-gradient(to right, transparent 50%, var(--clr) 0);
  
}

.grafico .grafico__porcentaje {
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  z-index: 1;
}
.grafico .grafico__departamento {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
}

.graficos .grafico::before {
  content: "";
  display: block;
  height: 100%;
  margin-left: 50%;
  transform-origin: left;
  border-radius: 0 100% 100% 0/50%;
}
.graficos .grafico::after {
  content: "";
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: #fff;
}

.graficos .grafico::before {
  background: var(--clr);
  animation: animacion-progreso 1s forwards;
  
}
@keyframes animacion-progreso {
  0% {
    transform: rotate(calc(((var(--i) - 0) * 0.01turn)));
  }
  100% {
    transform: rotate(calc(((var(--i) - 50) * 0.01turn)));
  }
}
/* si el valor es menor al 50% se debe poner la classe menor */
.graficos .grafico.menor::before {
  background: gray;
  animation: animacion-progreso2 1s forwards;
}
@keyframes animacion-progreso2 {
  0% {
    transform: rotate(calc(((var(--i) - 50) * 0.01turn)));
  }
  100% {
    transform: rotate(calc(((var(--i) - 0) * 0.01turn)));
  }
}

.grafico__cantidad{
  font-weight: 900;
}
</style>
