<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthTokenStore } from "../../stores/auth";

const locates = useAuthTokenStore();

const userDataString = localStorage.getItem("user_data");
const userData = JSON.parse(userDataString);

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

onMounted(() => {
  const hoy = new Date();
  formData.value.fecha_evaluacion = hoy.toISOString().split('T')[0];
  formData.value.usuario_evaluador = userData.id;
});

const handleSubmit = () => {
  console.log(formData.value);
  // Aquí puedes manejar la lógica de envío de datos
};
</script>

<template>
    <div class="form__addCandidate">
        <div class="title__addCandidate">
            <span>Registrar nuevo individuo</span>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="form-section data__evaluation">
                <label>Código individuo: </label><input type="text" v-model="formData.cod_expediente" placeholder="">
                <label>Especie: </label><input type="number" v-model.number="formData.cod_especie" placeholder="">
                <label>Fecha: </label><input type="date" v-model="formData.fecha_evaluacion" placeholder="">
                <label>Usuario: </label><input type="text" v-model="formData.usuario_evaluador" :placeholder="userData.first_name + ' ' + userData.last_name" disabled>
            </div>

            <div class="form-section data__ubication">
                <!-- departamento -->
              <label class="formulario__label" for="parametro"
                >Departamento:</label
              >
              <select
                id="departamento"
                class="formulario__input formulario__input--select"
                v-model="formData.departamento"
              >
                <option value="">--seleccione--</option>
                <option
                  v-for="loc in locates.departments"
                  :key="loc.id"
                  :value="loc.code"
                >
                  {{ loc.name }}
                </option>
              </select>
              <!-- ciudad -->
              <div v-if="filteredCities.length">
                <label class="formulario__label" for="parametro">Ciudad:</label>
                <select
                  id="municipio"
                  class="formulario__input formulario__input--select"
                  v-model="formData.municipio"
                >
                  <option value="" disabled selected>--seleccione--</option>
                  <option
                    v-for="city in filteredCities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>

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
                <label>Coordenadas decimales: </label><input type="text" v-model="formData.coordenadas_decimales" placeholder="">
                <label>Coordenadas: </label><input type="text" v-model="formData.abcisa_xy" placeholder="">
            </div>

            <div class="form-section data__candidate">
                <label>Altura total: </label><input type="number" v-model.number="formData.altura_total" placeholder="">
                <label>Altura del fuste: </label><input type="number" v-model.number="formData.altura_fuste" placeholder="">
                <label>CAP: </label><input type="number" v-model.number="formData.cap" placeholder="">
                <label>Eje X: </label><input type="number" v-model.number="formData.eje_x" placeholder="">
                <label>Eje Y: </label><input type="number" v-model.number="formData.eje_y" placeholder="">
                <label>Eje Z: </label><input type="number" v-model.number="formData.eje_z" placeholder="">
                <label>Cobertura: </label><input type="text" v-model="formData.cobertura" placeholder="">
                <label>Otra cobertura: </label><input type="text" v-model="formData.cober_otro" placeholder="">
                <label>Entorno del individuo: </label><input type="text" v-model="formData.entorno_individuo" placeholder="">
                <label>Otro entorno del individuo: </label><input type="text" v-model="formData.entorno_otro" placeholder="">
                <label>Especies forestales asociadas: </label><input type="text" v-model="formData.especies_forestales_asociadas" placeholder="">
            </div> 
            
            <div class="form-section data__items">
                <label>Dominancia del individuo forestal: </label><input type="text" v-model="formData.dominancia_if" placeholder="">
                <label>Forma del fuste: </label><input type="text" v-model="formData.forma_fuste" placeholder="">
                <label>Dominancia del eje principal: </label><input type="text" v-model="formData.dominancia" placeholder="">
                <label>Altura de la bifurcación: </label><input type="text" v-model="formData.alt_bifurcacion" placeholder="">
                <label>Estado de la copa: </label><input type="text" v-model="formData.estado_copa" placeholder="">
                <label>Posición de la copa: </label><input type="text" v-model="formData.posicion_copa" placeholder="">
                <label>Estado fitosanitario: </label><input type="text" v-model="formData.fitosanitario" placeholder="">
                <label>Presencia de parasitas: </label><input type="text" v-model="formData.presencia" placeholder="">
                <label>Resultado: </label><input type="number" v-model.number="formData.resultado" placeholder="">
                <label>Evaluación: </label><textarea v-model="formData.evaluacion" placeholder=""></textarea>
                <label>Observaciones: </label><textarea v-model="formData.observaciones" placeholder=""></textarea>
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<style>
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
  grid-template-columns: repeat(2, 1fr);
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
  