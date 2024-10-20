<template>
    <section>
        <div class="filter">
            <select v-model="dateRange" @change="updateChartRange">
                <option value="anual">Anual</option>
                <option value="semanal">Semanal</option>
            </select>
            <input v-if="dateRange === 'anual'" type="number" v-model="year" @change="updateChartRange" placeholder="Ano" />
            <input v-if="dateRange === 'semanal'" type="week" v-model="week" @change="updateChartRange" placeholder="Semana" />
        </div>
        <div class="chart-container">
            <Chart :chartData="consultations.chartData" :chartType="consultations.type" :chartTitle="consultations.title" />
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
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
            dateRange: "anual", 
            year: new Date().getFullYear(),
            week: null
        }
    },
    methods: {
        updateChartRange() {
            if (this.dateRange === 'anual') {
                this.charts.consultations.chartData.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            } else if (this.dateRange === 'semanal') {
                this.charts.consultations.chartData.labels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
            }
        }
    }
}
</script>
