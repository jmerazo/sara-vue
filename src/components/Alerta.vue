<template>
  <div class="text-center text-red-100 bg-red-700 rounded-lg p-1 alerta">
    <slot></slot>
  </div>
</template>
<style scoped>
.alerta {
  background-color: red;
  text-align: center;
  color: var(--blanco);
  border-radius: 2px;
  padding: .5rem;
  border-radius: .5rem;
  transition: background-color 3s;
}

</style>
