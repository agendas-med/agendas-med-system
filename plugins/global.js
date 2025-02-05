import { reactive } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
    let contentObject = reactive({
        id: 0
    })

    let company = reactive({
        id: 0,
        name: "",
        adress: "",
        zip_code: "",
        address: "",
        city: "",
        state: "",
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
    })

    let user = reactive({
        id: 0,
        name: "",
        email: "",
        url_photo: "",
        tel: "",
        cep: "",
        address: "",
        city: "",
        state: "",
        country: "",
        companies: []
    })

    let selectedCompany = reactive({
        id: 0
    });

    let jwtLoaded = reactive({
        loaded: false
    });

    let business_types = reactive({
        types: []
    })

    let estados = [
        { sigla: "AC", nome: "Acre" },
        { sigla: "AL", nome: "Alagoas" },
        { sigla: "AP", nome: "Amapá" },
        { sigla: "AM", nome: "Amazonas" },
        { sigla: "BA", nome: "Bahia" },
        { sigla: "CE", nome: "Ceará" },
        { sigla: "DF", nome: "Distrito Federal" },
        { sigla: "ES", nome: "Espírito Santo" },
        { sigla: "GO", nome: "Goiás" },
        { sigla: "MA", nome: "Maranhão" },
        { sigla: "MT", nome: "Mato Grosso" },
        { sigla: "MS", nome: "Mato Grosso do Sul" },
        { sigla: "MG", nome: "Minas Gerais" },
        { sigla: "PA", nome: "Pará" },
        { sigla: "PB", nome: "Paraíba" },
        { sigla: "PR", nome: "Paraná" },
        { sigla: "PE", nome: "Pernambuco" },
        { sigla: "PI", nome: "Piauí" },
        { sigla: "RJ", nome: "Rio de Janeiro" },
        { sigla: "RN", nome: "Rio Grande do Norte" },
        { sigla: "RS", nome: "Rio Grande do Sul" },
        { sigla: "RO", nome: "Rondônia" },
        { sigla: "RR", nome: "Roraima" },
        { sigla: "SC", nome: "Santa Catarina" },
        { sigla: "SP", nome: "São Paulo" },
        { sigla: "SE", nome: "Sergipe" },
        { sigla: "TO", nome: "Tocantins" }
    ];
  
    nuxtApp.provide('global', {
        contentObject,
        company,
        jwtLoaded,
        user,
        selectedCompany,
        estados,
        business_types
    });
  });
  