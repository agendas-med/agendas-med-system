import moment from 'moment';

export default defineNuxtPlugin((nuxtApp) => {
  globalThis.moment = globalThis.moment = moment;
});
