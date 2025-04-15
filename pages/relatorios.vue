<template>
    <section>
        <UtilsPageheader title="Relatórios" subtitle="Visualize seus agendamentos e ganhos em relatórios completos." />
        <UtilsTabs :tabs="tabs" @changedTab="changeChart($event)" />
        <div>
            <div class="filter">
                <select v-model="dateRange">
                    <option value="anual">Anual</option>
                    <option value="semanal">Semanal</option>
                </select>
                <input v-if="dateRange === 'anual'" type="number" v-model="year" @keydown.enter="updateChartRange" placeholder="Ano" />
                <input v-if="dateRange === 'semanal'" type="week" v-model="week" placeholder="Semana" />
                <button type="button" class="btn btn-primary" v-if="year != null || week != null" v-on:click="updateChartRange">Buscar</button>
            </div>
            <div class="chart-container">
                <UtilsLoading :loading="loading" />
                <Chart v-if="!loading" :chartData="data.chartData" :chartType="data.type" :chartTitle="data.title" />
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Atendimentos realizados",
                    quantity: null,
                    default: true
                },
                {
                    name: "Faturamento",
                    quantity: null,
                    default: false
                }
            ],
            loading: true,
            data: {},
            dateRange: "anual", 
            year: new Date().getFullYear(),
            week: null,
            type: ""
        }
    },
    watch: {
        dateRange: function () {
            this.year = null;
            this.week = null;
        }
    },
    methods: {
        resetFilters: function () {
            this.dateRange = "anual";

            nextTick(() => {
                this.year = new Date().getFullYear();
                this.week = null;
            })
        },
        changeChart: function (event) {
            switch (event) {
                case 0:
                    this.type = "consultas";
                    break;
                case 1:
                    this.type = "faturamento";
                    break;
            }

            this.resetFilters();
            this.returnChart(this.type);
        },
        returnChart: function (type = "", dateRange = "") {
            let self = this;
            //Chamada para api passando o tipo de gráfico que tem que retornar
            //dateRange para enviar para o servidor

            if (!this.year) this.year = new Date().getFullYear();

            this.loading = true;

            if (type == "faturamento") {
                    this.data = {
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
                } else {
                    let data = {
                        type: this.dateRange,
                        date: this.dateRange == "anual" ? this.year : this.week
                    }

                    self.$base.api.post("/reports", data) 
                    .then(function (response) { 
                        console.log(response.data.returnObj)
                        self.data =  {
                            chartData: response.data.returnObj,
                            type: "line",
                            title: "Atendimentos realizados"
                        }            
                        self.loading = false;
                    }).catch((error) => {
                        console.log(error)
                    })
                }
        },
        updateChartRange() {
            this.returnChart(this.type, this.dateRange);
        }
    }
}
</script>
