<script setup>
import { defineProps } from 'vue';
import { useUsersStore } from "@/stores/users";
import { propertyStore } from "@/stores/dashboard/property";
import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";

const usersStore = useUsersStore();
const propertiesStore = propertyStore();
const nurseriesStore = useNurseriesDashStore();

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  changeUserState: {
    type: Function,
    required: true
  }
});

function onToggleChange(event) {
  // Evita que el checkbox cambie su estado visual de inmediato
  event.preventDefault();

  // Cambiamos el estado de is_active invirtiendo el booleano (de true a false o viceversa)
  const newState = !props.user.is_active;

  // Muestra la confirmación al usuario
  const confirmState = window.confirm(
    `¿Estás seguro de que deseas ${newState ? "activar" : "desactivar"} a este usuario?`
  );

  // Si el usuario cancela la confirmación, restablecemos el estado visual del checkbox
  if (!confirmState) {
    event.target.checked = props.user.is_active;
    return;
  }

  // Si el usuario confirma, ejecuta el cambio de estado llamando a la función pasada por props
  props.changeUserState(props.user.id, newState); // Pasamos el nuevo estado booleano (true o false)
}
</script>

<template>
    <div class="card__user">
        <div class="card__heading">
            <div class="card__options">
                <div class="card__check">
                    <label class="switch">
                        <input
                            @change="onToggleChange($event)"
                            :checked="props.user.is_active"
                            class="card__input"
                            type="checkbox"
                        />
                        <span class="card__check--button"></span>
                    </label>
                </div>
                <p class="role">{{ user.role }}</p>
            </div>
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
                <p>{{ user.cellphone }}</p>
                <p>{{ user.name }}</p>
                <p class="dato">{{ user.entity }}</p>

            </div>
        </div>
        <div class="card__footer">
            <div class="footer__image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M2 18H9V20H2V18ZM2 11H11V13H2V11ZM2 4H22V6H2V4ZM20.674 13.0251L21.8301 12.634L22.8301 14.366L21.914 15.1711C21.9704 15.4386 22 15.7158 22 16C22 16.2842 21.9704 16.5614 21.914 16.8289L22.8301 17.634L21.8301 19.366L20.674 18.9749C20.2635 19.3441 19.7763 19.6295 19.2391 19.8044L19 21H17L16.7609 19.8044C16.2237 19.6295 15.7365 19.3441 15.326 18.9749L14.1699 19.366L13.1699 17.634L14.086 16.8289C14.0296 16.5614 14 16.2842 14 16C14 15.7158 14.0296 15.4386 14.086 15.1711L13.1699 14.366L14.1699 12.634L15.326 13.0251C15.7365 12.6559 16.2237 12.3705 16.7609 12.1956L17 11H19L19.2391 12.1956C19.7763 12.3705 20.2635 12.6559 20.674 13.0251ZM18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14C16.8954 14 16 14.8954 16 16C16 17.1046 16.8954 18 18 18Z">
                    </path>
                </svg>
            </div>
            <div class="buttons">
                <button @click="usersStore.selectedUserUpdate(user.id)" class="nav__element animation"><span class="nav__text">Editar Usuario</span></button>
                <button @click="propertiesStore.selectedUserCreateUsersProperty(user.id)" class="nav__element animation"><span class="nav__text">Asignar Especie</span></button>
                <button @click="propertiesStore.selectedUserCreateProperty(user.id)" class="nav__element animation"><span class="nav__text">Registrar Predio</span></button>
                <button @click="propertiesStore.listUserSpeciesIds(user.id)" class="nav__element animation"><span class="nav__text">Ver especies</span></button>
                <button @click="nurseriesStore.selectedUserCreateNursery(user.id)" class="nav__element animation"><span class="nav__text">Vivero</span></button>
            </div>
        </div>
    </div>   
</template>

<style scoped>
.nav__element {
    display: inline-flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s ease all;
    position: relative;
    overflow: hidden;
}

.nav__text {
    position: relative;
    z-index: 2;
    transition: 0.3s ease all;
}

.animation::after {
    content: "";
    width: 100%;
    height: 162%;
    position: absolute;
    z-index: 1;
    background: var(--primary);
    color: var(--blanco);
    top: -170%;
    left: 0;
    border-radius: 0 0 50% 50%;
    transition: 0.3s ease-in-out all;
}

.animation:hover::after {
    top: 0;
}

.nav__element:hover .nav__text {
    color: var(--blanco);
}

/* opciones */
.buttons {
    padding: .5rem;
}

.buttons button {
    width: 95%;
    border-radius: .3rem;
    border: 1px solid var(--primary);
    background: none;
    margin-bottom: .62rem;
    font-size: 1rem;
    font-weight: 700;
    padding: .3rem 0;
}

.footer__image {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--secondary);
    padding: .3rem;

}

.footer__image svg {
    width: 2rem;
    color: var(--blanco);
}

.card__footer {
    position: absolute;
    background: var(--blanco);
    bottom: 0;
    transition: all .3s ease-in-out;
    transform: translateY(85%);
}

.card__footer:hover {
    transform: translateY(0);
}

.rol {
    font-size: .8rem;
    color: var(--primary);
}

.dato {
    font-weight: 700;
    color: var(--primary);
    text-transform: uppercase;
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

.card__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1rem
}

.card__user {
    position: relative;
    width: 310px;
    background-color: var(--blanco);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #00000030;
    padding-bottom: 3rem;
    overflow: hidden;
}

@media (min-width: 768px) {
    .card__user {  
        width: 350px;
    }
}

/* switch */
.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
    margin-left: 4px;
}

.switch .tabla__input {
    opacity: 0;
    width: 0;
    height: 0;
}

.card__check--button {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--secondary);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
}

.card__check--button:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
}

.card__input:checked+.card__check--button {
    background-color: var(--primary);
}

.card__input:focus+.card__check--button {
    box-shadow: 0 0 1px var(--primary);
}

.card__input:checked+.card__check--button:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
}
</style>