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
          <img src="/icons/icon-arbol-lupa.png" alt="icon monitoreo" />
        </div>
        <p class="especie__info nombre__comun">
          <span class="dato" :class="{ sinInfo: !monitoreo.nom_comunes }">{{
            monitoreo.nom_comunes
          }}</span>
        </p>
        <p class="especie__info">
          <span
            class="dato"
            :class="{ sinInfo: !monitoreo.nombre_cientifico }"
            >{{ monitoreo.nombre_cientifico }}</span
          >
        </p>
        <p class="especie__info">
          código especie:
          <span class="dato" :class="{ sinInfo: !monitoreo.cod_especie }">{{
            monitoreo.cod_especie
          }}</span>
        </p>
        <p class="especie__info">
          # placa:
          <span class="dato" :class="{ sinInfo: !monitoreo.numero_placa }">{{
            monitoreo.numero_placa ? monitoreo.numero_placa : "Sin placa"
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
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* boton nuevo monitoreo */
.boton__add {
  background-image: url("/icons/pencil.png");
  background-position: center;
  background-size: cover;
  padding: 0;
  margin: 0;
  height: 3rem;
  width: 3rem;
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
  font-size: 1rem;
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
  font-weight: 700;
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
  font-weight: 900;
  color: var(--gris);
  opacity: 0.9;
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
.especie__imagen {
  width: 4.5rem;
}
.especie__info {
  padding: 0;
  margin: 0.1rem 0;
  font-size: 0.89rem;
}
.nombre__comun {
  font-size: 1rem;
}
</style>