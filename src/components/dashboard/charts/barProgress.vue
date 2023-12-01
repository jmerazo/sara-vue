<script setup>

const props = defineProps([
  "municipio",
  "color",
  "totalMunicipios",
  "cantidadMunicipio",
]);

const porcentaje = (cantidad) => {
  return Math.ceil((cantidad / props.totalMunicipios) * 100);
};

function separarMiles(valor) {
  return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>

<template>
  <div class="barra">
    <h1 class="barra__nombre">
      {{ props.municipio }}
      <span class="barra__porcentaje"
        >{{ separarMiles(props.cantidadMunicipio) }} -
      </span>
      <span class="barra__porcentaje"
        >{{ porcentaje(props.cantidadMunicipio) }} %</span
      >
    </h1>
    <div
      class="barra__progreso"
      :style="{
        '--porcentaje': porcentaje(props.cantidadMunicipio) + '%',
        '--color': props.color,
      }"
    ></div>
  </div>
</template>
<style scoped>
.barra__porcentaje {
  font-weight: 900;
}

.barra__nombre {
  position: absolute;
  text-align: right;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* Asegura que el span esté sobre la barra */
  font-weight: 700;
  width: 90%;
  color: var(--blanco);
  font-size: 0.8rem;
}

@media (min-width: 800px) {
  .barra__nombre {
    top: 22%;
    font-size: 1.1rem;
  }
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