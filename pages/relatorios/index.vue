<template>
    <section>
        <UtilsPageheader title="Relatórios" subtitle="Visualize suas consultas e ganhos em relatórios completos." />
        <UtilsTabs :tabs="tabs" @changedTab="changeChart($event)" />
        <div class="filter">
            <select v-model="dateRange" @change="updateChartRange">
                <option value="anual">Anual</option>
                <option value="semanal">Semanal</option>
            </select>
            <input v-if="dateRange === 'anual'" type="number" v-model="year" @change="updateChartRange" placeholder="Ano" />
            <input v-if="dateRange === 'semanal'" type="week" v-model="week" @change="updateChartRange" placeholder="Semana" />
        </div>
        <div class="chart-container">
            <Chart :chartData="activeChart2.chartData" v-if="activeChart" :chartType="activeChart.type" :chartTitle="activeChart.title" />
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Consultas realizadas",
                    quantity: 25,
                    default: true
                },
                {
                    name: "Faturamento",
                    quantity: null,
                    default: false
                }
            ],
            activeChart2: { chartData: {
                        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        datasets: [
                            {
                                label: 'Quantidade de Consultas 2024',
                                data: [120, 150, 180, 130, 170, 190, 220, 210, 160, 180, 240, 250],
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: true,
                                tension: 0.3,
                                pointRadius: 5,
                                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                            },
                        ]
                    },
                    type: "line",
                    title: "Consultas realizadas", },
            charts: {
                consultations: {
                    chartData: {
                        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        datasets: [
                            {
                                label: 'Quantidade de Consultas 2024',
                                data: [120, 150, 180, 130, 170, 190, 220, 210, 160, 180, 240, 250],
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: true,
                                tension: 0.3,
                                pointRadius: 5,
                                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                            },
                        ]
                    },
                    type: "line",
                    title: "Consultas realizadas"
                },
                invoicing: {
                    chartData: {
                        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        datasets: [
                            {
                                label: 'Receitas',
                                data: [5000, 7000, 8000, 4000, 6000, 7500, 9000, 8500, 7000, 6500, 6000, 9500],
                                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Despesas',
                                data: [3000, 5000, 4000, 3500, 4500, 5500, 7000, 6000, 5000, 5500, 4500, 6000],
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                            }
                        ],
                    },
                    type: "bar",
                    title: "Faturamento"
                }
            },
            dateRange: "anual",  // Defina o intervalo inicial
            year: new Date().getFullYear(),  // Ano atual
            week: null,  // Variável para armazenar a semana
            activeChart: null,
        }
    },
    methods: {
        changeChart: function (index) {
            let targetChart = "";

            switch (index) {
                case 0: 
                    targetChart = "consultations";
                    break;
                case 1:
                    targetChart = "invoicing";
                    break;
            }

            this.activeChart = null;

            this.$nextTick(() => {
                this.activeChart = this.charts[targetChart];
                this.updateChartRange(); // Atualiza os dados do gráfico conforme o intervalo
            });
        },
        updateChartRange() {
            // Atualiza os rótulos e dados do gráfico conforme o filtro
            if (this.dateRange === 'anual') {
                this.charts.consultations.chartData.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                this.charts.invoicing.chartData.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            } else if (this.dateRange === 'semanal') {
                this.charts.consultations.chartData.labels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
                this.charts.invoicing.chartData.labels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
            }
            // Aqui você poderia fazer uma lógica adicional para puxar os dados do ano ou semana selecionados
        }
    }
}
</script>
<style scoped>
.filter {
    margin: var(--space-6) 0;
}
</style>
