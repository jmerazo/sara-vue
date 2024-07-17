<script setup>
import { ref, onMounted } from "vue";
import { useCalendarStore } from "@/stores/calendarMonitoring";
import ChartCalendar from "@/components/calendars/ChartCalendar.vue";
const calendar = useCalendarStore();

onMounted(() => {
  const content = document.querySelector("#fruitContent");
  const buttonLeft = document.querySelector("#leftFruit");
  const buttonRight = document.querySelector("#rightFruit");

  if (buttonLeft && buttonRight && content) {
    buttonRight.addEventListener("click", () => {
      content.scrollLeft += content.offsetWidth / 1;
    });

    buttonLeft.addEventListener("click", () => {
      content.scrollLeft -= content.offsetWidth / 1;
    });
  }
});

const month = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

</script>

<template>
  <div v-if="calendar.dataFruit.length !== 0">
    <h3 style="text-align: center; color: var(--gris); margin-top: 5rem">
      Calendario Frutal
    </h3>
    <div class="slider__calendar">
      <div class="slider__content" id="fruitContent" ref="sliderContent">
        <div
          class="card__content"
          v-for="(item, index) in calendar.dataFruit"
          :key="index"
        >
          <div class="slider__card">
            <h3 class="card__tittle">{{ month[index - 1] }}</h3>
            <div class="card__values">
              <div class="values">
                <ChartCalendar :item="item" :index="index" :name="'fruit'" />
              </div>
            </div>
          </div>
        </div>
        <div class="slider__buttons">
          <button class="slider__button slider__button--left " id="leftFruit"  ref="buttonLeft">
            <svg
              style="width: 22px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M8.36853 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.36853 12Z"
              ></path>
            </svg>
          </button>
          <button
            class="slider__button slider__button--right" id="rightFruit"
            ref="buttonRight"
          >
            <svg
              style="width: 22px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* slider calendar */

.slider__calendar {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;
}
@media (min-width: 992px) {
  .slider__calendar {
    width: 40%;
  }
}
.slider__content {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(100% / 1);
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  border-radius: 1rem;
}

.slider__content::-webkit-scrollbar {
  display: none;
}
/* card ********** */
.slider__card {
  position: relative;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  background-color: var(--color);
  padding: 20px;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card__tittle {
  border-bottom: 1px solid var(--primary);
}

.slider__buttons {
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
.slider__button {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--blanco);
  cursor: pointer;
  padding: 0.3rem;
}

.slider__buttons {
  right: 5%;
  top: 5%;
}
</style>