<script setup>
import { watch, computed, ref } from "vue";

import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users";
import { useAuthToken } from "@/stores/auth";
import APIService from "../../services/APIService";
import { useRouter } from "vue-router";


const router = useRouter();
const locates = useAuthToken();
const modal = useModalStore();
const usersStore = useUsersStore();
const error = ref('')

const formData = ref({
  document_type: "",
  document_number: "",
  first_name: "",
  last_name: "",
  email: "",
  cellphone: "",
  rol: "",
  profession: "",
  entity: "",
  department: "",
  city: "",
});

const filteredCities = computed(() => {
  const selectedDepartament = formData.value.department;
  if (selectedDepartament) {
    const filtered = locates.cities.filter(
      (city) => city.department_id === selectedDepartament
    );
    return filtered;
  }
  return [];
});

async function userUpdate() {
  if (!validateForm()) {
    error.value = 'Hay campos vacíos'
    setTimeout(()=>{
      error.value = ''
    },3000)
    return;
  }

  try {
    await APIService.updateUsers(usersStore.userSelected[0].id, formData.value);
    /* $toaster.success(`Usuario ${usersStore.userSelected[0].email} actualizado`); */
    alert(`Usuario ${usersStore.userSelected[0].email} actualizado`);
    router.go();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      // Si hay un mensaje de error en la respuesta, lo puedes mostrar
      alert(error.response.data.error);
    } else {
      // En caso de un error inesperado
      alert("Ocurrió un error al procesar la solicitud.");
    }
  }
}

function validateForm() {
  const formKeys = Object.keys(formData.value);
  for (const key of formKeys) {
    if (!formData.value[key]) {
      return false;
    }
  }
  return true;
}

const initializeFormData = () => {
  const selectedUser = usersStore.userSelected[0];
  if (selectedUser) {
    formData.value = {
      document_type: selectedUser.document_type || "",
      document_number: selectedUser.document_number || "",
      first_name: selectedUser.first_name || "",
      last_name: selectedUser.last_name || "",
      email: selectedUser.email || "",
      cellphone: selectedUser.cellphone || "",
      rol: selectedUser.rol || "",
      profession: selectedUser.profession || "",
      entity: selectedUser.entity || "",
      department: selectedUser.department || "",
      city: selectedUser.city || "",
    };
  }
};

watch(
  () => usersStore.userSelected,
  () => {
    initializeFormData();
  }
);

function delUser(id, nu) {
  console.log(id);
  const confirmDelete = window.confirm(
    `¿Estás seguro de que desea eliminar el usuario ${nu}?`
  );
  if (!confirmDelete) {
    return;
  }
  usersStore.deleteUser(id);
}
</script>

<template>
  <div class="modal" v-if="modal.modalUserUpdate">
    <div class="modal__contenido">
      <div>
        
        <div>
          <div class="modal__encabezado">
            <div class="modal__imagen">
              <img src="/icons/icon-user.png" alt="">
            </div>
            <h4 class="modal__titulo">
              {{ usersStore.userSelected[0].first_name }}
              {{ usersStore.userSelected[0].last_name }}
             
            </h4>
            <p class="modal__titulo">
              {{ usersStore.userSelected[0].document_number }}
              {{ usersStore.userSelected[0].id }}
              
            </p>
           
          </div>
          <hr />
          <form @submit.prevent="userUpdate" class="formulario">
            <div class="fomulario__campo">
              <label class="formulario__label" for="state">
                Tipo de
                documento :</label
              >
              <select
                name="rol"
                id="state"
                class="formulario__select"
                v-model="formData.document_type"
              >
                <option value="null" selected disabled>
                  {{ usersStore.userSelected[0].document_type }}
                </option>
                <option value="Cédula de ciudadania">
                  Cédula de ciudadania
                </option>
                <option value="Número de identificación tributaria">
                  Número de identificación tributaria
                </option>
                <option value="Tarjeta de identidad">
                  Tarjeta de identidad
                </option>
              </select>
            </div>
            <div class="fomulario__campo">
              <label for="identificacion" class="formulario__label"
                >Número de
                documento :</label
              >

              <input
                id="identificacion"
                type="number"
                class="formulario__input"
                v-model="formData.document_number"
              />
              <!-- usersStore.userSelected[0].document_number -->
            </div>
            <div class="fomulario__campo">
              <label for="nombres" class="formulario__label"
                >Nombres
                :</label
              >
              <input
                id="nombres"
                type="text"
                class="formulario__input"
                v-model="formData.first_name"
              />
            </div>
            <div class="fomulario__campo">
              <label for="apellidos" class="formulario__label"
                >Apellidos
                :</label
              >
              <input
                id="apellidos"
                type="text"
                class="formulario__input"
                v-model="formData.last_name"
              />
            </div>
            <div class="fomulario__campo">
              <label for="email" class="formulario__label"
                >Correo
                :</label
              >
              <input
                id="email"
                type="email"
                class="formulario__input"
                v-model="formData.email"
              />
            </div>
            <div class="fomulario__campo">
              <label for="contacto" class="formulario__label"
                >Contacto
                :</label
              >
              <input
                id="contacto"
                type="number"
                class="formulario__input"
                v-model="formData.cellphone"
              />
            </div>
            <div class="fomulario__campo">
              <label for="entidad" class="formulario__label"
                >Entidad
                :</label
              >
              <input
                id="entidad"
                type="text"
                class="formulario__input"
                v-model="formData.entity"
              />
            </div>
            <div class="fomulario__campo">
              <label for="rol" class="formulario__label"
                >Rol :</label
              >
              <select
                name="rol"
                id="rol"
                class="formulario__select"
                v-model="formData.rol"
              >
                <option value="null" selected>
                  {{ usersStore.userSelected[0].rol }}
                </option>
                <option value="DEFAULT" class="font-bold">DEFAULT</option>
                <option value="ADMINISTRADOR" class="font-bold">
                  ADMINISTRADOR
                </option>
              </select>
            </div>
            <div class="fomulario__campo">
              <label for="profesion" class="formulario__label"
                >Profesión
                :</label
              >
              <select
                name="rol"
                id="profesion"
                class="formulario__select"
                v-model="formData.profession"
              >
                <option value="null" selected>
                  {{ usersStore.userSelected[0].profession }}
                </option>
                <option value="BIÓLOGO" class="font-bold">BIÓLOGO</option>
                <option value="INGENIERO" class="font-bold">INGENIERO</option>
                <option value="ESTUDIANTE" class="font-bold">ESTUDIANTE</option>
                <option value="ABOGADO" class="font-bold">ABOGADO</option>
              </select>
            </div>
            <div class="fomulario__campo">
              <label for="department" class="formulario__label"
                >Departamento
                :</label
              >
              <select
                name="department"
                id="department"
                class="formulario__select"
                v-model="formData.department"
              >
                <option value="null" selected disabled>
                  Seleccione un departamento...
                </option>
                <option
                  v-for="loc in locates.departments"
                  :key="loc.code"
                  :value="loc.code"
                >
                  {{ loc.name }}
                </option>
              </select>
            </div>
            <div class="fomulario__campo">
              <label for="city" class="formulario__label"
                >Ciudad
                :</label
              >
              <select
                name="city"
                id="city"
                class="formulario__select"
                v-model="formData.city"
              >
                <option value="null" selected disabled>
                  Seleccione un municipio...
                </option>
                <option
                  v-for="city in filteredCities"
                  :key="city.id"
                  :value="city.id"
                >
                  {{ city.name }}
                </option>
              </select>
            </div>
            <div class="formulario__botones">
              <button type="submit" class="formulario__boton" :class="{alerta:error}">
                {{ error ? error : 'Actualizar' }}
              </button>
              
              <button
                class="formulario__boton formulario__boton-cerrar"
                type="button"
                @click="modal.handleClickModalUserUpdate()"
              >
                Cerrar
              </button>
              <button
                @click="delUser(usersStore.userSelected[0].id,usersStore.userSelected[0].email)"
                type="submit"
                class="formulario__boton formulario__boton-eliminar"
              >
                Eliminar
              </button>
            </div>
          </form>
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
}
@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}
@media (min-width: 1440px) {
  .modal__contenido {
    width: 30%;
  }
}
.modal__encabezado{
  display: flex;
  flex-direction: column;
}
.modal__imagen{
  width: 5rem;
  margin: 0 auto;
}
.modal__titulo {
  font-size: .95rem;
  margin: 0 auto;
  padding: 0;
  font-weight: 700;
}


/* formulario  */
.fomulario__campo{
  margin-bottom: .5rem;
}
.formulario__label{
  display: block;
  text-align: left;
  font-weight: 700;
  font-size: .8rem;
  
}
.formulario__select,
.formulario__input{
  border: 1px solid var(--primary);
  border-radius: 5px;
  width: 97%;
  font-size: .9rem;
  padding: .3rem;
}
.formulario__botones{
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin: 1.3rem 0 0 0;
}

.formulario__boton{
  border-radius: 5px;
  font-weight: 700;
  padding: .3rem;
  font-size: 1rem;
  color: var(--blanco);
  background-color: var(--primary);

}
.formulario__boton-cerrar{
  background-color: var(--secondary);
}

.formulario__boton-eliminar{
  background-color: var(--rojo);
  margin-top: 1.5rem;
}

.alerta{
  background-color: var(--rojo);
}
</style>