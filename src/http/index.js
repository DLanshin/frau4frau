import axios from "axios";
import {useTelegram} from "../hooks/useTelegram";


const $api = axios.create({
    baseURL:`${process.env.REACT_APP_API_URL}`
});


$api.interceptors.response.use((config) => {
    return config;
},(async error => {
    const {showTelegramAlert} = useTelegram();
    if(error.response?.status === 500){
        if(process.env.REACT_APP_MODE==="dev"){
            alert("Произошла непредвиденная ошибка, попробуйте позже");
        }
        showTelegramAlert("Произошла непредвиденная ошибка, попробуйте позже");
    }
    if(error.response?.status === 420){
        return error.response
    }
}));

export {
    $api
};

