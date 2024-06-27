<script setup>
import { useModalStore } from "@/stores/modal";
import { useCandidateStore } from "@/stores/dashboard/reports/SpecieCandidates";
import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";

const modal = useModalStore();
const consulta = useCandidateStore();
function toggleDetalles(idLista) {
  const detalles = document.getElementById(idLista);
  detalles.classList.toggle("visible");
}
</script>

<template>
  <div class="modal" v-if="modal.modalCandidates">
    <div class="modal__contenido">
      <div v-if="consulta.monitoreosCandidato.length === 0" class="card">
        <h2 class="card__titulo">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> No se han
          realizado monitoreos para este candidato
        </h2>
        <button
          type="button"
          class="modal__boton"
          @click="modal.handleClickModalCandidate()"
        >
          Cerrar
        </button>
      </div>
      <div v-else>
        <div class="modal__encabezado">
          <h2 class="modal__titulo">
            Especie: <span>{{ consulta.nombreEspecie }}</span>
          </h2>
          <hr />
          <div class="modal__descargas">
            <p class="modal__subtitulo">Monitoreos del candidato</p>
            <div class="botones__descarga" >
              <a
                @click="
                  descargarExcel(
                    consulta.monitoreosCandidato,
                    `Monitoreos candidato ${consulta.idCandidato}- ${obtenerFecha()}`
                  )
                "
                class="boton"
                href="#"
                ><font-awesome-icon
                  class="boton__excel"
                  :icon="['fas', 'file-excel']"
              /></a>
              <a
                @click="
                  descargarPdf(
                    consulta.monitoreosCandidato,
                    `Monitoreos del candidato ${
                      consulta.idCandidato
                    } - ${obtenerFecha()}`,
                    8,
                    2
                  )
                "
                class="boton"
                href="#"
                ><font-awesome-icon
                  class="boton__pdf"
                  :icon="['fas', 'file-pdf']"
              /></a>
            </div>
            
           
          </div>
         
        </div>
        <div class="card">
          <div
            v-for="candidato in consulta.monitoreosCandidato"
            :key="candidato.ShortcutIDEV"
          >
            <ul class="lista__monitoreo">
              <li
                class="monitoreo"
                @click="toggleDetalles(candidato.fecha_monitoreo)"
              >
                <h2 class="card__titulo">
                  <font-awesome-icon
                    :icon="['fas', 'folder']"
                    :style="{ color: 'var(--primary)' }"
                  />
                  Feha monitoreo: {{ candidato.fecha_monitoreo }}
                </h2>

                <div :id="candidato.fecha_monitoreo" class="detalles">
                  <p class="detalle__item">
                    precipitacion:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.precipitacion }"
                      >{{ candidato.precipitacion }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    temperatura:
                    <span class="detalle__dato"
                      >{{ candidato.temperatura }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    humedad:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.humedad }"
                      >{{ candidato.humedad }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    cap:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.cap }"
                      >{{ candidato.cap ? candidato.cap : "Por evaluar" }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Altura comercial:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.altura_comercial }"
                      >{{
                        candidato.altura_comercial
                          ? candidato.altura_comercial
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Altura Total:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.altura_total }"
                      >{{
                        candidato.altura_total
                          ? candidato.altura_total
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Eje X:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.eje_x }"
                      >{{ candidato.eje_x ? candidato.eje_x : "Por evaluar" }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Eje y:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.eje_y }"
                      >{{ candidato.eje_y ? candidato.eje_y : "Por evaluar" }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Eje Z:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.eje_z }"
                      >{{ candidato.eje_z ? candidato.eje_z : "Por evaluar" }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Fitosanitario:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.fitosanitario }"
                      >{{
                        candidato.fitosanitario
                          ? candidato.fitosanitario
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Afectacion:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.afectacion }"
                      >{{
                        candidato.afectacion
                          ? candidato.afectacion
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Follaje:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.follaje }"
                      >{{
                        candidato.follaje ? candidato.follaje : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Follaje porcentaje:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.follaje_porcentaje }"
                      >{{
                        candidato.follaje_porcentaje
                          ? candidato.follaje_porcentaje
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Observaciones flor:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.observaciones_flor }"
                      >{{
                        candidato.observaciones_flor
                          ? candidato.observaciones_flor
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Frutos verdes:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.frutos_verdes }"
                      >{{
                        candidato.frutos_verdes
                          ? candidato.frutos_verdes
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Estado madurez:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.estado_madurez }"
                      >{{
                        candidato.estado_madurez
                          ? candidato.estado_madurez
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Cantidad frutos:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.cant_frutos }"
                      >{{
                        candidato.cant_frutos
                          ? candidato.cant_frutos
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Medida - Peso frutos:
                    <span
                      class="detalle__dato"
                      :class="{ sinInfo: !candidato.medida_peso_frutos }"
                      >{{
                        candidato.medida_peso_frutos
                          ? candidato.medida_peso_frutos
                          : "Por evaluar"
                      }}
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <button
            type="button"
            class="modal__boton"
            @click="modal.handleClickModalCandidate()"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal__descargas{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
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
.modal__titulo {
  font-size: 1rem;
  margin: 0 auto;
  padding: 0;
}
.modal__subtitulo {
  font-size: 1rem;
  margin: 1rem auto;
}
/* card */
.card__titulo {
  font-size: 1rem;
  border: 1px solid var(--primary);
  padding: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  width: 95%;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}
.card__titulo:hover {
  background-color: var(--primary);
  color: var(--blanco);
}

/* listado - detalle monitoreo */
.lista__monitoreo {
  list-style: none;
  padding: 0;
  margin: 0;
}
.monitoreo {
  border-radius: 5px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.detalles {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}
.detalle__item {
  font-size: 0.8rem;
}
.detalle__dato {
  font-weight: 700;
}
.detalles.visible {
  max-height: 800px; /* Ajusta la altura máxima según tus necesidades */
  transition: max-height 0.5s ease-in-out;
}
.sinInfo {
  color: rgb(240, 176, 176);
}
</style>