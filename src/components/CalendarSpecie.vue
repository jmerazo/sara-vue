<script setup>
import { ref, onMounted, defineProps } from "vue";

// Define the prop for the component
const props = defineProps({
  calendarData: {
    type: Object,
    required: true
  }
});

const monthLeft = ref(0);
const monthRight = ref(1);

const sliderContent = ref(null);
const buttonLeft = ref(null);
const buttonRight = ref(null);

onMounted(() => {
  if (buttonLeft.value && buttonRight.value && sliderContent.value) {
    buttonLeft.value.addEventListener("click", () => {
      sliderContent.value.scrollLeft -= sliderContent.value.offsetWidth / 1;
      monthLeft.value = monthLeft.value - 1;
      monthRight.value = monthRight.value - 1;
    });

    buttonRight.value.addEventListener("click", () => {
      sliderContent.value.scrollLeft += sliderContent.value.offsetWidth / 1;
      monthRight.value = monthRight.value + 1;
      monthLeft.value = monthLeft.value + 1;
    });
  }
});

const calculateTotal = (data) => {
  return Object.values(data).reduce((total, monthData) => {
    return total + Object.values(monthData).reduce((monthTotal, value) => monthTotal + value, 0);
  }, 0);
};

const calculateMonthTotal = (monthData) => {
  return Object.values(monthData).reduce((total, value) => total + value, 0);
};

const getTotalPercentage = (monthData, allData) => {
  const totalAllMonths = calculateTotal(allData);
  const totalCurrentMonth = calculateMonthTotal(monthData);

  return totalAllMonths === 0 ? 0 : ((totalCurrentMonth / totalAllMonths) * 100).toFixed(2);
};


const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const colores = ref([
  "rgba(110, 145, 103, 0.2)", "rgba(65, 128, 171, 0.2)",
  "rgba(255, 128, 48, 0.2)", "rgba(242, 162, 151, 0.2)",
  "rgba(255, 221, 140, 0.2)", "rgba(138, 179, 207, 0.2)",
  "rgba(35, 153, 142, 0.2)", "rgba(59, 203, 56, 0.2)",
  "rgba(239, 171, 69, 0.2)", "rgba(103, 239, 137, 0.2)",
  "rgba(205, 35, 171, 0.2)", "rgba(18, 255, 192, 0.2)"
]);
</script>

<template>
  <div class="slider__calendar">
    <div class="slider__content" ref="sliderContent">
      <div
        class="card__content"
        :style="{ '--color': colores[index % colores.length] }"
        v-for="([month, item], index) in Object.entries(calendarData)"
        :key="month"
      >
        <div class="slider__card">
          <h3 class="card__tittle">{{ meses[month - 1] }}</h3>
          <div class="card__values">
            <div class="values">
              <p class="value">0%: {{ item["0%"] || 0 }}</p>
              <p class="value">1 - 25%: {{ item["1 - 25%"] || 0 }}</p>
              <p class="value">26 - 50%: {{ item["26 - 50%"] || 0 }}</p>
              <p class="value">51 - 75%: {{ item["51 - 75%"] || 0 }}</p>
              <p class="value">76 - 100%: {{ item["76 - 100%"] || 0 }}</p>
            </div>
            <div class="percentage">
              <p class="percentage__value">
                {{ getTotalPercentage(item, calendarData) }} <span>%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="slider__buttons">
        <button class="slider__button slider__button--left" ref="buttonLeft">
          <svg style="width: 22px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.36853 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.36853 12Z"></path>
          </svg>
        </button>
        <button class="slider__button slider__button--right" ref="buttonRight">
          <svg style="width: 22px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z"></path>
          </svg>
        </button>
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

.values .value {
  margin: 0 0 0.3rem;
  font-weight: 500;
  opacity: 0.8;
}
.card__values {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.percentage {
  justify-content: center;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
 
}
.percentage__value {
  font-size: 2rem;
  font-weight: 500;
  opacity: 0.8;
  margin: 0;
  text-align: center;
  
}

.card__tittle {
  border-bottom: 1px solid var(--primary);
}

.slider__buttons {
  position: absolute;
  display: flex;
  justify-content: center;
  gap: .5rem;
}
.slider__button {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
  color: var(--blanco);
  cursor: pointer;
  padding: 0.3rem;
}

.slider__buttons {
  right: 5%;
  top: 5%;
}

</style>