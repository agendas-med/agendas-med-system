<template>
    <section>
        <TableMain v-if="false" />
        <UtilsDataTable :dataTable="pacientes" :rowsPerPage="7" table="cliente">
            <template #column-nome="{ item }">
                <div class="flex items-center">
                    <img :src="item.url_foto" class="avatar avatar-pp" alt="">
                    <div>
                        <p><strong>{{ item.nome }}</strong></p>
                        <p class="cinza">{{ $myFunctions.returnAge(item.data_nascimento) }}</p>
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
                <div class="flex space-x-2">
                    <button class="rounded-button" v-on:click="handleCreateSchedule(item)">
                        <font-awesome icon="calendar-day" class="cinza" />
                    </button>
                    <button class="rounded-button" v-on:click="handleEditPatient(item)">
                        <font-awesome icon="user-pen" class="cinza" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
        <UtilsModal v-show="modalTitle" :title="modalTitle" :saveButton="modalSaveButton" :cancelButton="modalCancelButton" @closeModal="$myFunctions.closeModal(this)">
            <ModalContentAgenda v-if="modalContentAgenda" :event="selectedEvent" @savedContent="$myFunctions.closeModal(this); goToSchedule()" />
            <ModalContentPacientes v-if="modalContentPacientes" @savedContent="$myFunctions.closeModal(this, []);" />
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
            modalContentAgenda: false,
            modalContentPacientes: false,
            pacientes: [
                { id: 1, nome: 'John', telefone: '41998564552', ultima_consulta: "2024-12-03 15:30:00", proxima_consulta: "2024-12-04 15:30:00", total_consultas: 2, data_nascimento: "2024-12-03", url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                { id: 2, nome: 'Jane', data_nascimento: "2024-12-03", telefone: '41998564582',ultima_consulta: "2024-12-03 15:30:00", proxima_consulta: "", total_consultas: 3, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                { id: 3, nome: 'Astolfo', data_nascimento: "2024-12-03", telefone: '55998564582',ultima_consulta: "2024-12-03 15:30:00", proxima_consulta: "2024-12-04 15:30:00", total_consultas: 2, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                { id: 4, nome: 'João', data_nascimento: "2024-12-03", telefone: '41998564582',ultima_consulta: "2024-12-03 15:30:00", proxima_consulta: "", total_consultas: 1, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                { id: 5, nome: 'Miyo', data_nascimento: "2024-12-03", telefone: '41998564582',ultima_consulta: "2024-12-03 15:30:00", proxima_consulta: "", total_consultas: 2, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
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

            this.$myFunctions.openModal(this, "Criar agendamento", "Criar", "Cancelar", {}, "modalContentAgenda");
        },
        handleEditPatient: function (item) {
            this.$myFunctions.openModal(this, "Alterar cliente", "Salvar", "Cancelar", {}, 'modalContentPacientes', item);
        },
        goToSchedule: function () {
            setTimeout(() => {
                this.$router.push("/agenda");
            }, 400)
        }
    }
}
</script>