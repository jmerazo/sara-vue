<script setup>

import TypeFile from './TypeFile.vue';



defineProps({
    fileDoc: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <article class="docs__card">
        <div class="card__text">
            <h3 class="card__title"><span>{{ fileDoc.title }}</span></h3>

            <a class="button__primary animation" :href="fileDoc.file" download :title="'Descargar ' + fileDoc.name">
                <span class="button__text">Descargar</span>
            </a>
        </div>
        <div class="card__file">
            <div class="file__preview">
                <div class="file__icon">
                    <!-- Display icon based on file type -->
                    <TypeFile :fileType="fileDoc.type" />

                </div>
            </div>
        </div>

    </article>
</template>



<style scoped>
.docs__card {
    display: grid;
    border-radius: 10px;
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
    position: relative;
}

@media (min-width: 768px) {
    .docs__card {
        grid-template-columns: 70% 30%;
        width: 600px;
        height: 200px;
    }
}

.card__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.card__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
}

.card__text .card__title {
    font-size: 1.2rem;
    margin: 0 0 10px 0;
    color: var(--gris);
    text-align: center;
    margin-bottom: 2rem;
}


.file__icon {
    padding: 1rem;
    width: 5rem;
}

@media (min-width: 768px) {
    .file__icon {
        width: 10rem;
    }
}



.card__file {
    background: var(--white);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button__primary {
    display: inline-flex;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    background-color: var(--primary);
    color: var(--blanco);
    font-weight: 700;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    transition: 0.3s ease all;
    border-radius: 0.7rem;
    position: relative;
    overflow: hidden;
}

@media (min-width: 768px) {
    .button__primary {
        background-color: var(--blanco);
        color: var(--primary);
        border: 1px solid var(--primary);
    }
}

.button__primary:hover {
    color: var(--blanco);
}

.button__text {
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
    top: -180%;
    left: 0;
    border-radius: 0 0 50% 50%;
    transition: 0.4s ease-in-out all;
}

.animation:hover::after {
    top: 0;
}

.button__primary:hover .nav__text {
    color: black;
}
</style>