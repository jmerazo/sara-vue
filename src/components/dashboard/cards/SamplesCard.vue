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
        <span class="dato">{{ muestra.codigo_muestra }}</span>
      </p>
    </div>

    <!-- datos de la especie -->
    <div class="especie">
      <div class="especie__imagen">
        <img src="/icons/icon-muestra.jpg" alt="icon sample" />
      </div>
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
          muestra.numero_placa ? muestra.numero_placa : "Sin placa"
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
  font-weight: 900;
  color: var(--gris);
  opacity: 0.9;
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
}
.muestra__fecha,
.muestra__codigo {
  margin: 0;
  padding: 0 0.2rem;
}

.muestra__codigo {
  font-size: 0.83rem;
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