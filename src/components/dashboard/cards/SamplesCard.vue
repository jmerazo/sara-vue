<script setup>
defineProps({
  muestra: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

//furncion para mostrar el contenido de la muestra o colectores
function toggleDetalles(contenedor) {
  const muestra = document.getElementById(contenedor);

  if (muestra) {
    if (muestra.classList.contains("active")) {
      muestra.classList.remove("active");
    } else {
      muestra.classList.add("active");
    }
  } else {
    console.error(``);
  }
}
</script>
<template>
  <div class="card">
    <!-- fecha y cod muestra -->
    <div class="muestra__encabezado">
      <p class="muestra__fecha">
        Fecha colección:
        <span class="dato">{{ muestra.fecha_coleccion }}</span>
      </p>
      <p class="muestra__codigo">
        Muestra:
      </p>
      <p class="muestra__codigo">
        <span class="dato">{{ muestra.codigo_muestra }}</span>
      </p>
    </div>

    <!-- datos de la especie -->
    <div class="especie">
      
        <svg class="especie__imagen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M15.9994 2V4H14.9994V7.24291C14.9994 8.40051 15.2506 9.54432 15.7357 10.5954L20.017 19.8714C20.3641 20.6236 20.0358 21.5148 19.2836 21.8619C19.0865 21.9529 18.8721 22 18.655 22H5.34375C4.51532 22 3.84375 21.3284 3.84375 20.5C3.84375 20.2829 3.89085 20.0685 3.98181 19.8714L8.26306 10.5954C8.74816 9.54432 8.99939 8.40051 8.99939 7.24291V4H7.99939V2H15.9994ZM13.3873 10.0012H10.6115C10.5072 10.3644 10.3823 10.7221 10.2371 11.0724L10.079 11.4335L6.12439 20H17.8734L13.9198 11.4335C13.7054 10.9691 13.5276 10.4902 13.3873 10.0012ZM10.9994 7.24291C10.9994 7.49626 10.9898 7.7491 10.9706 8.00087H13.0282C13.0189 7.87982 13.0119 7.75852 13.0072 7.63704L12.9994 7.24291V4H10.9994V7.24291Z">
            </path>
          </svg>
    
      <p class="especie__info nombre__comun">
        <span class="dato" :class="{ sinInfo: !muestra.nom_comunes }">{{
          muestra.nom_comunes
        }}</span>
      </p>
      <p class="especie__info">
        <span class="dato" :class="{ sinInfo: !muestra.nombre_cientifico }">{{
          muestra.nombre_cientifico
        }}</span>
      </p>
      <p class="especie__info">
        código especie:
        <span class="dato" :class="{ sinInfo: !muestra.cod_especie }">{{
          muestra.cod_especie
        }}</span>
      </p>
      <p class="especie__info">
        # placa:
        <span class="dato" :class="{ sinInfo: !muestra.numero_placa }">{{
          muestra.evaluacion.numero_placa ? muestra.evaluacion.numero_placa : "Sin placa"
        }}</span>
      </p>
    </div>

    <!-- datos de la muestra -->
    <div class="muestra informacion__muestra" :id="index + 'a'">
      <button
        id="boton-muestra"
        class="card__boton"
        type="button"
        @click="toggleDetalles(index + 'a')"
      >
        Datos de la muestra
      </button>
      <div class="datos">
        <p class="detalle__item">
          colección Número:
          <span class="dato" :class="{ sinInfo: !muestra.nro_coleccion }">{{
            muestra.nro_coleccion ? muestra.nro_coleccion : "Sin datos"
          }}</span>
        </p>
        <p class="detalle__item">
          Número muestras:
          <span class="dato" :class="{ sinInfo: !muestra.nro_muestras }">{{
            muestra.nro_muestras ? muestra.nro_muestras : "Sin datos"
          }}</span>
        </p>
        <p class="detalle__item">
          Usos:
          <span class="dato" :class="{ sinInfo: !muestra.usos }">{{
            muestra.usos ? muestra.usos : "Sin datos"
          }}</span>
        </p>

        <p class="detalle__item">
          <span class="dato" :class="{ sinInfo: !muestra.descripcion }">{{
            muestra.descripcion ? muestra.descripcion : "Sin datos"
          }}</span>
        </p>
        <p @click="toggleDetalles(index + 'a')" class="recoger">
          <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
        </p>
      </div>
    </div>
    <!-- datos colectores -->
    <div class="informacion__muestra" :id="index + 'b'">
      <button
        id="boton-colectores"
        class="card__boton"
        @click="toggleDetalles(index + 'b')"
      >
        Colectores
      </button>
      <div class="datos">
        <p class="detalle__item">
          Colector Principal:
          <span class="dato"
            >{{ muestra.siglas_colector_ppal }} -
            {{ muestra.colector_ppal }}</span
          >
        </p>
        <p class="detalle__item" v-if="muestra.nombres_colectores">
          Colectores asociados:
          <span class="dato">{{ muestra.nombres_colectores }}</span>
        </p>
        <p @click="toggleDetalles(index + 'b')" class="recoger">
          <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
        </p>
      </div>
    </div>
    <!-- fin colectores -->
  </div>
</template>



<style scoped>
/* generales */
.dato {
  font-weight: 700;
  color: var(--gris);
  opacity: 0.9;
  font-size: 1rem;
}
.sinInfo {
  color: rgb(240, 176, 176);
}
/* card */
.card {
  border-radius: 10px;
  border: 1px solid var(--primary);
  background-color: var(--blanco);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
.detalle__item {
  text-align: center;
  margin: 0.2rem 0;
  padding: 0 2rem;
  font-size: 1rem;
}
.detalle__item:last-of-type {
  margin-bottom: 2rem;
}

.informacion__muestra {
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
.informacion__muestra.active .datos {
  display: block;
}

/* encabezado muestra */
.muestra__encabezado {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin: 1rem auto;
  font-size: 1rem;
}
.muestra__fecha,
.muestra__codigo {
  margin: 0;
  padding: 0 0.2rem;
  font-size: 1rem;
}

.muestra__codigo {
  font-size: 1rem;
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
  margin-bottom: 1.5rem;
}
.especie__imagen {
  width: 3rem;
  color : var(--primary);
  margin-bottom: .5rem;
}
.especie__info {
  padding: 0;
  margin: 0.1rem 0;
  font-size: 1rem;
}
.nombre__comun {
  font-size: 1rem;
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

</style>