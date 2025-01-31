export default defineNuxtPlugin((nuxtApp) => {
    let contentObject = {
        id: 0
    }

    let company = {
        id: 0,
        name: "",
        adress: "",
        configurations: {
            opening_hours: [
                {
                    day: 1, // Segunda-feira
                    hours: [
                        {
                            initial_date: "09:00",
                            final_date: "12:00"
                        },
                        {
                            initial_date: "13:00",
                            final_date: "18:00"
                        }
                    ]
                }
            ],
            notifications: [
                {
                    id: "scheduled_consultation",
                    active: false
                },
                {
                    id: "in_app_payment",
                    active: false
                },
                {
                    id: "consultation_cancelation",
                    active: false
                }
            ]
        }
    }

    let user = {
        id: 0,
        name: "",
        email: "",
        url_photo: "",
        tel: "",
        cep: "",
        adress: "",
        city: "",
        state: "",
        country: ""
    }

    let jwtLoaded = false;
  
    nuxtApp.provide('global', {
        contentObject,
        company,
        jwtLoaded
    });
  });
  