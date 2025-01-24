<template>
    <section>
        <UtilsLoading :loading="loading" />
        <UtilsDataTable v-if="!loading" :dataTable="pagamentos" :rowsPerPage="7" table="cliente">
            <template #column-cliente="{ item }">
                <div class="flex items-center">
                    <img :src="item.cliente_url_foto" class="avatar avatar-pp" alt="">
                    <div>
                        <p><strong>{{ item.cliente_nome }}</strong></p>
                    </div>
                </div>
            </template>
            <template #column-telefone="{ item }">
                <p>{{ $myFunctions.formatTel(item.cliente_telefone) }}</p>
            </template>
            <template #column-último-agendamento="{ item }">
                <p>{{ $myFunctions.formatDate(item.ultimo_agendamento) }}</p>
            </template>
            <template #column-status="{ item }">
                <p class="tag" :class="chooseTagClass(item.status)">{{ item.status }}</p>
            </template>
            <template #column-valor="{ item }">
                <p>{{ $myFunctions.formatCurrency(item.valor) }}</p>
            </template>
        </UtilsDataTable>
    </section>   
</template>

<script>
export default {
    data() {
        return {
            response: "",
            responseType: "",
            loading: true,
            pagamentos: []
        }
    },
    computed: {
        user: function () {
            return reactive(JSON.parse(JSON.stringify(this.$global.user)));
        }
    },
    mounted() {
        this.returnPayments();
    },
    methods: {
        chooseTagClass: function (status) {
            switch (status) {
                case "ATRASADO":
                    return "red";
                case "EM ABERTO":
                    return "yellow";
                case "PAGO":
                    return "green";
            }
        },
        returnPayments: function () { //Método para retornar os pagamentos
            this.loading = true;

            setTimeout(() => {
                this.pagamentos = [
                    {
                        id: 0,
                        cliente_id: 1,
                        cliente_nome: "Saymon",
                        cliente_url_foto: "https://cademint-test.s3.amazonaws.com/2024-09-04T02_10_20.206Z126018478_1648490771979717_7245151950313189709_o.jpg",
                        cliente_telefone: '41998564582', 
                        ultimo_agendamento: "2024-12-03 15:30:00",
                        status: "ATRASADO",
                        valor: 250.55
                    },
                    {
                        id: 1,
                        cliente_id: 1,
                        cliente_nome: "Saymon",
                        cliente_url_foto: "https://cademint-test.s3.amazonaws.com/2024-09-04T02_10_20.206Z126018478_1648490771979717_7245151950313189709_o.jpg",
                        cliente_telefone: '41998564582', 
                        ultimo_agendamento: "2024-12-03 15:30:00",
                        status: "PAGO",
                        valor: 200.41
                    },
                    {
                        id: 2,
                        cliente_id: 1,
                        cliente_nome: "Saymon",
                        cliente_url_foto: "https://cademint-test.s3.amazonaws.com/2024-09-04T02_10_20.206Z126018478_1648490771979717_7245151950313189709_o.jpg",
                        cliente_telefone: '41998564582', 
                        ultimo_agendamento: "2024-12-03 15:30:00",
                        status: "EM ABERTO",
                        valor: 250.55
                    }
                ]

                this.loading = false;
            }, 500)
        }
    }
}
</script>
<style scoped>
.profile-header {
    margin: var(--space-7) 0;
}

.profile-informations > p {
    margin-bottom: var(--space-3);
}

.avatar {
    margin-right: var(--space-6);
}

@media (max-width: 768px) {
    .profile-configurations {
        & button[type="submit"], & button[type="button"] {
            width: 100%;
            max-width: 100%;
        }
    } 
}
</style>