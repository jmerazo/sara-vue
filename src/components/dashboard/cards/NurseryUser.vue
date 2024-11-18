<script setup>
import { defineProps } from 'vue';
import { useNurseriesUserStore } from "@/stores/dashboard/nurseriesUser";
import { useToast } from '../../../helpers/ToastManagement';

const nurseriesUser = useNurseriesUserStore();
const { addToast } = useToast();

const props = defineProps({
    nursery: {
        type: Object,
        required: true
    },
    changeNurseryUserState: {
        type: Function,
        required: true
    }
})

function onToggleChange(event) {
  // Evita que el checkbox cambie su estado visual de inmediato
  event.preventDefault();

  // Cambiamos el estado de is_active invirtiendo el booleano (de true a false o viceversa)
  const newState = !props.nursery.activo;

  // Muestra la confirmación al usuario
  const confirmState = window.confirm(
    `¿Estás seguro de que deseas ${newState ? "activar" : "desactivar"} esta especie?`
  );

  // Si el usuario cancela la confirmación, restablecemos el estado visual del checkbox
  if (!confirmState) {
    event.target.checked = props.nursery.activo;
    return;
  }

  // Si el usuario confirma, ejecuta el cambio de estado llamando a la función pasada por props
  props.changeNurseryUserState(props.nursery.id, newState); // Pasamos el nuevo estado booleano (true o false)
}

async function deleteNurseryUser(id, nu) {
    try {
        const confirmDelete = window.confirm(
        `¿Estás seguro de que desea eliminar la especie ${nu} del inventario?`
        );
        if (!confirmDelete) {
            return;
        }
        const response = await nurseriesUser.deleteNurseryUser(id);
            if(response.status == 200){
                addToast(response.msg, {
                type: 'success',
                duration: 3000
            })
        }         
    } catch (error) {
        if (error.message) {
        addToast(error.message, { 
            type: 'error',
            duration: 3000
        });
        } else {
        addToast("Ocurrió un error al procesar la solicitud.", { 
            type: 'error',
            duration: 3000
        });
        }
    }
}
</script>

<template>
    <div class="card__nursery">
        <div class="card__heading">
            <div class="card__options">
                <div class="card__check">
                    <label class="switch">
                        <input
                            @change="onToggleChange($event)"
                            :checked="props.nursery.activo"
                            class="card__input"
                            type="checkbox"
                        />
                        <span class="card__check--button"></span>
                    </label>
                </div>
            </div>
            <div class="card__image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="#000000" 
                    d="M478 23.74c-11.3.28-23.5 1.47-34.9 3.67c-16 3.08-30.4 8.33-37.9 13.88c-.7 2.21-.9 5.24-.8 7.29c0 2.1.3 4.38.7 6.68c13.3-9.91 29.6-15.59 46.1-20.96c-14.3 10.07-26.6 20.65-38.2 31.49c8.1 3.57 17.7 3.62 23.9-.77h.1c13.4-9.64 31.3-25.76 41-41.25zm-297.9 3.59c-2.7 0-5.6.3-8.6.97c-2 9.79-.8 18.7 2.9 25.79c-9-3.54-19.8-2.95-30.8 6.26c6.7 22.83 26.9 33 47.7 22.69c.6 9.44.9 18.96.9 28.46c-6.5-7.1-17.2-13.55-28.3-13.25c-7.8.3-15.9 3.85-23 12.85c11.2 21 33 26.8 51.2 12.6c-.2 10.3-.7 20.6-1.5 31c-6.1-8.4-17-16.4-29.1-16.3c-5.4.1-11 1.8-16.6 5.8c16 4.5 30.6 10.9 43.7 19.5c4.9 3.1 7.4 7.9 8.8 12.6c1.3 4.7 1.6 9.6 1.5 14.6c-.4 10.2-2.8 20.9-6.4 30l-1.3 3l-2.9 1.5c-2 1.1-4.3 2.2-6.5 3.3q-3.15 19.2-6.9 38.7c-14.8-18-29.7-24.6-44.4-24.7c-37.59-.4-74.36 41.2-108.68 41.9c46.47 3.3 118.78-44.1 143.98 11.6c18.7 13.9 37.9 25.2 57.5 33.8c1.6-9.4 4.2-19.3 7.8-28.1c2.3-5.6 4.9-10.8 8.2-15.2s7.3-8.4 13.4-9.9c1.7-.5 3.5-.9 5.2-1.3c-5.4-10.5-4.7-24.6 1.7-36.4c6.5-12.1 18.3-20.5 30.4-21.4c12.4-18.9 25.4-37.3 39.1-55.4c10.6 22.5 34 26.6 53.3 10.9c-4.9-18.1-18-23.8-30.5-23.5c-5.6.1-11.1 1.5-15.8 3.5c19.7-25.5 40.8-50 63.4-73.76c-8.2-3.62-8.8-6.35-10.9-14.61c-23 23.99-44.5 48.97-64.6 74.67c-.5 15.9-9.5 30.2-24.7 33.2h-.2C289.4 186.3 280 200 271 214c2.3-14.9 4.6-30.2 7.4-45.4c-7-4.4-12.6-11.8-15.7-20.4c-9.5 30.5-16.3 62.9-25.1 90.9c-1.2-.2-2.5-.3-3.7-.3c-15.8-.1-29.7 13.6-33.3 23.9c12.1 10.4 25.4 12.4 36.3 7.6c-4.1 7.3-8.3 14.7-12.3 22.1c-3.6-1.6-7.3-2.4-10.8-2.4c-11.4-.1-21.8 7.1-28.1 14.9c6.9-32.8 13.1-65.6 17.6-98.3c18.4 9.3 37.5 1.1 46-19.6c-7.2-7.5-14.8-10.5-22-10.6c-7.9-.1-15.4 3.4-21.3 8.1q1.95-16.95 3-33.9c18.8 18.5 43.1 13.5 55.1-9.1c-7.1-9-15.2-12.5-23-12.8c-13.6-.4-26.4 9.3-31.9 18.1c.6-10.7 1-21.3 1-31.9c20.5 9.6 40.2-.6 46.8-23.2c-7.2-6.03-14.3-8.36-20.8-8.26c-10.8.16-20.2 6.95-26.2 14.71c-.2-7.05-.6-14.1-1.1-21.13c23.4 7.71 42.3-6.26 44.5-30.81c-19.8-10.93-35-.74-42.9 11.84c-1.8-14.09-11-30.7-30.4-30.72m178 13.92c-36.8 5.82-59.7 28.28-75.7 58l2.4-.6c5.3-1 10.4-.5 15 1.2c12.2-23.81 30.2-44.39 58.3-58.6M490.2 105c-47.4 67.9-110.8 96.8-173.1 128.2c5.3 10.5 4.6 24.3-1.7 36v.1c65.8-40.8 132.8-79.5 174.8-164.3m-89.7 4.4c-15.8-.2-29.7 13.7-33.3 23.9c20.9 18 45.3 10.9 55.3-13.3c-7.2-7.5-14.8-10.5-22-10.6m-111 6.8c-.4.1-.8.1-1.2.2c-6.3 1.2-12 10.1-9.7 21.9s11 18 17.2 16.7c6.3-1.2 12-10.1 9.7-21.9c-2.2-11.1-9.8-17.2-16-16.9M84.98 154.4c-1.49 0-3.08.1-4.59.1c9.39 25.3 19.49 46.9 40.81 59.9h.1c14.2 9 31.2 6.5 45.9.9l-42.4-35.1l52.9 28c1.5-8.9 6.7-20.8 1.3-29.3h-.1v-.1c-24.5-15.9-55.3-24.1-93.92-24.4m206.92 81.3c-5.5.2-12.2 4-16.5 11.9c-5.7 10.6-2.9 20.9 2.7 23.9c8.6 3.7 18.2-5 21.4-10.8c5.7-10.6 2.9-20.8-2.7-23.9c-1.4-.8-3.1-1.1-4.9-1.1m-3.1 54.3c-1.5 0-3.1 0-4.6.1c-9.2.4-18.2 1.8-27 4.1h-.1c.1 0-1.5.7-3.4 3.3s-4.1 6.5-5.9 11.2c-2.7 6.5-4.8 14.3-6.2 21.6l64-10.1l-51.9 20.6c5.4 8 6.9 11.3 8.2 17.2c8.3 5.3 17.1 7.7 28.2 5c27.6-6.5 49.3-29 72-55.5c-26-11.9-50.2-17.7-73.3-17.5m-137.2 17.9l-9 22.9c32.7 14.4 60.6 31.1 87.3 47.9l12.5-22.6c-31.9-9.8-62-26.3-90.8-48.2m-12.6 41c-20.9 27.3-46.01 51-74.71 64.9l7.88 16.2c33.33-16.2 60.93-43.1 83.53-73.2c-5.4-2.7-11-5.4-16.7-7.9m20.3 9.7c-23.6 42.1-46.3 72.1-70.35 116.1l15.85 8.6c23.4-42.9 46-73 70.5-116.3c-5.2-2.8-10.6-5.6-16-8.4m26.2 14.2c-24.6 37.7-42.2 68.5-59.6 108.3l16.4 7.2c17.1-39 34.2-68.8 58.6-106.4c-5.1-3.1-10.2-6.2-15.4-9.1m23 13.7c-15.4 26-17.1 57-19.8 80.6l17.8 2.1c2.9-24.2 5.1-52.2 17.3-73.1z"/>
                </svg>
            </div>
        </div>
        <div class="card__body">
            <div class="card__content">
                <p class="dato">{{ nursery.vernacularName }}</p>
                <p>{{ nursery.scientificName + " " + nursery.scientificNameAuthorship }}</p>
            </div>
            <div class="card__content">
                <table class="inventory-table">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cantidad base</td>
                            <td>{{ nursery.cantidad_stock }}</td>
                        </tr>
                        <tr>
                            <td>Vendidas</td>
                            <td>{{ nursery.ventas_realizadas }}</td>
                        </tr>
                        <tr>
                            <td>Disponible</td>
                            <td>{{ nursery.cantidad_stock - nursery.ventas_realizadas }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="card__footer">
            <div class="footer__image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="#ffffff" 
                        d="m15.5 19.214l-3.558-3.558l.708-.708l2.85 2.85l5.689-5.688l.707.707zM20 10h-1V5.616q0-.231-.192-.424T18.384 5H16v2.23H8V5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192H11v1H5.616q-.672 0-1.144-.472T4 18.385V5.615q0-.67.472-1.143Q4.944 4 5.616 4h4.636q.14-.586.623-.985q.483-.4 1.125-.4q.654 0 1.134.4q.48.398.62.985h4.63q.672 0 1.144.472T20 5.616zm-8-4.77q.348 0 .578-.229q.23-.23.23-.578t-.23-.578t-.578-.23t-.578.23t-.23.578t.23.578t.578.23"/>
                </svg>
            </div>
            <div class="buttons">
                <button @click="nurseriesUser.selectedSpecieInventory(nursery.id)" class="nav__element animation"><span class="nav__text">Actualizar inventario</span></button>
                <!-- <button @click="nurseriesUser.selectedUpdateNursery(nursery.id)" class="nav__element animation"><span class="nav__text">Desactivar especie</span></button> -->
                <button @click="deleteNurseryUser(nursery.id, nursery.vernacularName)" class="nav__element animation" style="color: rgb(200, 73, 12);"><span class="nav__text">Eliminar especie</span></button>
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
    width: 310px;
}
@media (min-width: 768px) {
    .buttons{
        width: 350px;
    }
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
    transform: translateY(70%);
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

.card__image--secondary svg {
    width: 3rem;
    margin-bottom: 0rem;
}



.card__nursery {
    position: relative;
    width: 310px;
    background-color: var(--blanco);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #00000030;
    padding-bottom: 3rem;
    overflow: hidden;
}

@media (min-width: 768px) {
    .card__nursery {
        width: 360px;
    }
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

.inventory-table {
    width: 100%;
    border-collapse: separate; /* Cambiar a "separate" para soportar bordes redondeados */
    border-spacing: 0; /* Asegura que no haya espacio entre celdas */
    margin-top: 1rem;
    font-size: 1rem;
    border-radius: 8px; /* Bordes redondeados para toda la tabla */
    overflow: hidden; /* Asegura que los bordes redondeados se apliquen correctamente */
    border: 1px solid #ddd; /* Borde exterior de la tabla */
}

.inventory-table th,
.inventory-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.inventory-table th {
    background-color: var(--primary);
    color: white;
    font-weight: bold;
}

.inventory-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.inventory-table tr:hover {
    background-color: #f1f1f1;
}

</style>