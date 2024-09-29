<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { locatesColombia } from "@/stores/locates";
import { useEspeciesStore } from "../../../stores/species";
import { propertyStore } from '@/stores/dashboard/property'
import { useGeoCandidateTrees } from "../../../stores/candidate";
import { useModalStore } from "@/stores/modal";

const locates = locatesColombia();
const species = useEspeciesStore();
const property = propertyStore();
const candidates = useGeoCandidateTrees();
const modal = useModalStore();
var deparment = ref('');
var city = ref('');
let folderNumber = ref('');

//PS-1769-18-247-00f48a44-002-23
// Propiedad computada para generar el código de la especie
const codeSpecie = computed(() => {
  const myAlphanumericId = generateAlphanumericId(10);

  const year = new Date().getFullYear().toString().slice(-2);

  // Asignar myAlphanumericId a formData
  formData.value.id = myAlphanumericId;
  // Asegúrate de que formData.municipio o formData.cities se refiere al valor correcto que necesitas
  var code = `PS-${formData.value.cod_especie}-${deparment.value}-${city.value}-${myAlphanumericId}-${folderNumber.value}-${year}`
  formData.value.cod_expediente = code;
  return code;
});

function generateAlphanumericId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const filteredCities = computed(() => {
  const { departamento } = formData.value;

  if (departamento) {
    const filtered = locates.cities.filter(
      (city) => city.department === departamento
    );
    return filtered;
  }
  return [];
});

const formData = ref({
    id: '',
    cod_expediente: '',
    cod_especie : '',
    eventDate : '',
    user : '',
    property: '',
    minimumElevationInMeters : '',
    verbatimLatitude : '',
    g_lat : '',
    m_lat : '',
    s_lat : '',
    verbatimLongitude : '',
    g_long : '',
    m_long : '',
    s_long : '',
    coordenadas_decimales : '',
    abcisa_xy : '',
    cobertura : '',
    entorno_individuo : '',
    dominancia_if : '',
    forma_fuste : '',
    dominancia : '',
    alt_bifurcacion : '',
    estado_copa : '',
    posicion_copa : '',
    fitosanitario : '',
    presencia : '',
    resultado : '',
    evaluacion : '',
    observaciones : ''
});

watch(() => formData.value.property, (newPropertyId) => {
  if (newPropertyId) {
    // Filtrar el predio seleccionado a partir del ID
    const selectedProperty = property.property.find(p => p.id === newPropertyId);
    
    if (selectedProperty) {
      deparment.value = selectedProperty.p_departamento.id;
      city.value = selectedProperty.p_municipio.id;

      // Comparar correctamente el valor de 'deparment'
      if (deparment.value === 86) folderNumber.value = "001";
      if (deparment.value === 18) folderNumber.value = "002";
      if (deparment.value === 91) folderNumber.value = "003";
    } else {
      console.error('No se encontró el predio con el ID seleccionado.');
    }
  }
});

const userData = ref({});
const userDataString = localStorage.getItem("user_data");
if (userDataString) {
    userData.value = JSON.parse(userDataString);
}


onMounted(() => {
  const hoy = new Date();
  formData.value.fecha_evaluacion = hoy.toISOString().split('T')[0];
  formData.value.user = userData.value.id;
  property.fetchProperty();
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {
  
  try {
    const response = candidates.addCandidate(formData.value);
    if(response === 201){
      resetForm();
      modal.handleClickModalForestSpecieAdd();
      window.alert('Individuo agregado satisfactoriamente!.')
    }    
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      // Si hay un mensaje de error en la respuesta, lo puedes mostrar
      alert(error.response.data.error);
    } else {
      // En caso de un error inesperado
      alert("Ocurrió un error al procesar la solicitud.");
    }
  }
};

const coordenadasDecimales = computed(() => {
  let decimalLat = Number(formData.value.g_lat) + Number(formData.value.m_lat) / 60 + Number(formData.value.s_lat) / 3600;
  let decimalLong = Number(formData.value.g_long) + Number(formData.value.m_long) / 60 + Number(formData.value.s_long) / 3600;

  if (formData.value.verbatimLatitude === 'S') {
    decimalLat = -decimalLat;
  }
  if (formData.value.verbatimLongitude === 'E') {
    decimalLong = -decimalLong;
  }

  return decimalLat.toFixed(6) + ", " + decimalLong.toFixed(6);
});

// Observa los cambios en coordenadasDecimales y actualiza formData.coordenadas_decimales
watch(coordenadasDecimales, (newValue) => {
    formData.value.coordenadas_decimales = newValue;
});

function updateAbcisaXY() {
  if (!formData.value.abcisa_xy || formData.value.abcisa_xy === '') {
    if (coordenadasDecimales.value) {
      formData.value.abcisa_xy = coordenadasDecimales.value;
    }
  }
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    formData.value.abcisa_xy = `${latitude}, ${longitude}`
  }, function(error) {
    console.error("Error obteniendo la ubicación: ", error);
  });
} else {
  console.log("Geolocalización no está disponible en tu navegador");
}

const calcularResultado = computed(() => {
    let suma = 0;

    const campos = [
        formData.value.dominancia_if,
        formData.value.forma_fuste,
        formData.value.dominancia,
        formData.value.alt_bifurcacion,
        formData.value.estado_copa,
        formData.value.posicion_copa,
        formData.value.fitosanitario,
        formData.value.presencia
    ];

    campos.forEach(campo => {
        const valor = campo.match(/\((\d+)\)/);
        if (valor && valor[1]) {
            suma += parseInt(valor[1], 10);
        }
    });

    return suma;
});

// Observa los cambios en calcularResultado y actualiza formData.resultado
watch(calcularResultado, (nuevoValor) => {
    formData.value.resultado = nuevoValor;
});

const evaluacion = computed(() => {
    const resultado = formData.value.resultado;

    if (resultado > 34) {
        return "El individuo cumple a cabalidad las características como árbol semillero.";
    } else if (resultado >= 28 && resultado <= 34) {
        return "El individuo cumple la mayor parte de características pero debe evaluarse algunas condiciones especiales con mayor detenimiento.";
    } else if (resultado >= 18 && resultado < 28) {
        return "El individuo no cumple cabalmente las características como árbol semillero, solo se seleccionaría en caso que no se cuente con más individuos.";
    } else if (resultado < 18) {
        return "Descartar, el individuo porque no cumple las características como árbol semillero.";
    }

    return ""; // Retornar un string vacío si no cumple ninguna condición anterior
});

// Observa los cambios en la evaluación y actualiza formData.evaluacion
watch(evaluacion, (nuevoValor) => {
    formData.value.evaluacion = nuevoValor;
});
</script>

<template>
    <div class="modal" v-if="modal.modalCandidatesAdd">
        <div class="modal__contenido">
            <div class="form__addCandidate">
                <div class="title__addCandidate">
                    <span>Registrar nuevo individuo</span>
                </div>
                <form @submit.prevent="handleSubmit">                  
                  <div class="form-section data__evaluation">
                    <label>Fecha: </label><input type="date" v-model="formData.eventDate" placeholder="">
                    <label>Usuario: </label><input type="text" :placeholder="userData.first_name + ' ' + userData.last_name" disabled>
                    <label>Código individuo: </label><input type="text" v-model="formData.cod_expediente" :placeholder="codeSpecie" disabled>
                    <label class="formulario__label" for="species"
                    >Especies:</label
                    >
                    <select
                    id="departamento"
                    class="formulario__input formulario__input--select"
                    v-model="formData.cod_especie"
                    >
                    <option value="" selected disabled>-- Seleccione una especie --</option>
                    <option
                        v-for="sp in species.species"
                        :key="sp.code_specie"
                        :value="sp.code_specie"
                    >
                        {{ sp.code_specie + " - " + sp.vernacularName + " - " + sp.scientificName + " " + sp.scientificNameAuthorship }}
                    </option>
                    </select>
                  </div>

                    <div class="form-section data__ubication">
                    <label class="formulario__label" for="departamento">Predio:</label>
                    <select
                        id="departamento"
                        class="formulario__input formulario__input--selectc"
                        v-model="formData.property"
                    >
                        <option value="">--Seleccione--</option>
                        <option
                        v-for="p in property.property"
                        :key="p.id"
                        :value="p.id"
                        >
                        {{ p.nombre_predio }}
                        </option>
                    </select>
                        <label>Altitud: </label><input type="number" v-model.number="formData.minimumElevationInMeters" placeholder="">
                        <label>Latitud: </label><select v-model="formData.verbatimLatitude">
                            <option value="N">Norte (N)</option>
                            <option value="S">Sur (S)</option>
                        </select>
                        <label>Grados: </label><input type="number" v-model.number="formData.g_lat" placeholder="">
                        <label>Minutos: </label><input type="number" v-model.number="formData.m_lat" placeholder="">
                        <label>Segundos: </label><input type="number" v-model.number="formData.s_lat" placeholder="">
                        <label>Longitud: </label><select v-model="formData.verbatimLongitude">
                            <option value="W">Oeste (W)</option>
                            <option value="E">Este (E)</option>
                        </select>
                        <label>Grados: </label><input type="number" v-model.number="formData.g_long" placeholder="">
                        <label>Minutos: </label><input type="number" v-model.number="formData.m_long" placeholder="">
                        <label>Segundos: </label><input type="number" v-model.number="formData.s_long" @blur="updateAbcisaXY" placeholder="">
                        <label>Coordenadas decimales: </label><input type="text" v-model="formData.coordenadas_decimales" placeholder="" disabled>
                        <label>Coordenadas: </label><input type="text" v-model="formData.abcisa_xy" :placeholder="formData.abcisa_xy" disabled>
                    </div>

                    <div class="form-section data__candidate">
                        <label>Cobertura: </label>
                        <select v-model="formData.cobertura">
                        <option value="" disabled selected>-- Seleccione una cobertura --</option>
                        <option value="Bosque natural">Bosque natural</option>
                        <option value="Rastrojo alto">Rastrojo alto</option>
                        <option value="Rastrojo bajo">Rastrojo bajo</option>
                        <option value="Cerca viva">Cerca viva</option>
                        <option value="Sistema agroforestal">Sistema agroforestal</option>
                        <option value="Zonas verdes">Zonas verdes</option>
                        <option value="Cultivo forestal (Reforestación)">Cultivo forestal (Reforestación)</option>
                        </select>
                        <label>Entorno del individuo: </label>
                        <select v-model="formData.entorno_individuo">
                        <option value="" disabled selected>-- Seleccione un entorno --</option>
                        <option value="Individuo sólo">Individuo sólo</option>
                        <option value="Sistema agroforestal">Sistema agroforestal</option>
                        <option value="Agrupación significativa de la misma especie">Agrupación significativa de la misma especie</option>
                        <option value="Asociación arbórea con otras especies forestales">Asociación arbórea con otras especies forestales</option>
                        </select>
                    </div> 
                    
                    <div class="form-section data__items">
                        <label>Dominancia del individuo forestal: </label>
                        <select v-model="formData.dominancia_if">
                        <option value="" disabled selected>-- Seleccione dominancia --</option>
                        <option value="(4) Dominante">(4) Dominante</option>
                        <option value="(3) Codominantes">(3) Codominantes</option>
                        <option value="(1) Intermedios">(1) Intermedios</option>
                        <option value="(0) Dominados">(0) Dominados</option>
                        </select>
                        <label>Forma del fuste: </label>
                        <select v-model="formData.forma_fuste">
                        <option value="" disabled selected>-- Seleccione forma fuste --</option>
                        <option value="(6) Recto">(6) Recto</option>
                        <option value="(4) Inclinado o ligeramente torcido">(4) Inclinado o ligeramente torcido</option>
                        <option value="(3) Torcido o recto torcido">(3) Torcido o recto torcido</option>
                        <option value="(1) Muy torcido">(1) Muy torcido</option>
                        </select>
                        <label>Dominancia del eje principal: </label>
                        <select v-model="formData.dominancia">
                        <option value="" disabled selected>-- Seleccione dominancia eje --</option>
                        <option value="(2) Dominancia completa del eje inicial">(2) Dominancia completa del eje inicial</option>
                        <option value="(1) Dominancia parcial del eje inicial sobre las ramas laterales">(1) Dominancia parcial del eje inicial sobre las ramas laterales</option>
                        <option value="(0) Dominancia completa de ramas laterales">(0) Dominancia completa de ramas laterales</option>
                        </select>
                        <label>Altura de la bifurcación: </label>
                        <select v-model="formData.alt_bifurcacion">
                        <option value="" disabled selected>-- Seleccione altura bifurcación --</option>
                        <option value="(6) No bifurcado">(6) No bifurcado</option>
                        <option value="(4) Bifurcado en el 1/3 superior">(4) Bifurcado en el 1/3 superior</option>
                        <option value="(3) Bifurcado en el 1/3 medio">(3) Bifurcado en el 1/3 medio</option>
                        <option value="(1) Bifurcado en el 1/3 inferior">(1) Bifurcado en el 1/3 inferior</option>
                        </select>
                        <label>Estado de la copa: </label>
                        <select v-model="formData.estado_copa">
                        <option value="" disabled selected>-- Seleccione estado copa --</option>
                        <option value="(5) Circular">(5) Circular</option>
                        <option value="(4) Circular irregular">(4) Circular irregular</option>
                        <option value="(3) Medio círculo">(3) Medio círculo</option>
                        <option value="(2) Menos de medio círculo">(2) Menos de medio círculo</option>
                        <option value="(1) Pocas ramas">(1) Pocas ramas</option>
                        </select>
                        <label>Posición de la copa: </label>
                        <select v-model="formData.posicion_copa">
                        <option value="" disabled selected>-- Seleccione posición copa --</option>
                        <option value="(5) Emergente">(5) Emergente</option>
                        <option value="(4) Plena iluminación superior">(4) Plena iluminación superior</option>
                        <option value="(3) Alguna iluminación superior">(3) Alguna iluminación superior</option>
                        <option value="(2)  Iluminación lateral">(2) Iluminación lateral</option>
                        <option value="(1) Ninguna iluminación directa">(1) Ninguna iluminación directa</option>
                        </select>
                        <label>Estado fitosanitario: </label>
                        <select v-model="formData.fitosanitario">
                        <option value="" disabled selected>-- Seleccione estado fitosanitario --</option>
                        <option value="(6) Sano">(6) Sano</option>
                        <option value="(4) Ataque hasta 1/3 del  fuste">(4) Ataque hasta 1/3 del  fuste</option>
                        <option value="(3) Ataque hasta 2/3 del  fuste">(3) Ataque hasta 2/3 del  fuste</option>
                        <option value="(1) Ataque superior a 2/3 del  fuste">(1) Ataque superior a 2/3 del  fuste</option>
                        </select>
                        <label>Presencia de parasitas: </label>
                        <select v-model="formData.presencia">
                        <option value="" disabled selected>-- Seleccione presencia parasitas --</option>
                        <option value="(6) Árbol libre de lianas y/ó bejucos">(6) Árbol libre de lianas y/ó bejucos</option>
                        <option value="(4) Árbol con lianas y/ó bejucos en el fuste">(4) Árbol con lianas y/ó bejucos en el fuste</option>
                        <option value="(2) Árbol con lianas y bejucos en el fuste y copa, presencia leve">(2) Árbol con lianas y bejucos en el fuste y copa, presencia leve</option>
                        <option value="(1) Árbol con lianas y bejucos en el fuste y copa grado severo">(1) Árbol con lianas y bejucos en el fuste y copa grado severo</option>
                        </select>
                        <label>Resultado: </label><input type="number" v-model.number="formData.resultado" placeholder="" disabled>
                        <label>Evaluación: </label><textarea v-model="formData.evaluacion" placeholder="" disabled></textarea>
                        <label>Observaciones: </label><textarea v-model="formData.observaciones" placeholder=""></textarea>
                    </div>
                    <div class="formulario__botones">
                        <button type="submit" class="formulario__boton">Guardar</button>
                        <button
                            @click="modal.handleClickModalCandidateAdd()"
                            type="button"
                            class="formulario__boton formulario__boton--cerrar"
                        >
                            Cerrar
                        </button>
                    </div>
                </form>
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
  width: 95%;
  max-height: 83%;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .modal__contenido {
    margin-top: 0;
  }
}

@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}
@media (min-width: 1440px) {
  .modal__contenido {
    width: 40%;
  }
}
@media (min-width: 1820px) {
  .modal__contenido {
    width: 30%;
  }
}

.form__addCandidate {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title__addCandidate {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.data__evaluation, .data__ubication, .data__candidate, .data__items {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

label {
  margin-bottom: 5px;
  display: block;
}

input[type="text"], 
input[type="number"], 
input[type="email"], 
input[type="tel"], 
input[type="date"], 
select, 
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}


.formulario__botones {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.3rem 0 0 0;
}

.formulario__boton {
  border-radius: 5px;
  font-weight: 700;
  padding: 0.3rem;
  font-size: 1rem;
  color: var(--blanco);
  background-color: var(--primary);
}
.formulario__boton--cerrar {
  background-color: var(--secondary);
}
.formulario__boton:hover {
  background-color: var(--primary-hover);
}
.formulario__boton--cerrar:hover {
  background-color: var(--secondary-hover);
}
</style>
  