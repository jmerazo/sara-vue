<script setup>
defineProps({
    evaluacion: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

//furncion para mostrar el contenido evaluaciones
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
            <p class="fecha__evaluacion">
              Fecha Evaluación:
              <span class="dato">{{ evaluacion.fecha_evaluacion }}</span>
            </p>
          </div>
          <!-- datos de la especie -->
          <div class="especie">
            <div class="especie__imagen">
              <img src="/icons/icono-evalucacion.png" alt="icono evalucaion" />
            </div>
            <div>
              <p class="especie__info nombre__comun">Expediente:</p>
              <span
                class="dato"
                :class="{ sinInfo: !evaluacion.cod_expediente }"
                >{{ evaluacion.cod_expediente }}</span
              >
            </div>
            <p class="especie__info">
              código especie:
              <span
                class="dato"
                :class="{ sinInfo: !evaluacion.cod_especie }"
                >{{ evaluacion.cod_especie }}</span
              >
            </p>
            <p class="especie__info">
              # placa:
              <span
                class="dato"
                :class="{ sinInfo: !evaluacion.numero_placa }"
                >{{
                  evaluacion.numero_placa
                    ? evaluacion.numero_placa
                    : "Sin placa"
                }}</span
              >
            </p>
          </div>
          <hr />
          <!-- fin especie -->
          <!-- datos Ubicacion -->
          <div class="informacion__seccion" :id="index + 'a'">
            <button
              id="boton-especie"
              class="card__boton"
              @click="toggleDetalles(index + 'a')"
            >
              Ubicación
            </button>
            <div class="datos">
              <p class="datos__item">
                Departamento:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.departamento }"
                  >{{
                    evaluacion.departamento
                      ? evaluacion.departamento
                      : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Municipio:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.municipio }"
                  >{{
                    evaluacion.municipio ? evaluacion.municipio : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Corregimiento:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.corregimiento }"
                  >{{
                    evaluacion.corregimiento
                      ? evaluacion.corregimiento
                      : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Vereda:
                <span class="dato" :class="{ sinInfo: !evaluacion.vereda }">{{
                  evaluacion.vereda ? evaluacion.vereda : "No reportado"
                }}</span>
              </p>

              <p class="datos__item">
                Predio:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.nombre_del_predio }"
                  >{{
                    evaluacion.nombre_del_predio
                      ? evaluacion.nombre_del_predio
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Propietario:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.nombre_propietario }"
                  >{{
                    evaluacion.nombre_propietario
                      ? evaluacion.nombre_propietario
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Celular:
                <span class="dato" :class="{ sinInfo: !evaluacion.celular }">{{
                  evaluacion.celular ? evaluacion.celular : "No reportado"
                }}</span>
              </p>
              <p class="datos__item">
                Correo:
                <span class="dato" :class="{ sinInfo: !evaluacion.correo }">{{
                  evaluacion.correo ? evaluacion.correo : "No reportado"
                }}</span>
              </p>

              <!-- boton coultar -->
              <p @click="toggleDetalles(index + 'a')" class="recoger">
                <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
              </p>
            </div>
          </div>
          <!-- fin Ubicacion-->
          <!-- Datos evalucion -->
          <div class="informacion__seccion" :id="index + 'b'">
            <button
              id="boton-especie"
              class="card__boton"
              @click="toggleDetalles(index + 'b')"
            >
              Evaluación
            </button>
            <div class="datos">
              <h4 class="datos__titulo">Estados</h4>

              <p class="datos__item">
                Dominancia:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.dominancia }"
                  >{{
                    evaluacion.dominancia
                      ? evaluacion.dominancia
                      : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Copa:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.estado_copa }"
                  >{{
                    evaluacion.estado_copa
                      ? evaluacion.estado_copa
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Posicion copa:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.posicion_copa }"
                  >{{
                    evaluacion.posicion_copa
                      ? evaluacion.posicion_copa
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Forma fuste:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.forma_fuste }"
                  >{{
                    evaluacion.forma_fuste
                      ? evaluacion.forma_fuste
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Alt. Bifurcacion:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.alt_bifurcacion }"
                  >{{
                    evaluacion.alt_bifurcacion
                      ? evaluacion.alt_bifurcacion
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Fitosanitario:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.fitosanitario }"
                  >{{
                    evaluacion.fitosanitario
                      ? evaluacion.fitosanitario
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Presencia:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.presencia }"
                  >{{
                    evaluacion.presencia ? evaluacion.presencia : "No reportado"
                  }}</span
                >
              </p>
              <h4 class="datos__titulo">Resultado</h4>
              <p class="datos__item">
                Puntaje:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.resultado }"
                  >{{
                    evaluacion.resultado ? evaluacion.resultado : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.evaluacion }"
                  >{{
                    evaluacion.evaluacion
                      ? evaluacion.evaluacion
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Evaluador:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.usuario_evaluador }"
                  >{{
                    evaluacion.usuario_evaluador
                      ? evaluacion.usuario_evaluador
                      : "No reportado"
                  }}</span
                >
              </p>

              <!-- boton coultar -->
              <p @click="toggleDetalles(index + 'b')" class="recoger">
                <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
              </p>
            </div>
          </div>
          <!-- fin datos evaluacion -->
          <!-- Atributos -->
          <div class="informacion__seccion" :id="index + 'c'">
            <button
              id="boton-especie"
              class="card__boton"
              @click="toggleDetalles(index + 'c')"
            >
              Atributos
            </button>
            <div class="datos">
              <p class="datos__item">
                Eje X:
                <span class="dato" :class="{ sinInfo: !evaluacion.eje_x }">{{
                  evaluacion.eje_x ? evaluacion.eje_x : "No reportado"
                }}</span>
              </p>
              <p class="datos__item">
                Eje Y:
                <span class="dato" :class="{ sinInfo: !evaluacion.eje_y }">{{
                  evaluacion.eje_y ? evaluacion.eje_y : "No reportado"
                }}</span>
              </p>
              <p class="datos__item">
                Abcisa XY:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.abcisa_xy }"
                  >{{
                    evaluacion.abcisa_xy ? evaluacion.abcisa_xy : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Cap:
                <span class="dato" :class="{ sinInfo: !evaluacion.cap }">{{
                  evaluacion.cap ? evaluacion.cap : "No reportado"
                }}</span>
              </p>
              <p class="datos__item">
                Altitud:
                <span class="dato" :class="{ sinInfo: !evaluacion.altitud }">{{
                  evaluacion.altitud ? evaluacion.altitud : "No reportado"
                }}</span>
              </p>

              <p class="datos__item">
                Altura comercial:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.altura_comercial }"
                  >{{
                    evaluacion.altura_comercial
                      ? evaluacion.altura_comercial
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Altura Total:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.altura_total }"
                  >{{
                    evaluacion.altura_total
                      ? evaluacion.altura_total
                      : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Cobertura:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.cobertura }"
                  >{{
                    evaluacion.cobertura ? evaluacion.cobertura : "No reportado"
                  }}</span
                >
              </p>

              <!-- boton coultar -->
              <p @click="toggleDetalles(index + 'c')" class="recoger">
                <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
              </p>
            </div>
          </div>
          <!-- fin atributos -->
        </div>
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
.recoger {
  margin: 0;
  text-align: center;
  font-size: 1rem;
}
.recoger:hover {
  cursor: pointer;
  color: var(--primary);
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

/* tarjeta de datos */
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

/* seccion especie */
.fecha__evaluacion {
  text-align: center;
  margin: 0.5rem;
}
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