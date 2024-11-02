<script setup>
import { useNurseriesStore } from '../../stores/nurseries';
import { useModalStore } from '../../stores/modal';
const store = useNurseriesStore()
const modal = useModalStore()

const show = true
</script>

<template>
    <div class="modal" v-if="modal.modalNurserySpecieList">
        <div class="modal__contenido">
            <div class="contenido">
                <div style="position: relative;">

                    <div v-if="store.nursery.especies.length">
                        <h1 style="margin: 0;padding: 0; font-size: 1.5rem;">Listado de especies</h1>
                        <p style="margin: 0;padding: 0; font-size: 1.3rem; margin-bottom: 2rem;">{{
                            store.nursery.nombre_vivero }}</p>

                        <div v-for="specie in store.nursery.especies">
                            <article class="specie__nursery">
                                <p>{{ specie.nom_comunes }}</p>
                                <p>{{ specie.nombre_cientifico_especie }} <span style="font-style: italic;">{{
                                    specie.nombre_autor_especie }}</span></p>
                                <p>Tipo: {{ specie.tipo_venta }}</p>
                                <p>Unidad de medida: {{ specie.unidad_medida }}</p>
                            </article>
                        </div>

                    </div>

                    <p v-else style="font-weight: 500;padding: 1rem;"> <span
                            style="border-left: 3px solid red; padding-left: .2rem;">No hay especies registradas para
                            este
                            vivero</span></p>
                    <svg @click="modal.handleClickModalNurserySpecieList()" class="close__modal"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z">
                        </path>
                    </svg>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.close__modal {
    width: 2rem;
    position: absolute;
    top: 0;
    right: 0;
}

.close__modal:hover {
    color: var(--primary);
}

.specie__nursery {
    padding: 1rem;
    border: 1px solid var(--primary);
    border-radius: 1rem;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: .2rem;
}

.specie__nursery p {
    margin: 0;
    padding: 0;
    text-align: left;
    font-weight: 500;
    font-size: 1.1rem;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: auto;
    z-index: 1000;
}

.modal__contenido {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--blanco);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 75%;
    overflow-y: auto;
    z-index: 2;
}

@media (min-width: 768px) {
    .modal__contenido {
        width: 70%;
    }
}

@media (min-width: 920px) {
    .modal__contenido {
        width: 80%;
        padding: 20px;
    }
}

@media (min-width: 1440px) {
    .modal__contenido {
        width: 60%;
    }
}

@media (min-width: 1920px) {
    .modal__contenido {
        width: 40%;
    }
}
</style>