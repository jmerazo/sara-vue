<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHomeStore } from '../stores/home'

const store = useHomeStore()
const counter = ref(0);
const router = useRouter()

onMounted(() => {
    if (!store.maintenance) {
        router.push('/')
    }
})



const handleClick = () => {
    console.log(counter.value)
    if (counter.value === 3) {
        if (prompt('ingrese el código de seguridad') === 'SARA-123') {
            store.switchMaintenance()
        } else {
            counter.value = 0
        }
        return
    } else {
        counter.value = counter.value + 1

    }
}
</script>


<template>
    <div class="maintenance__container">
        <div class="icon__sara">
            <img src="/icons/sara.png" alt="img-sara">
        </div>
        <div class="maintenance__content">
            <div class="content__image">
                <img @click="handleClick" class="image" src="/img/maintenance.svg" alt="">
            </div>
            <div class="content__info">
                <h1 class="info__code">503</h1>
                <h2 class="info__tittle">Página en Mantenimiento</h2>
                <p class="info__text">Estamos trabajando en mejoras para nuestros usuarios, regresaremos tan pronto sea
                    posible.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.maintenance__container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    align-items: center;
}

.maintenance__content {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
}

.image {
    width: 100%;
}

.content__image {
    width: 200px;
    margin: 0 auto;
}

.content__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #707070;
    padding: 2rem;
}

.content__info .info__code {
    margin: 0;
    font-size: 3rem;
}

.content__info .info__tittle {
    margin: 0;
    font-size: 1.5rem;
}

.content__info .info__text {
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
}

.icon__sara {
    position: absolute;
    top: 4%;
    left: 5%;
}

.icon__sara img {
    width: 3rem;
}

@media (min-width: 768px) {
    .maintenance__content {
        grid-template-columns: 60% 40%;
    }

    .content__image {
        width: 450px;
        margin: 0 auto;
    }

    .icon__sara {
        position: absolute;
        top: 2%;
        left: 2%;
    }

    .icon__sara img {
        width: 5rem;
    }

    .content__info {
        padding: 0;
    }

    .content__info .info__code {
        font-size: 5rem;
    }

    .content__info .info__tittle {
        font-size: 2rem;
    }

    .content__info .info__text {
        font-size: 1.2rem;
        font-weight: 600;
    }


}
</style>