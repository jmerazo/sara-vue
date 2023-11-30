<script setup>
import { ref } from "vue";
import { useChartLocateStore } from "@/stores/dashboard/chartLocate";

const chartStore = useChartLocateStore();

const colores = ref([
  "#008000",
  "#eb0000",
  "#eb0000",
  "#008000",
  "#eb0000",
  "#008000",
]);
const meses = ref([
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]);
const porcentaje = (cantidad, total) => {
  return Math.ceil((cantidad / total) * 100);
};
const mesActual = () => {
  const fecha = new Date(); // Obtener la fecha actual
  const mes = fecha.getMonth(); // Obtener el mes (0-11)
  
  // Devolver el nombre del mes
  return meses.value[mes];
};

function separarMiles(valor) {
  return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>

<template>
  <div class="contenedor">
    <div class="contenedor__encabezado">
      <h2 class="titulo__general">
        Monitoreos esperados para: {{ mesActual() }}
        <span class="titulo__total">{{
          separarMiles(chartStore.totalDepartamentos)
        }}</span>
      </h2>
    </div>
    <div
      class="graficos"
      v-for="(departamento, index) in chartStore.departamentos"
      :key="departamento"
    >
      <div class="grafico">
        <h1 class="barra__nombre">
          {{ departamento }}:
          <span class="barra__total"
            >{{separarMiles(chartStore.departamentoTotal[index]) }}
          </span>
        </h1>
        <div class="barra">
          <h1 class="barra__porcentaje">
            {{ porcentaje(
                  chartStore.departamentoRealizados[index],
                  chartStore.departamentoTotal[index]
                ) }} %
          </h1>
          <div
            class="barra__progreso"
            :style="{
              '--porcentaje':
                porcentaje(
                  chartStore.departamentoRealizados[index],
                  chartStore.departamentoTotal[index]
                ) + '%',
              '--color': colores[index],
            }"
          ></div>
        </div>
        <div class="cantidades">
          <p class="cantidades__nombre">
            Realizados:
            <span class="cantidades__realizadas"
              >{{separarMiles( chartStore.departamentoRealizados[index] )}}
            </span>
          </p>
          <p class="cantidades__nombre">
            Pendientes:
            <span class="cantidades__pendientes">{{
              separarMiles(chartStore.departamentoPendientes[index])
            }}</span>
          </p>
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
.contenedor__encabezado {
  margin: 2rem auto;
}
@media (min-width: 768px) {
  .contenedor__encabezado {
    margin: 3rem auto;
  }
}
.titulo__general {
  text-align: center;
  line-height: 1.1;
  margin: 0;
}
.titulo__total {
  font-weight: 900;
}
.grafico{
    margin-bottom: 2rem;
}
.barra__nombre {
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  text-align: center;
}
.barra__porcentaje {
  position: absolute;
  text-align: right;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* Asegura que el span esté sobre la barra */
  font-weight: 700;
  width: 95%;
  color: var(--blanco);
  font-size: 0.8rem;
}

@media (min-width: 800px) {
  .barra__porcentaje {
    top: 15%;
    font-size: 1.1rem;
  }
}
.barra__total {
  font-weight: 900;
}
.cantidades {
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
}
.cantidades__nombre {
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
}
.cantidades__realizadas,
.cantidades__pendientes {
  font-weight: 900;
}
.barra {
  height: 30px;
  background-color: rgb(100, 100, 100);
  position: relative;
  width: 100%;
  margin: 0 auto;
}
.barra__progreso {
  position: absolute;
  height: 100%;
  background-color: var(--color);
  animation: animacion-progreso 1s forwards;
  border-radius: 0 10px 10px 0;
}

@keyframes animacion-progreso {
  0% {
    width: 0%;
  }
  100% {
    width: var(--porcentaje);
  }
}
</style>