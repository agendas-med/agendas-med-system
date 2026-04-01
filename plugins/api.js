import axios from 'axios';
import { reactive } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
    let url_api;

    const dev_environment = "http://localhost:3001"; //Ambiente de desenvolvimento.
    const test_environment = "https://coretest-agendaspro-a30ea1e41da6.herokuapp.com"; //Ambiente de teste.
    const production_environment = ""; //Ambiente de produção.

    // TROCA DO AMBIENTE DA API
    //
    // O parâmetro que deverá ser informado será 0, 1 ou 2, sendo que:
    // 0 - Ambiente de desenvolvimento
    // 1 - Ambiente de teste
    // 2 - Ambiente de produção
    // 
    // ==============================
    let ambient;
    
    if (window.location.hostname.indexOf("localhost") != -1 || window.location.hostname.indexOf("192.168") != -1) {
        ambient = 0;
    } else if (window.location.hostname.indexOf("dev.") != -1) {
        ambient = 1;
    } else {
        ambient = 2;
    }
    // ==============================
    //


    switch (ambient) {
        case 0:
            url_api = dev_environment;
            break;
        case 1: 
            url_api = test_environment;
            break;
        case 2: 
            url_api = production_environment;
            break;
    }

    const api = axios.create({
        baseURL: url_api
    })

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const currentToken = localStorage.getItem("agendaspro_jwt");
                    
                    const { data } = await axios.post(`${url_api}/users/check_jwt`, { 
                        token: `Bearer ${currentToken}` 
                    });

                    const newToken = data.returnObj.newToken;

                    localStorage.setItem("agendaspro_jwt", newToken);
                    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    
                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem("agendaspro_jwt");
                    window.location.href = "/entrar";
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
  
    nuxtApp.provide('base', {
        api
    });
  });
  