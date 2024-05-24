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
  <div class="card">
    <div
      class="front"
      :style="{
        backgroundImage:
          'url(/img/background-family.jpeg)',
      }"
    >
      <div class="front__content">
        <p class="card__label">{{ familia.familia }}</p>
      </div>
    </div>
    <div class="back">
      <p class="card__text">
        {{ familia.description }}
      </p>
      <button
        class="card__boton animacion"
        @click="mostrarIndividuos(familia.familia)"
      >
        <span>Ver Especies</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* familia componente general */

.card {
  width: 300px;
  height: 200px;
  position: relative;
  perspective: 1000px;
}
.front,
.back {
  position: absolute;
  width: 300px;
  height: 200px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  box-sizing: border-box;
  transition: transform 0.9s;
  border-radius: 1rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.back {
  padding: 2rem;
}

@media (min-width: 768px) {
  .card {
    width: 400px;
    height: 300px;
  }
  .front,
  .back {
    position: absolute;
    width: 400px;
    height: 300px;
  }
}

.front {
  background-position: center;
  background-size: cover;
}
.front::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  border-radius: 1rem;
}

.back {
  background-color: rgb(255, 255, 255);
  transform: rotateY(180deg);
}

.card:hover .front {
  transform: rotateY(-180deg);
}

.card:hover .back {
  transform: rotateY(0deg);
}

.card .front {
  transform: rotateY(0deg);
}

.card .back {
  transform: rotateY(180deg);
}

.card__label {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  z-index: 100;
}

.card__text {
  font-size: 0.8rem;
  font-weight: 600;
}

@media (min-width: 768px) {
  .card__text {
    font-size: 1rem;
    text-align: center;
  }
}

.front__content {
  border-radius: 50%;
  width: 11rem;
  height: 11rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--blanco);
  z-index: 100;
}

@media (min-width: 767px) {
  .front__content {
    width: 17rem;
    height: 17rem;
  }
  .card__label {
    font-size: 1.35rem;
  }
}

/* card boton ver especie */

.card__boton {
  display: inline-flex;
  width: 80%;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 2rem;
  background-color: var(--gris);
  color: var(--blanco);
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
}

@media (min-width: 767px) {
  .card__boton{
    width: 50%;
  }
}

.card__boton span {
  position: relative;
  z-index: 2;
  transition: 0.3s ease all;
}

.animacion::after {
  content: "";
  width: 150%;
  position: absolute;
  z-index: 1;
  transition: 0.3s ease-in-out all;
  top: 0;
  left: calc(-100% - 80px); /* calc elemnt widht with border-right */
  border-right: 80px solid transparent;
  border-bottom: 40px solid var(--primary);
  transition: 0.4s ease-in-out all;
}
.animacion:hover::after {
  left: 0;
}
</style>