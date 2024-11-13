<template>
  <UtilsPageheader title="Agenda" subtitle="Organize seus horários e acompanhe suas consultas." />
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
    <FullCalendar ref="fullCalendar" :options="calendarOptions" v-if="!reload" />
    <UtilsModal v-show="modalTitle" :title="modalTitle" :saveButton="modalSaveButton" :cancelButton="modalCancelButton" @closeModal="$myFunctions.closeModal(this, ['eventId', 'dateString'])">
      <ModalContentAgenda :eventId="eventId" :dateString="dateString" />
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
        modalTitle: "",
        modalSaveButton: "",
        modalCancelButton: "",
        eventId: "",
        dateString: "",
        responsive: false
      }
    },
    computed: {
      calendarOptions: function () {
        return {
          plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin, momentTimezonePlugin, listPlugin ],
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
          eventDragStart: this.handleEventDragStart,
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
        this.calendarEvents = [
          {
            id: 1,
            title: "Aline - 1ª Consulta",
            start: "2024-11-12T09:30:15-03:00",
            end: "2024-11-12T10:00:15-03:00",
            displayEventEnd: true
          },
          {
            id: 2,
            title: "Ana - 1ª Consulta",
            start: "2024-11-12T18:30:15-03:00",
            end: "2024-11-12T19:30:15-03:00"
          },
          {
            id: 3,
            title: "Marcelo - 1ª Consulta",
            start: "2024-11-12T10:00:15-03:00",
            end: "2024-11-12T10:30:15-03:00"
          },
          {
            id: 4,
            title: "Aline - Re-consulta",
            start: "2024-11-15T09:30:15-03:00",
            end: "2024-11-15T10:00:15-03:00"
          }
        ]

        for (let i = 0; i < this.calendarEvents.length; i++) {
          this.calendarEvents[i]["displayEventEnd"] = true;
        }
      },
      eventClick: function (info) {
        this.$myFunctions.openModal(this, "Alterar agendamento", "Salvar", "Cancelar", { eventId: info.event.id });
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
        console.log(event)
      },
      getApi: function () {
        this.calendarApi = this.$refs.fullCalendar.getApi()
      },
      handleDateClick: function(e) {
        let filteredEvents = [];

        for (let i = 0; i < this.calendarEvents.length; i++) {
          if (this.isSameDay(this.calendarEvents[i].start, e.date)) {
            filteredEvents.push(this.calendarEvents[i]);
          }
        }

        this.$myFunctions.openModal(this, "Criar agendamento", "Criar", "Cancelar", { dateString: e.dateStr });
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
  background:var(--verde-escuro);
}

.fc .fc-view-harness-active > .fc-view {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--cinza-medio);
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
</style>