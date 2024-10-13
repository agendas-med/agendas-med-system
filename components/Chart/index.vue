<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, BarElement, LinearScale, LineController, BarController, CategoryScale } from 'chart.js';

// Registrar os componentes de gráficos de linha e de barra
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, BarElement, LinearScale, LineController, BarController, CategoryScale);

export default defineComponent({
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartType: {
      type: String,
      required: true,
    },
    chartTitle: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const canvas = ref(null);
    let chartInstance = null;

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destrói a instância anterior
      }

      chartInstance = new ChartJS(canvas.value, {
        type: props.chartType, // Pode ser 'bar' ou 'line'
        data: props.chartData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: props.chartTitle,
              font: {
                size: 20, // Aumenta o tamanho do título
              }
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    onMounted(() => {
      renderChart();
    });

    return {
      canvas,
    };
  },
});
</script>

<style scoped>
canvas {
  width: 100%;
  max-height: 670px;
}
</style>
