<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useNurseriesUserStore } from "@/stores/dashboard/nurseriesUser";
import { useModalStore } from "@/stores/modal";

const nurseriesUser = useNurseriesUserStore();
const modal = useModalStore();

const formData = ref({
  tipo_venta: '',
  unidad_medida: '',
  cantidad_stock: '',
  ventas_realizadas: '',
  observaciones: '',
});

const initializeFormData = () => {
  const selectedNursery = nurseriesUser.selectedSpecie[0]; // Asegúrate de que propertySelected sea un objeto correcto
  if (selectedNursery) {
    formData.value = {
      tipo_venta: selectedNursery.tipo_venta || "",
      unidad_medida: selectedNursery.unidad_medida || "",
      cantidad_stock: selectedNursery.cantidad_stock || "",
      ventas_realizadas: selectedNursery.ventas_realizadas || "",
      observaciones: selectedNursery.observaciones || "",
    };
  } else {
    // Asegúrate de resetear el formData si no hay propiedad seleccionada
    formData.value = {
      tipo_venta: '',
      unidad_medida: '',
      cantidad_stock: '',
      ventas_realizadas: '',
      observaciones: ''
    };
  }
};

async function nurseryUserUpdate() {
  await nurseriesUser.updateNursery(nurseriesUser.nurseryUpdateSelected[0].id, formData.value);
  modal.handleClickModalSpecieInventory();
}

watch(
  () => nurseriesUser.selectSpecieInventory,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      initializeFormData();
    }
  },
  { immediate: true } // Esto asegura que initializeFormData se llame inmediatamente
);

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

// Si necesitas inicializar datos al montar el componente
onMounted(() => {
  initializeFormData();
});
</script>

<template>
  <div class="modal" v-if="modal.modalSpecieInventory">
    <div class="modal__contenido">
      <div class="form__modal--content">

        <h3 class="form__modal--title">Actualizar inventario</h3>
        <!-- <span>{{ nurseriesUser.nurseriesUser.vernacularName }}</span> -->
        <hr>
        <form class="form__modal" @submit.prevent="nurseryUserUpdate">

          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Tipo de venta: </label>
            <input class="form__modal--input" type="text" v-model="formData.tipo_venta">
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Unidad de medida: </label>
            <input class="form__modal--input" type="text" v-model="formData.unidad_medida">
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label" for="nit">Cantidad base: </label>
            <input class="form__modal--input" type="text" v-model="formData.cantidad_stock">
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label">Ventas realizadas: </label>
            <input class="form__modal--input" type="text" v-model="formData.ventas_realizadas">
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Observaciones: </label>
            <input class="form__modal--input" type="text" v-model="formData.observaciones">
          </div>

          <div class="form__modal--buttons">
            <button type="submit" class="form__modal--save"><svg style="width: 2rem;"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
                </path>
              </svg></button>

            <div class="button__modal--close" @click="modal.handleClickModalSpecieInventory()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 11000;
}

.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 95%;
  max-height: 83%;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin-top: 2rem;
}

.text__noview {
  display: none;
}

@media (min-width: 768px) {
  .modal__contenido {
    margin-top: 0;
  }
}

@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}

@media (min-width: 1440px) {
  .modal__contenido {
    width: 40%;
  }
}

@media (min-width: 1820px) {
  .modal__contenido {
    width: 30%;
  }
}

</style>