<script setup>
import { useModalStore } from "@/stores/modal";

import { useCandidateStore } from "@/stores/dashboard/reports/SpecieCandidates";

const modal = useModalStore();
const consulta = useCandidateStore();
</script>

<template>
  <div class="modal" v-if="modal.modalInfoCandidate">
    <div class="modal__contenido">
      <div class="modal__encabezado">
        <h2 class="modal__titulo">
          Especie: <span>{{ consulta.nombreEspecie }}</span>
        </h2>
        <hr />
        <p class="modal__subtitulo">Datos del candidato</p>
      </div>
      <div class="modal__flex">
        <div class="card">
          <p class="card__info">
            Dominancia:
            <span class="card__dato">{{
              consulta.infoCandidato.dominancia_if
            }}</span>
          </p>
          <p class="card__info">
            Forma Fuste:
            <span class="card__dato">{{
              consulta.infoCandidato.forma_fuste
            }}</span>
          </p>

          <p class="card__info">
            Estado copa:
            <span class="card__dato">{{
              consulta.infoCandidato.estado_copa
            }}</span>
          </p>
          <p class="card__info">
            Pocicion copa:
            <span class="card__dato">{{
              consulta.infoCandidato.posicion_copa
            }}</span>
          </p>
          <p class="card__info">
            Fitosanitario:
            <span class="card__dato">{{
              consulta.infoCandidato.fitosanitario
            }}</span>
          </p>
          <p class="card__info">
            Alt Bifurcacion:
            <span class="card__dato">{{
              consulta.infoCandidato.alt_bifurcacion
            }}</span>
          </p>
          <p class="card__info">
            Presencia:
            <span class="card__dato">{{
              consulta.infoCandidato.presencia
            }}</span>
          </p>
        </div>
        <div class="card">
          <p class="card__info">
            Altitud:
            <span class="card__dato">{{ consulta.infoCandidato.altitud }}</span>
          </p>
          <p class="card__info">
            Altura comercial:
            <span class="card__dato">{{
              consulta.infoCandidato.altura_comercial
            }}</span>
          </p>
          <p class="card__info">
            Altura total:
            <span class="card__dato">{{
              consulta.infoCandidato.altura_total
            }}</span>
          </p>
          <p class="card__info">
            Cobertura:
            <span class="card__dato">{{
              consulta.infoCandidato.cobertura
            }}</span>
          </p>
          <p class="card__info">
            Resultado:
            <span class="card__dato card__dato--resultado">{{
              consulta.infoCandidato.resultado
            }}</span>
          </p>
        </div>
      </div>
      <div class="modal__resultado">
        <div class="card">
          <p class="card__info">
            Evaluación:
            <span class="card__dato card__dato--resultado">{{
              consulta.infoCandidato.evaluacion
            }}</span>
          </p>
        </div>
      </div>
      <div class="modal__botones">
        <input
          @click="modal.handleClickModalInfoCandidate()"
          class="modal__boton"
          type="button"
          value="Cerrar"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 11000;
}

.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin-top: 4rem;
}
@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}
@media (min-width: 1440px) {
  .modal__contenido {
    width: 30%;
  }
}
.modal__titulo {
  font-size: 1rem;
  margin: 0 auto;
  padding: 0;
}
.modal__subtitulo {
  font-size: 1rem;
  margin: 0 auto;
}

.modal__flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal__boton {
  font-weight: 700;
  color: var(--blanco);
  background-color: var(--secondary);
  width: 95%;
  border-radius: 5px;
  margin-top: 2rem;
  padding: 0.4rem;
  transition: background-color 0.3s ease;
}
.modal__boton:hover {
  background-color: var(--secondary-hover);
}
/* card modal */
.card {
  padding: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.card__info {
  font-size: 0.8rem;
  margin: 0.2rem;
  padding: 0;
}

.card__dato {
  font-weight: 700;
}
.card__dato--resultado {
  color: var(--primary);
}
.card:first-of-type {
  margin-top: 2rem;
}
</style>