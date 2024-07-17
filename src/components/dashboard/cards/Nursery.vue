<script setup>

import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";

const nurseriesStore = useNurseriesDashStore();

defineProps({
    nursery: {
        type: Object,
        required: true
    },
    deleteNursery: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <div class="card__nursery">
        <div class="card__heading">

            <div class="card__image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z">
                    </path>
                </svg>
            </div>
        </div>
        <div class="card__body">
            <div class="card__content">
                <p class="dato">{{nursery.nombre_vivero}}</p>
                <p>{{ nursery.direccion }}</p>
            </div>
            <div class="card__content">
                <div class="card__image card__image--secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 21.5L15.0611 23.0451L15.6224 19.7725L13.2447 17.4549L16.5305 16.9775L18 14L19.4695 16.9775L22.7553 17.4549L20.3776 19.7725L20.9389 23.0451L18 21.5Z">
                        </path>
                    </svg>
                </div>
                <p >{{ nursery.first_name + " " + nursery.last_name }}</p>
                <p>{{ nursery.email }}</p>
                <p>{{ nursery.telefono }}</p>
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
                <button @click="nurseriesStore.selectedUpdateNursery(nursery.id)" class="nav__element animation"><span class="nav__text">Editar Vivero</span></button>
                <button @click="nurseriesStore.selectedNurseryAssignSpecie(nursery.id)" class="nav__element animation"><span class="nav__text">Asignar Especie</span></button>
                <button @click="nurseriesStore.selectedNurserySpeciesList(nursery.id)" class="nav__element animation"><span class="nav__text">Listar Especies</span></button>
                <button @click="deleteNursery(nursery.id, nursery.nombre_vivero)" class="nav__element animation" style="color: rgb(200, 73, 12);"><span class="nav__text">Eliminar Vivero</span></button>
               
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
    transform: translateY(82%);
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
</style>