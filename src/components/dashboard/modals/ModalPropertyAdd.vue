<script setup>
import { ref, computed, watch } from 'vue';
import { propertyStore } from "@/stores/dashboard/property";
import { useModalStore } from "@/stores/modal";
import { locatesColombia } from "@/stores/locates";

const locates = locatesColombia();
const property = propertyStore();
const modal = useModalStore();

const error = ref("");

const formData = ref({
  p_user: '',
  nombre_predio: '',
  p_departamento: '',
  p_municipio: ''
});

watch(() => property.userSelected, (newValue) => {
  formData.value.p_user = newValue;
});


function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {
  if (Object.values(formData.value).some(value => value === "")) {
    error.value = "Hay campos vacíos";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }
  try {
    property.createProperty(formData.value);
    resetForm();
    modal.handleClickModalPropertyAdd();
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

const filteredCities = computed(() => {
  const { p_departamento } = formData.value;

  if (p_departamento) {
    const filtered = locates.cities.filter(
      (city) => city.department_id === p_departamento
    );
    return filtered;
  }
  return [];
});


</script>

<template>
  <div class="modal" v-if="modal.modalPropertyAdd">
    <div class="modal__contenido">
      <div class="form__content">

        <h3 class="form__title">Registrar nuevo predio</h3>
        <hr>
        <form class="form__modal" @submit.prevent="handleSubmit">


          <div style="display: none;" class="form__field">
            <label>user</label>
            <input class="form__input" type="text" v-model="formData.p_user" :placeholder="property.userSelected">
          </div>

          <div class="form__field">
            <label class="form__label">Nombre del predio: </label>
            <input class="form__input" type="text" v-model="formData.nombre_predio" />
          </div>


          <div class="form__field">
            <label class="form__label" for="departamento">Departamento:</label>
            <select id="departamento" class="form__input"
              v-model="formData.p_departamento">
              <option value="">--Seleccione--</option>
              <option v-for="loc in locates.departments" :key="loc.id" :value="loc.code">
                {{ loc.name }}
              </option>
            </select>
          </div>

          <!-- ciudad -->
          <div class="form__field">
            <label class="form__label" for="municipio" v-show="filteredCities.length">Ciudad:</label>
            <select id="municipio" class="form__input" v-model="formData.p_municipio"
              v-show="filteredCities.length">
              <option value="">-- Seleccione--</option>
              <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>

          </div>
          <p class="msg__error" v-if="error">
            {{ error }}
          </p>

          <div class="formulario__botones">
            <button type="submit" class="button__user-property"><svg style="width: 2rem;"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
                </path>
              </svg></button>

            <div class="boton__cerrar" @click="modal.handleClickModalPropertyAdd()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg__error {
  padding: 0;
  margin: 0;
  text-align: center;
  border-left: 4px solid var(--rojo);
  padding-left: 2rem;
  color: var(--rojo);
}
/* content general */
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

/* form content */
.form__content{
  padding: .6rem;
}

.form__content .form__title{
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 500;
}

.form__modal .form__field {
  margin: 1rem 0;
}

.form__field .form__label{
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: .5rem;
  text-align: left;
}
.form__field .form__input{
  width: 100%;
  padding: .2rem;
  border: 1px solid var(--primary);
  border-radius: 5px;
}

/* form buttons */
.formulario__botones {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0rem;
  transition: all .3s ease-in-out;
}

.button__user-property {
  background: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  padding: .5rem;
  transition: all .3s ease-in-out;
}

.button__user-property:hover {
  background: var(--primary);
  color: var(--blanco);
}
</style>