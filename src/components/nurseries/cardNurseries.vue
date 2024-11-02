<script setup>
import { useNurseriesStore } from "@/stores/nurseries";
import formNurseries from '@/components/nurseries/formNurseries.vue'

const nurseries = useNurseriesStore();
defineProps({
    nursery: {
        type: Object,
        Required: true
    }
})
function getLatLong(coordinates) {
    const [lat, long] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
    return { lat, long };
}
</script>

<template>
    <article class="nurseries__card">
        <!-- text content -->
        <div class="nurseries__card--description">

            <!-- form nurseries -->
            <formNurseries :id="nursery.id" />

            <div class="description__text">
                <p>{{ nursery.tipo_registro || 'Tipo de vivero sin información' }}</p>
                <p>Clase: {{ nursery.clase_vivero || 'Sin información' }}</p>
            </div>
            <div class="description__text">

                <p>Departamento: {{ nursery.departamento }}</p>
                <p>Municipio: {{ nursery.municipio }}</p>
                <p>Vigencia ICA: {{ nursery.vigencia_registro === 1 ? 'Sí' : 'No' }}</p>
            </div>
            <div class="description__icons">
                <a target="_blank"
                    :href="`https://www.google.com/maps/dir//1.3973283,${getLatLong(nursery.ubicacion).long}/@${getLatLong(nursery.ubicacion).lat},${getLatLong(nursery.ubicacion).long},13z/data=!4m2!4m1!3e0?entry=ttu`">
                    <svg style="width: 2rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995L16.9497 15.9497ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z">
                        </path>
                    </svg>
                </a>
                <a target="_blank"
                    :href="`https://api.whatsapp.com/send?phone=57${nursery.phone_number}&text=Hola, me puedes brindar información sobre el vivero ${nursery.nombre_vivero}?`">
                    <svg style="width: 2rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M7.25361 18.4944L7.97834 18.917C9.18909 19.623 10.5651 20 12.001 20C16.4193 20 20.001 16.4183 20.001 12C20.001 7.58172 16.4193 4 12.001 4C7.5827 4 4.00098 7.58172 4.00098 12C4.00098 13.4363 4.37821 14.8128 5.08466 16.0238L5.50704 16.7478L4.85355 19.1494L7.25361 18.4944ZM2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22ZM8.39232 7.30833C8.5262 7.29892 8.66053 7.29748 8.79459 7.30402C8.84875 7.30758 8.90265 7.31384 8.95659 7.32007C9.11585 7.33846 9.29098 7.43545 9.34986 7.56894C9.64818 8.24536 9.93764 8.92565 10.2182 9.60963C10.2801 9.76062 10.2428 9.95633 10.125 10.1457C10.0652 10.2428 9.97128 10.379 9.86248 10.5183C9.74939 10.663 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.40738 11.0473 9.44455 11.1944C9.45903 11.25 9.50521 11.331 9.54708 11.3991C9.57027 11.4368 9.5918 11.4705 9.60577 11.4938C9.86169 11.9211 10.2057 12.3543 10.6259 12.7616C10.7463 12.8783 10.8631 12.9974 10.9887 13.108C11.457 13.5209 11.9868 13.8583 12.559 14.1082L12.5641 14.1105C12.6486 14.1469 12.692 14.1668 12.8157 14.2193C12.8781 14.2457 12.9419 14.2685 13.0074 14.2858C13.0311 14.292 13.0554 14.2955 13.0798 14.2972C13.2415 14.3069 13.335 14.2032 13.3749 14.1555C14.0984 13.279 14.1646 13.2218 14.1696 13.2222V13.2238C14.2647 13.1236 14.4142 13.0888 14.5476 13.097C14.6085 13.1007 14.6691 13.1124 14.7245 13.1377C15.2563 13.3803 16.1258 13.7587 16.1258 13.7587L16.7073 14.0201C16.8047 14.0671 16.8936 14.1778 16.8979 14.2854C16.9005 14.3523 16.9077 14.4603 16.8838 14.6579C16.8525 14.9166 16.7738 15.2281 16.6956 15.3913C16.6406 15.5058 16.5694 15.6074 16.4866 15.6934C16.3743 15.81 16.2909 15.8808 16.1559 15.9814C16.0737 16.0426 16.0311 16.0714 16.0311 16.0714C15.8922 16.159 15.8139 16.2028 15.6484 16.2909C15.391 16.428 15.1066 16.5068 14.8153 16.5218C14.6296 16.5313 14.4444 16.5447 14.2589 16.5347C14.2507 16.5342 13.6907 16.4482 13.6907 16.4482C12.2688 16.0742 10.9538 15.3736 9.85034 14.402C9.62473 14.2034 9.4155 13.9885 9.20194 13.7759C8.31288 12.8908 7.63982 11.9364 7.23169 11.0336C7.03043 10.5884 6.90299 10.1116 6.90098 9.62098C6.89729 9.01405 7.09599 8.4232 7.46569 7.94186C7.53857 7.84697 7.60774 7.74855 7.72709 7.63586C7.85348 7.51651 7.93392 7.45244 8.02057 7.40811C8.13607 7.34902 8.26293 7.31742 8.39232 7.30833Z">
                        </path>
                    </svg>
                </a>
                <a @click="nurseries.showFormNurseries(nursery.id)">
                    <svg style="width: 2rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z">
                        </path>
                    </svg>
                </a>
            </div>
            <div class="description__text">
                <p style="font-weight: 500; font-style: italic;">
                    <span v-if="nursery.vigencia_registro === 1"> {{ (nursery.numero_registro_ica ? `Resolución No.
                        ${nursery.numero_registro_ica.split('No.')[1]}`
                        : 'Sin información acerca de la Resolución') }}</span>
                    <span v-else>Sin información acerca de la Resolución</span>
                </p>
            </div>
        </div>
        <!-- title content -->


        <div class="nurseries__card--header">
            <div class="header__image">
                <img src="/img/no_img_nurseries.png" alt="no nurseries">
            </div>
            <div class="header__text">
                <h1>{{ nursery.nombre_vivero }}</h1>
                <p>Rep. legal: {{ nursery.first_name }} {{ nursery.last_name }}</p>
            </div>
            <button @click="nurseries.getNursery(nursery)">Ver Especies</button>
        </div>

    </article>
</template>



<style scoped>
/* card nurseries */
.nurseries__card {
    background-color: transparent;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    border-radius: 1rem;
    padding: 0rem;
    width: 90%;
    margin: 0 auto;
    transition: all .3s ease-in-out;
    padding-bottom: 2rem;
}

@media (min-width: 920px) {
    .nurseries__card {
        padding: 2rem;
        flex-direction: row;
        background-color: white;
        width: 60%;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
}

.nurseries__card:hover img {
    scale: 1.05;
}

.nurseries__card:hover {
    transform: translateY(-2px);
}

/* section description */
.nurseries__card--description {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    overflow: hidden;
    padding-top: 5rem;
    padding-bottom: 2rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 920px) {
    .nurseries__card--description {
        padding-bottom: 0;
        padding-top: 0;
        box-shadow: none;
        border-radius: 0rem;
        padding-right: 1rem;
    }
}

.nurseries__card--description .description__text p {
    margin: 0;
    padding: 0 1rem;
    text-align: center;
    color: var(--gris);
    font-size: 1.2rem;
}

@media (min-width: 768px) {
    .nurseries__card--description .description__text p {
        padding: 0;
        font-size: 1.2rem;
    }
}

.nurseries__card--description .description__icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.nurseries__card--description .description__icons svg {
    color: #334155;
}


/* section header */
.nurseries__card--header {
    background-color: var(--primary);
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    margin: 0 auto;
    width: 250px;
    margin-bottom: -4rem;
    z-index: 1;
}

@media (min-width: 920px) {
    .nurseries__card--header {
        position: absolute;
        right: -6rem;
        top: 7%;
        height: 250px;
        width: 340px;
        margin-top: 0;
    }
}

.nurseries__card--header .header__image {
    width: 20%;
    margin: 0 auto;
}

.nurseries__card--header .header__image img {
    width: 100%;
    border-radius: .5rem;
    transition: all .3s ease-in-out;
}

.nurseries__card--header .header__text p,
.nurseries__card--header .header__text h1 {
    margin: 0;
    padding: 0;
    text-align: center;
    color: white;
    font-size: 1rem;
}


.nurseries__card--header button {
    display: flex;
    margin: 0 auto;
    background-color: white;
    padding: .5rem;
    border-radius: .5rem;
    font-weight: 600;
    color: var(--gris);
    transition: all .3s ease-in-out;
}

.nurseries__card--header button:hover {
    color: var(--blanco);
    background-color: var(--gris);
}
</style>