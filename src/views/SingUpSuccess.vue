<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function navigateToAuthVerify() {
  router.push({ name: 'home' })
}
</script>

<template>
    <div class="confirmation">
        <div class="confirmation__grid">
            <div class="confirmation__content">
                <h1>Registro exitoso</h1>
                <p>Por favor verifica tu <span>correo</span> para confirmar tu cuenta</p>               
                <button @click="navigateToAuthVerify" class="button">Aceptar</button>
            </div>
            <div class="image">
                <img class="image" src="/img/auth/create-account.svg" alt="img-verify">
            </div>
        </div>
    </div>  
</template>


<style scoped>
.confirmation {
    margin: 0 auto;
    padding: 0 2rem;
    margin-bottom: 2rem;
    transition: all .3s ease-in-out;
}

.confirmation__grid {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 9rem;
    

}

.confirmation__content h1 {
    color: var(--gris);
    font-size: 1.5rem;
    margin-bottom: 2rem;
}


.confirmation__content p span {
    color: var(--primary);
    font-weight: 700;
}

.confirmation__content button {
    background-color: var(--primary);
    border: none;
    color: var(--blanco);
    padding: 1rem;
    border-radius: 1rem;
    font-weight: bold;
    margin-top: 2rem;
}

.confirmation__grid .image {
    width: 6rem;
    position: absolute;
    bottom: 0;
    right: 0;
}

@media (min-width: 768px) {
    .confirmation {
        max-width: 1200px;
        margin: 0 auto;
        margin-bottom: 0;
    }


    .confirmation__grid {
        display: grid;
        grid-template-columns: 60% 40%;
        margin-top: 20rem;
        gap: 2rem;
    }

    .confirmation__content h1 {
        color: var(--gris);
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .confirmation__grid .image {
        width: auto;
        position: unset;
    }

}
</style>