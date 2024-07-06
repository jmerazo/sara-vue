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
      <div v-for="(departamento, index) in chartStore.departamentos" :key="departamento">
        <div :class="{
        grafico: true,
        menor: porcentaje(chartStore.CantidadDepartamento[index]) < 50,
      }" :style="{
        '--i': porcentaje(chartStore.CantidadDepartamento[index]),
        '--clr': colores[index],
      }">
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
  font-size: 1.3rem;
  margin: 3rem 0;
}

.graficos {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .titulo__graficos {
    margin: 4rem 0;
  }

  .graficos {
    flex-direction: row;
    gap: 2rem;
    margin-bottom: 3rem;
    
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
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.3rem;
  z-index: 1;
}

.grafico .grafico__departamento {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  font-size: 1rem;
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
  inset: 8px;
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

.grafico__cantidad {
  font-weight: 600;
}
</style>
