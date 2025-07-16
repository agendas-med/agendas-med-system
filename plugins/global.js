import { reactive } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
    let contentObject = reactive({
        id: 0
    })

    let company = reactive({
        id: 0,
        name: "",
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
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 4,
                    hours: []
                },
                {
                    day: 5,
                    hours: []
                },
                {
                    day: 6,
                    hours: []
                },
                {
                    day: 7,
                    hours: []
                }
            ]
        },
        roles: [],
        services: [],
        products: []
    })

    let unitsOfMeasurement = [];

    let user = reactive({
        id: 0,
        name: "",
        email: "",
        url_photo: "",
        tel: "",
        zip_code: "",
        address: "",
        city: "",
        state: "",
        companies: []
    })

    let modalUtils = reactive({
        modalTitle: "",
        modalSaveButton: "",
        modalCancelButton: "",
        internalTitle: ""
    })

    let screenUtils = reactive({
        invalidForm: false
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

    let durations = [
        { value: 15, label: "15 minutos" },
        { value: 30, label: "30 minutos" },
        { value: 45, label: "45 minutos" },
        { value: 60, label: "1 hora" },
        { value: 75, label: "1 hora e 15 minutos" },
        { value: 90, label: "1 hora e 30 minutos" },
        { value: 105, label: "1 hora e 45 minutos" },
        { value: 120, label: "2 horas" },
        { value: 135, label: "2 horas e 15 minutos" },
        { value: 150, label: "2 horas e 30 minutos" },
        { value: 165, label: "2 horas e 45 minutos" },
        { value: 180, label: "3 horas" },
        { value: 195, label: "3 horas e 15 minutos" },
        { value: 210, label: "3 horas e 30 minutos" },
        { value: 225, label: "3 horas e 45 minutos" },
        { value: 240, label: "4 horas" }
    ]

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
        unitsOfMeasurement,
        contentObject,
        company,
        jwtLoaded,
        user,
        selectedCompany,
        estados,
        business_types,
        durations,
        modalUtils,
        screenUtils
    });
  });
  