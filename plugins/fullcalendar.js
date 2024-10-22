import Vue from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

Vue.component('FullCalendar', FullCalendar);
Vue.component('dayGridPlugin', dayGridPlugin);
Vue.component('timeGridPlugin', timeGridPlugin);
Vue.component('interactionPlugin', interactionPlugin);
