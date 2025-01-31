<template>
    <section>
        <UtilsLoading :loading="loading" />
        <UtilsDataTable v-if="!loading" :dataTable="pagamentos" :rowsPerPage="7" table="cliente">
            <template #column-cliente="{ item }">
                <div class="flex items-center">
                    <img :src="item.customer_image" class="avatar avatar-pp" alt="">
                    <div>
                        <p><strong>{{ item.customer_name }}</strong></p>
                    </div>
                </div>
            </template>
            <template #column-telefone="{ item }">
                <p>{{ $myFunctions.formatTel(item.customer_tel) }}</p>
            </template>
            <template #column-data-vencimento="{ item }">
                <p>{{ $myFunctions.formatDate(item.due_date) }}</p>
            </template>
            <template #column-status="{ item }">
                <p class="tag" :class="chooseTagClass(item.status)">{{ item.status }}</p>
            </template>
            <template #column-valor="{ item }">
                <p>{{ $myFunctions.formatCurrency(item.value) }}</p>
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
                        customer_id: 1,
                        customer_name: "Saymon",
                        customer_image: "https://cademint-test.s3.amazonaws.com/2024-09-04T02_10_20.206Z126018478_1648490771979717_7245151950313189709_o.jpg",
                        customer_tel: '41998564582', 
                        due_date: "2024-12-03 15:30:00",
                        status: "ATRASADO",
                        value: 250.55
                    },
                    {
                        id: 1,
                        cliente_id: 1,
                        customer_name: "Saymon",
                        customer_image: "https://cademint-test.s3.amazonaws.com/2024-09-04T02_10_20.206Z126018478_1648490771979717_7245151950313189709_o.jpg",
                        customer_tel: '41998564582', 
                        due_date: "2024-12-03 15:30:00",
                        status: "PAGO",
                        value: 200.41
                    },
                    {
                        id: 2,
                        customer_id: 1,
                        customer_name: "Saymon",
                        customer_image: "https://cademint-test.s3.amazonaws.com/2024-09-04T02_10_20.206Z126018478_1648490771979717_7245151950313189709_o.jpg",
                        customer_tel: '41998564582', 
                        due_date: "2024-12-03 15:30:00",
                        status: "EM ABERTO",
                        value: 250.55
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