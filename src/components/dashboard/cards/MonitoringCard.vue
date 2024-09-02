<script setup>
import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";


const monitoring = useGeneralMonitoring()
defineProps({
  monitoreo: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

//furncion para mostrar el contenido monitoreos
function toggleDetalles(contenedor) {
  const contenido = document.getElementById(contenedor);

  if (contenido.classList.contains("active")) {
    contenido.classList.remove("active");
  } else {
    contenido.classList.add("active");
  }
}

</script>
<template>
  <div>
    <div class="card">
      <div class="card__encabezado">
        <p class="fecha__monitoreo">
          Fecha Monitoreo:
          <span class="dato">{{ monitoreo.fecha_monitoreo }}</span>
        </p>
      </div>
      <!-- datos de la especie -->
      <div class="especie">
        <div class="especie__imagen">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M7 3V1H9V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V9H20V5H17V7H15V5H9V7H7V5H4V19H10V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7ZM17 12C14.7909 12 13 13.7909 13 16C13 18.2091 14.7909 20 17 20C19.2091 20 21 18.2091 21 16C21 13.7909 19.2091 12 17 12ZM11 16C11 12.6863 13.6863 10 17 10C20.3137 10 23 12.6863 23 16C23 19.3137 20.3137 22 17 22C13.6863 22 11 19.3137 11 16ZM16 13V16.4142L18.2929 18.7071L19.7071 17.2929L18 15.5858V13H16Z">
            </path>
          </svg>
        </div>
        <p class="especie__info">
          <span class="dato" :class="{ sinInfo: !monitoreo.specie.vernacularName }">{{
            monitoreo.specie.vernacularName
          }}</span>
        </p>
        <p class="especie__info">
          <span
            class="dato"
            :class="{ sinInfo: !monitoreo.specie.nombre_cientifico }"
            >{{ monitoreo.specie.nombre_cientifico }}</span
          >
        </p>
       
        <p class="especie__info">
          # placa:
          <span class="dato" :class="{ sinInfo: !monitoreo.numero_placa }">{{
            monitoreo.evaluacion.numero_placa ? monitoreo.evaluacion.numero_placa : "Sin placa"
          }}</span>
        </p>
      </div>
      <hr />
      <!-- fin especie -->
      <!-- datos Desarrollo especie -->
      <div class="informacion__seccion" :id="index + 'a'">
        <button
          id="boton-especie"
          class="card__boton"
          @click="toggleDetalles(index + 'a')"
        >
          Desarrollo especie
        </button>
        <div class="datos">
          <h4 class="datos__titulo">Datos Fruto</h4>

          <p class="datos__item">
            Color fruto:
            <span class="dato" :class="{ sinInfo: !monitoreo.color_fruto }">{{
              monitoreo.color_fruto ? monitoreo.color_fruto : "No reportado"
            }}</span>
          </p>

          <p class="datos__item">
            Fauna frutos:
            <span class="dato" :class="{ sinInfo: !monitoreo.fauna_frutos }">{{
              monitoreo.fauna_frutos ? monitoreo.fauna_frutos : "No reportado"
            }}</span>
          </p>

          <p class="datos__item">
            Estado madurez:
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.estado_madurez }"
              >{{
                monitoreo.estado_madurez
                  ? monitoreo.estado_madurez
                  : "No reportado"
              }}</span
            >
          </p>

          <p class="datos__item">
            Cant. semillas:
            <span class="dato" :class="{ sinInfo: !monitoreo.cant_semillas }">{{
              monitoreo.cant_semillas ? monitoreo.cant_semillas : "No reportado"
            }}</span>
          </p>
          <h4 class="datos__titulo">Datos Flor</h4>
          <p class="datos__item">
            Color Flor:
            <span class="dato" :class="{ sinInfo: !monitoreo.color_flor }">{{
              monitoreo.color_flor ? monitoreo.color_flor : "No reportado"
            }}</span>
          </p>
          <p class="datos__item">
            Flor abierta:
            <span class="dato" :class="{ sinInfo: !monitoreo.flor_abierta }">{{
              monitoreo.flor_abierta ? monitoreo.flor_abierta : "No reportado"
            }}</span>
          </p>
          <p class="datos__item">
            Flor boton:
            <span class="dato" :class="{ sinInfo: !monitoreo.flor_boton }">{{
              monitoreo.flor_boton ? monitoreo.flor_boton : "No reportado"
            }}</span>
          </p>
          <p class="datos__item">
            Fauna flor:
            <span class="dato" :class="{ sinInfo: !monitoreo.fauna_flor }">{{
              monitoreo.fauna_flor ? monitoreo.fauna_flor : "No reportado"
            }}</span>
          </p>

          <!-- boton coultar -->
          <p @click="toggleDetalles(index + 'a')" class="recoger">
            <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
          </p>
        </div>
      </div>
      <!-- fin Desarrollo especie-->
      <!-- ambiente y crecimiento -->
      <div class="informacion__seccion" :id="index + 'b'">
        <button
          id="boton-especie"
          class="card__boton"
          @click="toggleDetalles(index + 'b')"
        >
          Ambiente y crecimiento
        </button>
        <div class="datos">
          <h4 class="datos__titulo">Ambiente</h4>

          <p class="datos__item">
            Precipitacion:
            <span class="dato" :class="{ sinInfo: !monitoreo.precipitacion }">{{
              monitoreo.precipitacion ? monitoreo.precipitacion : "No reportado"
            }}</span>
          </p>

          <p class="datos__item">
            Temperatura:
            <span class="dato" :class="{ sinInfo: !monitoreo.temperatura }">{{
              monitoreo.temperatura ? monitoreo.temperatura : "No reportado"
            }}</span>
          </p>
          <p class="datos__item">
            Humedad:
            <span class="dato" :class="{ sinInfo: !monitoreo.humedad }">{{
              monitoreo.humedad ? monitoreo.humedad : "No reportado"
            }}</span>
          </p>

          <p class="datos__item">
            Factor climatico:
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.factor_climatico }"
              >{{
                monitoreo.factor_climatico
                  ? monitoreo.factor_climatico
                  : "No reportado"
              }}</span
            >
          </p>
          <h4 class="datos__titulo">Crecimiento</h4>

          <p class="datos__item">
            Medida-Peso Frutos:
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.medida_peso_frutos }"
              >{{
                monitoreo.medida_peso_frutos
                  ? monitoreo.medida_peso_frutos
                  : "No reportado"
              }}</span
            >
          </p>
          <p class="datos__item">
            Medida-Peso semillas:
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.medida_peso_sem }"
              >{{
                monitoreo.medida_peso_sem
                  ? monitoreo.medida_peso_sem
                  : "No reportado"
              }}</span
            >
          </p>
          <p class="datos__item">
            Follaje:
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.follaje_porcentaje }"
              >{{
                monitoreo.follaje_porcentaje
                  ? monitoreo.follaje_porcentaje
                  : "No reportado"
              }}</span
            >
          </p>
          <p class="datos__item">
            Fitosanitario:
            <span class="dato" :class="{ sinInfo: !monitoreo.fitosanitario }">{{
              monitoreo.fitosanitario ? monitoreo.fitosanitario : "No reportado"
            }}</span>
          </p>
          <!-- boton coultar -->
          <p @click="toggleDetalles(index + 'b')" class="recoger">
            <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
          </p>
        </div>
      </div>
      <!-- fin ambiente y crecimiento -->
      <!-- observaciones -->
      <div class="informacion__seccion" :id="index + 'c'">
        <button
          id="boton-especie"
          class="card__boton"
          @click="toggleDetalles(index + 'c')"
        >
          Obervaciones
        </button>
        <div class="datos">
          <p class="datos__item">
            Frutos:
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.observacion_frutos }"
              >{{
                monitoreo.observacion_frutos
                  ? monitoreo.observacion_frutos
                  : "No reportado"
              }}</span
            >
          </p>

          <p class="datos__item">
            Flor:
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.observaciones_flor }"
              >{{
                monitoreo.observaciones_flor
                  ? monitoreo.observaciones_flor
                  : "No reportado"
              }}</span
            >
          </p>
          <p class="datos__item">
            Follaje:
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.observaciones_follaje }"
              >{{
                monitoreo.observaciones_follaje
                  ? monitoreo.observaciones_follaje
                  : "No reportado"
              }}</span
            >
          </p>

          <p class="datos__item">
            General:
            <span class="dato" :class="{ sinInfo: !monitoreo.observaciones }">{{
              monitoreo.observaciones ? monitoreo.observaciones : "No reportado"
            }}</span>
          </p>

          <!-- boton coultar -->
          <p @click="toggleDetalles(index + 'c')" class="recoger">
            <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
          </p>
        </div>
      </div>
      <!-- fin obervaciones -->
      <!-- fin card -->
      <div
        @click="monitoring.selectMonitoring(monitoreo,true)"
        type="button"
        class="boton__add"
        
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg></div>
    </div>
  </div>
</template>

<style scoped>
/* boton nuevo monitoreo */

@media (min-width: 992px) {
  .boton__add {
    top: 25px;
  }
}
@media (min-width: 1350px) {
  .boton__add {
    top: 6px;
  }
}

.boton__add {
 
  background-position: center;
  background-size: cover;
  padding: 0;
  margin: 0;
  height: 2rem;
  width: 2rem;
  bottom: 10%;
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 5px;
  transition: transform 0.1s ease-out;
}
.boton__add:hover {
  transform: scale(1.08);
}

/* card */
.card {
  border-radius: 10px;
  border: 1px solid var(--primary);
  background-color: var(--blanco);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}
.card__boton {
  text-align: center;
  font-size: .9rem;
  background: none;
  border: 1px solid var(--primary);
  padding: 0.2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  width: 90%;
  margin: 0 0 0 16px;
  transition: background-color 0.3s ease;
}
.card__boton:hover {
  background-color: var(--primary);
  color: var(--blanco);
}
.card__boton:last-of-type {
  margin-bottom: 1rem;
}
.datos__item {
  text-align: center;
  margin: 0.2rem 0;
  padding: 0 2rem;
}
.datos__titulo {
  text-align: center;
  font-weight: 500;
  padding: 0;
  margin: 0;
  color: var(--primary);
  border-bottom: 1px solid var(--primary);
}
.datos__item:last-of-type {
  margin-bottom: 2rem;
}

.informacion__seccion {
  position: relative;
}

.datos {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.informacion__seccion.active .datos {
  display: block;
}

/* generales */
.dato {
  font-weight: 600;
  color: var(--gris);
  font-size: 1rem;
}
.sinInfo {
  color: rgb(240, 176, 176);
}
.recoger {
  margin: 0;
  text-align: center;
  font-size: 1rem;
}
.recoger:hover {
  cursor: pointer;
  color: var(--primary);
}
.fecha__monitoreo {
  text-align: center;
  margin: 0.5rem;
  font-size: 1rem;
  margin-top: 1rem;
}

/* seccion especie */

.especie {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0 0.5rem;
  margin-bottom: 0rem;
}
.especie__imagen svg {
  width: 3rem;
  color : var(--primary);
  margin-bottom: .5rem;
  margin-top: 1rem;
}
.especie__info {
  padding: 0;
  margin: 0.1rem 0;
  font-size: 1rem;
}

</style>