<script setup>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

const colors = [
  "rgba(110, 145, 103, 0.9)",
  "rgba(65, 128, 171, 0.9)",
  "rgba(255, 128, 48, 0.9)",
  "rgba(242, 162, 151, 0.9)",
  "rgba(255, 221, 140, 0.9)",
  "rgba(138, 179, 207, 0.9)",
  "rgba(35, 153, 142, 0.9)",
  "rgba(59, 203, 56, 0.9)",
  "rgba(239, 171, 69, 0.9)",
  "rgba(103, 239, 137, 0.9)",
  "rgba(205, 35, 171, 0.9)",
  "rgba(18, 255, 192, 0.9)",
];
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
]


const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});


onMounted(async () => {
  if (props.index) {
    const calendarItem = new Chart(
      document.getElementById(`calendarItem${props.index + props.name}`),
      config
    );
  }
});

const data = {
  labels: ["0%", "1 - 25%", "26 - 50%", "51 - 75%", "76 - 100%"],
  datasets: [
    {
      label: `Floración en ${month[props.index-1]}`,
      backgroundColor: colors[props.index-1],
      borderColor: colors[props.index-1],
      data:[props.item["0%"] || 0 ,props.item["1 - 25%"] || 0,props.item["26 - 50%"] || 0,props.item["51 - 75%"] || 0,props.item["76 - 100%"] || 0],
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: { responsive: true },
};
</script>

<template>
  <div>
    <canvas :id="`calendarItem${props.index + props.name}`"></canvas>
    
  </div>

</template>

<style scoped>
</style>
