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
                <Chart v-if="!loading" :chartData="data.chartData" :chartType="data.type" :chartTitle="data.title" :type="data.labelType" />
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

            if (!this.year) this.year = new Date().getFullYear();

            this.loading = true;

            let data = {
                type: this.dateRange,
                date: this.dateRange == "anual" ? this.year : this.week
            }

            if (type == "faturamento") {
                self.$base.api.post("/reports/invoicing", data) 
                .then(function (response) { 
                    self.data =  {
                        chartData: response.data.returnObj,
                        type: "bar",
                        title: "Faturamento",
                        labelType: "currency"
                    }            
                    self.loading = false;
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                self.$base.api.post("/reports/appointments", data) 
                .then(function (response) { 
                    self.data =  {
                        chartData: response.data.returnObj,
                        type: "line",
                        title: "Atendimentos realizados",
                        labelType: "number"
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
