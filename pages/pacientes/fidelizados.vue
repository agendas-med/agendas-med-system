<template>
    <section>
        <TableMain v-if="false" />
        <UtilsDataTable :dataTable="pacientes" :rowsPerPage="7" table="cliente">
            <template #column-nome="{ item }">
                <div class="flex items-center">
                    <img :src="item.url_foto" class="avatar avatar-pp" alt="">
                    <div>
                        <p><strong>{{ item.nome }}</strong></p>
                        <p class="cinza">{{ item.idade }} {{ item.idade == 1 ? "ano" : "anos" }}</p>
                    </div>
                </div>
            </template>
            <template #column-telefone="{ item }">
                <p>{{ $myFunctions.formatTel(item.telefone) }}</p>
            </template>
            <template #column-ultima_consulta="{ item }">
                <p>{{ $myFunctions.formatDate(item.ultima_consulta) }}</p>
            </template>
            <template #column-proxima_consulta="{ item }">
                <p>{{ $myFunctions.formatDate(item.proxima_consulta) }}</p>
            </template>
            <template #column-acoes="{ item }">
                <button class="rounded-button" v-on:click="handleCreateSchedule(item)">
                    <font-awesome icon="calendar-day" class="cinza" />
                </button>
            </template>
        </UtilsDataTable>
        <UtilsModal v-show="modalTitle" :title="modalTitle" :saveButton="modalSaveButton" :cancelButton="modalCancelButton" @closeModal="$myFunctions.closeModal(this)">
            <ModalContentAgenda :event="selectedEvent" @savedContent="$myFunctions.closeModal(this); goToSchedule()" />
        </UtilsModal>
    </section>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            selectedEvent: {
                paciente_id: null,
                paciente_nome: "",
                especialidade: "",
                data: "",
                duracao: "",
                observacoes: ""
            },
            modalTitle: "",
            modalSaveButton: "",
            modalCancelButton: "",
            showResponsiveFilter: true, 
            pacientes: [
                { id: 1, nome: 'John', telefone: '41998564552', ultima_consulta: "2024-12-04 15:30:00", proxima_consulta: "", total_consultas: 0, idade: 30, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                { id: 2, nome: 'Jane', idade: 25, telefone: '41998564582',ultima_consulta: "2024-12-04 15:30:00", proxima_consulta: "", total_consultas: 0, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                { id: 3, nome: 'Astolfo', idade: 23, telefone: '55998564582',ultima_consulta: "2024-12-04 15:30:00", proxima_consulta: "2024-12-04 15:30:00", total_consultas: 2, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" }
            ]
        }
    },
    methods: {
        handleCreateSchedule: function (user) {
            this.selectedEvent = {
                paciente_id: user.id,
                paciente_nome: user.nome,
                especialidade: "",
                data: moment().format("YYYY-MM-DD") + "T09:00:00",
                duracao: "",
                observacoes: ""
            }

            this.$myFunctions.openModal(this, "Criar agendamento", "Criar", "Cancelar");
        },
        goToSchedule: function () {
            setTimeout(() => {
                this.$router.push("/agenda");
            }, 400)
        }
    }
}
</script>