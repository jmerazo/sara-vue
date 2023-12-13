<template>
    <div
        class="alerta"
    >
    <slot></slot>
    </div>
</template>

<style scoped>
.alerta{
   font-weight: 700;
   font-size: 1rem;
   text-align: center; 
   background-color: var(--blanco);
   border-left: .5rem solid #b91c1c;
   color: #b91c1c;
   margin-bottom: 1rem;
}
</style>