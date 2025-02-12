<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { usePageContent } from "@/stores/page";
import { useModalStore } from "@/stores/modal";
//componentes
import LoadingData from "@/components/shared/LoadingData.vue";
import ModalSliderImagesAdd from "@/components/dashboard/ModalSliderImagesAdd.vue";
import ModalSliderImagesUpdate from "@/components/dashboard/ModalSliderImagesUpdate.vue";
import { getSliderImages } from "../../helpers/index";
import SvgIcon from "@/assets/SvgIcon.vue";
import { useToastStore } from "@/stores/toast";

const toast = useToastStore();
const page = usePageContent();
const modal = useModalStore();
const draggedImage = ref(null);

// Función para procesar las imágenes
const processSliderImages = () => {
  page.sliderImages.forEach((image) => {
    image.fullUrl = getSliderImages(image.url);
  });
};

const sortedSliderImages = computed(() => {
  return [...page.sliderImages].sort((a, b) => a.order - b.order);
});

onMounted(async () => {
  await page.fetchSliderImages();
  processSliderImages();
});

const handleDragStart = (image) => {
  draggedImage.value = image;
};

const handleDrop = async (targetImage) => {
    if (draggedImage.value && draggedImage.value !== targetImage) {
        const draggedIndex = page.sliderImages.indexOf(draggedImage.value);
        const targetIndex = page.sliderImages.indexOf(targetImage);
        page.sliderImages.splice(draggedIndex, 1);
        page.sliderImages.splice(targetIndex, 0, draggedImage.value);

        const reorderedImages = page.sliderImages.map((image, index) => ({
            id: image.id,
            order: index + 1,
        }));
        draggedImage.value = null;

        try {
            const response = await page.SliderImagesOrderUpdate(reorderedImages);
            console.log("response view ", response);

            if (response.success) {
                toast.activateToast(response.msg, "success");
            } else {
                toast.activateToast(response.msg, "error");
            }
        } catch (error) {
            toast.activateToast("Hubo un error al actualizar el orden", "error");
            await page.fetchSliderImages();
        }
    }
};

const SliderImageDelete = async (id) => {
  const confirmDelete = window.confirm(
    `¿Estás seguro de que desea eliminar la imágen?`
  );
  if (!confirmDelete) {
    return;
  }

  try {
    const response = await page.SliderImagesDelete(id);
    if(response.success){
      toast.activateToast(response.msg, "success");
    }else{
      toast.activateToast(response.msg, "error");
    }
  } catch (error) {
    toast.activateToast("Hubo un error al eliminar la imagen", "error");
  }
  
}

watch(
    () => page.sliderImages,
    () => {
        processSliderImages();
    },
    { deep: true }
);

async function SliderImagesStatusUpdate(event, image) {
  event.preventDefault();
  
  const newState = image.status ? 0 : 1; 
  
  const confirmState = window.confirm(
    `¿Estás seguro de que deseas ${newState ? "activar" : "desactivar"} la imagen?`
  );

  if (!confirmState) {
    event.target.checked = image.status; // Restaurar el estado original en caso de cancelar
    return;
  }

  try {
    const response = await page.SliderImageStatusUpdate(image.id, { status: newState }); // Enviar un objeto con el campo status
    if (response.success) {
      image.status = newState; // Actualizar el estado local
      toast.activateToast("Estado actualizado exitosamente.", "success");
    } else {
      toast.activateToast(response.msg, "error");
      event.target.checked = image.status; // Restaurar el estado original si falla
    }
  } catch (error) {
    toast.activateToast("Hubo un error al actualizar el estado.", "error");
    event.target.checked = image.status; // Restaurar el estado original si hay error
  }
}
</script>

<template>
  <div class="contenedor">
    <h1 class="reporte__heading">Imágenes del Slider</h1>
    <hr />
    <LoadingData v-if="page.loading"/>

    <!-- Mostrar mensaje si no hay imágenes -->
    <div v-else-if="page.sliderImages.length === 0">
      <p>No hay imágenes disponibles en el slider.</p>
    </div>
    
    <!-- Listado de imágenes -->
    <div v-else class="reporte__grid">
      <div
        class="card"
        v-for="image in sortedSliderImages"
        :key="image.id"
        draggable="true"
        @dragstart="handleDragStart(image)"
        @dragover.prevent
        @drop="handleDrop(image)"
      >
      <div class="card__check">
          <label class="switch">
              <input
                  @change="SliderImagesStatusUpdate($event, image)"
                  :checked="image.status"
                  class="card__input"
                  type="checkbox"
              />
              <span class="card__check--button"></span>
          </label>
      </div>  

      <!-- Contenedor de la imagen con el número en la esquina superior derecha -->
      <div class="card__image-wrapper">
        <img :src="image.fullUrl" alt="Imagen del slider" class="card__imagen" />
        <span class="card__order">{{ image.order }}</span>
      </div>

      <!-- Detalles de la imagen -->
      <div class="card__contenido">
        <p class="card__titulo">{{ image.title }}</p>
        <p class="card__subtitulo">{{ image.description }} </p>

        <!-- Botones de acción -->
        <div class="card__botones">
          <div class="btn__wrapper btn__editSliderImages" @click="page.SliderImagesSelected(image.id)">
            <SvgIcon iconName="edit" size="24" />
          </div>
          <div class="btn__wrapper btn__deleteSliderImages" @click="SliderImageDelete(image.id)">
            <SvgIcon iconName="delete" size="24" />
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Botón de agregar -->
    <button class="boton-fijo" @click="modal.handleClickModalSliderImagesAdd()">
      <SvgIcon iconName="imageAdd" size="32" />
    </button>
  </div>

  <!-- Modal para agregar imágenes -->
  <ModalSliderImagesAdd />
  <ModalSliderImagesUpdate/>
</template>

<style scoped>
/* Contenedor principal */
.contenedor {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

/* Título */
.reporte__heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

/* Botón fijo en la esquina inferior derecha */
.boton-fijo {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 10;
}

.boton-fijo:hover {
  background-color: var(--primary-dark);
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}

/* Grid para las imágenes */
.reporte__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
  border: 2px dashed #ccc; /* Indica que el área es interactiva */
  border-radius: 8px;
  background-color: #f9f9f9; /* Sutil fondo para diferenciar el área */
  transition: background-color 0.3s;
}

.reporte__grid:hover {
  background-color: #f5f5f5; /* Cambia el color al pasar el mouse */
}

/* Tarjeta */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s;
  cursor: grab; /* Icono de "mover" */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  background-color: #f0f0f0; /* Fondo claro para resaltar */
}

.card:active {
  cursor: grabbing; /* Cambia a "arrastrando" mientras se arrastra */
  background-color: #e0e0e0; /* Fondo más oscuro mientras se arrastra */
}

.card.drop-target {
  background-color: #d1e7ff; /* Resalta el área de soltado */
  border: 2px solid var(--primary);
}

/* Contenedor de la imagen */
.card__image-wrapper {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

/* Imagen */
.card__imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Orden en la esquina superior derecha */
.card__order {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
}

/* Contenido */
.card__contenido {
  padding: 0.5rem;
}

.card__titulo {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card__subtitulo {
  font-size: 0.9rem;
  color: #555;
}

/* Botones */
.card__botones {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.card__botones button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn__wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.btn__editSliderImages {
  color: var(--primary);
}

.btn__editSliderImages:hover {
  background-color: var(--primary-light);
  color: white;
}

.btn__deleteSliderImages {
  color: var(--rojo);
}

.btn__deleteSliderImages:hover {
  background-color: var(--rojo-light);
  color: white;
}

/* switch */
.card__check {
  position: absolute;
  top: 10px; /* Ajusta la distancia desde el borde superior */
  left: 10px; /* Ajusta la distancia desde el borde izquierdo */
  z-index: 10;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.card__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.card__check--button {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--secondary);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.card__check--button:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

.card__input:checked + .card__check--button {
  background-color: var(--primary);
}

.card__input:focus + .card__check--button {
  box-shadow: 0 0 1px var(--primary);
}

.card__input:checked + .card__check--button:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Ajustar la posición de la tarjeta para el toggle */
.card {
  position: relative; /* Necesario para posicionar el toggle dentro de la tarjeta */
}
</style>