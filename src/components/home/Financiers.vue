<script setup>
import { useHomeStore } from "@/stores/home";
const homeStore = useHomeStore();

</script>


<template>
    <section class="financiers">
        <div class="financiers__content">
            <h2 class="financiers__heading">Financiadores <span>SARA</span></h2>
            <div class="financiers__grid">

                <!-- colaborador -->
                <div class="financier" v-for="(colaborador, index) in homeStore.colaboradores" :key="index">
                    <a target="_blank" :href="colaborador.enlace"><img :src="colaborador.img"
                            alt="imagen colaborador" /></a>
                </div>
                <!-- fin colaborador -->
            </div>
        </div>
    </section>
</template>



<style scoped>
/* financiers ****************************** */
img {
    width: 100%;
}

.financiers {
    margin: 5rem 0;
}
.financiers__heading{
    font-size: 2rem;
}
.financiers__heading span{
    color: var(--primary);
    display: block;
}
.financiers__content {
    width: 1200px;
    margin: 0 auto;
    display: grid;
}

@media (min-width: 768px) {
    .financiers__content {
        grid-template-columns: 40% 60%;
        align-items: center;
    }
}

.financiers__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 5rem;
}
.financier{
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.financier{
    transition: all .3s ease-in-out;
}

.financier:hover{
    transform: scale(1.05);
}




</style>