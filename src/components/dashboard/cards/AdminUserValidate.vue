<script setup>
import { defineProps, ref } from 'vue';
import { useUsersValidateStore } from "@/stores/dashboard/usersValidate";
import { useToastStore } from '@/stores/toast';

const userValidateStore = useUsersValidateStore();
const toast = useToastStore()

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const formData = ref({
  rol: ""
})

function acceptUser() {
  const confirmAccept = window.confirm("¿Estás seguro de que deseas aceptar a este usuario?");
  
  if (confirmAccept) {
    userValidateStore.userValidateAccept(props.user.id, formData.value.rol).then(response => {
      if (response.success) {
        toast.activateToast(response.message, 'success');
      } else {
        toast.activateToast(response.message, 'error');
      }
    }).catch(error => {
      toast.activateToast('Error al procesar la solicitud: ' + error.message, 'error');
    });
  }
}

function rejectUser() {
  const confirmReject = window.confirm("¿Estás seguro de que deseas rechazar a este usuario?");
  
  if (confirmReject) {
    usersStore.userValidateReject(props.user.id).then(response => {
      if (response.success) {
        // Mostrar notificación de éxito
        toast.activateToast(response.message, 'success');
      } else {
        // Mostrar notificación de error
        toast.activateToast(response.message, 'error');
      }
    }).catch(error => {
      // Manejo de errores no esperados
      toast.activateToast('Error al procesar la solicitud: ' + error.message, 'error');
    });
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>


<template>
    <div class="card__user">
        <div class="card__heading">
            <div class="card__image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z">
                    </path>
                </svg>
            </div>
        </div>
        <div class="card__body">
            <div class="card__content">
                <p style="font-weight: 700;">{{ user.first_name + " " + user.last_name }}</p>
                <p>{{ user.email }}</p>
                <p>{{ formatDate(user.date_joined) }}</p>
            </div>
        </div>
        <div class="card__body select-container">
          <label for="rol" class="form__modal--label">Asignar rol:</label>
          <select name="rol" id="rol" class="form__modal--input" v-model="formData.rol">
            <option value="" selected disabled>Seleccione un rol...</option>
            <option v-for="r in userValidateStore.roles" :key="r.id" :value="r.id">{{ r.name }}</option>
          </select>
        </div>
        <div class="card__footer">
            <div class="buttons">
                <button @click="acceptUser" class="btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M9 16.2l-3.5-3.5-1.42 1.42L9 19l7.92-7.92-1.42-1.42L9 16.2z"/>
                    </svg>
                </button>
            
                <button @click="rejectUser" class="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M18.3 5.71L16.59 4l-6.59 6.59L3.41 4 1.7 5.71l6.59 6.59-6.59 6.59 1.71 1.71L10 13.41l6.59 6.59 1.71-1.71-6.59-6.59z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card__user {
    position: relative;
    width: 310px;
    background-color: var(--blanco);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #00000030;
    padding-bottom: 1rem; /* Ajustar padding para el contenido */
    overflow: hidden;
}

.card__heading{
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.card__body {
    margin-bottom: 1rem;
}

.card__footer {
    background: var(--blanco);
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
}

.buttons {
    display: flex;
    gap: 10px;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10%;
    border: none;
    cursor: pointer;
}

button svg {
    width: 16px;
    height: 16px;
}

.btn-success {
    background-color: var(--primary);
    color: white;
}

.btn-success:hover {
    background-color: var(--primary-hover);
    color: white;
}

.btn-danger {
    background-color: var(--rojo);
    color: white;
}

.btn-danger:hover {
    background-color: rgb(164, 29, 29);
    color: white;
}

.card__content {
    padding: 0 1rem;
    margin-top: 1rem;
}

.card__content p {
    margin: 0;
    font-size: 1.05rem;
    padding: .2rem 0;
    text-align: center;
}

.card__image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card__image svg {
    width: 4.5rem;
    margin-bottom: -.40rem;
    margin-top: .8rem;
}

.select-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form__modal--input {
    width: 80%; /* Ajusta según el ancho deseado */
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0.5rem;
}

.card__footer {
    background: var(--blanco);
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
}

.buttons {
    display: flex;
    gap: 10px;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10%;
    border: none;
    cursor: pointer;
}

button svg {
    width: 16px;
    height: 16px;
}

.btn-success {
    background-color: var(--primary);
    color: white;
}

.btn-danger {
    background-color: var(--rojo);
    color: white;
}
</style>
