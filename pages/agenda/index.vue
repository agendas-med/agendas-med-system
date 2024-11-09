<template>
  <UtilsPageheader title="Agenda" subtitle="Organize seus horários e acompanhe suas consultas." />
  <div class="calendar-container">
    <div class="calendar-header flex justify-between">
      <div class="input-selecao-periodo">
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
  </div>
  
</template>
<script>
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import timeGridPlugin from '@fullcalendar/timegrid';

  export default {
    components: {
      FullCalendar
    },
    data() {
      return {
        calendarType: "dayGridMonth",
        reload: false,
        calendarApi: null
      }
    },
    computed: {
      calendarOptions: function () {
        return {
          plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
          initialView: this.calendarType,
          dateClick: this.handleDateClick,
          viewDidMount: this.teste,
          nowIndicator: true,
          headerToolbar: {
            start: '',
            center: '',
            end: ''
          }
        }
      }
    },
    mounted: function () {
      setTimeout(() => {
        console.log(this.calendarApi)
      }, 10)
    },
    methods: {
      teste: function () {
        this.calendarApi = this.$refs.fullCalendar.getApi()
      },
      handleDateClick: function(arg) {
        alert('date click! ' + arg.dateStr)
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

        setTimeout(() => {
          this.reload = false;
        }, 1)
      }
    }
  }
</script>
<style>
.fc .fc-daygrid-day.fc-day-today {
  background:var(--verde-escuro);
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