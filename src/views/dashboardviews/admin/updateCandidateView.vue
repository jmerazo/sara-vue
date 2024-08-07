<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthTokenStore } from "@/stores/auth";
import { useEspeciesStore } from "@/stores/species"
import { useGeoCandidateTrees } from "@/stores/candidate"

const locates = useAuthTokenStore();
const species = useEspeciesStore();
const candidates = useGeoCandidateTrees();

//PS-1769-18-247-00f48a44-002-23
// Propiedad computada para generar el código de la especie
const codeSpecie = computed(() => {
  const myAlphanumericId = generateAlphanumericId(10);
  let folderNumber = ""

  if (formData.value.departamento === 86) folderNumber = "001";
  if (formData.value.departamento === 18) folderNumber = "002";
  if (formData.value.departamento === 91) folderNumber = "003";

  const year = new Date().getFullYear().toString().slice(-2);

  // Asignar myAlphanumericId a formData
  formData.value.ShortcutIDEV = myAlphanumericId;
  // Asegúrate de que formData.municipio o formData.cities se refiere al valor correcto que necesitas
  var code = `PS-${formData.value.cod_especie}-${formData.value.departamento}-${formData.value.municipio}-${myAlphanumericId}-${folderNumber}-${year}`
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
      (city) => city.department_id === departamento
    );
    return filtered;
  }
  return [];
});

const formData = ref({
    ShortcutIDEV: '',
    cod_expediente: '',
    cod_especie : '',
    fecha_evaluacion : '',
    usuario_evaluador : '',
    departamento : '',
    municipio : '',
    nombre_del_predio : '',
    nombre_propietario : '',
    corregimiento : '',
    vereda : '',
    correo : '',
    celular : '',
    altitud : '',
    latitud : '',
    g_lat : '',
    m_lat : '',
    s_lat : '',
    longitud : '',
    g_long : '',
    m_long : '',
    s_long : '',
    coordenadas_decimales : '',
    abcisa_xy : '',
    altura_total : '',
    altura_fuste : '',
    cap : '',
    eje_x : '',
    eje_y : '',
    eje_z : '',
    cobertura : '',
    cober_otro : '',
    entorno_individuo : '',
    entorno_otro : '',
    especies_forestales_asociadas : '',
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

const userData = ref({});
const userDataString = localStorage.getItem("user_data");
if (userDataString) {
    userData.value = JSON.parse(userDataString);
}


watch(
  () => usersStore.userSelected,
  () => {
    initializeFormData();
  }
);

onMounted(() => {
  const hoy = new Date();
  formData.value.fecha_evaluacion = hoy.toISOString().split('T')[0];
  formData.value.usuario_evaluador = userData.id;
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {
  console.log('data send: ', formData.value)
  try {
    candidates.addCandidate(formData.value);
    console.log(formData.value);
    resetForm();
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

    if (formData.value.latitud === 'S') {
        decimalLat = -decimalLat;
    }
    if (formData.value.longitud === 'E') {
        decimalLong = -decimalLong;
    }

    return decimalLat.toFixed(6) + ", " + decimalLong.toFixed(6); // Ajusta el número de decimales según necesites
});

// Observa los cambios en coordenadasDecimales y actualiza formData.coordenadas_decimales
watch(coordenadasDecimales, (newValue) => {
    formData.value.coordenadas_decimales = newValue;
});

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
    <div class="form__addCandidate">
        <div class="title__addCandidate">
            <span>Registrar nuevo individuo</span>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="form-section data__evaluation">
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
                    v-for="sp in species.especies"
                    :key="sp.cod_especie"
                    :value="sp.cod_especie"
                  >
                    {{ sp.cod_especie + " - " + sp.nom_comunes + " - " + sp.nombre_cientifico }}
                  </option>
                </select>
                <label>Fecha: </label><input type="date" v-model="formData.fecha_evaluacion" placeholder="">
                <label>Usuario: </label><input type="text" v-model="formData.usuario_evaluador" :placeholder="userData.first_name + ' ' + userData.last_name" disabled>
            </div>

            <div class="form-section data__ubication">
                <!-- departamento -->
              <label class="formulario__label" for="departamento">Departamento:</label>
              <select
                id="departamento"
                class="formulario__input formulario__input--selectc"
                v-model="formData.departamento"
              >
                <option value="">--Seleccione--</option>
                <option
                  v-for="loc in locates.departments"
                  :key="loc.id"
                  :value="loc.code"
                >
                  {{ loc.name }}
                </option>
              </select>
              <!-- ciudad -->
              <label class="formulario__label" for="municipio" v-show="filteredCities.length">Ciudad:</label>
              <select id="municipio" class="formulario__input formulario__input--select" v-model="formData.municipio" v-show="filteredCities.length">
                <option value="">-- Seleccione--</option>
                <option
                  v-for="city in filteredCities"
                  :key="city.id"
                  :value="city.id"
                >
                  {{ city.name }}
                </option>
              </select>

                <label>Nombre del predio: </label><input type="text" v-model="formData.nombre_del_predio" placeholder="">
                <label>Nombre propietario: </label><input type="text" v-model="formData.nombre_propietario" placeholder="">
                <label>Corregimiento: </label><input type="text" v-model="formData.corregimiento" placeholder="">
                <label>Vereda: </label><input type="text" v-model="formData.vereda" placeholder="">
                <label>Correo: </label><input type="email" v-model="formData.correo" placeholder="">
                <label>Celular: </label><input type="tel" v-model="formData.celular" placeholder="">
                <label>Altitud: </label><input type="number" v-model.number="formData.altitud" placeholder="">
                <label>Latitud: </label><select v-model="formData.latitud">
                    <option value="N">Norte (N)</option>
                    <option value="S">Sur (S)</option>
                </select>
                <label>Grados: </label><input type="number" v-model.number="formData.g_lat" placeholder="">
                <label>Minutos: </label><input type="number" v-model.number="formData.m_lat" placeholder="">
                <label>Segundos: </label><input type="number" v-model.number="formData.s_lat" placeholder="">
                <label>Longitud: </label><select v-model="formData.longitud">
                    <option value="W">Oeste (W)</option>
                    <option value="E">Este (E)</option>
                </select>
                <label>Grados: </label><input type="number" v-model.number="formData.g_long" placeholder="">
                <label>Minutos: </label><input type="number" v-model.number="formData.m_long" placeholder="">
                <label>Segundos: </label><input type="number" v-model.number="formData.s_long" placeholder="">
                <label>Coordenadas decimales: </label><input type="text" v-model="formData.coordenadas_decimales" placeholder="" disabled>
                <label>Coordenadas: </label><input type="text" v-model="formData.abcisa_xy" :placeholder="formData.abcisa_xy" disabled>
            </div>

            <div class="form-section data__candidate">
                <label>Altura total: </label><input type="number" v-model.number="formData.altura_total" placeholder="">
                <label>Altura del fuste: </label><input type="number" v-model.number="formData.altura_fuste" placeholder="">
                <label>CAP: </label><input type="number" v-model.number="formData.cap" placeholder="">
                <label>Eje X: </label><input type="number" v-model.number="formData.eje_x" placeholder="">
                <label>Eje Y: </label><input type="number" v-model.number="formData.eje_y" placeholder="">
                <label>Eje Z: </label><input type="number" v-model.number="formData.eje_z" placeholder="">
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
                  <option value="Árbol aislado en otro tipo de cobertura - ¿Cual?">Árbol aislado en otro tipo de cobertura - ¿Cual?</option>
                </select>
                <label v-show="formData.cobertura === 'Árbol aislado en otro tipo de cobertura - ¿Cual?'">Otra cobertura: </label>
                <input v-show="formData.cobertura === 'Árbol aislado en otro tipo de cobertura - ¿Cual?'" type="text" v-model="formData.cober_otro" placeholder="">
                <label>Entorno del individuo: </label>
                <select v-model="formData.entorno_individuo">
                  <option value="" disabled selected>-- Seleccione un entorno --</option>
                  <option value="Individuo sólo">Individuo sólo</option>
                  <option value="Sistema agroforestal">Sistema agroforestal</option>
                  <option value="Agrupación significativa de la misma especie">Agrupación significativa de la misma especie</option>
                  <option value="Asociación arbórea con otras especies forestales">Asociación arbórea con otras especies forestales</option>
                  <option value="Otro, ¿Cuál?">Otro, ¿Cuál?</option>
                </select>
                <label v-show="formData.entorno_individuo === 'Otro, ¿Cuál?'">Otro entorno del individuo: </label><input v-show="formData.entorno_individuo === 'Otro, ¿Cuál?'" type="text" v-model="formData.entorno_otro" placeholder="">
                <label>Especies forestales asociadas: </label><input type="text" v-model="formData.especies_forestales_asociadas" placeholder="">
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
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<style scoped>
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

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
  