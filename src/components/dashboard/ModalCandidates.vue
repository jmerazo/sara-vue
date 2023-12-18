<script setup>
import { useModalStore } from "@/stores/modal";
import { useCantidateStore } from "@/stores/dashboard/reports/SpecieCanditates";

const modal = useModalStore();
const consulta = useCantidateStore();
function toggleDetalles(idLista) {
  const detalles = document.getElementById(idLista);
  detalles.classList.toggle("visible");
}
</script>

<template>
  <div class="modal" v-if="modal.modalInfoCandidate">
    <div class="modal__contenido">
      <div v-if="consulta.monitoreosCandidato.length === 0" class="card">
        <h2 class="card__titulo">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> No se han
          realizado monitoreos para este candidato
        </h2>
      </div>
      <div v-else>
        <div class="modal__encabezado">
          <h2 class="modal__titulo">
            Especie: <span>{{ consulta.nombreEspecie }}</span>
          </h2>
          <hr />
          <p class="modal__subtitulo">Monitoreos del candidato</p>
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
                  Feha: {{ candidato.fecha_monitoreo }}
                </h2>

                <div :id="candidato.fecha_monitoreo" class="detalles">
                  <p class="detalle__item">
                    precipitacion:
                    <span class="detalle__dato"
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
                    <span class="detalle__dato">{{ candidato.humedad }} </span>
                  </p>
                  <p class="detalle__item">
                    cap:
                    <span class="detalle__dato">{{ candidato.cali }} </span>
                  </p>
                  <p class="detalle__item">
                    Altura comercial:
                    <span class="detalle__dato"
                      >{{ candidato.altura_comercial }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Altura Total:
                    <span class="detalle__dato"
                      >{{ candidato.altura_total }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Eje X:
                    <span class="detalle__dato">{{ candidato.eje_x }} </span>
                  </p>
                  <p class="detalle__item">
                    Eje y:
                    <span class="detalle__dato">{{ candidato.eje_y }} </span>
                  </p>
                  <p class="detalle__item">
                    Eje Z:
                    <span class="detalle__dato">{{ candidato.eje_z }} </span>
                  </p>
                  <p class="detalle__item">
                    Fitosanitario:
                    <span class="detalle__dato"
                      >{{ candidato.fitosanitario }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Afectacion:
                    <span class="detalle__dato"
                      >{{ candidato.afectacion }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Follaje:
                    <span class="detalle__dato">{{ candidato.follaje }} </span>
                  </p>
                  <p class="detalle__item">
                    Follaje porcentaje:
                    <span class="detalle__dato"
                      >{{ candidato.follaje_porcentaje }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Observaciones flor:
                    <span class="detalle__dato"
                      >{{ candidato.observaciones_flor }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Frutos verdes:
                    <span class="detalle__dato"
                      >{{ candidato.frutos_verdes }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Estado madurez:
                    <span class="detalle__dato"
                      >{{ candidato.estado_madurez }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Cantidad frutos:
                    <span class="detalle__dato"
                      >{{ candidato.cant_frutos }}
                    </span>
                  </p>
                  <p class="detalle__item">
                    Medida - Peso frutos:
                    <span class="detalle__dato"
                      >{{ candidato.medida_peso_frutos }}
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 2;
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
  margin: 1rem auto 2rem auto;
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
  transition: max-height 0.9s ease-in-out;
}
.detalle__item {
  font-size: 0.8rem;
}
.detalle__dato {
  font-weight: 700;
}
.detalles.visible {
  max-height: 800px; /* Ajusta la altura máxima según tus necesidades */
  transition: max-height 0.9s ease-in-out;
}
</style>