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
    },
    type: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const canvas = ref(null);
    let chartInstance = null;

    const returnChartFormattedType = (value) => {
      let chartLabelType;

      if (props.type == "currency") {
        chartLabelType = `R$ ${value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}`;
      } else {
        chartLabelType = value;
      }

      return chartLabelType;
    }

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
            tooltip: {
              callbacks: {
                label: function (context) {
                  let value = context.raw || 0;
                  return returnChartFormattedType(value);
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return returnChartFormattedType(value);
                }
              }
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
  max-height: calc(100vh - 300px);
  border: 1px solid var(--cinza-medio);
  border-radius: var(--radius-md);
  overflow: hidden;
  padding: var(--space-3);
}
</style>
