<script setup>
import { ref } from 'vue'
import { useNurseriesStore } from "@/stores/nurseries";
import { useToastStore } from '@/stores/toast';

const nurseries = useNurseriesStore();
const toast = useToastStore()
const formData = ref({
  email: '',
  message: ''
})

const sendData = (e)=>{
  e.preventDefault();
  if(Object.values(formData.value).includes('')){
    return toast.activateToast('Todos los campos son obligatorios', 'error')
  }
  nurseries.sendEmail(formData.value)
}


defineProps({
    id:{
        type:Number,
        required:true
    }
})
</script>

<template>
    <div class="form__nurseries" :class="{show__form : nurseries.formNurseries === id }">
        <form @submit="sendData">
            <div>
                <label for="email">Correo:</label>
                <input v-model="formData.email" type="email" required placeholder="Ingresa tu correo">
            </div>
            <div>
                <label for="message">Escribir mensaje:</label>
                <textarea v-model="formData.message" name="message" id="message" rows="3"></textarea>
                
            </div>
            <button>Enviar</button>
            <svg @click="nurseries.showFormNurseries(0)" class="close__form" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path></svg>
        </form>
    </div>
</template>



<style scoped>
.close__form{
    width: 2rem;
    position: absolute;
    top: 0;
    right: 0;
}
.form__nurseries {
  background-color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(-100%);
  transition: all .3s ease-in-out;
}

.form__nurseries form {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}
.form__nurseries form label{
  display: block;
  margin-bottom: .3rem;
  color: var(--gris);
}
.form__nurseries form input,
.form__nurseries form textarea{
  width: 95%;
  padding: 0.5rem;
  border-radius: .5rem;
  border: 1px solid var(--primary);
}
.form__nurseries form button{
  width: 100%;
  padding: 0.5rem 0;
  border-radius: .5rem;
  background-color: var(--primary);
  color: white;
  font-weight: 500;
}
.show__form{
    transform: translateY(0%);
}
</style>