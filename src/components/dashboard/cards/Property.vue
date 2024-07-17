<script setup>


defineProps({
    property: {
        type: Object,
        required: true
    },
    selectedProperty: {
        type: Function,
        required: true
    },
    deleteProperty: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <div class="card__property">
        <div class="card__heading">

            <div class="card__image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M4 6.14286V18.9669L9.06476 16.7963L15.0648 19.7963L20 17.6812V4.85714L21.303 4.2987C21.5569 4.18992 21.8508 4.30749 21.9596 4.56131C21.9862 4.62355 22 4.69056 22 4.75827V19L15 22L9 19L2.69696 21.7013C2.44314 21.8101 2.14921 21.6925 2.04043 21.4387C2.01375 21.3765 2 21.3094 2 21.2417V7L4 6.14286ZM16.2426 11.2426L12 15.4853L7.75736 11.2426C5.41421 8.89949 5.41421 5.10051 7.75736 2.75736C10.1005 0.414214 13.8995 0.414214 16.2426 2.75736C18.5858 5.10051 18.5858 8.89949 16.2426 11.2426ZM12 12.6569L14.8284 9.82843C16.3905 8.26633 16.3905 5.73367 14.8284 4.17157C13.2663 2.60948 10.7337 2.60948 9.17157 4.17157C7.60948 5.73367 7.60948 8.26633 9.17157 9.82843L12 12.6569Z">
                    </path>
                </svg>
            </div>
        </div>
        <div class="card__body">
            <div class="card__content">
                <p class="dato">{{ property.nombre_predio }}</p>
                <p>Propietario: <span style="font-weight: 500;">{{ property.first_name + " " + property.last_name
                        }}</span></p>
                <p>{{ property.ciudad_name }}, {{ property.departamento_name }}</p>
            </div>
        </div>
        <div class="card__buttons">
            <div class="card__buttons-content">
                <svg @click="selectedProperty(property.id)" class="button__edit" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z">
                    </path>
                </svg>
                <svg @click="deleteProperty(property.id, property.nombre_predio)" class="button__delete"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z">
                    </path>
                </svg>
            </div>
        </div>
    </div>

</template>

<style scoped>

/* card heading */
.card__heading{
    margin-top: 1rem;
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
    width: 4rem;
    margin-bottom: -.40rem;
    margin-top: .8rem;
}


.card__property {
    position: relative;
    width: 310px;
    background-color: var(--blanco);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #00000030;
    padding-bottom: 2rem;
    overflow: hidden;
}

@media (min-width: 768px) {
    .card__property {
        width: 360px;
    }
}


/* card buttons */
.card__buttons {
    position: absolute;
    top: 0;
    right: 0;
}

.card__buttons-content {
    padding: 1rem;
}

.card__buttons .button__edit {
    width: 1.5rem;
    margin-right: .5rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
}
.card__buttons .button__edit:hover {
    color: var(--primary);
}

.card__buttons .button__delete {
    width: 1.3rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
}

.card__buttons .button__delete:hover {
    color: var(--rojo);
}
</style>