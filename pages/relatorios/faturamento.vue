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
            <Chart :chartData="invoicing.chartData" :chartType="invoicing.type" :chartTitle="invoicing.title" />
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
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
