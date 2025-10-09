<template>
  <UtilsPageheader title="Agenda" subtitle="Organize seus horários e acompanhe seus agendamentos." />
  <div class="calendar-container">
    <div class="calendar-header flex justify-between">
      <div class="input-selecao-periodo" :style="responsive ? 'opacity: 0;' : ''">
        <span v-on:click="changePeriod(1)">Mensal</span>
        <span v-on:click="changePeriod(2)">Semanal</span>
        <div class="frame-botao"></div>
      </div>
      <div class="navigation-buttons flex gap-1">
        <button class="btn btn-primary btn-square" v-on:click="calendarApi.prev()" title="Anterior">
          <font-awesome icon="angle-left" />
        </button>
        <button class="btn btn-primary btn-square" v-on:click="calendarApi.next()" title="Próximo">
          <font-awesome icon="angle-right" />
        </button>
      </div>
    </div>
    <div class="legendas">
      <div class="agendado">Agendado</div>
      <div class="iniciado">Iniciado</div>
      <div class="realizado">Realizado</div>
      <div class="cancelado">Cancelado</div>
    </div>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" v-if="!reload" />
    <UtilsModal @closeModal="$myFunctions.closeModal(this, ['eventId'])">
      <ModalContentAgenda :event="selectedEvent" @savedContent="$myFunctions.closeModal(this); getEvents();" />
    </UtilsModal>
  </div>

</template>
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import ptLocale from '@fullcalendar/core/locales/pt-br';

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarType: "dayGridMonth",
      reload: false,
      calendarApi: null,
      calendarEvents: [],
      draggingEventId: "",
      eventId: "",
      responsive: false,
      selectedEvent: {
        customer_id: null,
        customer_name: "",
        services: [],
        date: "",
        duration: "",
        observations: ""
      }
    }
  },
  computed: {
    calendarOptions: function () {
      return {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, momentTimezonePlugin, listPlugin],
        locale: ptLocale,
        initialView: this.calendarType,
        dateClick: this.handleDateClick,
        viewDidMount: this.getApi,
        events: this.calendarEvents,
        nowIndicator: true,
        dayMaxEventRows: true,
        timeZone: "America/Sao_Paulo",
        eventClick: this.eventClick,
        height: "calc(100vh - 218px)",
        editable: true,
        eventDrop: this.handleEventDrop,
        eventResize: this.handleEventResize,
        titleFormat: {
          hour12: false,
          omitZeroMinute: false,
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        },
        headerToolbar: {
          start: 'title',
          center: '',
          end: ''
        }
      }
    }
  },
  mounted: function () {
    this.getEvents();

    this.$nextTick(() => {
      this.resizeCalendar();
    });

    $(window).on("resize", () => {
      this.resizeCalendar();
    })
  },
  methods: {
    getEvents: function () {
      this.$base.api.get("/appointments")
        .then((response) => {
          this.calendarEvents = response.data.returnObj;

          for (let i = 0; i < this.calendarEvents.length; i++) {
            this.calendarEvents[i]["displayEventEnd"] = true;
            this.calendarEvents[i]["color"] = this.calendarEvents[i].status == "agendado" ? "var(--amarelo)" : this.calendarEvents[i].status == "iniciado" ? "var(--azul)" : this.calendarEvents[i].status == "cancelado" ? "var(--vermelho)" : "var(--verde)";
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar os agendamentos:", error);
        });
    },
    eventClick: function (info) {
      this.selectedEvent = this.calendarEvents.filter(event => event.id == info.event.id)[0];

      this.$myFunctions.openModal({
        instance: this,
        title: "Alterar agendamento",
        saveButton: "Salvar",
        cancelButton: "Cancelar",
        props: {},
        modalContentVariable: "",
        contentObject: this.selectedEvent
      });
    },
    handleEventResize: function (info) {
      if (!confirm("Tem certeza que deseja alterar o agendamento?")) {
        info.revert();
      } else {
        this.changeEventById(info.event.id, info);
      }
    },
    handleEventDrop: function (info) {
      if (!confirm("Tem certeza que deseja alterar o agendamento?")) {
        info.revert();
      } else {
        this.changeEventById(info.event.id, info);

      }
    },
    changeEventById: function (eventId, info) {
      let event = this.calendarEvents.find(event => event.id == eventId);

      event.start = info.event.startStr;
      event.end = info.event.endStr;

      this.updateThisEvent(event);
    },
    updateThisEvent: function (event) {
      const start = moment(event.start);
      const end = moment(event.end);

      // Diferença entre start e end em minutos
      const calculatedDuration = end.diff(start, "minutes");

      // Soma das durations dos serviços
      const totalServiceDuration = event.services.reduce((total, service) => {
        return total + parseInt(service.duration || 0);
      }, 0);

      // Define a duração final, obedecendo a lógica desejada
      const finalDuration = (calculatedDuration < totalServiceDuration)
        ? totalServiceDuration
        : calculatedDuration;

      const updatedEvent = {
        customer_id: event.customer_id,
        customer_name: event.customer_name,
        date: start.format("YYYY-MM-DD HH:mm:ss"),
        duration: finalDuration.toString(),
        observations: event.observations,
        services: event.services,
        status: event.status
      };

      this.$base.api.patch(`/appointments/${event.id}`, updatedEvent)
        .then(() => {
          this.getEvents(); // Atualiza a lista de eventos
        })
        .catch((error) => {
          console.error("Erro ao atualizar o agendamento:", error);
        });
    },
    getApi: function () {
      this.calendarApi = this.$refs.fullCalendar.getApi()
    },
    handleDateClick: function (e) {
      let filteredEvents = [];

      this.selectedEvent = {
        customer_id: null,
        customer_name: "",
        services: [],
        date: e.dateStr + "T09:00:00",
        duration: "",
        observations: ""
      }

      for (let i = 0; i < this.calendarEvents.length; i++) {
        if (this.isSameDay(this.calendarEvents[i].start, e.date)) {
          filteredEvents.push(this.calendarEvents[i]);
        }
      }

      this.$myFunctions.openModal({
        instance: this,
        title: "Criar agendamento",
        saveButton: "Criar",
        cancelButton: "Cancelar",
        contentObject: this.selectedEvent
      });
    },
    isSameDay: function (dateString, dateObj) {
      const inputDate = new Date(dateString);

      return (
        inputDate.getFullYear() === dateObj.getFullYear() &&
        inputDate.getMonth() === dateObj.getMonth() &&
        inputDate.getDate() === dateObj.getDate()
      );
    },
    resizeCalendar: function () {
      this.reload = true;

      if (window.innerWidth < 480) {
        this.calendarType = "listWeek";
        this.responsive = true;
      } else {
        this.calendarType = "dayGridMonth";
        this.responsive = false;
      }

      this.$nextTick(() => {
        this.reload = false;
      });
    },
    changePeriod: function (position) {
      let frame = $(".input-selecao-periodo .frame-botao");
      this.reload = true;

      switch (position) {
        case 1:
          this.calendarType = "dayGridMonth";
          frame.css("transform", "translateX(0)").css("width", "86px");
          break;
        case 2:
          this.calendarType = "timeGridWeek";
          frame.css("transform", "translateX(83px)").css("width", "91px");
          break;
      }

      this.$nextTick(() => {
        this.reload = false;
      });
    }
  }
}
</script>
<style>
.fc .fc-toolbar.fc-header-toolbar {
  margin-top: 1.5em;
}

.fc .fc-daygrid-day.fc-day-today {
  background: var(--verde-escuro);
}

.fc .fc-view-harness-active>.fc-view {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--cinza-medio);
}

.legendas {
  position: absolute;
  right: var(--space-7);
  top: 10.5rem;
  display: flex;
  align-items: center;
  gap: var(--space-5);

  & div {
    padding-left: 2rem;
    display: inline-block;
    position: relative;
  }
}

.agendado::after,
.iniciado::after,
.realizado::after,
.cancelado::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--cinza-medio);
  position: absolute;
  left: .7rem;
  top: 0;
  bottom: 0;
  margin: auto;
}

.agendado::after {
  background: var(--amarelo);
}

.iniciado::after {
  background: var(--azul);
}

.realizado::after {
  background: var(--verde);
}

.cancelado::after {
  background: var(--vermelho);
}

.calendar-header {
  margin-top: var(--space-5);
}

.input-selecao-periodo {
  display: flex;
  align-items: center;
  background: var(--cinza-medio);
  padding: var(--space-3) 3px;
  border-radius: 30px;
  position: relative;
  width: 179px;
}

.input-selecao-periodo span {
  font-weight: 500;
  margin: 0 var(--space-5);
  cursor: pointer;
  z-index: 2;
}

.input-selecao-periodo .frame-botao {
  position: absolute;
  background: var(--branco);
  width: 86px;
  height: 90%;
  border-radius: 30px;
  transition: all 0.4s;
}

@media (max-width: 768px) {
  .legendas {
    display: none;
  }
}
</style>